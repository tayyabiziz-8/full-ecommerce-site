import { Link } from "react-router-dom";

const links = [
  { label: "Shop", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Cart", href: "/cart" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="font-display text-lg font-semibold tracking-tight">
          Storefront
        </Link>
        <nav className="hidden gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm text-ink/80 transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/login"
          className="rounded border border-ink px-4 py-1.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
        >
          Sign in
        </Link>
      </div>
    </header>
  );
}