"use client"
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
  console.debug("TEST", data.getPosts.items);
  // const feedToRender: Post[] = [
  //   {
  //     post_id: 1,
  //     title: "Test",
  //     author_id: 5,
  //     author: {
  //       author_id: 5,
  //       date_created: "June 25, 2025 4:27 AM",
  //       date_updated: "June 25, 2025 4:27 AM",
  //       username: "zachdrummond",
  //     },
  //     categories: ["bob"],
  //     content: "test",
  //     date_created: "June 25, 2025 5:03 AM",
  //     date_updated: "June 25, 2025 5:03 AM",
  //     likes: 2,
  //     published: false,
  //     shares: 0,
  //     views: 1,
  //   },
  //   {
  //     post_id: 2,
  //     title: "New Post",
  //     author_id: 5,
  //     categories: ["new"],
  //     content: "New Content",
  //     date_created: "July 8, 2025 11:30 AM",
  //     date_updated: "July 8, 2025 11:30 AM",
  //     likes: 0,
  //     published: true,
  //     shares: 0,
  //     views: 0,
  //     author: {
  //       author_id: 5,
  //       date_created: "June 25, 2025 4:27 AM",
  //       date_updated: "June 25, 2025 4:27 AM",
  //       username: "zachdrummond",
  //     },
  //   },
  // ];

  return (
    <div>
      <h1>HELLO WORLD!</h1>
      {data.getPosts.items.map((post) => (
        <>
          <Post key={post.post_id} post={post} />
          <hr />
        </>
      ))}
    </div>
  );
};
