import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { ProductRail } from "@/components/product-rail";
import {
  campaign,
  categories,
  departments,
  featuredCollection,
  newArrivals,
  repairs,
} from "@/lib/catalog";

// Darkens the edge of a photo so white text over it keeps its contrast.
function Scrim({ edge }: { edge: "top" | "bottom" }) {
  return (
    <div
      aria-hidden="true"
      className={
        edge === "top"
          ? "absolute inset-x-0 top-0 h-1/3 bg-linear-to-b from-scrim to-transparent"
          : "absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-scrim to-transparent"
      }
    />
  );
}

const services = [
  {
    title: "Delivery and returns",
    body: "Free delivery in 2–4 working days. Return anything unworn within 30 days.",
    href: "/services/delivery",
    action: "Delivery details",
  },
  {
    title: "Alterations",
    body: "Sleeves and hems on full-price tailoring are adjusted free, in store or by post.",
    href: "/services/alterations",
    action: "About alterations",
  },
  {
    title: "Appointments",
    body: "See the collection with a stylist in store, or by video call from home.",
    href: "/services/appointments",
    action: "Book an appointment",
  },
  {
    title: "Gifting",
    body: "Orders ship in a recycled-card box. Add a handwritten note at checkout.",
    href: "/services/gifting",
    action: "About gifting",
  },
];

export default function Home() {
  return (
    <main id="main" className="flex-1">
      {/* Campaign. Sits under the transparent header (see HeaderShell). */}
      <section
        aria-labelledby="campaign-title"
        className="theme-dark relative -mt-header h-svh min-h-[36rem] overflow-hidden bg-black"
      >
        <Image
          src={campaign.image.src}
          alt={campaign.image.alt}
          fill
          preload
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: campaign.image.focus }}
        />
        <Scrim edge="top" />
        <Scrim edge="bottom" />
        <div className="page-container absolute inset-x-0 bottom-0 flex flex-col items-center pb-12 text-center lg:pb-16">
          <p className="type-label">{campaign.season}</p>
          <h1 id="campaign-title" className="type-headline mt-3">
            {campaign.title}
          </h1>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/women" className="btn btn-primary">
              Shop women
            </Link>
            <Link href="/men" className="btn btn-secondary">
              Shop men
            </Link>
          </div>
        </div>
      </section>

      {/* Departments: two editorial images, edge to edge. */}
      <section aria-label="Departments" className="grid gap-px md:grid-cols-2">
        {departments.map((department) => (
          <Link
            key={department.slug}
            href={`/${department.slug}`}
            className="group media-frame theme-dark block aspect-editorial"
          >
            <Image
              src={department.image.src}
              alt={department.image.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="transition-transform duration-800 group-hover:scale-[1.02]"
              style={{ objectPosition: department.image.focus }}
            />
            <Scrim edge="bottom" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 p-8 text-center lg:p-12">
              <h2 className="type-headline">{department.title}</h2>
              <span className="type-label underline underline-offset-[0.35em]">Shop the collection</span>
            </div>
          </Link>
        ))}
      </section>

      <ProductRail title="New arrivals" href="/new-arrivals">
        {newArrivals.map((product) => (
          <li key={product.slug}>
            <ProductCard product={product} sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 72vw" />
          </li>
        ))}
      </ProductRail>

      {/* Featured collection: the campaign image holds half the grid, and
          the pieces it shows fill the rest. */}
      <section
        aria-labelledby="collection-title"
        className="product-grid md:grid-cols-2 lg:grid-cols-4"
      >
        <Link
          href={`/collections/${featuredCollection.slug}`}
          className="group media-frame theme-dark col-span-2 block aspect-editorial lg:row-span-2 lg:aspect-auto"
        >
          <Image
            src={featuredCollection.image.src}
            alt={featuredCollection.image.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="transition-transform duration-800 group-hover:scale-[1.02]"
            style={{ objectPosition: featuredCollection.image.focus }}
          />
          <Scrim edge="bottom" />
          <div className="absolute inset-x-0 bottom-0 p-gutter pb-10 lg:pb-12">
            <p className="type-label">{featuredCollection.season}</p>
            <h2 id="collection-title" className="type-headline mt-3">
              {featuredCollection.title}
            </h2>
            <p className="type-body-sm mt-3 max-w-sm">{featuredCollection.description}</p>
            <span className="type-label mt-6 inline-block underline underline-offset-[0.35em]">
              Discover the collection
            </span>
          </div>
        </Link>
        {featuredCollection.products.map((product) => (
          <ProductCard
            key={product.slug}
            product={product}
            inset
            sizes="(min-width: 1024px) 25vw, 50vw"
          />
        ))}
      </section>

      <section aria-labelledby="categories-title" className="page-container py-section">
        <h2 id="categories-title" className="type-headline mb-6 lg:mb-8">
          Shop by category
        </h2>
        <ul className="layout-grid gap-y-8">
          {categories.map((category) => (
            <li key={category.slug} className="col-span-6 lg:col-span-3">
              <Link href={`/${category.slug}`} className="group block">
                <div className="media-frame aspect-product">
                  <Image
                    src={category.image.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="transition-transform duration-800 group-hover:scale-[1.02]"
                    style={{ objectPosition: category.image.focus }}
                  />
                </div>
                <p className="type-label mt-3 underline decoration-transparent underline-offset-[0.35em] transition-[text-decoration-color] group-hover:decoration-current">
                  {category.title}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Repairs: the house promise, set apart on black. */}
      <section aria-labelledby="repairs-title" className="theme-dark bg-background">
        <div className="page-container layout-grid items-center gap-y-10 py-section">
          <div className="media-frame col-span-12 aspect-editorial md:col-span-6 lg:col-span-6">
            <Image
              src={repairs.image.src}
              alt={repairs.image.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              style={{ objectPosition: repairs.image.focus }}
            />
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4 lg:col-start-8">
            <p className="type-label text-muted">Repairs for life</p>
            <h2 id="repairs-title" className="type-display mt-4">
              Made to be mended
            </h2>
            <p className="type-body mt-6 max-w-measure text-muted">
              Send any Atelier piece back to us, whatever its age. Our workshop re-stitches seams,
              replaces linings and re-soles shoes free of charge, for as long as you own it.
            </p>
            <Link href="/services/repairs" className="btn btn-secondary mt-8">
              How repairs work
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="services-title" className="page-container py-section">
        <h2 id="services-title" className="type-headline mb-6 lg:mb-8">
          Services
        </h2>
        <ul className="layout-grid gap-y-10">
          {services.map((service) => (
            <li key={service.title} className="col-span-12 border-t pt-6 md:col-span-6 lg:col-span-3">
              <h3 className="type-label">{service.title}</h3>
              <p className="type-body-sm mt-3 max-w-xs text-muted">{service.body}</p>
              <Link href={service.href} className="link type-caption mt-4 inline-block">
                {service.action}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
