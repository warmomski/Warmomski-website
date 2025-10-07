import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi | Warmomski",
  description:
    "Kebijakan privasi Warmomski menjelaskan penggunaan data, cookie, dan interaksi pengunjung dengan layanan kami.",
};

const sections = [
  {
    title: "1. Informasi yang Kami Kumpulkan",
    content:
      "Kami mengumpulkan informasi yang kamu berikan secara langsung saat mengisi formulir pemesanan, seperti nama, alamat, nomor telepon, dan preferensi pesanan. Kami juga menerima data teknis seperti alamat IP, jenis perangkat, dan halaman yang diakses untuk membantu kami memahami performa situs.",
  },
  {
    title: "2. Penggunaan Data",
    content:
      "Data digunakan untuk memproses pesanan dimsum Warmomski, memberikan dukungan pelanggan, mengelola promosi, serta menganalisis performa layanan. Informasi kontak dapat dipakai untuk mengirim konfirmasi, update status pesanan, atau penawaran yang relevan.",
  },
  {
    title: "3. Cookie dan Teknologi Pelacakan",
    content:
      "Situs Warmomski menggunakan cookie fungsional untuk menjaga sesi pemesanan tetap berjalan. Kami juga memakai cookie pihak ketiga seperti Google AdSense dan Google Analytics untuk menayangkan iklan yang relevan serta memahami interaksi pengunjung. Kamu bisa menonaktifkan cookie melalui pengaturan browser atau melalui halaman Ads Settings Google.",
  },
  {
    title: "4. Berbagi Data dengan Pihak Ketiga",
    content:
      "Kami tidak menjual data pribadi pelanggan. Informasi hanya dibagikan ke mitra tepercaya (misalnya penyedia logistik atau layanan pembayaran) sejauh diperlukan untuk menyelesaikan pesanan, memenuhi kewajiban hukum, atau mendukung analisis internal.",
  },
  {
    title: "5. Penyimpanan dan Keamanan",
    content:
      "Data pelanggan disimpan di sistem yang terlindungi dan diakses secara terbatas oleh tim Warmomski. Kami menerapkan kontrol keamanan teknis dan administratif untuk mencegah akses tanpa izin. Namun, risiko transmisi internet tetap ada, sehingga kami menghimbau pengguna menjaga kredensial pribadinya.",
  },
  {
    title: "6. Hak Pengguna",
    content:
      "Kamu dapat meminta salinan, pembaruan, atau penghapusan data pribadi dengan menghubungi kami via email atau WhatsApp. Kami akan menanggapi permintaan dalam waktu wajar sesuai regulasi yang berlaku.",
  },
  {
    title: "7. Informasi Kontak",
    content:
      "Untuk pertanyaan seputar kebijakan privasi atau permintaan terkait data, hubungi Warmomski melalui WhatsApp +62 858 6496 6005 atau email warmomski@gmail.com.",
  },
  {
    title: "8. Perubahan Kebijakan",
    content:
      "Kebijakan ini dapat diperbarui sewaktu-waktu. Tanggal versi terbaru akan kami tampilkan di bagian akhir halaman. Dengan terus menggunakan layanan setelah perubahan diterapkan, kamu dianggap menyetujui pembaruan tersebut.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="bg-amber-50 py-16 text-gray-800">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6">
        <header className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-500">
            Kebijakan Privasi
          </span>
          <h1 className="mt-4 text-3xl font-bold text-amber-800 md:text-4xl">
            Cara Warmomski Melindungi Data Pelanggan
          </h1>
          <p className="mt-3 text-sm text-gray-600 md:text-base">
            Halaman ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi pengunjung Warmomski.
          </p>
          <p className="mt-2 text-xs text-gray-500">Terakhir diperbarui: {new Date().getFullYear()}</p>
        </header>

        <section className="space-y-6 rounded-3xl border border-amber-200 bg-white p-6 shadow-sm md:p-10">
          {sections.map((section) => (
            <article key={section.title} className="space-y-2">
              <h2 className="text-lg font-semibold text-amber-700 md:text-xl">
                {section.title}
              </h2>
              <p className="text-sm leading-relaxed text-gray-700 md:text-base">
                {section.content}
              </p>
            </article>
          ))}
        </section>

        <footer className="rounded-3xl border border-amber-200 bg-white p-6 text-sm text-gray-600 shadow-sm md:p-8">
          <p>
            Dengan mengakses situs Warmomski, kamu menyetujui kebijakan privasi yang berlaku. Jika tidak
            setuju dengan salah satu ketentuannya, mohon hentikan penggunaan layanan kami.
          </p>
          <p className="mt-3">
            Pertanyaan atau permintaan khusus? Silakan hubungi kami melalui WhatsApp atau email. Kami akan
            menanggapi secepat mungkin.
          </p>
        </footer>
      </div>
    </main>
  );
}
