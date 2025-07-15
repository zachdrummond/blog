"use client";
import { Post } from "./Post";
import { useQuery, gql } from "@apollo/client";

const GET_POSTS_QUERY = gql`
  {
    getPosts {
      total
      items {
        post_id
        title
        author_id
        categories
        content
        date_created
        date_updated
        likes
        published
        shares
        views
        author {
          author_id
          date_created
          date_updated
          username
        }
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
          <hr />
        </div>
      ))}
    </>
  );
};
