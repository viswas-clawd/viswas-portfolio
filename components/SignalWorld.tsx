"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { heroContent } from "@/content";
import { useMotionPreference } from "./MotionPreference";
import styles from "./signal-world.module.css";

type Point = { x: number; y: number };

type ConnectorSide = "left" | "right";

type NodePlacement = Point & {
  connectorSide: ConnectorSide;
};

const NODES = heroContent.destinations;

const PORTRAIT_WORDS = [
  "LARGE LANGUAGE MODEL",
  "AI PRODUCT MANAGER",
  "ENGINEER",
  "OPENAI",
  "ANTHROPIC",
  "MACHINE LEARNING",
  "DEEP LEARNING",
  "NEURAL NETWORKS",
  "PYTHON",
  "PYTORCH",
  "TRANSFORMERS",
  "SCALING",
  "AI ETHICS",
  "TECHNICAL JUDGMENT",
  "PRODUCT STRATEGY",
  "DATA SCIENCE",
  "INNOVATION",
  "CLOUD COMPUTING",
  "AGENTS",
  "MCP",
  "INTEGRATE",
  "CUSTOMER INSIGHT",
  "PRODUCT JUDGMENT",
  "GROUNDING",
  "RELIABILITY",
  "REQUIREMENTS",
  "EVIDENCE",
  "GUARDRAILS",
  "PROVENANCE",
  "RISK",
  "PLATFORM",
  "CUSTOMER",
  "RESEARCH",
  "ENGINEERING",
  "POLICY",
  "ROADMAP",
  "QUALITY",
  "OWNERSHIP",
  "0→1",
  "SHIP",
  "PROTOTYPE",
] as const;

const MOBILE_WORDS = [
  "AI PRODUCT MANAGER",
  "LARGE LANGUAGE MODEL",
  "AGENTS",
  "GROUNDING",
  "CUSTOMER INSIGHT",
  "PRODUCT JUDGMENT",
  "PRODUCT STRATEGY",
  "ENGINEERING",
  "PROVENANCE",
  "PROTOTYPE",
] as const;

const NARROW_BREAKPOINT = 820;
const DESKTOP_CONNECTOR_LANES = [18, -18, 0, 30, 48] as const;
const MOBILE_CONNECTOR_LANES = [-28, 28, -12, 12, 0] as const;
const FOREHEAD_PORTS = [
  { x: 0.459, y: 0.211 },
  { x: 0.478, y: 0.188 },
  { x: 0.5, y: 0.178 },
  { x: 0.522, y: 0.188 },
  { x: 0.541, y: 0.211 },
] as const;

const clamp = (value: number, minimum = 0, maximum = 1) =>
  Math.min(maximum, Math.max(minimum, value));

const smoothstep = (start: number, end: number, value: number) => {
  const amount = clamp((value - start) / (end - start));
  return amount * amount * (3 - 2 * amount);
};

function hash(x: number, y: number, seed = 0) {
  const value = Math.sin(x * 127.1 + y * 311.7 + seed * 73.31) * 43758.5453;
  return value - Math.floor(value);
}

function nodeLayout(width: number, height: number): NodePlacement[] {
  if (width < NARROW_BREAKPOINT) {
    return [
      { x: width * 0.055, y: height * 0.7, connectorSide: "right" },
      { x: width * 0.525, y: height * 0.7, connectorSide: "left" },
      { x: width * 0.055, y: height * 0.77, connectorSide: "right" },
      { x: width * 0.525, y: height * 0.77, connectorSide: "left" },
      { x: width * 0.055, y: height * 0.84, connectorSide: "right" },
    ];
  }

  const nodeWidth = Math.min(352, Math.max(240, width * 0.22));
  const rightColumn = width - nodeWidth - width * 0.045;

  return [
    { x: width * 0.045, y: height * 0.56, connectorSide: "right" },
    { x: rightColumn, y: height * 0.16, connectorSide: "left" },
    { x: rightColumn, y: height * 0.44, connectorSide: "left" },
    { x: rightColumn, y: height * 0.74, connectorSide: "left" },
    { x: width * 0.055, y: height * 0.78, connectorSide: "right" },
  ];
}

