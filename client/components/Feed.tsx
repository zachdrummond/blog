"use client";
import { Post } from "./Post";
import { useQuery, gql } from "@apollo/client";

export const GET_POSTS_QUERY = gql`
  {
    getPosts {
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

export const Feed = () => {
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
};
