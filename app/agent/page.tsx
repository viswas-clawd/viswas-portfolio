import { permanentRedirect } from "next/navigation";

export default function LegacyAgentPage() {
  permanentRedirect("/llm.txt");
}
