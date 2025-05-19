import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// Data
let post_list = [
  {
    id: "post-1",
    createdAt: new Date().toLocaleString(),
    updatedAt: new Date().toLocaleString(),
    title: "GraphQL 101",
    content: "Introduction to GraphQL",
    published: true,
  },
  {
    id: "post-2",
    createdAt: new Date().toLocaleString(),
    updatedAt: new Date().toLocaleString(),
    title: "Test Title",
    content: "Test Content",
    published: false,
  },
];

// GraphQL Resolvers = A collection of functions that fetch the data for the schema
// parent = Result of previous resolver execution level
const resolvers = {
  Query: {
    getAllPosts: () => {
      if (post_list.length === 0) throw new Error("No posts found.");
      return post_list;
    },
    getPosts: (parent, { ids, titles }) => {
      if (post_list.length === 0) throw new Error("No posts found.");

      if((!ids && !titles) || ids?.length === 0 || titles?.length === 0) {
        console.log("IDs:", ids, "Titles:", titles);
        throw new Error("Either ID or title must be provided.");
      }

      const input = [...ids ? ids : [], ...titles ? titles : []];
      const new_post_list = [];
      for (let i = 0; i < post_list.length; i++) {
        const post = post_list[i];
        if (input.includes(post.id) || input.includes(post.title) && !new_post_list.includes(post)) {
          new_post_list.push(post);
        }
      }
      return new_post_list;
    },
  },
  Mutation: {
    addPost: (parent, { title, content, published }) => {
      if (!title || !content)
        throw new Error("Title and content are required.");

      let current_date = new Date().toLocaleString();
      const newPost = {
        id: `post-${post_list.length + 1}`,
        createdAt: current_date,
        updatedAt: current_date,
        title,
        content,
        published: published || false,
      };

      post_list.push(newPost);
      return newPost;
    },
    deletePost: (parent, { id, title }) => {
      if (post_list.length === 0) throw new Error("No posts found.");
      if (!id && !title)
        throw new Error("Either ID or title must be provided.");

      const postIndex = post_list.findIndex(
        (post) => post.id === id || post.title === title
      );
      if (postIndex === -1)
        throw new Error(`Post with ID ${id} or title ${title} not found`);

      const deletedPost = post_list[postIndex];
      post_list.splice(postIndex, 1);
      return deletedPost;
    },
    updatePost: (parent, { id, title, content, published }) => {
      if (post_list.length === 0) throw new Error("No posts found.");
      if (!id) throw new Error("ID is required.");
      if (!title && !content && published === undefined)
        throw new Error("At least one field must be provided for update.");

      const post = post_list.find((post) => post.id === id);
      if (!post) throw new Error(`Post with ID ${id} not found.`);

      post.updatedAt = new Date().toLocaleString();
      if (title) post.title = title;
      if (content) post.content = content;
      if (published) post.published = published;
      return post;
    },
  },
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = new ApolloServer({
  typeDefs: fs.readFileSync(join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
});

// 1. Creates an Express app 2. Installs ApolloServer as middleware 3. Preps app to handle incoming requests
const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀  Server ready at ${url}`);
};

startServer().catch((err) => {
  console.error("Error starting server:", err);
});
