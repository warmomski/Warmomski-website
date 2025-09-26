import { NextResponse } from "next/server";

/**
 * Serves the ads.txt file dynamically so the AdSense publisher ID can stay in env vars.
 * AdSense expects this file at the root: https://your-domain/ads.txt.
 */
export function GET() {
  const publisherId = process.env.ADSENSE_PUBLISHER_ID;

  if (!publisherId) {
    return new NextResponse("ads.txt not configured", { status: 404 });
  }

  const adsTxt = `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0`;

  return new NextResponse(adsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
