"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Photo } from "@/lib/catalog";

type ProductGalleryProps = {
  images: Photo[];
  productName: string;
};

// Phones swipe through the images one at a time, with a position count.
// From lg up the same list stacks vertically beside the product details.
export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const list = useRef<HTMLUListElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const el = list.current;
    if (!el) return;
    const update = () => setCurrent(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", update, { passive: true });
    return () => el.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="relative">
      <ul
        ref={list}
        aria-label={`${productName} images`}
        className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain scrollbar-none lg:flex-col lg:gap-px lg:overflow-visible"
      >
        {images.map((image, index) => (
          <li key={image.src} className="w-full flex-none snap-start">
            <div className="media-frame aspect-product">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                preload={index === 0}
                sizes="(min-width: 1024px) 58vw, 100vw"
                style={{ objectPosition: image.focus }}
              />
            </div>
          </li>
        ))}
      </ul>
      {images.length > 1 && (
        <p
          aria-hidden="true"
          className="type-caption absolute right-gutter bottom-4 bg-background/80 px-2 py-1 lg:hidden"
        >
          {current + 1} / {images.length}
        </p>
      )}
    </div>
  );
}
