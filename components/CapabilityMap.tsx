"use client";

import { useEffect, useRef, useState } from "react";
import { capabilityMapContent } from "@/content";
import styles from "./capability-map.module.css";

export function CapabilityMap() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      const timeout = setTimeout(() => setRevealed(true), 0);
      return () => clearTimeout(timeout);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setRevealed(true);
        observer.disconnect();
      },
      { threshold: 0.24 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={styles.root}
      data-capability-map
      data-revealed={revealed ? "true" : "pending"}
      role="group"
      aria-label={capabilityMapContent.ariaLabel}
    >
      <noscript>
        <style>{`[data-capability-map][data-revealed="pending"] [data-capability-node], [data-capability-map][data-revealed="pending"] [data-capability-connector] { opacity: 1 !important; stroke-dashoffset: 0 !important; } [data-capability-map] [data-capability-center] { transform: translate(-50%, -50%) !important; } [data-capability-map] [data-capability-centered] { transform: translateX(-50%) !important; } @media (max-width: 48rem) { [data-capability-map] [data-capability-node] { opacity: 1 !important; transform: none !important; animation: none !important; } [data-capability-map] [data-capability-center]::after, [data-capability-map] [data-capability-list]::before, [data-capability-map] [data-capability-list] [data-capability-node]::before { opacity: 1 !important; transform: none !important; animation: none !important; } }`}</style>
      </noscript>
      <svg className={styles.connectors} viewBox="0 0 1000 620" preserveAspectRatio="none" aria-hidden="true">
        <path data-capability-connector d="M500 310L172 122" />
        <path data-capability-connector d="M500 310L500 92" />
        <path data-capability-connector d="M500 310L828 122" />
        <path data-capability-connector d="M500 310L270 522" />
        <path data-capability-connector d="M500 310L730 522" />
      </svg>
      <div className={styles.center} data-capability-node data-capability-center>
        <p>{capabilityMapContent.centerLabel}</p>
        <h3>{capabilityMapContent.centerTitle}</h3>
      </div>
      <ul className={styles.list} data-capability-list>
        {capabilityMapContent.capabilities.map((capability, index) => (
          <li
            className={`${styles.item} ${styles[`item${index + 1}`]}`}
            data-capability-node
            data-capability-centered={index === 1 ? "true" : undefined}
            key={capability.key}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{capability.title}</h3>
            <p>{capability.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
