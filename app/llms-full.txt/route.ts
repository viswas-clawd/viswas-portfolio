import { redirectLegacyAgentResource } from "@/lib";

export function GET(request: Request) {
  return redirectLegacyAgentResource(request);
}
