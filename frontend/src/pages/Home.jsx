import HeroCarousel from "../components/carousel/HeroCarousel.jsx";

const slides = [
  {
    id: "electronics",
    eyebrow: "New arrivals",
    title: "Electronics that keep up",
    description: "Laptops, monitors, and accessories built for daily work.",
    cta: "Shop Electronics",
    href: "/products?category=electronics",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1600",
  },
  {
    id: "clothing",
    eyebrow: "This season",
    title: "Everyday clothing, done well",
    description: "Considered basics for men and women.",
    cta: "Shop Clothing",
    href: "/products?category=clothing",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600",
  },
  {
    id: "fitness",
    eyebrow: "Get moving",
    title: "Fitness gear for home",
    description: "Dumbbells, mats, and bands for a routine that sticks.",
    cta: "Shop Fitness",
    href: "/products?category=sports-outdoors",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600",
  },
  {
    id: "home-kitchen",
    eyebrow: "Upgrade your space",
    title: "Home & kitchen essentials",
    description: "Appliances and furniture that earn their counter space.",
    cta: "Shop Home & Kitchen",
    href: "/products?category=home-kitchen",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1600",
  },
];

const categoryStrip = ["Electronics", "Clothing", "Books", "Sports & Outdoors", "Beauty & Personal Care", "Home & Kitchen"];

export default function Home() {
  return (
    <>
      <HeroCarousel slides={slides} />

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-wrap gap-3">
          {categoryStrip.map((c) => (
            <span
              key={c}
              className="rounded-full border border-line px-4 py-1.5 text-sm text-ink/80 transition-colors hover:border-accent hover:text-accent"
            >
              {c}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <h3 className="eyebrow mb-4">Featured</h3>
        <p className="text-muted">Product grid connects here once the Products API is wired up in the next iteration.</p>
      </section>
    </>
  );
}