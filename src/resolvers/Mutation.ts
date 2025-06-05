import { hash, verify } from "@node-rs/argon2";
import { SignJWT } from "jose";
import { APP_SECRET } from "../utils.js";

export async function addPost(
  parent,
  { title, content, categories, published },
  { prisma, authorID },
  info
) {
  if (!title || !content || !categories)
    throw new Error("Missing required fields");

  const newPost = await prisma.post.create({
    data: {
      author: {
        connect: { id: authorID },
      },
      categories,
      content,
      title,
      published,
    },
  });

  return newPost;
}

const createNewToken = async (author) => {
  return new SignJWT({ authorID: author.id, role: author.role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(APP_SECRET));
};

export async function deletePost(parent, { id, title }, { prisma }, info) {
  if (!id && !title) throw new Error("Either ID or title must be provided");

  return await prisma.post
    .delete({
      where: {
        id: id ? parseInt(id, 10) : undefined,
        title: title ? title : undefined,
      },
    })
    .catch((error) => {
      throw new Error(`Error deleting post: ${error.message}`);
    });
}

export async function login(parent, { email, password }, { prisma }, info) {
  const author = await prisma.author.findUnique({ where: { email: email } });
  if (!author) throw new Error("author not found");

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
  const author = await prisma.author.create({ data: { ...args, password } });
  const token = await createNewToken(author);

  console.log("Password", password, "author", author, "Token", token);
  return {
    token,
    author,
  };
}

export async function updatePost(
  parent,
  { id, title, content, categories, published },
  { prisma },
  info
) {
  if (!id) throw new Error("ID is required");
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
        id: parseInt(id, 10),
      },
      data: {
        title: title ? title : undefined,
        content: content ? content : undefined,
        categories: categories?.length > 0 ? categories : undefined,
        published: published !== undefined ? published : undefined,
      },
    })
    .catch((error) => {
      throw new Error(`Error updating post: ${error.message}`);
    });
}
