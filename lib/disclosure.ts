import type {
  ClaimRecord,
  DisclosureStatus,
  ProjectCallToAction,
  ProjectCaseStudy,
} from "./types";

const PUBLIC_CONTENT_STATUSES: ReadonlySet<DisclosureStatus> = new Set([
  "public",
  "abstracted",
]);

/** Public pages may include approved or deliberately abstracted material only. */
export function isPublishableDisclosure(
  disclosure: DisclosureStatus,
): boolean {
  return PUBLIC_CONTENT_STATUSES.has(disclosure);
}

export function isPublishableClaim(claim: ClaimRecord): boolean {
  return claim.approved && isPublishableDisclosure(claim.disclosure);
}

export function isPublishableProject(project: ProjectCaseStudy): boolean {
  return isPublishableDisclosure(project.disclosure);
}

export function isActiveProjectCallToAction(
  cta: ProjectCallToAction,
): cta is Extract<ProjectCallToAction, { status: "public" }> {
  return cta.status === "public";
}
