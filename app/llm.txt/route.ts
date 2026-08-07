import { buildLlmMarkdown, buildMachineResourceHeaders } from "@/lib";

export function GET(request: Request) {
  const origin = new URL(request.url).origin;

  return new Response(buildLlmMarkdown(origin), {
    headers: buildMachineResourceHeaders("text/markdown; charset=utf-8"),
  });
}
