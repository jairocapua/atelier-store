"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// Pages that open with a full-bleed hero. Their header starts transparent over
// the image (see .site-header[data-overlay] in globals.css), and the page's
// hero pulls itself underneath with -mt-header.
const OVERLAY_PATHS = new Set(["/"]);

export function HeaderShell({ children }: { children: ReactNode }) {
  const overlay = OVERLAY_PATHS.has(usePathname());

  return (
    <header className="site-header" data-overlay={overlay ? "" : undefined}>
      {children}
    </header>
  );
}
