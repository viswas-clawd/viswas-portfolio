import type { ReactNode } from "react";
import { projectVisualContent, type ProjectVisualKey } from "@/content";
import styles from "./project-visual.module.css";

export type { ProjectVisualKey } from "@/content/types";

const NODE_TEXT_LINE_HEIGHT = 18;

interface DiagramNodeProps {
  x: number;
  y: number;
  width: number;
  height: number;
  lines: readonly string[];
  rx?: number;
}

/** Keeps every diagram label aligned to the measured center of its node. */
function DiagramNode({ x, y, width, height, lines, rx = 8 }: DiagramNodeProps) {
  const centerX = x + width / 2;
  const centerY = y + height / 2;
  const firstLineY = centerY - ((lines.length - 1) * NODE_TEXT_LINE_HEIGHT) / 2;

  return (
    <g className={styles.node}>
      <rect className={styles.nodeShape} x={x} y={y} width={width} height={height} rx={rx} />
      <text x={centerX} y={firstLineY} textAnchor="middle" dominantBaseline="middle">
        {lines.map((line, index) => (
          <tspan key={line} x={centerX} y={firstLineY + index * NODE_TEXT_LINE_HEIGHT}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}

function HeliosVisual() {
  const labels = projectVisualContent.helios.labels;
  return (
    <>
      <path
        className={styles.flowTrace}
        d="M168 70H194V143H224M168 180H224M168 290H194V217H224M410 180H490"
      />
      <DiagramNode x={24} y={42} width={144} height={56} lines={labels[0]} />
      <DiagramNode x={24} y={152} width={144} height={56} lines={labels[1]} />
      <DiagramNode x={24} y={262} width={144} height={56} lines={labels[2]} />
      <DiagramNode x={224} y={107} width={186} height={146} lines={labels[3]} rx={12} />
      <DiagramNode x={490} y={128} width={126} height={104} lines={labels[4]} />
    </>
  );
}

function FedAiVisual() {
  const labels = projectVisualContent.fedai.labels;
  return (
    <>
      <path className={styles.flowTrace} d="M148 180H484" />
      <DiagramNode x={20} y={128} width={128} height={104} lines={labels[0]} />
      <DiagramNode x={180} y={128} width={112} height={104} lines={labels[1]} />
      <DiagramNode x={324} y={128} width={128} height={104} lines={labels[2]} />
      <DiagramNode x={484} y={128} width={136} height={104} lines={labels[3]} />
    </>
  );
}

function AwardLensVisual() {
  const labels = projectVisualContent.awardlens.labels;
  return (
    <>
      <path d="M74 286V66M74 286H590" />
      <text x="28" y="54">{labels[0][0]}</text>
      <text x="456" y="324">{labels[1][0]}</text>
      <path className={styles.optionA} d="M110 248C210 220 262 116 356 138S492 102 558 82" />
      <path className={styles.optionB} d="M110 214C204 152 282 244 376 194S496 188 558 142" />
      <circle cx="356" cy="138" r="9" />
      <circle cx="376" cy="194" r="9" />
      <text x="316" y="112">{labels[2][0]}</text>
    </>
  );
}

function ChatterVisual() {
  const labels = projectVisualContent.chatter.labels;
  return (
    <>
      <path className={styles.flowTrace} d="M144 180H472" />
      <DiagramNode x={12} y={116} width={132} height={128} lines={labels[0]} />
      <DiagramNode x={160} y={116} width={132} height={128} lines={labels[1]} />
      <DiagramNode
        x={308}
        y={116}
        width={148}
        height={128}
        lines={labels[2]}
      />
      <DiagramNode
        x={472}
        y={108}
        width={156}
        height={144}
        lines={labels[3]}
      />
    </>
  );
}

function HardwareVisual() {
  const labels = projectVisualContent["zyner-treaty"].labels;
  return (
    <>
      <path className={styles.trace} d="M320 128V174M320 174H152V224M320 174H488V224" />
      <DiagramNode x={250} y={40} width={140} height={88} lines={labels[0]} rx={10} />
      <DiagramNode x={62} y={224} width={180} height={88} lines={labels[1]} />
      <DiagramNode x={398} y={224} width={180} height={88} lines={labels[2]} />
      <text x="320" y="198" textAnchor="middle">{labels[3][0]}</text>
    </>
  );
}

const visuals: Record<ProjectVisualKey, () => ReactNode> = {
  helios: HeliosVisual,
  fedai: FedAiVisual,
  awardlens: AwardLensVisual,
  chatter: ChatterVisual,
  "zyner-treaty": HardwareVisual,
};

export function ProjectVisual({ project, label }: { project: ProjectVisualKey; label: string }) {
  const Visual = visuals[project];
  return (
    <figure className={`${styles.root} project-visual`} data-project-visual={project}>
      <svg viewBox="0 0 640 360" role="img" aria-label={label} preserveAspectRatio="xMidYMid meet">
        <title>{label}</title>
        <g aria-hidden="true">
          <Visual />
        </g>
      </svg>
    </figure>
  );
}
