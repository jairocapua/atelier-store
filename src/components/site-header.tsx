import Link from "next/link";
import { HeaderShell } from "./header-shell";
import { AccountIcon, BagIcon, MenuIcon, SearchIcon } from "./icons";
import { SiteMenu } from "./site-menu";

export function SiteHeader() {
  return (
    <>
      <HeaderShell>
        <div className="page-container flex h-full items-center justify-between">
          <div className="relative z-10 -ml-3 flex items-center">
            <button
              type="button"
              popoverTarget="site-menu"
              className="btn-icon lg:w-auto lg:gap-2 lg:rounded-none lg:px-3 lg:hover:bg-transparent"
            >
              <MenuIcon />
              <span className="sr-only type-label lg:not-sr-only">Menu</span>
            </button>
            <Link href="/search" className="btn-icon" aria-label="Search">
              <SearchIcon />
            </Link>
          </div>

          <Link href="/" className="site-wordmark">
            Atelier
          </Link>

          <div className="relative z-10 -mr-3 flex items-center">
            <Link href="/account" className="btn-icon" aria-label="Account">
              <AccountIcon />
            </Link>
            <Link href="/bag" className="btn-icon" aria-label="Shopping bag">
              <BagIcon />
            </Link>
          </div>
        </div>
      </HeaderShell>
      <SiteMenu />
    </>
  );
}