function nodeMotion(placement: NodePlacement, reveal: number, crown: Point, mobile: boolean) {
  const pull = (1 - reveal) * (mobile ? 0.1 : 0.16);
  return {
    x: placement.x + (crown.x - placement.x) * pull,
    y: placement.y + (crown.y - placement.y) * pull,
  };
}

function drawRegistrationFrame(context: CanvasRenderingContext2D, width: number, height: number) {
  context.save();
  context.strokeStyle = "rgba(255,255,255,0.18)";
  context.lineWidth = 1;
  context.strokeRect(20.5, 20.5, width - 41, height - 41);

  context.strokeStyle = "rgba(255,255,255,0.1)";
  for (let x = 48; x < width - 32; x += 80) {
    context.beginPath();
    context.moveTo(x + 0.5, 20);
    context.lineTo(x + 0.5, x % 160 === 48 ? 30 : 25);
    context.stroke();
  }
  for (let y = 48; y < height - 32; y += 80) {
    context.beginPath();
    context.moveTo(20, y + 0.5);
    context.lineTo(y % 160 === 48 ? 30 : 25, y + 0.5);
    context.stroke();
  }

  const corners: Point[] = [
    { x: 20, y: 20 },
    { x: width - 20, y: 20 },
    { x: 20, y: height - 20 },
    { x: width - 20, y: height - 20 },
  ];
  context.fillStyle = "#fff";
  for (const corner of corners) context.fillRect(corner.x - 2, corner.y - 2, 4, 4);
  context.restore();
}

function drawVocabulary(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  progress: number,
) {
  const mobile = width < NARROW_BREAKPOINT;
  const words: readonly string[] = mobile ? MOBILE_WORDS : PORTRAIT_WORDS;
  const clarity = 0.36 + smoothstep(0, 0.22, progress) * 0.64;
  const spread = smoothstep(0.17, 0.54, progress);
  const introVisibility = 1 - smoothstep(0.11, 0.34, progress);
  const rowsPerSide = Math.ceil(words.length / 2);

  context.save();
  context.font = `650 ${mobile ? 7.5 : 9}px ui-monospace, SFMono-Regular, Menlo, monospace`;
  context.textBaseline = "middle";

  words.forEach((word, index) => {
    const onLeft = index % 2 === 0;
    const row = Math.floor(index / 2);
    const rowProgress = rowsPerSide <= 1 ? 0.5 : row / (rowsPerSide - 1);
    const jitter = hash(index, 5, 11) - 0.5;
    const xInset = mobile ? 18 : 26 + hash(index, 3, 17) * width * 0.055;
    const x = onLeft
      ? xInset - spread * (mobile ? 2 : 10)
      : width - xInset + spread * (mobile ? 2 : 10);
    const yStart = mobile ? height * 0.36 : height * 0.15;
    const yRange = mobile ? height * 0.25 : height * 0.7;
    const y = yStart + rowProgress * yRange + jitter * (mobile ? 7 : 14);
    const pulse = 0.7 + hash(index, 9, 23) * 0.3;
    const overlapsIntro = onLeft && y > height * 0.11 && y < height * (mobile ? 0.62 : 0.68);
    const quietFactor = overlapsIntro ? 1 - introVisibility * 0.92 : 1;
    const alpha = clarity * pulse * (mobile ? 0.28 : 0.42) * quietFactor;

    context.textAlign = onLeft ? "left" : "right";
    context.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
    context.fillText(word, x, y);
  });

  context.restore();
}

type ForeheadGeometry = {
  center: Point;
  ports: Point[];
  cellWidth: number;
  cellHeight: number;
};

function getForeheadGeometry(stage: HTMLElement, portrait: HTMLElement): ForeheadGeometry {
  const stageBounds = stage.getBoundingClientRect();
  const portraitBounds = portrait.getBoundingClientRect();
  const mapPoint = (point: Point): Point => ({
    x: portraitBounds.left - stageBounds.left + portraitBounds.width * point.x,
    y: portraitBounds.top - stageBounds.top + portraitBounds.height * point.y,
  });

  return {
    center: mapPoint({ x: 0.5, y: 0.202 }),
    ports: FOREHEAD_PORTS.map(mapPoint),
    cellWidth: Math.max(2.5, portraitBounds.width * 0.0064),
    cellHeight: Math.max(2.5, portraitBounds.height * 0.0072),
  };
}

