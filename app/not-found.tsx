import Link from "next/link";

export default function NotFound() {
  return (
    <main className="shell">
      <div className="eyebrow">Mathematical Threads</div>
      <h1>This thread leads nowhere.</h1>
      <p>We could not find that page. It may have moved, or the journey may not be open yet.</p>
      <p>
        <Link href="/">← Back to the course home</Link>
      </p>
    </main>
  );
}
