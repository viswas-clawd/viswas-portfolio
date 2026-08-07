"use client";

import Link from "next/link";
import { useEffect, useRef, type KeyboardEvent } from "react";
import { siteProfile } from "@/content/profile";
import { PRIMARY_NAVIGATION } from "@/lib";
import { MotionToggle } from "./MotionPreference";
import { ReadingModeSwitch } from "./ReadingModeSwitch";

export function MobileIndex() {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const priorOverflow = useRef("");

  const close = () => {
    if (!detailsRef.current?.open) return;
    detailsRef.current.open = false;
    summaryRef.current?.focus();
  };

  useEffect(() => {
    const details = detailsRef.current;
    if (!details) return;

    const handleToggle = () => {
      if (details.open) {
        priorOverflow.current = document.body.style.overflow;
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = priorOverflow.current;
      }
    };

    details.addEventListener("toggle", handleToggle);
    return () => {
      details.removeEventListener("toggle", handleToggle);
      document.body.style.overflow = priorOverflow.current;
    };
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLDetailsElement>) => {
    const details = detailsRef.current;
    if (!details?.open) return;

    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }

    if (event.key !== "Tab") return;
    const focusable = Array.from(
      details.querySelectorAll<HTMLElement>(
        'summary, a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => !element.hasAttribute("hidden"));
    const first = focusable[0];
    const last = focusable.at(-1);

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  return (
    <details ref={detailsRef} className="mobile-index" onKeyDown={handleKeyDown}>
      <summary ref={summaryRef}>Index</summary>
      <div className="mobile-index__sheet">
        <p>Navigate the public surface</p>
        <ReadingModeSwitch className="mobile-index__mode" onNavigate={close} />
        <nav className="mobile-index__routes" aria-label="Mobile navigation">
          {PRIMARY_NAVIGATION.map((item, index) => (
            <Link key={item.href} href={item.href} onClick={close}>
              <span>0{index + 1}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <a
          href={siteProfile.contact.href}
          target="_blank"
          rel="noreferrer"
          onClick={close}
        >
          Start a conversation <span aria-hidden="true">↗</span>
        </a>
        <MotionToggle />
      </div>
    </details>
  );
}
