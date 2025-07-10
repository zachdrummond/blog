import { Feed } from "@/components/Feed";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Feed />
      </div>

      <div className="center w85">
        <Header />
        <div className="ph3 pv1 background-gray">
          <Routes>
            <Route path="/" element={<LinkList />} />
            <Route path="/create" element={<CreateLink />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
