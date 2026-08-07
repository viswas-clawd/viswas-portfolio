# Viswas Vuppala — Personal Authority Website

A cinematic, disclosure-safe portfolio for Viswas Vuppala. The site presents
selected AI product work, a sanitized product operating system, original field
notes, and an accessible glyph-portrait visual system.

## Local development

```bash
npm install
npm run dev
```

## Verification

```bash
npm run lint
npm test
```

`npm test` builds the Sites bundle, verifies every public route, checks private
preview indexing controls, confirms required assets, and scans the built surface
for excluded source material.

## Publication policy

The default build is a private preview with `noindex, nofollow` and a disallowing
`robots.txt`. Public indexing requires both a verified canonical `SITE_URL` and
`SITE_ALLOW_INDEXING=true`, and may only be enabled after Viswas explicitly
approves the exact version for public launch.
