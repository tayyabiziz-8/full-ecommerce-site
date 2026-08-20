export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-muted">
        <p>© {new Date().getFullYear()} Storefront. All rights reserved.</p>
      </div>
    </footer>
  );
}