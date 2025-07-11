import type { Metadata } from "next";
import { ApolloWrapper } from "./ApolloWrapper";
import "./globals.css";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Zach Drummond's Blog",
  description: "A personal blog.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/tachyons@4.12.0/css/tachyons.min.css"
        />
      </head>
      <body className="center w85">
        <ApolloWrapper>
          <Header />
          <main className="ph3 pv1 background-gray">{children}</main>
          <Footer />
        </ApolloWrapper>
      </body>
    </html>
  );
}
