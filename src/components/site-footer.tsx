import Link from "next/link";
import { NewsletterForm } from "./newsletter-form";

const columns = [
  {
    title: "Client services",
    links: [
      { href: "/services/contact", label: "Contact us" },
      { href: "/services/delivery", label: "Delivery" },
      { href: "/services/returns", label: "Returns" },
      { href: "/services/repairs", label: "Repairs" },
      { href: "/services/appointments", label: "Book an appointment" },
    ],
  },
  {
    title: "The house",
    links: [
      { href: "/about", label: "About Atelier" },
      { href: "/stores", label: "Stores" },
      { href: "/materials", label: "Materials" },
      { href: "/careers", label: "Careers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/privacy", label: "Privacy" },
      { href: "/legal/terms", label: "Terms of sale" },
      { href: "/legal/accessibility", label: "Accessibility" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="theme-dark bg-background">
      <div className="page-container layout-grid gap-y-12 pt-section">
        <section aria-labelledby="newsletter-title" className="col-span-12 lg:col-span-5">
          <h2 id="newsletter-title" className="type-headline">
            Sign up for updates
          </h2>
          <p className="type-body-sm mt-3 max-w-measure text-muted">
            New collections, repair days and store openings. One email a month at most.
          </p>
          <NewsletterForm />
        </section>

        {columns.map((column, index) => (
          <nav
            key={column.title}
            aria-label={column.title}
            className={`col-span-6 md:col-span-4 lg:col-span-2 ${index === 0 ? "lg:col-start-7" : ""}`}
          >
            <h2 className="type-label">{column.title}</h2>
            <ul className="mt-4 grid gap-2">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="link-nav type-caption text-muted hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="page-container mt-section overflow-hidden">
        <p aria-hidden="true" className="wordmark-full text-center font-display leading-[0.8] uppercase">
          Atelier
        </p>
      </div>

      <div className="page-container mt-6">
        <div className="flex flex-wrap justify-between gap-2 border-t py-6 type-caption text-muted">
          <p>© 2026 Atelier</p>
          <p>United States · USD</p>
        </div>
      </div>
    </footer>
  );
}
