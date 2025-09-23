import type { Metadata } from "next";
import DimsumLanding from "./_components/DimsumLanding";

const siteUrl = "https://warmomski.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Warmomski SoE | Catering, Reseller, Frozen Pack",
  description:
    "Warmomski adalah brand dimsum homemade dari SoE dengan varian original, mayo, dan bolognese. Tersedia pesanan hangat, frozen pack, catering acara, dan reseller.",
  keywords: [
    "dimsum soe",
    "warmomski",
    "dimsum homemade",
    "dimsum frozen",
    "catering dimsum",
    "reseller dimsum",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Warmomski Dimsum Homemade SoE",
    description:
      "Dimsum homemade favorit keluarga SoE. Fresh kukus setiap hari, siap antar, dan tersedia paket event & reseller.",
    url: siteUrl,
    siteName: "Warmomski Dimsum",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1604908177077-091e9b8c2ab1?q=80&w=1600",
        width: 1600,
        height: 900,
        alt: "Warmomski Dimsum Homemade",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Warmomski Dimsum Homemade SoE",
    description:
      "Brand dimsum homemade dari SoE dengan menu original, mayo, dan bolognese. Pesan hangat atau frozen pack untuk keluarga dan acara.",
    images: ["https://images.unsplash.com/photo-1604908177077-091e9b8c2ab1?q=80&w=1600"],
  },
};

export default function Page() {
  return <DimsumLanding />;
}
