"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import styles from "./design-system.module.css";

const STORAGE_KEY = "viswas-portfolio-motion";

function readStoredPreference() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

type MotionPreference = {
  motionEnabled: boolean;
  setMotionEnabled: (enabled: boolean) => void;
};

const MotionPreferenceContext = createContext<MotionPreference>({
  motionEnabled: false,
  setMotionEnabled: () => undefined,
});

export function MotionPreferenceProvider({ children }: { children: ReactNode }) {
  const [motionEnabled, setMotionEnabledState] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const storedPreference = readStoredPreference();
    const initialPreference =
      storedPreference === "on" || storedPreference === "off"
        ? storedPreference === "on"
        : !mediaQuery.matches;
    const frame = window.requestAnimationFrame(() => {
      setMotionEnabledState(initialPreference);
    });

    const syncSystemPreference = (event: MediaQueryListEvent) => {
      if (readStoredPreference() === null) {
        setMotionEnabledState(!event.matches);
      }
    };

    mediaQuery.addEventListener("change", syncSystemPreference);
    return () => {
      window.cancelAnimationFrame(frame);
      mediaQuery.removeEventListener("change", syncSystemPreference);
    };
  }, []);

  const setMotionEnabled = useCallback((enabled: boolean) => {
    setMotionEnabledState(enabled);
    try {
      window.localStorage.setItem(STORAGE_KEY, enabled ? "on" : "off");
    } catch {
      // The preference still applies for this visit when storage is unavailable.
    }
  }, []);

  const value = useMemo(
    () => ({ motionEnabled, setMotionEnabled }),
    [motionEnabled, setMotionEnabled],
  );

  return (
    <MotionPreferenceContext.Provider value={value}>
      <div className={styles.motionRoot} data-motion={motionEnabled ? "on" : "off"}>
        {children}
      </div>
    </MotionPreferenceContext.Provider>
  );
}

export function useMotionPreference() {
  return useContext(MotionPreferenceContext);
}

export function MotionToggle({ className = "" }: { className?: string }) {
  const { motionEnabled, setMotionEnabled } = useMotionPreference();

  return (
    <button
      type="button"
      className={`${styles.motionToggle} ${className}`.trim()}
      aria-label={`${motionEnabled ? "Disable" : "Enable"} interface motion`}
      aria-pressed={motionEnabled}
      onClick={() => setMotionEnabled(!motionEnabled)}
    >
      <span className={styles.motionIndicator} aria-hidden="true" />
      <span>Motion {motionEnabled ? "on" : "off"}</span>
    </button>
  );
}
