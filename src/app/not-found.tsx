import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main"
      className="page-container flex flex-1 flex-col items-center justify-center py-section text-center"
    >
      <p className="type-label text-muted">404</p>
      <h1 className="type-headline mt-3">This page doesn&apos;t exist</h1>
      <p className="type-body mt-3 max-w-measure text-muted">
        The link may be out of date, or the product may no longer be available.
      </p>
      <Link href="/" className="btn btn-primary mt-8">
        Go to the homepage
      </Link>
    </main>
  );
}
