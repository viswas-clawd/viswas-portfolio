import Image from "next/image";
import type { ProjectMedia as ProjectMediaRecord } from "@/content";
import { ProjectVisual } from "./ProjectVisual";
import styles from "./project-media.module.css";

interface ProjectMediaProps {
  media: ProjectMediaRecord;
  priority?: boolean;
}

export function ProjectMedia({ media, priority = false }: ProjectMediaProps) {
  if (media.kind === "diagram") {
    return <ProjectVisual project={media.visual} label={media.alt} />;
  }

  return (
    <figure className={`${styles.root} project-concept-media`}>
      <Image
        className={styles.image}
        src={media.src}
        alt={media.alt}
        width={media.width}
        height={media.height}
        sizes="(max-width: 48rem) 100vw, (max-width: 74rem) 64vw, 58vw"
        priority={priority}
        unoptimized
      />
      <figcaption>{media.caption}</figcaption>
    </figure>
  );
}
