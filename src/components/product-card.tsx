import Image from "next/image";
import Link from "next/link";
import { formatPrice, stockState, totalStock, type Product } from "@/lib/catalog";
import { stockLabel } from "./stock-status";

type ProductCardProps = {
  product: Product;
  /** The image's rendered width, for the responsive srcset. */
  sizes: string;
  /** Pads the caption, for tiles that run edge to edge in a .product-grid. */
  inset?: boolean;
};

export function ProductCard({ product, sizes, inset = false }: ProductCardProps) {
  const [image] = product.images;
  const units = totalStock(product);
  const state = stockState(units);

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="media-frame aspect-product">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          className={state === "sold-out" ? "opacity-60" : undefined}
          style={{ objectPosition: image.focus }}
        />
      </div>
      <div className={`flex flex-col gap-1 pt-3 pb-2 ${inset ? "px-3 pb-8 lg:px-4" : ""}`}>
        <h3 className="type-caption underline decoration-transparent underline-offset-4 transition-[text-decoration-color] group-hover:decoration-current">
          {product.name}
        </h3>
        <p className="type-caption text-muted">
          {formatPrice(product.price)}
          {state !== "in-stock" && (
            <>
              <span aria-hidden="true"> · </span>
              <span className={state === "low-stock" ? "text-danger" : undefined}>
                {state === "sold-out" ? stockLabel(units) : "Few left"}
              </span>
            </>
          )}
        </p>
      </div>
    </Link>
  );
}
