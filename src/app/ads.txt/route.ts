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

  const accountType = process.env.ADSENSE_ACCOUNT_TYPE || "DIRECT";
  const certificationId = process.env.ADSENSE_CERTIFICATION_ID || "f08c47fec0942fa0";

  const adsTxtLine = `google.com, ${publisherId}, ${accountType}, ${certificationId}`;

  return new NextResponse(`${adsTxtLine}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
