import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../../hooks/useAuth.js";
import { useCart } from "../../hooks/useCart.js";
import { resolveMediaUrl } from "../../utils/media.js";

const links = [
  { label: "Shop", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "Wishlist", href: "/wishlist" },
];

function Avatar({ user, size = "h-8 w-8" }) {
  const src = resolveMediaUrl(user.profilePicture);
  return (
    <span
      className={`flex ${size} shrink-0 items-center justify-center overflow-hidden rounded-full border border-line bg-line/40 font-display text-xs text-muted`}
    >
      {src ? (
        <img src={src} alt="" className="h-full w-full object-cover" />
      ) : (
        user.firstName?.[0]
      )}
    </span>
  );
}

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    setMenuOpen(false);
    await logout();
    toast.success("Signed out");
    navigate("/");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="font-display text-lg font-semibold tracking-tight">
          Shopped
        </Link>

        <nav className="hidden gap-8 md:flex">
          {links.map((link) => (
            <Link key={link.href} to={link.href} className="text-sm text-ink/80 transition-colors hover:text-accent">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
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
              <Link
                to="/profile"
                className="flex items-center gap-2 text-sm font-medium text-ink/90 hover:text-accent"
              >
                <Avatar user={user} />
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

        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="flex h-9 w-9 items-center justify-center rounded border border-line md:hidden"
        >
          <span className="relative block h-3.5 w-4">
            <span
              className={`absolute left-0 top-0 h-[1.5px] w-full bg-ink transition-transform ${
                menuOpen ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-ink transition-opacity ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-[1.5px] w-full bg-ink transition-transform ${
                menuOpen ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-line px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {links.map((link) => (
              <Link key={link.href} to={link.href} onClick={closeMenu} className="text-sm text-ink/80">
                {link.label}
              </Link>
            ))}
            <Link to="/cart" onClick={closeMenu} className="text-sm text-ink/80">
              Cart {itemCount > 0 && `(${itemCount})`}
            </Link>
          </nav>
          <div className="mt-4 border-t border-line pt-4">
            {isAuthenticated ? (
              <div className="flex flex-col gap-3">
                <Link to="/profile" onClick={closeMenu} className="flex items-center gap-2 text-sm font-medium text-ink/90">
                  <Avatar user={user} />
                  {user.firstName}
                </Link>
                <button onClick={handleLogout} className="w-fit text-sm text-ink/80 hover:text-accent">
                  Sign out
                </button>
              </div>
            ) : (
              <Link to="/login" onClick={closeMenu} className="text-sm font-medium text-accent">
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}