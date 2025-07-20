"use client";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "next/navigation";
import Post from "./Post";
import { LINKS_PER_PAGE } from "shared/constants";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const params = useParams<{ page: string }>();
  const isNewPage: boolean = params?.page ? true : false;
  const pageNumber = isNewPage ? parseInt(params.page) : 0;

  const getQueryVariables = (pageNumber: number) => {
    const skip: number = isNewPage ? (pageNumber - 1) * LINKS_PER_PAGE : 0;
    const take: number = isNewPage ? LINKS_PER_PAGE : 100;
    const orderBy = { date_created: "desc" };
    console.log(pageNumber, skip, take, orderBy);
    return { skip, take, orderBy };
  };

  const { data, loading, error } = useQuery(GET_POSTS_QUERY, {
    variables: getQueryVariables(pageNumber),
  });

  const getPostsToRender = (isNewPage, data) => {
    if (isNewPage) return data.getPosts.items;

    const rankedPosts = data.getPosts.items.slice();
    rankedPosts.sort((l1, l2) => l2.likes.length - l1.likes.length);
    return rankedPosts;
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && (
        <>
          {getPostsToRender(isNewPage, data).map((post, index) => (
            <Post key={post.post_id} index={index} post={post} />
          ))}
          {isNewPage && (
            <div className="flex ml4 mv3 gray">
              {pageNumber > 1 && (
                <div
                  className="pointer mr2"
                  onClick={() => router.push(`/new/${pageNumber - 1}`)}
                >
                  Previous
                </div>
              )}
              {pageNumber < data?.getPosts?.items.total / LINKS_PER_PAGE && (
                <div
                  className="pointer"
                  onClick={() => router.push(`/new/${pageNumber + 1}`)}
                >
                  Next
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}
