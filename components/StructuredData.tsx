import { serializeJsonLd, type JsonLdObject } from "@/lib";

export function StructuredData({ data }: { data: JsonLdObject | readonly JsonLdObject[] }) {
  const graph = Array.isArray(data) ? data : [data];

  return graph.map((entry, index) => (
    <script
      key={`${String(entry["@type"] ?? "schema")}-${index}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(entry) }}
    />
  ));
}
