import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Disclosure } from "@/components/disclosure";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { ProductPurchase } from "@/components/product-purchase";
import { ProductRail } from "@/components/product-rail";
import {
  featuredCollection,
  formatPrice,
  getCategory,
  getProduct,
  isOneSize,
  products,
  relatedProducts,
  stockState,
  totalStock,
  type StockState,
} from "@/lib/catalog";

// The catalogue is a fixed list, so every product page is built ahead of time
// and unknown slugs 404. Revisit both once products come from the database.
export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.images[0].src, alt: product.images[0].alt }],
    },
  };
}

const availability: Record<StockState, string> = {
  "in-stock": "https://schema.org/InStock",
  "low-stock": "https://schema.org/LimitedAvailability",
  "sold-out": "https://schema.org/OutOfStock",
};

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const inCollection = featuredCollection.products.includes(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((image) => image.src),
    brand: { "@type": "Brand", name: "Atelier" },
    category: category.title,
    color: product.colour,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: availability[stockState(totalStock(product))],
    },
  };

  return (
    <main id="main" className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <article className="lg:grid lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* The details stay in view while the gallery scrolls past. */}
        <div className="px-gutter pt-8 lg:col-span-5 lg:pt-12 xl:pl-16">
          <div className="max-w-panel lg:sticky lg:top-[calc(var(--spacing-header)+3rem)]">
            <Link href={`/${category.slug}`} className="link-nav type-label text-muted">
              {category.title}
            </Link>
            <h1 className="type-title mt-3">{product.name}</h1>
            <p className="type-body mt-1">{formatPrice(product.price)}</p>
            <p className="type-caption mt-4 text-muted">Colour: {product.colour}</p>

            <ProductPurchase
              slug={product.slug}
              variants={product.variants}
              oneSize={isOneSize(product)}
            />

            <ul className="type-caption mt-2 grid gap-1 text-muted">
              <li>Free delivery in 2–4 working days</li>
              <li>Free returns within 30 days</li>
              <li>
                Repairs for life.{" "}
                <Link href="/services/repairs" className="link">
                  How repairs work
                </Link>
              </li>
            </ul>

            <div className="mt-10 mb-section">
              <Disclosure title="Description" defaultOpen>
                <p>{product.description}</p>
                {inCollection && (
                  <p className="mt-3">
                    Part of{" "}
                    <Link href={`/collections/${featuredCollection.slug}`} className="link text-foreground">
                      {featuredCollection.title}
                    </Link>
                    .
                  </p>
                )}
              </Disclosure>
              <Disclosure title="Details and care">
                <ul className="grid gap-1">
                  {product.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </Disclosure>
              <Disclosure title="Delivery and returns">
                <p>
                  Orders ship within one working day and arrive in 2–4 working days, free of charge.
                  Return anything unworn, with its tags, within 30 days for a full refund.
                </p>
                <Link href="/services/returns" className="link mt-3 inline-block text-foreground">
                  Returns policy
                </Link>
              </Disclosure>
            </div>
          </div>
        </div>
      </article>

      <ProductRail title="You may also like" href={`/${category.slug}`}>
        {relatedProducts(product).map((related) => (
          <li key={related.slug}>
            <ProductCard
              product={related}
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 72vw"
            />
          </li>
        ))}
      </ProductRail>
    </main>
  );
}
