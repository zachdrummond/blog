import Link from "next/link";

export const Header = () => {
  return (
    <header className="flex pal justify-between nowrap orange">
      <div className="flex flex-fixed black">
        <Link href="/" className="no-underline black">
          <div className="fw7 mr1">Zach Drummond's Blog</div>
        </Link>
        <Link href="/" className="ml1 no-underline black">
          new
        </Link>
        <div className="ml1">|</div>
        <Link href="/posts/create" className="ml1 no-underline black">
          submit
        </Link>
      </div>
    </header>
  );
};
