import Link from "next/link";

const backgroundUrl =
  "https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-amber-50 px-6 py-16">
      <div className="mx-auto w-full max-w-2xl rounded-[42px] border border-amber-100 bg-white px-8 py-12 text-center shadow-[0_42px_100px_-36px_rgba(120,53,15,0.35)]">
        <div
          className="relative mx-auto h-64 max-w-xl overflow-hidden"
          style={{
            backgroundImage: `url(${backgroundUrl})`,
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
          aria-hidden
        />
        <h1 className="mt-2 text-6xl font-black tracking-[0.3em] text-slate-900">404</h1>
        <div className="mt-6 space-y-2 text-amber-700">
          <p className="text-2xl font-semibold text-amber-800">
            Wah, halaman yang kamu cari tidak ditemukan
          </p>
          <p className="text-sm">
            Sepertinya tautan ini salah atau sudah tidak aktif. Yuk balik ke beranda Warmomski dan lanjut cari dimsum favoritmu.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-600"
          >
            Kembali ke Beranda
          </Link>
          <Link
            href="https://wa.me/6285864966005"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Chat WhatsApp
          </Link>
        </div>
      </div>
    </main>
  );
}