function drawForeheadAperture(
  context: CanvasRenderingContext2D,
  geometry: ForeheadGeometry,
  amount: number,
) {
  if (amount <= 0) return;

  const columns = 13;
  const rows = 7;
  const halfColumns = (columns - 1) / 2;
  const halfRows = (rows - 1) / 2;

  context.save();
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const offsetX = column - halfColumns;
      const offsetY = row - halfRows;
      const distance = (offsetX / 6.2) ** 2 + (offsetY / 3.15) ** 2;
      if (distance > 1 || (distance > 0.72 && hash(column, row, 41) < 0.34)) continue;

      const x = geometry.center.x + offsetX * geometry.cellWidth;
      const y = geometry.center.y + offsetY * geometry.cellHeight;
      const edgeVariation = 0.62 + hash(column, row, 47) * 0.32;
      context.fillStyle = `rgba(0,0,0,${(amount * edgeVariation).toFixed(3)})`;
      context.fillRect(
        x - geometry.cellWidth * 0.34,
        y - geometry.cellHeight * 0.34,
        geometry.cellWidth * 0.68,
        geometry.cellHeight * 0.68,
      );
    }
  }

  context.fillStyle = `rgba(255,255,255,${(amount * 0.78).toFixed(3)})`;
  geometry.ports.forEach((point) => {
    const size = Math.max(2, Math.min(4, geometry.cellWidth * 0.52));
    context.fillRect(point.x - size / 2, point.y - size / 2, size, size);
  });
  context.restore();
}

function drawCurve(
  context: CanvasRenderingContext2D,
  start: Point,
  end: Point,
  amount: number,
  lane: number,
  minimumY: number,
) {
  if (amount <= 0) return;

  const deltaX = end.x - start.x;
  const direction = Math.sign(deltaX) || 1;
  const span = Math.abs(deltaX);
  const departure = Math.min(164, Math.max(54, span * 0.27));
  const approach = Math.min(124, Math.max(44, span * 0.2));
  const controlA = {
    x: start.x + direction * departure,
    y: Math.max(minimumY, start.y + lane),
  };
  const controlB = {
    x: end.x - direction * approach,
    y: Math.max(minimumY, end.y),
  };
  const steps = Math.max(2, Math.ceil(42 * amount));

  context.beginPath();
  context.moveTo(start.x, start.y);
  for (let index = 1; index <= steps; index += 1) {
    const t = (index / steps) * amount;
    const inverse = 1 - t;
    const x =
      inverse ** 3 * start.x +
      3 * inverse ** 2 * t * controlA.x +
      3 * inverse * t ** 2 * controlB.x +
      t ** 3 * end.x;
    const y =
      inverse ** 3 * start.y +
      3 * inverse ** 2 * t * controlA.y +
      3 * inverse * t ** 2 * controlB.y +
      t ** 3 * end.y;
    context.lineTo(x, y);
  }
  context.stroke();
}

function drawVerticalCurve(
  context: CanvasRenderingContext2D,
  start: Point,
  end: Point,
  amount: number,
  lane: number,
) {
  if (amount <= 0) return;

  const verticalSpan = Math.abs(end.y - start.y);
  const departure = Math.min(104, Math.max(42, verticalSpan * 0.28));
  const approach = Math.min(84, Math.max(34, verticalSpan * 0.2));
  const controlA = { x: start.x + lane, y: start.y + departure };
  const controlB = { x: end.x, y: end.y - approach };
  const steps = Math.max(2, Math.ceil(42 * amount));

  context.beginPath();
  context.moveTo(start.x, start.y);
  for (let index = 1; index <= steps; index += 1) {
    const t = (index / steps) * amount;
    const inverse = 1 - t;
    const x =
      inverse ** 3 * start.x +
      3 * inverse ** 2 * t * controlA.x +
      3 * inverse * t ** 2 * controlB.x +
      t ** 3 * end.x;
    const y =
      inverse ** 3 * start.y +
      3 * inverse ** 2 * t * controlA.y +
      3 * inverse * t ** 2 * controlB.y +
      t ** 3 * end.y;
    context.lineTo(x, y);
  }
  context.stroke();
}

type Runtime = {
  schedule: () => void;
  resetPointer: () => void;
};

