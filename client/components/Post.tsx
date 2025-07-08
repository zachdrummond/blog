export const Post = ({ post }: { post: Post }) => {
  return (
    <div>
      <div>Date: {post.date_updated}</div>
      <div>Title: {post.title}</div>
      <div>Published: {post.published}</div>
      <div>Content: {post.content}</div>
      <div>Categories: {post.categories}</div>
    </div>
  );
};
