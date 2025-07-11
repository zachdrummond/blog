"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AUTH_TOKEN } from "shared/constants";

export const Header = () => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const router = useRouter();

  return (
    <div className="flex pa1 justify-between nowrap orange">
      <div className="flex flex-fixed black">
        <Link href="/" className="no-underline black">
          <div className="fw7 mr1">Zach Drummond's Blog</div>
        </Link>
        <Link href="/" className="ml1 no-underline black">
          new
        </Link>
        <div className="ml1">|</div>
        <Link href="/search" className="ml1 no-underline black">
          search
        </Link>
        {authToken && (
          <div className="flex">
            <div className="ml1">|</div>
            <Link href="/posts/create" className="ml1 no-underline black">
              submit
            </Link>
          </div>
        )}
      </div>
      <div className="flex flex-fixed">
        {authToken ? (
          <div
            className="ml1 pointer black"
            onClick={() => {
              localStorage.removeItem(AUTH_TOKEN);
              router.push(`/`);
            }}
          >
            logout
          </div>
        ) : (
          <Link href="/admin/login" className="ml1 no-underline black">
            login
          </Link>
        )}
      </div>
    </div>
  );
};
