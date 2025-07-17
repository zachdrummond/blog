import { gql, useMutation } from "@apollo/client";
import { GET_POSTS_QUERY } from "./Feed";

const INCREMENT_POST_MUTATION = gql`
  mutation IncrementPostMutation($post_id: ID!, $type: IncrementType!) {
    incrementPost(post_id: $post_id, type: $type) {
      author {
        author_id
        date_created
        date_updated
        username
      }
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

export const Post = ({ index, post }: { index: number; post: Post }) => {
  const [incrementPost] = useMutation(INCREMENT_POST_MUTATION, {
    variables: {
      post_id: post.post_id,
    },
    update: (cache, { data: { incrementPost } }) => {
      const { getPosts } = cache.readQuery({
        query: GET_POSTS_QUERY,
      });

      const updatedPosts = getPosts.items.map((feedPost) => {
        if (feedPost.post_id === post.post_id) {
          return {
            ...feedPost,
            likes: incrementPost.likes,
            shares: incrementPost.shares,
            views: incrementPost.views,
          };
        }
        return feedPost;
      });

      cache.writeQuery({
        query: GET_POSTS_QUERY,
        data: {
          getPosts: {
            ...getPosts,
            items: updatedPosts,
          },
        },
      });
    },
  });

  const handleIncrement = (type: IncrementType) => {
    incrementPost({
      variables: {
        post_id: post.post_id,
        type,
      },
    });
  };

  return (
    <div key={post.post_id}>
      <div className="flex mt2 items-start">
        <div className="flex items-center">
          <span className="gray">{index + 1}.</span>
          <button
            className="ml1 gray f11"
            style={{ cursor: "pointer" }}
            onClick={() => handleIncrement("LIKE")}
            aria-label="Like post"
          >
            👍
          </button>
          <button
            className="ml1 gray f11"
            style={{ cursor: "pointer" }}
            onClick={() => handleIncrement("SHARE")}
            aria-label="Share post"
          >
            🔗
          </button>
        </div>
        <div className="ml1">
          <div>Title: {post.title}</div>
          {
            <div className="f6 lh-copy gray">
              {post.likes} likes | {post.views} views | {post.shares} shares |
              by {post.author ? post.author.username : "Unknown"} |{" "}
              {post.date_updated}
            </div>
          }
        </div>
      </div>
    </div>
  );
};
