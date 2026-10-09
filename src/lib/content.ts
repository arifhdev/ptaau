// Seluruh teks diambil dari situs lama pt-aau.com (versi ID & EN).

import type { Locale } from "./routes";

export type { Locale };

export const company = {
  name: "PT Aditya Andhika Utama",
  short: "PT.AAU",
  founded: "1994-05-26",
  email: "marketing@pt-aau.com",
  phone: "021-44834737",
  phoneAlt: "021-44834745",
  mobile: "0813 88888 792",
  whatsapp: "6281388888792",
  office: {
    lines: ["Gudang Central Cakung Blok M20", "Jl. Raya Cakung Cilincing Km.3", "Jakarta Utara 14140"],
    maps: "https://maps.app.goo.gl/eMLFKqgqALDTajKp7",
    embed: "https://www.google.com/maps?q=Gudang+Central+Cakung+Blok+M20+Jakarta+Utara&output=embed",
  },
  warehouse: {
    lines: ["Jl. Raya Cakung Cilincing Km.2", "Kav. C No. 792", "Jakarta Timur 13910"],
    maps: "https://maps.app.goo.gl/MrmGA5tJsKc9PTWr7",
  },
  guestbookForm:
    "https://docs.google.com/forms/d/e/1FAIpQLSfmlHwt8_pEOUpR_YP5-bXztpbbeSsSGWMIKPQcrq3-rOkm1g/viewform?embedded=true",
  profilePdf: {
    id: "/docs/compro-pt-aau-Ind-2025.pdf",
    en: "/docs/Compro-AAU-En-1_2.pdf",
  },
};

export type Project = {
  slug: string;
  title: string;
  cover: string;
  gallery: string[];
  destination?: string;
  cargo: { id: string; en: string };
};

const img = (f: string) => `/images/projects/${f}`;

export const projects: Project[] = [
  {
    slug: "wide-cargo-project-to-palembang",
    title: "Wide Cargo Project To Palembang",
    cover: img("Wide-Cargo-Project-To-Palembang.jpg"),
    gallery: [],
    destination: "Palembang",
    cargo: { id: "Kargo lebar", en: "Wide cargo" },
  },
  {
    slug: "pc3000-project-to-palembang",
    title: "PC3000 Project To Palembang",
    cover: img("PC3000-Project-To-Palembang-2-scaled.jpg"),
    gallery: [img("PC3000-Project-To-Palembang-5.jpg")],
    destination: "Palembang",
    cargo: { id: "Alat berat", en: "Heavy equipment" },
  },
  {
    slug: "alutsista-project-to-pt-di-bandung",
    title: "Alutsista Project To PT DI Bandung",
    cover: img("Alutsista-Project-To-PT.DI-Bandung-3-scaled.jpg"),
    gallery: [img("Alutsista-Project-From-karawang-1.jpg"), img("AirCraft-Project-To-Bandung-2.jpg")],
    destination: "PT DI, Bandung",
    cargo: { id: "Alutsista", en: "Defense equipment" },
  },
  {
    slug: "ponton-project-bengkulu-to-lampung",
    title: "Ponton Project Bengkulu To Lampung",
    cover: img("Ponton-Project-Bengkulu-To-Lampung-scaled.jpg"),
    gallery: [],
    destination: "Bengkulu → Lampung",
    cargo: { id: "Ponton", en: "Pontoon" },
  },
  {
    slug: "travo-project-to-pelabuhan-tanjung-priok",
    title: "Travo Project To Pelabuhan Tanjung Priok",
    cover: img("Travo-Project-To-Pelabuhan-Tanjung-Priok-1.jpg"),
    gallery: [],
    destination: "Pelabuhan Tanjung Priok",
    cargo: { id: "Trafo", en: "Transformer" },
  },
  {
    slug: "sarula-project",
    title: "Sarula Project",
    cover: img("Sarula-Project.jpg"),
    gallery: [],
    cargo: { id: "Kargo proyek", en: "Project cargo" },
  },
  {
    slug: "schlumberger-project",
    title: "Schlumberger Project",
    cover: img("Schlumberger-Project-1.jpg"),
    gallery: [],
    cargo: { id: "Kargo proyek", en: "Project cargo" },
  },
  {
    slug: "tube-project-to-riau",
    title: "Tube Project To Riau",
    cover: img("Tube-Project-To-Riau.jpg"),
    gallery: [],
    destination: "Riau",
    cargo: { id: "Pipa", en: "Tube" },
  },
  {
    slug: "garbarata-project-to-padang-airport",
    title: "Garbarata Project To Padang Airport",
    cover: img("Garbarata-Project-To-Padang-Airport-1.jpg"),
    gallery: [],
    destination: "Bandara Padang",
    cargo: { id: "Garbarata", en: "Aviobridge" },
  },
];

