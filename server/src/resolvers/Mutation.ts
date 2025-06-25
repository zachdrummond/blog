import { hash, verify } from "@node-rs/argon2";
import { SignJWT } from "jose";
import { APP_SECRET, omitFields } from "../utils.js";

export async function addPost(
  parent,
  { title, content, categories, published },
  { prisma, author },
  info
) {
  if (!author) throw new Error("Unauthorized");
  if (!title || !content || !categories)
    throw new Error("Missing required fields");

  const newPost = await prisma.post.create({
    data: {
      author: {
        connect: { author_id: author.id },
      },
      categories,
      content,
      title,
      published,
    },
    include: {
      author: {
        omit: omitFields(author),
      },
    },
  });

  return newPost;
}

const createNewToken = async (author) => {
  return new SignJWT({ author_id: author.author_id, author_role: author.role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(APP_SECRET));
};

export async function deleteAuthor(
  parent,
  { author_id, email },
  { prisma, author },
  info
) {
  if (!author || author?.role !== "ADMIN") throw new Error("Unauthorized");
  if (!author_id && !email)
    throw new Error("Either ID or email must be provided");

  return await prisma.author
    .delete({
      where: {
        author_id: author_id ? parseInt(author_id, 10) : undefined,
        email: email ? email : undefined,
      },
      select: {
        author_id: true,
        username: true,
      },
    })
    .catch((error) => {
      throw new Error(`Error deleting author: ${error.message}`);
    });
}

export async function deletePost(
  parent,
  { post_id, title },
  { prisma, author },
  info
) {
  if (!author || author?.role !== "ADMIN") throw new Error("Unauthorized");
  if (!post_id && !title)
    throw new Error("Either ID or title must be provided");

  return await prisma.post
    .delete({
      where: {
        post_id: post_id ? parseInt(post_id, 10) : undefined,
        title: title ? title : undefined,
      },
      include: {
        author: {
          omit: omitFields(author),
        },
      },
    })
    .catch((error) => {
      throw new Error(`Error deleting post: ${error.message}`);
    });
}

export async function incrementPost(
  parent,
  { post_id, type },
  { prisma, author },
  info
) {
  if (!post_id || !type) throw new Error("Id and type is required");

  const data =
    type === "LIKES"
      ? { likes: { increment: 1 } }
      : type === "SHARES"
      ? { shares: { increment: 1 } }
      : { views: { increment: 1 } };

  return await prisma.post
    .update({
      data,
      where: {
        post_id: parseInt(post_id, 10),
      },
      include: {
        author: {
          omit: omitFields(author),
        },
      },
    })
    .catch((error) => {
      throw new Error(`Error incrementing post: ${error.message}`);
    });
}

export async function login(parent, { email, password }, { prisma }, info) {
  const author = await prisma.author.findUnique({
    where: { email: email },
  });
  if (!author) throw new Error("Author not found");

  const valid = await verify(author.password, password);
  if (!valid) throw new Error("Invalid password");

  const token = await createNewToken(author);

  return {
    token,
    author,
  };
}

export async function signup(parent, args, { prisma }, info) {
  const password = await hash(args.password);
  const author = await prisma.author.create({
    data: { ...args, password },
    omit: { password: true },
  });
  const token = await createNewToken(author);

  return {
    token,
    author,
  };
}

export async function updateAuthor(
  parent,
  { author_id, first_name, last_name, email, role, username },
  { prisma, author },
  info
) {
  if (!author || author?.role !== "ADMIN") throw new Error("Unauthorized");
  if (!author_id) throw new Error("ID is required");
  if (
    first_name === undefined &&
    last_name === undefined &&
    email === undefined &&
    role === undefined &&
    username === undefined
  )
    throw new Error("At least one field must be provided for update");

  return await prisma.author
    .update({
      where: {
        author_id: parseInt(author_id, 10),
      },
      data: {
        first_name: first_name ? first_name : undefined,
        last_name: last_name ? last_name : undefined,
        email: email ? email : undefined,
        role: role ? role : undefined,
        username: username ? username : undefined,
      },
      omit: omitFields(author),
    })
    .catch((error) => {
      throw new Error(`Error updating author: ${error.message}`);
    });
}

export async function updatePost(
  parent,
  { post_id, title, content, categories, published },
  { prisma, author },
  info
) {
  if (!author || author?.role !== "ADMIN") throw new Error("Unauthorized");
  if (!post_id) throw new Error("ID is required");
  if (
    title === undefined &&
    content === undefined &&
    (categories === undefined || categories?.length === 0) &&
    published === undefined
  )
    throw new Error("At least one field must be provided for update");

  return await prisma.post
    .update({
      where: {
        post_id: parseInt(post_id, 10),
      },
      data: {
        title: title ? title : undefined,
        content: content ? content : undefined,
        categories: categories?.length > 0 ? categories : undefined,
        published: published !== undefined ? published : undefined,
      },
      include: {
        author: {
          omit: omitFields(author),
        },
      },
    })
    .catch((error) => {
      throw new Error(`Error updating post: ${error.message}`);
    });
}
