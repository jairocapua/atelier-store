import type { SVGProps } from "react";

// Line icons on a 24px grid. They draw in currentColor and are decorative:
// the control that holds one supplies the accessible name.
function Icon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      aria-hidden="true"
      focusable="false"
      {...props}
    />
  );
}

export function MenuIcon() {
  return (
    <Icon>
      <path d="M3 8h18M3 16h18" />
    </Icon>
  );
}

export function CloseIcon() {
  return (
    <Icon>
      <path d="m5 5 14 14M19 5 5 19" />
    </Icon>
  );
}

export function SearchIcon() {
  return (
    <Icon>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 5 5" />
    </Icon>
  );
}

export function AccountIcon() {
  return (
    <Icon>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c.8-4 4-6 8-6s7.2 2 8 6" />
    </Icon>
  );
}

export function BagIcon() {
  return (
    <Icon>
      <path d="M4.5 8h15l-1 13h-13z" />
      <path d="M8.5 8V6.5a3.5 3.5 0 0 1 7 0V8" />
    </Icon>
  );
}

export function ArrowLeftIcon() {
  return (
    <Icon>
      <path d="M20 12H4m6-6-6 6 6 6" />
    </Icon>
  );
}

export function ArrowRightIcon() {
  return (
    <Icon>
      <path d="M4 12h16m-6-6 6 6-6 6" />
    </Icon>
  );
}