export const testimonials = [
  {
    quote: "Sudah beberapa tahun kami bekerja sama, dan pelayanannya selalu memuaskan.",
    name: "Hanna Yustika",
    company: "PT. Indo Mega Logistik",
  },
  {
    quote: "Kami puas dengan keandalan dan keamanan pengangkutan barang berat menggunakan trailer mereka.",
    name: "Andi Permana",
    company: "PT. Baja Konstruksi Indonesia",
  },
  {
    quote: "Profesional dan selalu tepat waktu. Proses ekspor kami jadi jauh lebih efisien.",
    name: "Maria Lestari",
    company: "PT. Tiga Pilar Ekspor",
  },
  {
    quote: "Pelayanan cepat dan armadanya sangat terawat. Sangat membantu kelancaran proyek kami di Sumatera.",
    name: "Budi Santoso",
    company: "PT. Energi Nusantara",
  },
];

const id = {
  meta: {
    title: "PT Aditya Andhika Utama – Penyediaan Jasa Penyewaan Mobil Trailer",
    description:
      "Jasa transportasi darat, angkutan trailer, logistik ekspor-impor, dan kargo proyek nasional sejak 1994. Lebih dari 50 armada trailer dengan GPS Tracking dan SMKPAU.",
  },
  nav: {
    home: "Beranda",
    about: "Tentang Kami",
    projects: "Proyek",
    contact: "Hubungi Kami",
    guestbook: "Buku Tamu",
    privacy: "Kebijakan Privasi",
    cta: "Minta Penawaran",
    menu: "Menu",
    close: "Tutup",
  },
  hero: [
    {
      eyebrow: "Didukung armada lengkap, pengemudi berpengalaman tinggi dan terpercaya",
      title: ["Jasa transportasi darat", "handal dan profesional"],
      image: "/images/hero/slide1.jpg",
    },
    {
      eyebrow: "Menjangkau seluruh wilayah Indonesia dengan layanan pengiriman yang aman",
      title: ["Solusi logistik", "import dan export"],
      image: "/images/hero/slide2.jpeg",
    },
    {
      eyebrow: "Melayani kebutuhan pengiriman kargo besar untuk industri dan pembangunan",
      title: ["Spesialis angkutan", "proyek nasional"],
      image: "/images/hero/slide3.jpeg",
    },
  ],
  heroCtaPrimary: "Lihat Proyek",
  heroCtaSecondary: "Hubungi Kami",
  stats: [
    { value: "1994", label: "Tahun berdiri" },
    { value: "50+", label: "Aset truk trailer" },
    { value: "4", label: "Wilayah: Sumatera, Jawa, Bali, Lombok" },
    { value: "GPS", label: "Tracking armada & standar SMKPAU" },
  ],
  services: {
    eyebrow: "Layanan",
    title: "Apa yang kami angkut",
    items: [
      {
        title: "Transportasi Darat",
        body: "Penyewaan mobil trailer dengan pengemudi profesional, pekerja keras, dan memiliki loyalitas tinggi.",
      },
      {
        title: "Logistik Ekspor & Impor",
        body: "Mobilisasi kontainer ekspor dan impor dari dan ke pelabuhan dengan proses yang aman sampai tujuan.",
      },
      {
        title: "Angkutan Proyek & Heavy Cargo",
        body: "Pengiriman kargo besar dan berat untuk industri dan pembangunan di seluruh wilayah layanan kami.",
      },
    ],
  },
  about: {
    eyebrow: "Tentang Kami & Sejarah",
    title: "Tiga dekade menggerakkan kargo Indonesia",
    body: [
      "PT. Aditya Andhika Utama adalah perusahaan yang bergerak dalam penyediaan jasa transportasi darat. Salah satu yang menjadi kebanggaan kami adalah jaringan yang luas, sehingga membuat beberapa nama perusahaan besar telah mempercayakan pengiriman barang seperti impor, ekspor kontainer, dan heavy kargo ditangani oleh PT. Aditya Andhika Utama.",
      "Perusahaan kami juga didukung oleh pengemudi profesional, pekerja keras, dan memiliki loyalitas tinggi. Dengan lebih dari 50 aset trailer dan didukung Sistem Manajemen Keselamatan Perusahaan Angkutan Umum (SMKPAU) serta fasilitas GPS Tracking, perusahaan kami menggunakan proses pelayanan yang menjamin keamanan dan keselamatan barang Anda sampai dengan tujuan.",
    ],
    more: "Selengkapnya",
    chronologyTitle: "Kronologi",
    chronology: [
      "PT. ADITYA ANDHIKA UTAMA didirikan oleh Bapak H. Tatang Supriadi pada tanggal 26 Mei 1994. Berbekal pengalaman beliau yang bekerja sebagai pengurus trucking, beliau memberanikan diri untuk berdikari dengan mendirikan perusahaan. Nama Aditya Andhika Utama dipilih berdasarkan nama dua putra beliau, yaitu Aditya Putra Pratama dan Andhika Putra Prasetya, dimana kedua putra beliau adalah yang paling utama dalam kehidupan beliau.",
      "Berbekal satu unit truk Tronton Mitsubishi FM 215 H, beliau berhasil mengembangkan perusahaan hingga kini memiliki lebih dari 50 aset truk trailer yang dapat melayani pelanggan untuk kebutuhan mobilisasi barang ekspor impor maupun kargo, dengan cakupan wilayah yang cukup luas meliputi Sumatera, Jawa, Bali, dan Lombok.",
    ],
    milestones: [
      { year: "1994", text: "Didirikan oleh H. Tatang Supriadi pada 26 Mei 1994" },
      { year: "Awal", text: "Satu unit truk Tronton Mitsubishi FM 215 H" },
      { year: "Kini", text: "Lebih dari 50 aset truk trailer, melayani Sumatera, Jawa, Bali, dan Lombok" },
    ],
    innovationTitle: "Mendorong Kemajuan Melalui Inovasi",
    innovation:
      "Mendorong kemajuan bisnis dengan inovasi serta menjaga nama baik dalam bisnis transportasi adalah prioritas dan tujuan kami. Dengan selalu mengikuti prosedur yang berlaku serta meng-update kemajuan teknologi dalam kendaraan, hal ini kami lakukan untuk memberikan kenyamanan terbaik kepada pelanggan.",
    visionTitle: "Visi",
    vision:
      "Menjadi perusahaan jasa transportasi terpercaya yang mengedepankan profesionalisme dan pelayanan terbaik kepada seluruh pelanggan.",
    missionTitle: "Misi",
    mission:
      "Menciptakan sistem kerja yang efektif dengan mengedepankan aspek kemanusiaan dan keselamatan dalam bekerja, serta menerapkan sistem teknologi terkini ke dalam perencanaan dan penerapan.",
    pillars: [
      { title: "SMKPAU", body: "Sistem Manajemen Keselamatan Perusahaan Angkutan Umum" },
      { title: "GPS Tracking", body: "Pemantauan posisi armada selama perjalanan" },
      { title: "Pengemudi Profesional", body: "Berpengalaman, pekerja keras, dan loyal" },
    ],
  },
  projectsSection: {
    eyebrow: "Proyek",
    title: "Kargo yang telah kami antarkan",
    all: "Semua proyek",
    destination: "Tujuan",
    cargo: "Muatan",
    back: "Kembali ke proyek",
    next: "Proyek berikutnya",
    gallery: "Dokumentasi",
    intro:
      "Dari alat berat dan alutsista hingga trafo dan garbarata bandara: dokumentasi pengiriman yang kami tangani untuk industri dan pembangunan di berbagai wilayah Indonesia.",
  },
  testimonialsSection: { eyebrow: "Testimoni", title: "Apa kata klien kami" },
  cta: {
    title: "Punya kargo yang perlu dipindahkan?",
    body: "Ceritakan muatan, rute, dan jadwal Anda. Tim kami akan membantu menyiapkan armada yang tepat.",
    whatsapp: "Chat WhatsApp",
    profile: "Unduh Company Profile",
  },
  contact: {
    eyebrow: "Hubungi Kami",
    title: "Kantor & gudang di Cakung, Jakarta",
    office: "Kantor",
    warehouse: "Gudang",
    viewMaps: "Lihat Maps",
    phone: "Telepon",
    mobile: "HP / WhatsApp",
    email: "Email",
    downloads: "Unduhan",
    profile: "Company Profile (PDF)",
    profileEn: "Company Profile – English (PDF)",
  },
  guestbook: {
    title: "Buku Tamu",
    body: "Silakan isi buku tamu berikut. Data Anda digunakan sesuai Kebijakan Privasi kami.",
    loading: "Memuat formulir…",
  },
  privacy: {
    title: "Kebijakan Privasi",
    intro:
      "PT AAU menghargai dan melindungi privasi setiap pengguna layanan kami. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi pengguna.",
    sections: [
      {
        title: "Informasi yang Kami Kumpulkan",
        lead: "Kami dapat mengumpulkan informasi pribadi berikut:",
        items: ["Nama", "Nomor telepon", "Alamat email", "Informasi lain yang diberikan secara sukarela melalui formulir atau komunikasi WhatsApp"],
      },
      {
        title: "Penggunaan Informasi",
        lead: "Informasi yang dikumpulkan digunakan untuk:",
        items: [
          "Memberikan informasi terkait layanan atau produk kami",
          "Menanggapi pertanyaan dan permintaan pengguna",
          "Mengirimkan notifikasi, update, atau informasi penting melalui WhatsApp atau media komunikasi lainnya",
          "Keperluan operasional dan peningkatan kualitas layanan",
        ],
      },
      {
        title: "Penggunaan WhatsApp",
        lead: "Kami menggunakan WhatsApp Business API (Meta) sebagai salah satu sarana komunikasi resmi. Dengan menghubungi kami melalui WhatsApp, pengguna menyetujui komunikasi melalui platform tersebut sesuai kebijakan Meta. Kami tidak menjual, menyewakan, atau membagikan data pribadi pengguna kepada pihak ketiga tanpa persetujuan, kecuali diwajibkan oleh hukum.",
        items: [],
      },
      {
        title: "Keamanan Data",
        lead: "Kami menerapkan langkah-langkah yang wajar untuk melindungi data pribadi pengguna dari akses, penggunaan, atau pengungkapan yang tidak sah.",
        items: [],
      },
      {
        title: "Hak Pengguna",
        lead: "Pengguna berhak untuk:",
        items: ["Meminta akses, perubahan, atau penghapusan data pribadi", "Menghentikan komunikasi kapan saja dengan menghubungi kami"],
      },
      {
        title: "Perubahan Kebijakan",
        lead: "Kebijakan Privasi ini dapat diperbarui sewaktu-waktu. Perubahan akan ditampilkan di halaman ini.",
        items: [],
      },
      {
        title: "Kontak",
        lead: "Jika Anda memiliki pertanyaan mengenai Kebijakan Privasi ini, silakan hubungi kami melalui email atau kontak resmi yang tercantum di website kami.",
        items: [],
      },
    ],
  },
  footer: {
    tagline: "Penyediaan jasa penyewaan mobil trailer, logistik ekspor-impor, dan angkutan proyek sejak 1994.",
    company: "Perusahaan",
    contact: "Kontak",
    rights: "Hak cipta dilindungi.",
  },
};

