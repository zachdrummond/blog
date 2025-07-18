"use client";
import Post from "./Post";
import { useQuery, gql } from "@apollo/client";

export const GET_POSTS_QUERY = gql`
  query GetPostsQuery(
    $post_ids: [ID!]
    $author_ids: [ID!]
    $titles: [String!]
    $categories: [String!]
    $published: Boolean
    $skip: Int
    $take: Int
    $order_by: PostOrderBy
  ) {
    getPosts(
      post_ids: $post_ids
      author_ids: $author_ids
      titles: $titles
      categories: $categories
      published: $published
      skip: $skip
      take: $take
      order_by: $order_by
    ) {
      total
      items {
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
        post_id
        published
        shares
        title
        views
      }
    }
  }
`;

export default function Feed() {
  const { data } = useQuery(GET_POSTS_QUERY);

  return (
    <>
      {data?.getPosts?.items?.map((post: Post, index: number) => (
        <div key={post.post_id}>
          <Post index={index} post={post} />
        </div>
      ))}
    </>
  );
}
