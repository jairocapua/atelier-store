"use client";

import Link from "next/link";
import { startTransition, useActionState, useState, type FormEvent } from "react";
import { addToBag, type AddToBagState } from "@/lib/bag";
import type { Variant } from "@/lib/catalog";
import { StockStatus } from "./stock-status";

type ProductPurchaseProps = {
  slug: string;
  variants: Variant[];
  oneSize: boolean;
};

const initialState: AddToBagState = { status: "idle", message: "" };

// Size choice and add to bag. The stock line follows the chosen size, and
// falls back to the whole product's stock until a size is picked.
export function ProductPurchase({ slug, variants, oneSize }: ProductPurchaseProps) {
  const [size, setSize] = useState(oneSize ? variants[0].size : "");
  const [state, action, pending] = useActionState(addToBag, initialState);

  const chosen = variants.find((variant) => variant.size === size);
  const total = variants.reduce((sum, variant) => sum + variant.stock, 0);
  const soldOut = total === 0;

  // Dispatching the action ourselves skips React's automatic form reset, which
  // would clear the chosen size after every add. Without JavaScript the plain
  // form action still submits.
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => action(formData));
  }

  return (
    <form action={action} onSubmit={submit} className="mt-8">
      <input type="hidden" name="product" value={slug} />

      {oneSize ? (
        <input type="hidden" name="size" value={size} />
      ) : (
        <fieldset>
          {/* Floated so the link can share its line; it still names the fieldset. */}
          <legend className="type-label float-left">Size</legend>
          <Link href="/services/size-guide" className="link type-caption float-right">
            Size guide
          </Link>
          <div
            className="clear-both grid gap-2 pt-3"
            style={{ gridTemplateColumns: `repeat(${variants.length}, minmax(0, 1fr))` }}
          >
            {variants.map((variant) => {
              const unavailable = variant.stock <= 0;
              return (
                <label key={variant.size} className="relative">
                  <input
                    type="radio"
                    name="size"
                    value={variant.size}
                    checked={size === variant.size}
                    onChange={() => setSize(variant.size)}
                    disabled={unavailable}
                    className="peer sr-only"
                  />
                  <span
                    className="type-caption flex h-11 cursor-pointer items-center justify-center border border-line-strong transition-colors peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-background peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-foreground peer-disabled:cursor-not-allowed peer-disabled:border-line peer-disabled:text-muted peer-disabled:line-through hover:border-foreground"
                  >
                    {variant.size.replace("EU ", "")}
                    {unavailable && <span className="sr-only">, sold out</span>}
                  </span>
                </label>
              );
            })}
          </div>
          {variants[0].size.startsWith("EU") && (
            <p className="type-caption mt-2 text-muted">European sizes</p>
          )}
        </fieldset>
      )}

      <StockStatus
        units={chosen ? chosen.stock : total}
        suffix={chosen && !oneSize ? `in size ${chosen.size.replace("EU ", "")}` : undefined}
        className="mt-6"
      />

      <button
        type="submit"
        className="btn btn-primary mt-4 w-full"
        disabled={soldOut || pending}
      >
        {soldOut ? "Sold out" : "Add to bag"}
      </button>

      <p
        aria-live="polite"
        className="field-message mt-3 min-h-4"
        data-tone={state.status === "error" ? "error" : undefined}
      >
        {state.message}
      </p>
    </form>
  );
}
