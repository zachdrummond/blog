"use client";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GET_POSTS_QUERY } from "./Feed";

const CREATE_POST_MUTATION = gql`
  mutation CreatePostMutation(
    $title: String!
    $content: String!
    $categories: [String!]!
    $published: Boolean
  ) {
    addPost(
      title: $title
      content: $content
      categories: $categories
      published: $published
    ) {
      post_id
      author_id
      categories
      content
      date_created
      date_updated
      likes
      published
      shares
      title
      views
    }
  }
`;

export const CreatePost = () => {
  const [formState, setFormState] = useState({
    title: "",
    content: "",
    categories: [],
    published: false,
  });
  const router = useRouter();

  const [createPost] = useMutation(CREATE_POST_MUTATION, {
    variables: {
      title: formState.title,
      content: formState.content,
      categories: formState.categories,
      published: formState.published,
    },
    update: (cache, { data: { createPost } }) => {
      // Read existing posts from cache
      const existingData = cache.readQuery({
        query: GET_POSTS_QUERY,
      });

      // If there's no existing data, don't try to update
      if (!existingData?.getPosts) return;

      cache.writeQuery({
        query: GET_POSTS_QUERY,
        data: {
          getPosts: {
            ...existingData.getPosts,
            items: [createPost, ...existingData.getPosts.items],
            total: existingData.getPosts.total + 1,
          },
        },
      });
    },
    onCompleted: () => router.push("/"),
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost();
        }}
      >
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={formState.title}
            onChange={(e) =>
              setFormState({ ...formState, title: e.target.value })
            }
            type="text"
            placeholder="The title for this blog post."
          />
          <input
            className="mb2"
            value={formState.content}
            onChange={(e) =>
              setFormState({ ...formState, content: e.target.value })
            }
            type="text"
            placeholder="The content for this blog post."
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
