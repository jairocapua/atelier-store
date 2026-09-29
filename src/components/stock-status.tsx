import { stockState, type StockState } from "@/lib/catalog";

export function stockLabel(units: number): string {
  const labels: Record<StockState, string> = {
    "in-stock": "In stock",
    "low-stock": units === 1 ? "Only 1 left" : `Only ${units} left`,
    "sold-out": "Sold out",
  };
  return labels[stockState(units)];
}

const dotTone: Record<StockState, string> = {
  "in-stock": "bg-success",
  "low-stock": "bg-danger",
  "sold-out": "bg-line-strong",
};

type StockStatusProps = {
  units: number;
  /** Names what the count refers to, e.g. "in size M". */
  suffix?: string;
  className?: string;
};

// A square marker and a plain-language count. The marker only reinforces the
// words, so the state never depends on colour alone.
export function StockStatus({ units, suffix, className = "" }: StockStatusProps) {
  const state = stockState(units);

  return (
    <p className={`type-caption flex items-center gap-2 ${className}`}>
      <span aria-hidden="true" className={`size-2 flex-none ${dotTone[state]}`} />
      <span>
        {stockLabel(units)}
        {suffix && state !== "in-stock" ? ` ${suffix}` : ""}
      </span>
    </p>
  );
}
