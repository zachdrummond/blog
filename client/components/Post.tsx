export const Post = ({ index, post }: { index: number; post: Post }) => {
  return (
    <div key={post.post_id}>
      <div className="flex mt2 items-start">
        <div className="flex items-center">
          <span className="gray">{index + 1}.</span>
          <div
            className="ml1 gray f11"
            style={{ cursor: "pointer" }}
            onClick={() => console.log("Clicked vote button")}
          >
            ▲
          </div>
        </div>
        <div className="ml1">
          <div>Title: {post.title}</div>
          {
            <div className="f6 lh-copy gray">
              {post.likes} likes | {post.views} views | {post.shares} shares |
              by {post.author ? post.author.username : "Unknown"} | {post.date_updated}
            </div>
          }
        </div>
      </div>
    </div>
  );
};
