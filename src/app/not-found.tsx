import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x flex flex-col items-center py-32 text-center">
      <p className="font-serif text-8xl text-gold-gradient">404</p>
      <h1 className="mt-4 text-4xl">This page has slipped away</h1>
      <p className="mt-4 text-cocoa">The page you’re looking for doesn’t exist or has moved.</p>
      <Link href="/" className="btn-dark mt-10">Back to home</Link>
    </section>
  );
}
