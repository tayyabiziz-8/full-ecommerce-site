import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../../hooks/useAuth.js";

const links = [
  { label: "Shop", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Cart", href: "/cart" },
];

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("Signed out");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="font-display text-lg font-semibold tracking-tight">
          Shopped
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
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <Link to="/profile" className="text-sm font-medium text-ink/90 hover:text-accent">
              {user.firstName}
            </Link>
            <button
              onClick={handleLogout}
              className="rounded border border-ink px-4 py-1.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              Sign out
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="rounded border border-ink px-4 py-1.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
          >
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
}