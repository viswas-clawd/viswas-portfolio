"use client";

import Link from "next/link";
import { ROUTES } from "@/lib";

export function ReadingModeSwitch({
  className = "",
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  return (
    <Link
      className={`reading-mode-link ${className}`.trim()}
      href={ROUTES.llm}
      onClick={onNavigate}
    >
      Markdown view
    </Link>
  );
}
