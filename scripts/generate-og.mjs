import sharp from "sharp";

const width = 1200;
const height = 630;
const mindWords = [
  "CONTEXT  INTENT  EVIDENCE",
  "DISCOVERY  USER  OUTCOME",
  "GROUND  GOVERN  EVALUATE",
  "DECIDE  TEST  LEARN  SHIP",
  "PROVENANCE  TRUST  SYSTEM",
  "AGENTIC  PRODUCT  JUDGMENT",
  "BOUNDARY  SIGNAL  RECEIPT",
];

const wordField = Array.from({ length: 12 }, (_, index) => {
  const text = mindWords[index % mindWords.length];
  return `<text x="738" y="${118 + index * 35}" class="glyph">${text}</text>`;
}).join("");

const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#000"/>
  <style>
    .sans { font-family: Arial, Helvetica, sans-serif; fill: #fff; }
    .mono { font-family: Menlo, Monaco, monospace; fill: #fff; }
    .glyph { font-family: Menlo, Monaco, monospace; font-size: 15px; font-weight: 700; letter-spacing: 2px; fill: #fff; }
  </style>
  <text x="64" y="58" class="mono" font-size="14" letter-spacing="2">VISWAS VUPPALA / AI PRODUCT LEADER</text>
  <line x1="64" y1="79" x2="1136" y2="79" stroke="#fff" stroke-width="1"/>
  <text x="64" y="188" class="sans" font-size="82" font-weight="700" letter-spacing="-4">AI SYSTEMS</text>
  <text x="64" y="271" class="sans" font-size="82" font-weight="700" letter-spacing="-4">THAT SHOW</text>
  <text x="64" y="354" class="sans" font-size="82" font-weight="700" letter-spacing="-4">THEIR WORK.</text>
  <text x="68" y="503" class="mono" font-size="15" letter-spacing="1">GROUND → GOVERN → SHIP</text>
  <text x="68" y="548" class="mono" font-size="12" letter-spacing="1.4">ENTERPRISE GENAI / CONTEXT INFRASTRUCTURE / AGENTIC PRODUCTS</text>
  <line x1="64" y1="580" x2="1136" y2="580" stroke="#fff" stroke-width="1"/>

  <defs>
    <clipPath id="head">
      <path d="M840 142 C760 170 728 246 742 332 C752 397 787 445 829 462 L830 520 L1024 520 L1019 459 C1061 432 1084 378 1080 309 C1074 219 1028 154 946 137 C908 129 871 131 840 142 Z"/>
      <path d="M752 505 C694 522 665 552 645 580 H1134 C1111 548 1075 520 1018 504 Z"/>
    </clipPath>
  </defs>
  <g clip-path="url(#head)">
    ${wordField}
  </g>
  <path d="M806 164 C855 119 951 112 1022 157" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="5 8"/>
  <path d="M846 132 C837 99 850 76 877 61" fill="none" stroke="#fff" stroke-width="1"/>
  <path d="M923 127 C925 91 948 69 978 56" fill="none" stroke="#fff" stroke-width="1"/>
  <path d="M992 145 C1018 117 1047 107 1083 108" fill="none" stroke="#fff" stroke-width="1"/>
  <rect x="871" y="55" width="7" height="7" fill="#fff"/>
  <rect x="975" y="52" width="7" height="7" fill="#fff"/>
  <rect x="1080" y="104" width="7" height="7" fill="#fff"/>
  <text x="1094" y="109" class="mono" font-size="10" letter-spacing="1">PROOF</text>
  <text x="1000" y="53" class="mono" font-size="10" letter-spacing="1">CONTEXT</text>
  <text x="786" y="58" class="mono" font-size="10" letter-spacing="1">INTENT</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile("public/og.png");

const faviconSvg = `
<svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
  <rect width="256" height="256" fill="#000"/>
  <rect x="16" y="16" width="224" height="224" fill="none" stroke="#fff" stroke-width="2"/>
  <text x="128" y="142" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="88" letter-spacing="-8" fill="#fff">VV</text>
  <text x="128" y="198" text-anchor="middle" font-family="Menlo, Monaco, monospace" font-size="13" letter-spacing="3" fill="#fff">AI / PM</text>
</svg>`;

await sharp(Buffer.from(faviconSvg)).png({ compressionLevel: 9 }).toFile("public/favicon.png");

const metadata = await sharp("public/og.png").metadata();
if (metadata.width !== width || metadata.height !== height) {
  throw new Error(`Unexpected OG dimensions: ${metadata.width}x${metadata.height}`);
}

console.log(`Generated public/og.png (${metadata.width}x${metadata.height}) and a code-only favicon.`);
