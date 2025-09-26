"use client";

import { CSSProperties, useEffect, type ReactNode } from "react";

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdSlotProps = {
  slotId?: string | null;
  format?: string;
  fullWidthResponsive?: boolean;
  style?: CSSProperties;
  className?: string;
  wrapperClassName?: string;
  placeholder?: ReactNode;
};

/**
 * Generic AdSense slot wrapper so we only render ads when IDs are configured.
 */
export default function AdSlot({
  slotId,
  format = "auto",
  fullWidthResponsive = true,
  style,
  className,
  wrapperClassName,
  placeholder,
}: AdSlotProps) {
  useEffect(() => {
    if (!ADSENSE_CLIENT_ID || !slotId) {
      return;
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.warn("AdSense slot failed to load", error);
    }
  }, [slotId]);

  if (!ADSENSE_CLIENT_ID || !slotId) {
    return placeholder ? <>{placeholder}</> : null;
  }

  return (
    <div className={wrapperClassName}>
      <ins
        className={`adsbygoogle ${className ?? ""}`.trim()}
        style={{ display: "block", ...(style ?? {}) }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={fullWidthResponsive ? "true" : undefined}
      />
    </div>
  );
}
