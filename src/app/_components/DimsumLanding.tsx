"use client";

import { useRef, useState } from "react";
import Script from "next/script";
import Image from "next/image";
import AdSlot from "./AdSlot";

type CartItem = {
  name: string;
  size: string;
  price: number;
  qty: number;
};

type MenuItem = {
  name: string;
  img: string;
  desc: string;
  seoDesc: string;
  width: number;
  height: number;
  sizes: { size: string; price: number }[];
};

type NavLink = {
  label: string;
  href: string;
};

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
const ADSENSE_DEFAULT_SLOT_ID = process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID;
const ADSENSE_SLOT_AFTER_HERO = process.env.NEXT_PUBLIC_ADSENSE_SLOT_AFTER_HERO;
const ADSENSE_SLOT_MENU_FEATURE = process.env.NEXT_PUBLIC_ADSENSE_SLOT_MENU_FEATURE;
const ADSENSE_SLOT_AFTER_CART = process.env.NEXT_PUBLIC_ADSENSE_SLOT_AFTER_CART;
const ADSENSE_SLOT_BEFORE_TESTIMONIAL = process.env.NEXT_PUBLIC_ADSENSE_SLOT_BEFORE_TESTIMONIAL;

const SECTION_CONTAINER = "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-10";
const NARROW_CONTAINER = "mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-10";
const CONTACT_CONTAINER = "mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-10";

const menuItems: MenuItem[] = [
  {
    name: "Dimsum Original",
    img: "/dimsum-ori.png",
    desc: "Isi ayam segar dengan tekstur lembut khas Warmomski.",
    seoDesc: "Dimsum original homemade Warmomski dengan resep keluarga dan bahan lokal terbaik di SoE.",
    width: 2000,
    height: 2000,
    sizes: [
      { size: "Isi 4", price: 14000 },
      { size: "Isi 6", price: 20000 },
      { size: "Isi 8", price: 25000 },
      { size: "Isi 10", price: 30000 },
      { size: "Party Size Isi 16", price: 47000 },
    ],
  },
  {
    name: "Dimsum Mayonnaise",
    img: "/dimsum-mayo.png",
    desc: "Creamy mayo topping yang menyatu dengan isian gurih pilihan.",
    seoDesc: "Dimsum mayo homemade Warmomski dengan saus mayo creamy favorit anak dan keluarga.",
    width: 2000,
    height: 2000,
    sizes: [
      { size: "Isi 6", price: 22000 },
      { size: "Isi 8", price: 27000 },
      { size: "Isi 10", price: 32000 },
      { size: "Party Size Isi 16", price: 50000 },
    ],
  },
  {
    name: "Dimsum Bolognese",
    img: "/dimsum-bolo.png",
    desc: "Perpaduan saus bolognese premium dan dimsum hangat lembut.",
    seoDesc: "Dimsum bolognese Warmomski dengan saus tomat spesial untuk menu modern dan kekinian.",
    width: 1920,
    height: 1080,
    sizes: [
      { size: "Isi 6", price: 24000 },
      { size: "Isi 8", price: 29000 },
      { size: "Isi 10", price: 34000 },
      { size: "Party Size Isi 16", price: 52000 },
    ],
  },
  {
    name: "Es Pisang Ijo",
    img: "/es-pisang-ijo.png",
    desc: "Pisang ijo lembut dengan saus santan dan topping sagu mutiara dingin.",
    seoDesc: "Es Pisang Ijo segar Warmomski dengan sagu mutiara manis, pilihan minuman penutup favorit di musim panas.",
    width: 1920,
    height: 1080,
    sizes: [{ size: "Per Porsi", price: 10000 }],
  },
];

const sellingPoints = [
  {
    title: "Brand Homemade Lokal",
    copy: "Resep keluarga dengan bahan segar yang diolah tanpa pengawet.",
    icon: "🥟",
  },
  {
    title: "Kualitas Terpercaya",
    copy: "Dimasak fresh setiap hari, higienis, dan sudah dipercaya ratusan keluarga.",
    icon: "⭐",
  },
  {
    title: "Siap Kirim & Frozen",
    copy: "Pilih antara ready-to-eat hangat atau frozen pack untuk stok di rumah.",
    icon: "🚚",
  },
];

const faqs = [
  {
    question: "Berapa lama masa simpan dimsum Warmomski?",
    answer:
      "Dimsum frozen dapat disimpan di freezer hingga 2 bulan. Untuk kualitas terbaik, kukus selama 10-12 menit sebelum disantap.",
  },
  {
    question: "Apakah tersedia pengiriman ke luar Kota SoE?",
    answer:
      "Kami melayani pengiriman area SoE dan sekitarnya. Untuk luar kota, hubungi kami agar dapat mengatur pengiriman terbaik.",
  },
  {
    question: "Bisakah custom paket untuk acara?",
    answer:
      "Tentu! Kami menerima pesanan paket event, hampers, hingga katering. Tim kami akan bantu memilih kombinasi menu dan jumlah yang pas.",
  },
];

