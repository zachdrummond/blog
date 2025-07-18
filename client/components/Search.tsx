"use client";

import { useState } from "react";
import Post from "@/components/Post";
import { GET_POSTS_QUERY } from "./Feed";
import { useLazyQuery } from "@apollo/client";

export default function Search() {
  const [searchFilter, setSearchFilter] = useState("");
  const [executeSearch, { data }] = useLazyQuery(GET_POSTS_QUERY);

  return (
    <>
      <div>
        Search
        <input type="text" onChange={(e) => setSearchFilter(e.target.value)} />
        <button
          onClick={() => executeSearch({ variables: { titles: searchFilter } })}
        >
          OK
        </button>
      </div>
      {data?.getPosts?.items?.map((post: Post, index: number) => (
        <Post key={post.post_id} index={index} post={post} />
      ))}
    </>
  );
}
