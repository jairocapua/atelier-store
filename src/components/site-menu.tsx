"use client";

import Link from "next/link";
import { useRef, type MouseEvent } from "react";
import { CloseIcon } from "./icons";

const shopLinks = [
  { href: "/new-arrivals", label: "New arrivals" },
  { href: "/women", label: "Women" },
  { href: "/men", label: "Men" },
  { href: "/bags", label: "Bags" },
  { href: "/shoes", label: "Shoes" },
  { href: "/knitwear", label: "Knitwear" },
  { href: "/outerwear", label: "Outerwear" },
];

const serviceLinks = [
  { href: "/services/repairs", label: "Repairs" },
  { href: "/services/appointments", label: "Book an appointment" },
  { href: "/stores", label: "Find a store" },
  { href: "/account", label: "Sign in" },
];

// The header's menu trigger opens this with popovertarget. It closes itself
// after a link is followed, because client navigation keeps the layout (and
// an open popover) mounted.
export function SiteMenu() {
  const menu = useRef<HTMLDivElement>(null);

  function closeOnNavigate(event: MouseEvent) {
    if ((event.target as HTMLElement).closest("a")) menu.current?.hidePopover();
  }

  return (
    <div ref={menu} id="site-menu" popover="auto" className="drawer" onClick={closeOnNavigate}>
      <div className="flex h-header items-center px-gutter">
        <button
          type="button"
          popoverTarget="site-menu"
          popoverTargetAction="hide"
          className="btn-icon -ml-3"
          aria-label="Close menu"
        >
          <CloseIcon />
        </button>
      </div>
      <nav aria-label="Main" className="px-gutter pt-6 pb-12">
        <ul className="grid gap-4">
          {shopLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="link-nav type-headline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="mt-12 grid gap-3 border-t pt-8">
          {serviceLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="link-nav type-body-sm">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