export function MindField() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLElement>(null);
  const nodeRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const runtimeRef = useRef<Runtime | null>(null);
  const destinationsInteractiveRef = useRef(true);
  const pointerTargetRef = useRef<Point>({ x: 0, y: 0 });
  const pointerCurrentRef = useRef<Point>({ x: 0, y: 0 });
  const { motionEnabled } = useMotionPreference();
  const [ready, setReady] = useState(false);
  const titleId = useId();
  const instructionsId = useId();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!section || !stage || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) {
      destinationsInteractiveRef.current = true;
      nodeRefs.current.forEach((node) => {
        if (!node) return;
        node.dataset.positioned = "true";
        node.dataset.interactive = "true";
        node.style.setProperty("--node-progress", "1");
        node.style.setProperty("--node-shift-x", "0px");
        node.style.setProperty("--node-shift-y", "0px");
        node.style.setProperty("--node-clip", "0%");
        node.removeAttribute("aria-disabled");
        node.tabIndex = 0;
      });
      return;
    }

    destinationsInteractiveRef.current = !motionEnabled;

    let animationFrame = 0;
    let visible = true;
    let coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    const sizeCanvas = () => {
      const bounds = stage.getBoundingClientRect();
      const width = Math.max(320, Math.round(bounds.width));
      const height = Math.max(560, Math.round(bounds.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const nextWidth = Math.round(width * dpr);
      const nextHeight = Math.round(height * dpr);
      if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
        canvas.width = nextWidth;
        canvas.height = nextHeight;
      }
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { width, height };
    };

    const getProgress = () => {
      if (!motionEnabled) return 1;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      return clamp(-rect.top / travel);
    };

    const updateDom = (
      progress: number,
      width: number,
      height: number,
      pointer: Point,
    ) => {
      const layout = nodeLayout(width, height);
      const mobile = width < NARROW_BREAKPOINT;
      const introFade = 1 - smoothstep(0.11, 0.34, progress);
      const portraitClarity = smoothstep(0, 0.22, progress);
      const portraitCentering = smoothstep(0.18, 0.58, progress);
      const destinationsInteractive = !motionEnabled || progress >= 0.86;
      destinationsInteractiveRef.current = destinationsInteractive;

      if (introRef.current) {
        introRef.current.style.opacity = introFade.toFixed(4);
        introRef.current.style.transform = `translate3d(0, ${(-18 * (1 - introFade)).toFixed(2)}px, 0)`;
        introRef.current.style.visibility = introFade < 0.02 ? "hidden" : "visible";
      }

      if (portraitRef.current) {
        const portraitStart = mobile ? 52 : width <= 980 && height <= 700 ? 72 : width <= 980 ? 67 : 70;
        const portraitEnd = mobile ? 52 : 56;
        portraitRef.current.style.setProperty(
          "--portrait-opacity",
          (0.88 + portraitClarity * 0.12).toFixed(4),
        );
        portraitRef.current.style.setProperty(
          "--portrait-anchor-x",
          `${(portraitStart + (portraitEnd - portraitStart) * portraitCentering).toFixed(3)}%`,
        );
        portraitRef.current.style.setProperty(
          "--portrait-shift-x",
          `${(pointer.x * (mobile ? 0 : 7)).toFixed(2)}px`,
        );
        portraitRef.current.style.setProperty(
          "--portrait-shift-y",
          `${(pointer.y * (mobile ? 0 : 3)).toFixed(2)}px`,
        );
      }

      const origin = portraitRef.current
        ? getForeheadGeometry(stage, portraitRef.current).center
        : { x: width * 0.5, y: height * (mobile ? 0.3 : 0.24) };

      nodeRefs.current.forEach((node, index) => {
        if (!node) return;
        const destination = layout[index];
        const reveal = smoothstep(0.34 + index * 0.045, 0.66 + index * 0.045, progress);
        const visualPosition = nodeMotion(destination, reveal, origin, mobile);
        const shiftX = visualPosition.x - destination.x;
        const shiftY = visualPosition.y - destination.y;
        node.style.left = `${destination.x}px`;
        node.style.top = `${destination.y}px`;
        node.style.setProperty("--node-progress", reveal.toFixed(4));
        node.style.setProperty("--node-shift-x", `${shiftX.toFixed(2)}px`);
        node.style.setProperty("--node-shift-y", `${shiftY.toFixed(2)}px`);
        node.style.setProperty("--node-clip", `${((1 - reveal) * 74).toFixed(2)}%`);
        node.dataset.positioned = "true";
        node.dataset.interactive = destinationsInteractive ? "true" : "false";
        if (destinationsInteractive) node.removeAttribute("aria-disabled");
        else node.setAttribute("aria-disabled", "true");
        node.tabIndex = destinationsInteractive ? 0 : -1;
      });
    };

    const draw = (progress: number) => {
      const { width, height } = sizeCanvas();
      const mobile = width < NARROW_BREAKPOINT;
      const pointer = motionEnabled && !coarsePointer ? pointerCurrentRef.current : { x: 0, y: 0 };
      const networkReveal = smoothstep(0.31, 0.68, progress);
      const layout = nodeLayout(width, height);

      updateDom(progress, width, height, pointer);

      context.clearRect(0, 0, width, height);
      drawRegistrationFrame(context, width, height);

      context.save();
      context.font = "500 9px ui-monospace, SFMono-Regular, Menlo, monospace";
      context.textAlign = "center";
      context.textBaseline = "middle";
      for (let index = 0; index < (mobile ? 20 : 38); index += 1) {
        const x = 34 + hash(index, 2, 1) * (width - 68);
        const y = 34 + hash(index, 7, 2) * (height - 68);
        const character = index % 7 === 0 ? "+" : index % 5 === 0 ? "·" : ".";
        context.fillStyle = index % 7 === 0 ? "rgba(255,255,255,0.24)" : "rgba(255,255,255,0.1)";
        context.fillText(character, x, y);
      }
      context.restore();

      drawVocabulary(context, width, height, progress);

      const forehead = portraitRef.current
        ? getForeheadGeometry(stage, portraitRef.current)
        : {
            center: { x: width * 0.5, y: height * (mobile ? 0.3 : 0.24) },
            ports: FOREHEAD_PORTS.map((point) => ({
              x: width * (0.5 + (point.x - 0.5) * 0.9),
              y: height * (mobile ? 0.3 : 0.24) + height * (point.y - 0.202) * 0.45,
            })),
            cellWidth: mobile ? 3 : 5,
            cellHeight: mobile ? 3 : 5,
          };
      const connectorTop = mobile ? 76 : 104;

      context.save();
      drawForeheadAperture(context, forehead, networkReveal);
      context.strokeStyle = `rgba(255,255,255,${(networkReveal * (mobile ? 0.48 : 0.58)).toFixed(3)})`;
      context.lineWidth = 1;
      NODES.forEach((_, index) => {
        const reveal = smoothstep(0.34 + index * 0.045, 0.66 + index * 0.045, progress);
        const placement = layout[index];
        const visualPosition = nodeMotion(placement, reveal, forehead.center, mobile);
        const node = nodeRefs.current[index];
        const nodeWidth = node?.offsetWidth ?? (mobile ? width * 0.42 : Math.min(352, Math.max(240, width * 0.22)));
        const nodeHeight = node?.offsetHeight ?? (mobile ? 54 : 62);
        const nodeEdge = {
          x: placement.connectorSide === "right" ? visualPosition.x + nodeWidth : visualPosition.x,
          y: visualPosition.y + nodeHeight * 0.5,
        };

        if (mobile) {
          drawVerticalCurve(
            context,
            forehead.ports[index],
            nodeEdge,
            reveal,
            MOBILE_CONNECTOR_LANES[index],
          );
        } else {
          drawCurve(
            context,
            forehead.ports[index],
            nodeEdge,
            reveal,
            DESKTOP_CONNECTOR_LANES[index],
            connectorTop,
          );
        }

        if (reveal > 0.92) {
          context.fillStyle = "#fff";
          context.fillRect(nodeEdge.x - 2, nodeEdge.y - 2, 4, 4);
        }
      });
      context.restore();
    };

    const frame = () => {
      animationFrame = 0;
      if (!visible || document.hidden) return;

      const current = pointerCurrentRef.current;
      const target = pointerTargetRef.current;
      const next = {
        x: current.x + (target.x - current.x) * 0.16,
        y: current.y + (target.y - current.y) * 0.16,
      };
      pointerCurrentRef.current = next;
      draw(getProgress());

      if (motionEnabled && !coarsePointer && Math.hypot(target.x - next.x, target.y - next.y) > 0.004) {
        animationFrame = window.requestAnimationFrame(frame);
      }
    };

    const schedule = () => {
      if (!animationFrame && visible && !document.hidden) {
        animationFrame = window.requestAnimationFrame(frame);
      }
    };

    const resetPointer = () => {
      pointerTargetRef.current = { x: 0, y: 0 };
      schedule();
    };

    runtimeRef.current = { schedule, resetPointer };

    const onScroll = () => schedule();
    const onVisibilityChange = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      } else {
        schedule();
      }
    };

    const resizeObserver = new ResizeObserver(() => schedule());
    resizeObserver.observe(stage);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (!visible) {
          window.cancelAnimationFrame(animationFrame);
          animationFrame = 0;
        } else {
          schedule();
        }
      },
      { rootMargin: "12% 0px" },
    );
    intersectionObserver.observe(section);

    const pointerQuery = window.matchMedia("(pointer: coarse)");
    const onPointerCapabilityChange = (event: MediaQueryListEvent) => {
      coarsePointer = event.matches;
      resetPointer();
    };
    pointerQuery.addEventListener("change", onPointerCapabilityChange);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    schedule();

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      pointerQuery.removeEventListener("change", onPointerCapabilityChange);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.cancelAnimationFrame(animationFrame);
      if (runtimeRef.current?.schedule === schedule) runtimeRef.current = null;
    };
  }, [motionEnabled]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!motionEnabled || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerTargetRef.current = {
      x: clamp(((event.clientX - bounds.left) / bounds.width) * 2 - 1, -1, 1),
      y: clamp(((event.clientY - bounds.top) / bounds.height) * 2 - 1, -1, 1),
    };
    runtimeRef.current?.schedule();
  };

  return (
    <section
      ref={sectionRef}
      className={styles.root}
      data-motion={motionEnabled ? "on" : "off"}
      data-ready={ready ? "true" : "false"}
      data-code-generated="true"
      data-private-reference-derivative="true"
      data-portrait-asset="portrait-wordfield-v2"
      aria-labelledby={titleId}
    >
      <div
        ref={stageRef}
        className={styles.stage}
        role="group"
        aria-describedby={instructionsId}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => runtimeRef.current?.resetPointer()}
      >
        <div ref={portraitRef} className={styles.portrait} aria-hidden="true">
          <Image
            className={styles.portraitImage}
            src="/portrait-wordfield-v2.png"
            alt=""
            fill
            priority
            unoptimized={process.env.NODE_ENV === "development"}
            sizes="(min-width: 820px) and (max-height: 700px) 52vw, (min-width: 981px) and (max-height: 900px) 41vw, (max-width: 819px) 96vw, (max-width: 980px) 66vw, (max-width: 1813px) 60vw, 1088px"
          />
        </div>

        <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />

        <div className={styles.topline} aria-hidden="true">
          <span>WORD PORTRAIT / VV-03</span>
        </div>

        <header ref={introRef} className={styles.intro}>
          <p className={styles.eyebrow}>{heroContent.eyebrow}</p>
          <h1 id={titleId}>{heroContent.headline}</h1>
          <p>{heroContent.introduction}</p>
        </header>

        <Link className={styles.quickRead} href="#quick-read">
          Skip interaction <span aria-hidden="true">↓</span>
        </Link>

        <nav className={styles.nodes} aria-label="Explore Viswas Vuppala's software, hardware, career, knowledge, and life beyond work">
          {NODES.map((node, index) => (
            <Link
              key={node.href}
              ref={(element) => {
                nodeRefs.current[index] = element;
              }}
              className={styles.node}
              href={node.href}
              onClick={(event) => {
                if (motionEnabled && !destinationsInteractiveRef.current) event.preventDefault();
              }}
            >
              <span className={styles.nodeIndex} aria-hidden="true">{node.index}</span>
              <span className={styles.nodeBody}>
                <span className={styles.nodeDescriptor}>{node.descriptor}</span>
                <strong>{node.title}</strong>
              </span>
              <span className={styles.nodeArrow} aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>

        <p id={instructionsId} className={styles.instructions}>
          Scroll to reveal five destinations connected directly to the portrait. The destinations become available when the reveal is complete. The header and Skip interaction link remain available throughout. Reduced-motion and fallback modes show every destination immediately.
        </p>
      </div>
    </section>
  );
}

export const SignalWorld = MindField;
