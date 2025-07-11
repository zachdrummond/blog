// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-near-black white tc pa3 mt5">
      © {new Date().getFullYear()} My Blog. All rights reserved.
    </footer>
  );
}