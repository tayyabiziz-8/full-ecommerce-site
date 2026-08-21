import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../../hooks/useAuth.js";
import { useCart } from "../../hooks/useCart.js";

const links = [
  { label: "Shop", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "Wishlist", href: "/wishlist" },
];

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
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
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative text-sm text-ink/80 hover:text-accent">
            Cart
            {itemCount > 0 && (
              <span className="absolute -right-3 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-paper">
                {itemCount}
              </span>
            )}
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="text-sm font-medium text-ink/90 hover:text-accent">
                {user.firstName}
              </Link>
              <button
                onClick={handleLogout}
                className="rounded border border-ink px-4 py-1.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded border border-ink px-4 py-1.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}