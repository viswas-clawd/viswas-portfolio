import Link from "next/link";
import { ROUTES } from "@/lib";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found shell">
      <div>
        <p className="eyebrow">Signal not found · 404</p>
        <h1>This path has no system yet.</h1>
        <Link className="button button--primary" href={ROUTES.home}>Return home</Link>
      </div>
    </main>
  );
}
