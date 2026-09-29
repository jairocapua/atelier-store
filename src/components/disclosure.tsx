import type { ReactNode } from "react";

type DisclosureProps = {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
};

// An accordion row on a hairline. A plus that loses its vertical stroke
// marks open and closed, so it works without JavaScript.
export function Disclosure({ title, defaultOpen = false, children }: DisclosureProps) {
  return (
    <details open={defaultOpen} className="group border-t last:border-b">
      <summary className="type-title flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
        {title}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.25}
          aria-hidden="true"
          className="size-4 flex-none"
        >
          <path d="M4 12h16" />
          <path d="M12 4v16" className="transition-opacity group-open:opacity-0" />
        </svg>
      </summary>
      <div className="type-body-sm pb-6 text-muted">{children}</div>
    </details>
  );
}
