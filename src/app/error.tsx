"use client";

import Link from "next/link";
import { useEffect } from "react";

const backgroundUrl =
  "https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif";

type ErrorProps = {
  reset: () => void;
};

export default function GlobalError({ reset }: ErrorProps) {
  useEffect(() => {
    console.error("Warmomski app error: a client component triggered error page.");
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto w-full max-w-xl text-center">
        <div
          className="relative h-64 w-full overflow-hidden rounded-3xl shadow-[0_32px_80px_-32px_rgba(15,23,42,0.8)] sm:h-80"
          style={{
            backgroundImage: `url(${backgroundUrl})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          aria-hidden
        >
          <div className="absolute inset-0 flex items-center justify-center bg-rose-900/35 backdrop-blur">
            <span className="text-6xl font-black tracking-[0.25em] sm:text-7xl">
              Error
            </span>
          </div>
        </div>

        <div className="mt-10 space-y-4">
          <h1 className="text-3xl font-bold sm:text-4xl">
            Aduh, ada kesalahan di dapur Warmomski
          </h1>
          <p className="text-slate-300">
            Kami sedang memperbaikinya secepat mungkin. Kamu bisa memuat ulang
            halaman, kembali ke beranda, atau langsung chat tim kami melalui
            WhatsApp.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-rose-900/40 transition hover:bg-rose-400"
          >
            Muat Ulang Halaman
          </button>
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/10"
          >
            Kembali ke Beranda
          </Link>
          <Link
            href="https://wa.me/6285864966005"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/10"
          >
            Chat WhatsApp
          </Link>
        </div>
      </div>
    </main>
  );
}
