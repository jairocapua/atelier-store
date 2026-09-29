"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "./icons";

type ProductRailProps = {
  title: string;
  /** Where "View all" goes. */
  href: string;
  /** One <li> per product. */
  children: ReactNode;
};

// A titled row of products that scrolls sideways. Touch and trackpad users
// swipe; the arrows page through for everyone else.
export function ProductRail({ title, href, children }: ProductRailProps) {
  const list = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const el = list.current;
    if (!el) return;
    const update = () =>
      setEdges({
        start: el.scrollLeft <= 1,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1,
      });
    update();
    el.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  function page(direction: 1 | -1) {
    const el = list.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direction * el.clientWidth, behavior: reduce ? "auto" : "smooth" });
  }

  const headingId = `${title.toLowerCase().replaceAll(" ", "-")}-title`;

  return (
    <section aria-labelledby={headingId} className="page-container py-section">
      <div className="mb-6 flex items-end justify-between gap-4 lg:mb-8">
        <h2 id={headingId} className="type-headline">
          {title}
        </h2>
        <div className="flex items-center gap-2">
          <Link href={href} className="link type-label mr-2">
            View all
          </Link>
          <div className="hidden gap-2 md:flex">
            <button
              type="button"
              className="btn-icon border border-line-strong"
              aria-label="Previous products"
              disabled={edges.start}
              onClick={() => page(-1)}
            >
              <ArrowLeftIcon />
            </button>
            <button
              type="button"
              className="btn-icon border border-line-strong"
              aria-label="Next products"
              disabled={edges.end}
              onClick={() => page(1)}
            >
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div>
      <ul
        ref={list}
        className="scroll-row bleed *:w-[72%] md:*:w-[calc((100%-2rem)/3)] lg:*:w-[calc((100%-3rem)/4)]"
      >
        {children}
      </ul>
    </section>
  );
}
