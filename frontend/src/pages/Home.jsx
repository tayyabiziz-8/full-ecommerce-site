import { useQuery } from "@tanstack/react-query";
import HeroCarousel from "../components/carousel/HeroCarousel.jsx";
import ProductCard from "../components/product/ProductCard.jsx";
import { getProductsRequest } from "../api/product.api.js";
import { getCategoriesRequest } from "../api/category.api.js";

const slides = [
  { id: "electronics", eyebrow: "New arrivals", title: "Electronics that keep up", description: "Laptops, monitors, and accessories built for daily work.", cta: "Shop Electronics", href: "/products?category=electronics", image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1600" },
  { id: "clothing", eyebrow: "This season", title: "Everyday clothing, done well", description: "Considered basics for men and women.", cta: "Shop Clothing", href: "/products?category=clothing", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600" },
  { id: "fitness", eyebrow: "Get moving", title: "Fitness gear for home", description: "Dumbbells, mats, and bands for a routine that sticks.", cta: "Shop Fitness", href: "/products?category=sports-outdoors", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600" },
  { id: "home-kitchen", eyebrow: "Upgrade your space", title: "Home & kitchen essentials", description: "Appliances and furniture that earn their counter space.", cta: "Shop Home & Kitchen", href: "/products?category=home-kitchen", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600" },
];

export default function Home() {
  const { data: categories = [] } = useQuery({ queryKey: ["categories"], queryFn: getCategoriesRequest });
  const { data: featured } = useQuery({
    queryKey: ["products", { limit: 8, page: 1 }],
    queryFn: () => getProductsRequest({ limit: 8, page: 1 }),
  });

  const topLevelCategories = categories.filter((c) => c.parentId === null);

  return (
    <>
      <HeroCarousel slides={slides} />

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-wrap gap-3">
          {topLevelCategories.map((c) => (
            <a
              key={c.id}
              href={`/products?category=${c.slug}`}
              className="rounded-full border border-line px-4 py-1.5 text-sm text-ink/80 transition-colors hover:border-accent hover:text-accent"
            >
              {c.name}
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <h3 className="eyebrow mb-4">Featured</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featured?.products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}