import { useState } from "react";

export const CreatePost = () => {
  const [formState, setFormState] = useState({
    title: "",
    content: "",
    categories: [],
    published: false,
  });

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
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