export type Dictionary = typeof id;

const en: Dictionary = {
  meta: {
    title: "PT Aditya Andhika Utama – Trailer Truck Rental Services",
    description:
      "Land transportation, trailer rental, import-export logistics and national project cargo since 1994. More than 50 trailer units with GPS tracking and SMKPAU safety management.",
  },
  nav: {
    home: "Home",
    about: "About Us",
    projects: "Projects",
    contact: "Contact Us",
    guestbook: "Guestbook",
    privacy: "Privacy Policy",
    cta: "Request a Quote",
    menu: "Menu",
    close: "Close",
  },
  hero: [
    {
      eyebrow: "Supported by a complete fleet and highly experienced, trusted drivers",
      title: ["Reliable, professional", "land transportation"],
      image: "/images/hero/slide1.jpg",
    },
    {
      eyebrow: "Reaching all regions of Indonesia with secure delivery services",
      title: ["Import and export", "logistics solutions"],
      image: "/images/hero/slide2.jpeg",
    },
    {
      eyebrow: "Serving large cargo transportation needs for industry and construction",
      title: ["Specialist in national", "project transportation"],
      image: "/images/hero/slide3.jpeg",
    },
  ],
  heroCtaPrimary: "View Projects",
  heroCtaSecondary: "Contact Us",
  stats: [
    { value: "1994", label: "Year founded" },
    { value: "50+", label: "Trailer truck units" },
    { value: "4", label: "Regions: Sumatra, Java, Bali, Lombok" },
    { value: "GPS", label: "Fleet tracking & SMKPAU safety" },
  ],
  services: {
    eyebrow: "Services",
    title: "What we move",
    items: [
      {
        title: "Land Transportation",
        body: "Trailer truck rental with professional, hardworking and highly loyal drivers.",
      },
      {
        title: "Import & Export Logistics",
        body: "Mobilizing export and import containers to and from the ports, safely all the way to their destination.",
      },
      {
        title: "Project & Heavy Cargo",
        body: "Large and heavy cargo transportation for industry and construction across our service regions.",
      },
    ],
  },
  about: {
    eyebrow: "About Us & History",
    title: "Three decades moving Indonesia's cargo",
    body: [
      "PT. Aditya Andhika Utama is a company engaged in providing land transportation services. One of our proudest achievements is our extensive network, which has earned the trust of several major companies to handle shipments such as import, export containers, and heavy cargo through PT. Aditya Andhika Utama.",
      "Our company is also supported by professional, hardworking, and highly loyal drivers. With more than 50 trailer units and the support of the Public Transport Company Safety Management System (SMKPAU) as well as GPS Tracking facilities, our company implements a service process that ensures the safety and security of your goods until they reach their destination.",
    ],
    more: "Read more",
    chronologyTitle: "Chronology",
    chronology: [
      "PT. ADITYA ANDHIKA UTAMA was founded by Mr. H. Tatang Supriadi on May 26, 1994. With his experience working as a trucking coordinator, he had the courage to start his own company. The name Aditya Andhika Utama was chosen based on the names of his two sons, Aditya Putra Pratama and Andhika Putra Prasetya, who are the most important people in his life.",
      "Starting with a single Mitsubishi FM 215 H Tronton truck, he successfully grew the company, which now owns more than 50 trailer trucks to serve customers' needs for import-export cargo and goods transportation. Our service coverage extends across Sumatra, Java, Bali, and Lombok.",
    ],
    milestones: [
      { year: "1994", text: "Founded by H. Tatang Supriadi on May 26, 1994" },
      { year: "Start", text: "A single Mitsubishi FM 215 H Tronton truck" },
      { year: "Today", text: "More than 50 trailer trucks serving Sumatra, Java, Bali and Lombok" },
    ],
    innovationTitle: "Driving Progress Through Innovation",
    innovation:
      "Driving business growth through innovation while maintaining a good reputation in the transportation industry is our priority and goal. By consistently following applicable procedures and keeping up with technological advancements in vehicles, we strive to provide the best comfort to our customers.",
    visionTitle: "Vision",
    vision:
      "To be a trusted transportation service company that emphasizes professionalism and provides the best service to all customers.",
    missionTitle: "Mission",
    mission:
      "To create an effective work system that prioritizes humanity and safety in the workplace, as well as to implement the latest technology systems in planning and execution.",
    pillars: [
      { title: "SMKPAU", body: "Public Transport Company Safety Management System" },
      { title: "GPS Tracking", body: "Fleet position monitoring throughout every trip" },
      { title: "Professional Drivers", body: "Experienced, hardworking and loyal" },
    ],
  },
  projectsSection: {
    eyebrow: "Projects",
    title: "Cargo we have delivered",
    all: "All projects",
    destination: "Destination",
    cargo: "Cargo",
    back: "Back to projects",
    next: "Next project",
    gallery: "Documentation",
    intro:
      "From heavy equipment and defense hardware to transformers and airport aviobridges: a record of the shipments we have handled for industry and construction across Indonesia.",
  },
  testimonialsSection: { eyebrow: "Testimonials", title: "What our clients say" },
  cta: {
    title: "Have cargo that needs moving?",
    body: "Tell us about your load, route and schedule. Our team will help prepare the right fleet.",
    whatsapp: "Chat on WhatsApp",
    profile: "Download Company Profile",
  },
  contact: {
    eyebrow: "Contact Us",
    title: "Office & warehouse in Cakung, Jakarta",
    office: "Office",
    warehouse: "Warehouse",
    viewMaps: "View Maps",
    phone: "Phone",
    mobile: "Mobile / WhatsApp",
    email: "Email",
    downloads: "Downloads",
    profile: "Company Profile (PDF)",
    profileEn: "Company Profile – Indonesian (PDF)",
  },
  guestbook: {
    title: "Guestbook",
    body: "Please fill in our guestbook below. Your data is handled according to our Privacy Policy.",
    loading: "Loading form…",
  },
  privacy: {
    title: "Privacy Policy",
    intro:
      "PT AAU values and protects the privacy of every user of our services. This Privacy Policy explains how we collect, use and protect users' personal information.",
    sections: [
      {
        title: "Information We Collect",
        lead: "We may collect the following personal information:",
        items: ["Name", "Phone number", "Email address", "Other information provided voluntarily through forms or WhatsApp communication"],
      },
      {
        title: "Use of Information",
        lead: "The information collected is used to:",
        items: [
          "Provide information about our services or products",
          "Respond to user questions and requests",
          "Send notifications, updates or important information via WhatsApp or other communication media",
          "Operational purposes and improving service quality",
        ],
      },
      {
        title: "Use of WhatsApp",
        lead: "We use the WhatsApp Business API (Meta) as one of our official communication channels. By contacting us via WhatsApp, users agree to communicate through that platform in accordance with Meta's policies. We do not sell, rent or share users' personal data with third parties without consent, unless required by law.",
        items: [],
      },
      {
        title: "Data Security",
        lead: "We apply reasonable measures to protect users' personal data from unauthorized access, use or disclosure.",
        items: [],
      },
      {
        title: "User Rights",
        lead: "Users have the right to:",
        items: ["Request access to, correction of, or deletion of personal data", "Stop communication at any time by contacting us"],
      },
      {
        title: "Policy Changes",
        lead: "This Privacy Policy may be updated at any time. Changes will be shown on this page.",
        items: [],
      },
      {
        title: "Contact",
        lead: "If you have any questions about this Privacy Policy, please contact us via email or the official contacts listed on our website.",
        items: [],
      },
    ],
  },
  footer: {
    tagline: "Trailer truck rental, import-export logistics and project cargo transportation since 1994.",
    company: "Company",
    contact: "Contact",
    rights: "All rights reserved.",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { id, en };

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