const navLinks: NavLink[] = [
  { label: "Menu", href: "#menu" },
  { label: "Kenapa Warmomski", href: "#brand" },
  { label: "Cara Order", href: "#order" },
  { label: "Review Pelanggan", href: "#testimoni" },
  { label: "Kontak", href: "#contact" },
];

const totalPrice = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.price * item.qty, 0);

const formatPrice = (value: number) => `Rp ${value.toLocaleString("id-ID")}`;

export default function DimsumLanding() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [fulfillment, setFulfillment] = useState<"pickup" | "delivery">("pickup");
  const [recentlyAdded, setRecentlyAdded] = useState<string | null>(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const cartSectionRef = useRef<HTMLDivElement | null>(null);

  const addToCart = (item: CartItem) => {
    setShowForm(false);
    setCart((prev) => {
      const existing = prev.find(
        (p) => p.name === item.name && p.size === item.size
      );
      if (existing) {
        return prev.map((p) =>
          p.name === item.name && p.size === item.size
            ? { ...p, qty: p.qty + 1 }
            : p
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setRecentlyAdded(`${item.name}-${item.size}`);
    setTimeout(() => setRecentlyAdded(null), 1800);
    requestAnimationFrame(() => {
      cartSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const removeFromCart = (item: CartItem) => {
    setShowForm(false);
    setCart((prev) => {
      const existing = prev.find(
        (p) => p.name === item.name && p.size === item.size
      );
      if (!existing) return prev;
      if (existing.qty === 1) {
        return prev.filter(
          (p) => !(p.name === item.name && p.size === item.size)
        );
      }
      return prev.map((p) =>
        p.name === item.name && p.size === item.size
          ? { ...p, qty: p.qty - 1 }
          : p
      );
    });
  };

  const cartSubtotal = totalPrice(cart);
  const cartShippingFee = fulfillment === "delivery" ? 5000 : 0;
  const cartTotal = cartSubtotal + cartShippingFee;

  return (
    <div className="bg-amber-50 text-gray-800 font-sans">
      <Script
        id="warmomski-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: "Warmomski Dimsum",
          description:
            "Warmomski Dimsum homemade di SoE dengan menu original, mayo, dan bolognese. Fresh, higienis, dan siap kirim.",
          image: "https://images.unsplash.com/photo-1604908177077-091e9b8c2ab1?q=80&w=1600",
          servesCuisine: "Dimsum",
          priceRange: "Rp10000-Rp52000",
          telephone: "+62 858 6496 6005",
          areaServed: "SoE and surrounding areas",
          url: "https://warmomski.id",
          sameAs: ["https://instagram.com/warmomski"],
          address: {
            "@type": "PostalAddress",
            streetAddress: "Kilo 2",
            addressLocality: "SoE",
            addressRegion: "NTT",
            postalCode: "85511",
            addressCountry: "ID",
          },
        })}
      </Script>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 shadow-sm backdrop-blur">
        <div className={`${SECTION_CONTAINER} flex flex-col gap-3 py-3 md:py-4`}>
          <div className="flex items-center gap-3 md:gap-6">
            <div className="flex items-center gap-3 md:gap-4">
              <Image
                src="/logo.svg"
                alt="Logo Warmomski"
                width={56}
                height={56}
                priority
                className="h-12 w-12 rounded-full border border-amber-100 bg-amber-50 p-1 object-contain shadow-sm"
              />
              <div className="leading-tight">
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-amber-600 md:text-xs">
                  Masakan Rumahan SoE
                </p>
                <h1 className="text-[26px] font-bold text-amber-800 md:text-[32px]">
                  Warmomski
                </h1>
              </div>
            </div>
            <div className="hidden flex-1 items-center gap-3 text-sm font-medium text-slate-700 md:flex md:justify-start">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="whitespace-nowrap rounded-full px-4 py-2 transition hover:bg-amber-100/80 hover:text-amber-700"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <a
              href="https://wa.me/6285864966005"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center justify-center rounded-full bg-amber-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-700 md:inline-flex"
            >
              Pesan via WA
            </a>
            <div className="ml-auto flex items-center gap-2 md:hidden">
              <a
                href="https://wa.me/6285864966005"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-amber-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-amber-700"
              >
                Pesan via WA
              </a>
              <button
                type="button"
                onClick={() => setIsNavOpen((prev) => !prev)}
                aria-expanded={isNavOpen}
                aria-label="Toggle navigasi"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-amber-200 bg-white text-amber-700 shadow-sm transition hover:border-amber-300 hover:bg-amber-50"
              >
                <span className="relative h-4 w-5">
                  <span
                    className={`absolute inset-x-0 top-0 h-0.5 rounded-full bg-current transition ${
                      isNavOpen ? "translate-y-1.5 rotate-45" : "translate-y-0"
                    }`}
                  />
                  <span
                    className={`absolute inset-x-0 top-1/2 h-0.5 translate-y-[-50%] rounded-full bg-current transition ${
                      isNavOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-current transition ${
                      isNavOpen ? "-translate-y-1.5 -rotate-45" : "translate-y-0"
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
          {isNavOpen ? (
            <div className="flex flex-col gap-2 rounded-2xl border border-amber-100 bg-white/90 px-4 py-4 text-sm font-medium text-slate-700 shadow-sm md:hidden">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsNavOpen(false)}
                  className="rounded-full px-4 py-2 text-center transition hover:bg-amber-100/80 hover:text-amber-700"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-900 via-amber-700 to-amber-500 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_55%)]" />
        <div className="absolute -top-16 -right-20 hidden h-64 w-64 rounded-full border border-white/30 bg-white/10 blur-3xl md:block" />
        <div className={`${SECTION_CONTAINER} relative flex flex-col items-center gap-10 py-16 md:flex-row md:items-start md:justify-between md:py-24`}>
          <div className="text-center md:w-1/2 md:text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium tracking-wide text-amber-100 backdrop-blur">
              <Image src="/warmomski-b.svg" alt="Warmomski wordmark" width={96} height={24} className="h-5 w-auto" />
              Handmade • Higienis • Halal
            </span>
            <h2 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
              Dimsum Homemade Hangat dengan Sentuhan Premium untuk Setiap Momen
            </h2>
            <p className="mt-5 text-lg text-amber-100 md:text-xl">
              Warmomski menghadirkan dimsum ramah keluarga dengan opsi fresh kukus atau frozen pack. Tinggal pilih varian favoritmu, kami urus sampai ke pintu rumah.
            </p>
            <p className="mt-3 text-sm uppercase tracking-[0.25em] text-amber-200">
              Favorit pelanggan: Dimsum Mayonnaise creamy kesukaan keluarga
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#menu"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-amber-700 shadow-lg shadow-amber-900/30 transition hover:bg-amber-100"
              >
                Lihat Menu & Harga
              </a>
              <a
                href="#funnel"
                className="inline-flex items-center justify-center rounded-xl border border-white/60 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Konsultasi Order Acara
              </a>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-3 text-sm text-amber-100 sm:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="font-semibold">Fresh Dimasak</p>
                <p className="mt-1 text-xs text-amber-100/80">
                  Kukus langsung saat dipesan, tetap juicy sampai di tanganmu.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="font-semibold">Frozen Pack Ready</p>
                <p className="mt-1 text-xs text-amber-100/80">
                  Simpan hingga 2 bulan. Praktis buat stok di rumah atau jual lagi.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="font-semibold">Resep Keluarga</p>
                <p className="mt-1 text-xs text-amber-100/80">
                  Tanpa MSG berlebih, aman untuk anak dan lansia.
                </p>
              </div>
            </div>
          </div>
          <div className="relative w-full md:w-2/5">
            <div className="absolute -top-10 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-white/40 bg-white/20 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-amber-900/40 backdrop-blur md:flex">
              <span className="text-lg">⭐</span>
              Rating 4.9/5
            </div>
            <div className="relative rounded-[36px] border border-white/15 bg-white/15 p-5 shadow-[0_32px_80px_-24px_rgba(0,0,0,0.55)] backdrop-blur-xl">
              <div className="absolute -left-12 top-10 hidden h-28 w-28 rounded-full bg-amber-400/30 blur-2xl md:block" />
              <div className="absolute -right-14 -bottom-14 hidden h-32 w-32 rounded-full bg-amber-200/30 blur-3xl md:block" />
              <div className="overflow-hidden rounded-[28px] border border-white/20 shadow-[0_22px_48px_-24px_rgba(0,0,0,0.65)]">
                <Image
                  src="/dimsum-mayo.png"
                  alt="Dimsum Mayonnaise Warmomski"
                  width={2000}
                  height={2000}
                  priority
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />
              </div>
              <div className="relative -mt-9 mx-auto flex w-[88%] flex-col gap-3 rounded-[22px] border border-amber-100/80 bg-gradient-to-br from-white via-amber-50 to-amber-100/60 px-6 py-5 text-sm text-amber-800 shadow-[0_20px_46px_-20px_rgba(131,69,9,0.6)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-base font-semibold text-amber-800">Dimsum Mayo Favorit Keluarga</p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.28em] text-amber-500">
                      Best Seller • Isi 10 pcs
                    </p>
                  </div>
                  <span className="rounded-2xl bg-amber-500 px-4 py-2 text-xs font-bold text-white shadow-inner shadow-amber-700/20">
                    Rp 32.000
                  </span>
                </div>
                <p className="text-xs text-amber-700/80">
                  Paket isi 10 dengan mayo creamy yang jadi best seller sepanjang tahun.
                </p>
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/85 px-4 py-3 text-xs text-amber-700 shadow-inner">
                  <span className="flex items-center gap-2 font-medium">
                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    Ready stok harian
                  </span>
                  <span className="flex items-center gap-2 font-semibold text-amber-600">
                    <span className="inline-flex h-2 w-6 rounded-full bg-amber-400/70" />
                    Langganan keluarga SoE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section id="brand" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-500">
              Kenapa Warmomski
            </p>
            <h3 className="mt-4 text-3xl font-bold text-amber-800">
              Dibuat dengan Hati, Disajikan dengan Standar Restoran
            </h3>
            <p className="mt-3 text-base text-gray-600">
              Kami menjaga kualitas dari bahan baku sampai pengemasan supaya kamu mendapatkan dimsum yang lezat, higienis, dan konsisten setiap kali order.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {sellingPoints.map((point) => (
              <div
                key={point.title}
                className="group relative rounded-3xl border border-amber-100 bg-gradient-to-b from-white via-amber-50 to-amber-100/40 p-8 text-center shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-3xl shadow-inner shadow-amber-200">
                  <span role="img" aria-label={point.title}>
                    {point.icon}
                  </span>
                </div>
                <h4 className="mt-5 text-xl font-semibold text-amber-700">
                  {point.title}
                </h4>
                <p className="mt-3 text-sm text-gray-700">{point.copy}</p>
                <div className="absolute inset-x-10 -bottom-2 h-2 rounded-full bg-amber-200/60 opacity-0 blur group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Slot - After Hero */}
      {ADSENSE_CLIENT_ID && (ADSENSE_SLOT_AFTER_HERO || ADSENSE_DEFAULT_SLOT_ID) ? (
        <section className="bg-white/90 py-6">
          <div className={`${NARROW_CONTAINER} flex justify-center`}> 
            <AdSlot
              slotId={ADSENSE_SLOT_AFTER_HERO || ADSENSE_DEFAULT_SLOT_ID}
              wrapperClassName="w-full"
              style={{ minHeight: 90, width: "100%" }}
            />
          </div>
        </section>
      ) : null}

      {/* Menu */}
      <section id="menu" className="py-16 bg-gradient-to-b from-amber-100 via-amber-50 to-amber-100">
        <div className={`${SECTION_CONTAINER} text-center`}>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-500">
            Menu Favorit
          </p>
          <h3 className="mt-4 text-3xl font-bold text-amber-800">
            Pilihan Varian Dimsum yang Bikin Ketagihan
          </h3>
          <p className="mt-3 text-gray-700">
            Tiap varian dimsum Warmomski dimasak fresh dengan saus khas rumahan. Pilih ukuran sesuai kebutuhanmu, tinggal klik untuk tambah ke keranjang.
          </p>
        </div>
        <div className={`${SECTION_CONTAINER} mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3`}>
          {menuItems.map((item, index) => {
            const isBestSeller = item.name.includes("Mayonnaise");
            const isSignature = item.name.includes("Original");
            const tag = isBestSeller
              ? "Best Seller"
              : isSignature
              ? "Signature"
              : "Menu Baru";
            const startingPrice = formatPrice(item.sizes[0].price);
            const startingPriceValue = startingPrice.replace("Rp ", "");
            const shouldCenterSoloRow =
              menuItems.length % 3 === 1 && index === menuItems.length - 1;

            return (
              <article
                key={item.name}
                className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-amber-200/70 bg-white shadow-[0_16px_40px_-24px_rgba(30,41,59,0.18)] transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_28px_60px_-28px_rgba(30,41,59,0.24)]${
                  shouldCenterSoloRow ? " md:col-start-2" : ""
                }`}
              >
                <div className="relative">
                  <Image
                    src={item.img}
                    alt={`${item.name} Warmomski`}
                    width={item.width}
                    height={item.height}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-amber-900/80 via-amber-900/20 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                  <span className="absolute left-4 top-4 rounded-full border border-amber-300/80 bg-white/95 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-700 shadow">
                    {tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-4 p-6 text-left">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-xl font-semibold text-amber-700">
                        {item.name}
                      </h4>
                      <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
                    </div>
                    <div className="rounded-[18px] bg-amber-100 px-3 py-2 text-right shadow-inner shadow-amber-200/40">
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.32em] text-amber-600">
                        Mulai
                      </span>
                      <span className="mt-1 flex items-baseline justify-end gap-1 font-semibold text-amber-800">
                        <span className="text-[11px] uppercase tracking-[0.24em]">Rp</span>
                        <span className="text-sm font-bold tabular-nums tracking-tight">
                          {startingPriceValue}
                        </span>
                      </span>
                    </div>
                  </div>
                  <p className="text-xs italic text-gray-500">{item.seoDesc}</p>
                  <div className="mt-1 flex flex-1 flex-col gap-3">
                    {item.sizes.map((size) => (
                      <div
                        key={size.size}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-100/80 bg-gradient-to-r from-amber-50/80 via-white to-amber-50/80 px-4 py-3 text-sm transition hover:-translate-y-1 hover:border-amber-200 hover:shadow-[0_12px_26px_-20px_rgba(30,41,59,0.22)]"
                      >
                        <button
                          onClick={() =>
                            addToCart({
                              name: item.name,
                              size: size.size,
                              price: size.price,
                              qty: 1,
                            })
                          }
                          className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-[11px] font-semibold uppercase tracking-wide shadow transition ${
                            recentlyAdded === `${item.name}-${size.size}`
                              ? "bg-green-600 text-white"
                              : "bg-amber-600 text-white hover:bg-amber-700"
                          }`}
                        >
                          {recentlyAdded === `${item.name}-${size.size}` ? "✔ Ditambahkan" : `Tambah ${size.size}`}
                        </button>
                        <span className="min-w-[92px] rounded-full bg-white px-3 py-1.5 text-center text-sm font-semibold text-amber-700 shadow-sm tabular-nums">
                          {formatPrice(size.price)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}

          {ADSENSE_CLIENT_ID && ADSENSE_SLOT_MENU_FEATURE ? (
            <article className="flex h-full flex-col justify-center gap-3 overflow-hidden rounded-[28px] border border-amber-200/70 bg-gradient-to-br from-white via-amber-50 to-amber-100/60 p-6 text-center shadow-[0_16px_40px_-24px_rgba(30,41,59,0.18)]">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-500">
                Sponsored
              </p>
              <h4 className="text-xl font-semibold text-amber-800">
                Rekomendasi Untukmu
              </h4>
              <p className="text-sm text-gray-600">
                Iklan personal relevan akan tampil di sini untuk membantu pengunjung menemukan promo menarik.
              </p>
              <div className="mt-3 flex justify-center">
                <AdSlot
                  slotId={ADSENSE_SLOT_MENU_FEATURE}
                  format="auto"
                  style={{ width: 300, height: 300 }}
                  fullWidthResponsive={false}
                />
              </div>
            </article>
          ) : null}
        </div>

        {/* Cart */}
        <div
          ref={cartSectionRef}
          className={`${NARROW_CONTAINER} mt-14 rounded-3xl border border-amber-200 bg-white/90 p-6 text-center shadow-xl sm:p-8`}
        >
          <h4 className="text-2xl font-bold text-amber-800">
            🛒 Keranjang Pesananmu
          </h4>
          <p className="mt-2 text-sm text-gray-600">
            Kamu bisa edit jumlah pesanan sebelum checkout via WhatsApp.
          </p>
          {cart.length === 0 ? (
            <p className="mt-5 text-gray-600">
              Belum ada pesanan. Pilih ukuran dimsum favoritmu lalu tekan tombol Tambah untuk mulai checkout.
            </p>
          ) : (
            <>
              <ul className="mt-6 divide-y divide-amber-100 text-left text-gray-700">
                {cart.map((item) => (
                  <li key={`${item.name}-${item.size}`} className="flex items-center justify-between py-3">
                    <span className="font-medium text-amber-800">
                      {item.name} ({item.size})
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => removeFromCart(item)}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white shadow-inner shadow-red-800/30 transition hover:bg-red-600"
                      >
                        -
                      </button>
                      <span>{item.qty}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-white shadow-inner shadow-green-800/30 transition hover:bg-green-600"
                      >
                        +
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 space-y-1">
                <p className="text-sm text-gray-600">
                  Subtotal: {formatPrice(cartSubtotal)}
                </p>
                {fulfillment === "delivery" && (
                  <p className="text-sm text-gray-600">
                    Ongkir: {formatPrice(cartShippingFee)}
                  </p>
                )}
                <p className="font-semibold text-amber-700">
                  Total: {formatPrice(cartTotal)}
                </p>
              </div>
              {!showForm ? (
                <button
                  onClick={() => setShowForm(true)}
                  className="mt-6 inline-flex items-center justify-center rounded-2xl bg-amber-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-amber-700"
                >
                  Konfirmasi Pesanan
                </button>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const fulfillmentChoice = (formData.get("fulfillment") || "pickup") as
                      | "pickup"
                      | "delivery";
                    const name = (formData.get("name") as string) || "";
                    const address = (formData.get("address") as string) || "-";
                    const phone = (formData.get("phone") as string) || "";
                    const payment = (formData.get("payment") as string) || "";

                    const subtotal = totalPrice(cart);
                    const subtotalMessage = `Subtotal: ${formatPrice(subtotal)}`;
                    const shippingFee = fulfillmentChoice === "delivery" ? 5000 : 0;
                    const totalWithShipping = subtotal + shippingFee;
                    const shippingLine =
                      shippingFee > 0
                        ? `Ongkir: ${formatPrice(shippingFee)}\n`
                        : "";
                    const fulfillmentLabel =
                      fulfillmentChoice === "delivery"
                        ? "Diantar (ongkir Rp 5.000)"
                        : "Pickup";

                    const pesan = `Halo Warmomski! Saya mau pesan:\n${cart
                      .map(
                        (item) =>
                          `- ${item.name} (${item.size}) x${item.qty} = ${formatPrice(
                            item.price * item.qty
                          )}`
                      )
                      .join("\n")}\n\n${subtotalMessage}\n${shippingLine}Total: ${formatPrice(
                      totalWithShipping
                    )}\nMetode Pengiriman: ${fulfillmentLabel}\n\nNama: ${name}\nAlamat: ${address}\nNo HP: ${phone}\nMetode Pembayaran: ${payment}`;

                    const waUrl = `https://wa.me/6285864966005?text=${encodeURIComponent(
                      pesan
                    )}`;
                    window.open(waUrl, "_blank");
                    setShowForm(false);
                  }}
                  className="mt-6 flex flex-col gap-3 text-left"
                >
                  <div className="flex flex-col md:flex-row gap-3">
                    <label className="flex items-center gap-2 rounded-xl border border-transparent bg-amber-50 px-3 py-2 font-medium text-gray-700 transition hover:border-amber-300">
                      <input
                        type="radio"
                        name="fulfillment"
                        value="pickup"
                        checked={fulfillment === "pickup"}
                        onChange={() => setFulfillment("pickup")}
                      />
                      <span className="text-sm">Pickup di Kilo 2, SoE</span>
                    </label>
                    <label className="flex items-center gap-2 rounded-xl border border-transparent bg-amber-50 px-3 py-2 font-medium text-gray-700 transition hover:border-amber-300">
                      <input
                        type="radio"
                        name="fulfillment"
                        value="delivery"
                        checked={fulfillment === "delivery"}
                        onChange={() => setFulfillment("delivery")}
                      />
                      <span className="text-sm">Diantar (ongkir Rp 5.000)</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Nama lengkap"
                    className="rounded-xl border border-amber-100 px-4 py-3 focus:border-amber-400 focus:outline-none focus:ring focus:ring-amber-100"
                    required
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Alamat lengkap"
                    className="rounded-xl border border-amber-100 px-4 py-3 focus:border-amber-400 focus:outline-none focus:ring focus:ring-amber-100"
                    required={fulfillment === "delivery"}
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Nomor HP"
                    className="rounded-xl border border-amber-100 px-4 py-3 focus:border-amber-400 focus:outline-none focus:ring focus:ring-amber-100"
                    required
                  />
                  <select
                    name="payment"
                    className="rounded-xl border border-amber-100 px-4 py-3 focus:border-amber-400 focus:outline-none focus:ring focus:ring-amber-100"
                    required
                  >
                    <option value="">Pilih metode pembayaran</option>
                    <option value="Transfer Bank">Transfer Bank</option>
                    <option value="E-Wallet">E-Wallet</option>
                    <option value="QRIS">QRIS</option>
                    <option value="COD">COD (Bayar di tempat)</option>
                  </select>
                  <button
                    type="submit"
                    className="mt-4 inline-flex items-center justify-center rounded-2xl bg-green-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-green-700"
                  >
                    Checkout via WhatsApp
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </section>

      {ADSENSE_CLIENT_ID && ADSENSE_SLOT_AFTER_CART ? (
        <section className="bg-white py-8">
          <div className="mx-auto max-w-4xl px-4">
            <h3 className="text-center text-xs font-semibold uppercase tracking-[0.35em] text-amber-500">
              Sponsored
            </h3>
            <div className="mt-4 flex justify-center">
              <AdSlot
                slotId={ADSENSE_SLOT_AFTER_CART}
                style={{ width: 336, height: 280 }}
                fullWidthResponsive={false}
              />
            </div>
          </div>
        </section>
      ) : null}

      {/* Funnel CTA */}
      <section id="funnel" className="py-16">
        <div className={`${NARROW_CONTAINER} relative overflow-hidden rounded-3xl border border-amber-200 bg-gradient-to-br from-white via-amber-50 to-amber-200/40 p-8 text-center shadow-2xl md:p-12`}>
          <div className="absolute -right-12 top-8 hidden h-48 w-48 opacity-10 md:block">
            <Image src="/logo.svg" alt="Warmomski monogram" fill sizes="192px" className="object-contain" />
          </div>
          <div className="absolute -left-16 -bottom-16 hidden h-56 w-56 rounded-full bg-amber-200/40 blur-3xl md:block" />
          <h3 className="text-3xl font-bold text-amber-800">
            Rencanakan Pesanan untuk Event atau Reseller
          </h3>
          <p className="mt-4 text-gray-700">
            Tim Warmomski siap bantu kamu membuat paket dimsum untuk ulang tahun, katering kantor, hingga kolaborasi reseller. Tinggal ceritakan kebutuhanmu, kami atur sisanya.
          </p>
          <div className="mt-10 grid gap-6 text-left text-gray-700 md:grid-cols-3">
            {[
              {
                title: "1. Konsultasi Menu",
                copy:
                  "Pilih kombinasi varian, jumlah, dan opsi penyajian (hangat atau frozen pack).",
              },
              {
                title: "2. Jadwalkan Pengiriman",
                copy:
                  "Kami bantu atur jadwal delivery atau pickup supaya tepat waktu dengan acara kamu.",
              },
              {
                title: "3. Siap Dinikmati",
                copy:
                  "Dimsum fresh, warm, dan dikemas rapi. Tinggal disajikan ke tamu atau pelanggan loyalmu.",
              },
            ].map((step) => (
              <div
                key={step.title}
                className="rounded-2xl border border-amber-100 bg-white/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg"
              >
                <h4 className="font-semibold text-amber-700">{step.title}</h4>
                <p className="mt-3 text-sm text-gray-600">{step.copy}</p>
              </div>
            ))}
          </div>
          <a
            href="https://wa.me/6285864966005?text=Halo%20Warmomski!%20Saya%20ingin%20konsultasi%20paket%20dimsum%20untuk%20acara."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center justify-center rounded-2xl bg-amber-700 px-8 py-3 font-semibold text-white shadow-lg transition hover:bg-amber-800"
          >
            Konsultasi WhatsApp Sekarang
          </a>
        </div>
      </section>

      {/* Cara Pesan */}
      <section id="order" className="py-16 bg-white">
        <div className={NARROW_CONTAINER}>
          <h3 className="mb-10 text-center text-3xl font-bold text-amber-800">
            Cara Pesan Dimsum Warmomski
          </h3>
          <div className="grid gap-6 text-gray-700 sm:grid-cols-2 xl:grid-cols-3">
            {[
              {
                title: "Pilih Menu",
                copy: "Tambahkan varian favorit beserta ukuran ke keranjang belanja Warmomski.",
              },
              {
                title: "Isi Detail",
                copy: "Tentukan pengiriman pickup/antar, alamat, dan metode pembayaran pilihanmu.",
              },
              {
                title: "Checkout via WA",
                copy: "Klik checkout, konfirmasi di WhatsApp, dan tim kami akan proses pesananmu dengan cepat.",
              },
            ].map((step, index) => (
              <div
                key={step.title}
                className="rounded-2xl border border-amber-100 bg-amber-50/60 p-6 text-center shadow-sm"
              >
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-lg font-bold text-amber-700 shadow">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <h4 className="mt-4 text-xl font-semibold text-amber-800">{step.title}</h4>
                <p className="mt-3 text-sm">{step.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tentang */}
      <section className="relative py-16 bg-amber-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.6),_transparent_65%)]" />
        <div className={`${NARROW_CONTAINER} relative grid gap-10 items-center md:grid-cols-2`}>
          <div className="relative overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-2xl">
            <Image
              src="/about-warmomski.jpeg"
              alt="Kemasan branding Warmomski"
              width={960}
              height={1280}
              sizes="(min-width: 1024px) 40vw, (min-width: 768px) 45vw, 100vw"
              className="h-full w-full object-cover md:h-[420px]"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent p-5 text-white">
              <p className="text-sm uppercase tracking-[0.25em] text-amber-200">
                Homemade Trusted Brand
              </p>
              <p className="text-lg font-semibold">UMKM keluarga</p>
            </div>
          </div>
          <div className="text-gray-700">
            <h3 className="text-3xl font-bold mb-4 text-amber-800">Tentang Warmomski</h3>
            <p className="mb-4">
              Warmomski Dimsum lahir dari dapur keluarga yang ingin menghadirkan cemilan hangat dan sehat untuk warga SoE. Kami mengolah bahan lokal terbaik tanpa pengawet berlebih dan selalu menjaga higienitas dapur.
            </p>
            <p className="mb-4">
              Setiap batch dimsum dibuat dalam jumlah terbatas supaya cita rasa tetap konsisten. Sajian kami cocok untuk teman minum teh, hampers ulang tahun, hingga stok jualan reseller.
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-200 text-xs font-bold text-amber-800">
                  1
                </span>
                <span>Resep keluarga dengan bahan lokal berkualitas.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-200 text-xs font-bold text-amber-800">
                  2
                </span>
                <span>Produksi higienis dengan proses kukus fresh setiap hari.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-200 text-xs font-bold text-amber-800">
                  3
                </span>
                <span>Packaging cantik dan aman untuk perjalanan luar kota.</span>
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              {[
                "100% Halal",
                "Tanpa Pengawet",
                "Bisa Preorder Besar",
              ].map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-amber-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-amber-700"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {ADSENSE_CLIENT_ID && ADSENSE_SLOT_BEFORE_TESTIMONIAL ? (
        <section className="bg-white py-8">
          <div className={NARROW_CONTAINER}>
            <div className="rounded-3xl border border-amber-200/70 bg-amber-50/60 p-6 text-center shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-500">
                sponsored highlight
              </p>
              <div className="mt-4 flex justify-center">
                <AdSlot
                  slotId={ADSENSE_SLOT_BEFORE_TESTIMONIAL}
                  format="auto"
                  style={{ width: 300, height: 600 }}
                  fullWidthResponsive={false}
                />
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Testimoni */}
      <section id="testimoni" className="py-16 bg-gradient-to-br from-amber-900 via-amber-700 to-amber-600 text-white">
        <div className={`${SECTION_CONTAINER} text-center`}>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-200">
            Testimoni
          </p>
          <h3 className="mt-3 text-3xl font-bold">Apa Kata Pelanggan Warmomski?</h3>
          <p className="mt-3 text-amber-100">
            Ratusan pelanggan SoE dan sekitarnya sudah menjadikan Warmomski pilihan utama untuk suguhan keluarga dan event.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote: "Dimsumnya juicy banget, saus bolognese-nya bikin beda dari yang lain!",
                name: "Putri, Mamapreneur SoE",
              },
              {
                quote: "Anak-anak selalu request dimsum mayo Warmomski tiap weekend. Aman karena rasanya nggak terlalu asin.",
                name: "Maya, Ibu Rumah Tangga",
              },
              {
                quote: "Paket frozen-nya praktis. Tinggal kukus 10 menit udah siap jual di kedai kopi saya.",
                name: "Fajar, Owner Kedai",
              },
            ].map((review) => (
              <figure
                key={review.name}
                className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-6 text-left shadow-lg backdrop-blur"
              >
                <span className="text-4xl text-amber-200">“</span>
                <blockquote className="mt-2 text-sm text-amber-50">{review.quote}</blockquote>
                <figcaption className="mt-6 text-xs font-semibold uppercase tracking-wide text-amber-200">
                  {review.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className={NARROW_CONTAINER}>
          <h3 className="mb-10 text-center text-3xl font-bold text-amber-800">
            Pertanyaan yang Sering Diajukan
          </h3>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-amber-100 bg-amber-50/80 p-5 shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-left font-semibold text-amber-700">
                  <span>{faq.question}</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-amber-700 transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-gray-700">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Kontak */}
      <section id="contact" className="py-16">
        <div className={`${CONTACT_CONTAINER} rounded-[36px] border border-amber-200 bg-white p-8 text-center shadow-xl shadow-amber-900/10 md:p-12`}>
          <div className="flex flex-col items-center gap-4 text-amber-800">
            <h3 className="text-3xl font-bold text-amber-800">Hubungi Kami</h3>
            <p className="text-sm text-gray-600">
              Tim Warmomski siap bantu pilih paket terbaik untuk keluarga, event kantor, maupun reseller.
            </p>
          </div>
          <div className="mt-8 grid gap-6 text-left text-gray-700 md:grid-cols-2">
            <div className="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 via-white to-amber-50 p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">Pickup Point</p>
              <p className="mt-2 font-semibold text-amber-800">Kilo 2, Kota SoE, Nusa Tenggara Timur</p>
              <p className="mt-3 text-sm">
                Jam operasional: Senin - Jumat, 10.00 - 18.00 WITA
              </p>
              <p className="mt-1 text-sm text-amber-700">
                Sabtu: Hadir di CFD SoE • Minggu: Tutup
              </p>
              <a
                href="https://maps.app.goo.gl/tRg1xhxCV6DjK99U7"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-emerald-700"
              >
                Buka di Google Maps
              </a>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 via-white to-amber-50 p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">Kontak</p>
              <p className="mt-2 text-sm">
                WhatsApp:{" "}
                <a
                  href="https://wa.me/6285864966005"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-amber-700 hover:underline"
                >
                  +62 858 6496 6005
                </a>
              </p>
              <p className="mt-2 text-sm">
                Instagram:{" "}
                <a
                  href="https://instagram.com/warmomski"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-amber-700 hover:underline"
                >
                  @warmomski
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-amber-900 text-white text-center">
        <Image
          src="/warmomski-b.svg"
          alt="Warmomski"
          width={160}
          height={40}
          className="mx-auto h-10 w-auto"
        />
        <h3 className="mt-6 text-3xl font-bold">Siap Hangatkan Harimu dengan Dimsum Warmomski?</h3>
        <p className="mt-3 text-amber-100">
          Pesan sekarang dan rasakan dimsum homemade favorit keluarga di SoE.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#menu"
            className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 font-semibold text-amber-700 shadow-lg transition hover:bg-amber-100"
          >
            Mulai Pilih Menu
          </a>
          <a
            href="https://wa.me/6285864966005"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-2xl border border-white/70 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Konsultasi Menu via WA
          </a>
          <a
            href="https://maps.app.goo.gl/tRg1xhxCV6DjK99U7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-2xl border border-white/70 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Lihat Lokasi Warmomski
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-950 py-6 text-sm text-amber-100">
        <div className={`${SECTION_CONTAINER} flex flex-col items-center justify-between gap-3 md:flex-row`}>
          <p>© {new Date().getFullYear()} Warmomski. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/6285864966005"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              WhatsApp
            </a>
            <span className="hidden h-1 w-1 rounded-full bg-amber-500 md:inline-block" />
            <a
              href="https://maps.app.goo.gl/tRg1xhxCV6DjK99U7"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              Lokasi
            </a>
            <span className="hidden h-1 w-1 rounded-full bg-amber-500 md:inline-block" />
            <a
              href="https://instagram.com/warmomski"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
