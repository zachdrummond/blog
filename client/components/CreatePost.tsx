"use client";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

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

  const [createPost] = useMutation(CREATE_POST_MUTATION, {
    variables: {
      title: formState.title,
      content: formState.content,
      categories: formState.categories,
      published: formState.published,
    },
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
