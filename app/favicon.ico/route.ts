export function GET(request: Request) {
  return Response.redirect(new URL("/portrait-wordfield-v2.png", request.url), 307);
}
