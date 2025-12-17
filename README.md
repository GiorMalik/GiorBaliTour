### **Ringkasan Proyek: GiorBaliTour**

*   **Nama Proyek:** GiorBaliTour
*   **Deskripsi:** Website rental mobil di Bali dengan durasi 10 jam, termasuk sopir dan bensin.
*   **Teknologi:** Next.js 18, TypeScript, Tailwind CSS, Cloudflare D1, Drizzle ORM, Auth.js, next-intl.
*   **Fitur Utama:** Landing Page, Daftar Mobil, Detail Mobil, Review (Login untuk posting), Dashboard Admin Tersembunyi, Multi-bahasa (8 bahasa).

---

### **Langkah 0: Arsitektur & Setup Fondasi**

**Tujuan:** Membangun struktur proyek dasar dengan semua dependensi dan konfigurasi awal.

**Prompt untuk AI:**
> "AI, kita akan membangun website rental mobil untuk Bali bernama 'GiorBaliTour'. Gunakan **Next.js 18 dengan App Router**, **TypeScript**, dan **Tailwind CSS**. Untuk database, gunakan **Cloudflare D1** dengan ORM **Drizzle**. Untuk autentikasi, gunakan **Auth.js (NextAuth.js)**. Untuk internasionalisasi, gunakan library **next-intl**.
>
> Buatkan struktur proyek Next.js baru dengan semua dependensi tersebut. Siapkan konfigurasi dasar untuk `tailwind.config.ts`, `drizzle.config.ts`, dan file `auth.ts`. Buat juga struktur folder yang terorganisir: `src/app`, `src/components`, `src/lib`, `src/actions`, `scripts`.
>
> **PENTING:** Untuk keamanan, semua pengecekan role (user/admin) HARUS dilakukan 100% di sisi server (Server Components atau API Routes). Jangan pernah kirim data role ke client."

**Hasil yang Diharapkan:**
*   Proyek Next.js 18 dengan App Router yang siap.
*   Semua library terinstal dan dikonfigurasi.
*   Struktur folder yang rapi: `src/`, `scripts/`.

---

### **Langkah 0.5: Manajemen Aset (Download Gambar Otomatis)**

**Tujuan:** Mengunduh semua aset gambar yang diperlukan dari sumber eksternal secara otomatis.

**Prompt untuk AI:**
> "Buatkan sebuah script shell bernama `scripts/download-images.sh`. Script ini harus:
> 1.  Membuat direktori yang diperlukan di dalam `public/images/`, yaitu: `hero`, `about`, dan `cars`.
> 2.  Mengunduh semua gambar dari `https://www.giorbalitour.com/images/...` menggunakan `curl` dan menyimpannya ke direktori yang sesuai.
>
> **Daftar gambar yang harus diunduh:**
>
> **Hero:**
> - `https://www.giorbalitour.com/images/hero/barong-statue.jpg` -> `public/images/hero/barong-statue.jpg`
> - `https://www.giorbalitour.com/images/hero/kedonganan-sunset.jpg` -> `public/images/hero/kedonganan-sunset.jpg`
> - `https://www.giorbalitour.com/images/hero/nusa-penida-beach.jpg` -> `public/images/hero/nusa-penida-beach.jpg`
>
> **About:**
> - `https://www.giorbalitour.com/images/about/bali-island.jpg` -> `public/images/about/bali-island.jpg`
> - `https://www.giorbalitour.com/images/about/bali-nature.jpg` -> `public/images/about/bali-nature.jpg`
> - `https://www.giorbalitour.com/images/about/bali-tari-kecak.jpg` -> `public/images/about/bali-tari-kecak.jpg`
>
> **Cars:**
> - `https://www.giorbalitour.com/images/cars/all-new-avanza.png` -> `public/images/cars/all-new-avanza.png`
> - `https://www.giorbalitour.com/images/cars/avanza.png` -> `public/images/cars/avanza.png`
> - `https://www.giorbalitour.com/images/cars/hiace-commuter.png` -> `public/images/cars/hiace-commuter.png`
> - `https://www.giorbalitour.com/images/cars/hiace-premio.png` -> `public/images/cars/hiace-premio.png`
> - `https://www.giorbalitour.com/images/cars/innova-reborn.webp` -> `public/images/cars/innova-reborn.webp`
> - `https://www.giorbalitour.com/images/cars/toyota-alphard.png.webp` -> `public/images/cars/toyota-alphard.png.webp`
> - `https://www.giorbalitour.com/images/cars/toyota-vellfire.png` -> `public/images/cars/toyota-vellfire.png`
> - `https://www.giorbalitour.com/images/cars/xpander.png` -> `public/images/cars/xpander.png`
>
> Berikan instruksi juga untuk menjalankan script ini (`chmod +x scripts/download-images.sh && ./scripts/download-images.sh`) setelah dibuat."

**Hasil yang Diharapkan:**
*   File `scripts/download-images.sh`.
*   Setelah dijalankan, folder `public/images/` terisi dengan semua aset gambar.

---

### **Langkah 1: Desain Database & Seeding Data (Hanya Review)**

**Tujuan:** Membuat skema database yang bersih dan mengisinya dengan data review awal.

**Prompt untuk AI:**
> "Berdasarkan proyek GiorBaliTour, buatkan schema Drizzle untuk database D1. Schema ini harus memiliki tabel:
> 1.  `users`: `id` (string, uuid), `name` (string), `email` (string, unique), `password` (string, hashed), `role` (enum: 'user', 'admin', default: 'user').
> 2.  `cars`: `id` (string, uuid), `name` (string), `capacity` (number), `transmission` (enum: 'manual', 'automatic'), `price_per_day` (number), `image_filename` (string), `description` (text).
> 3.  `reviews`: `id` (string, uuid), `carId` (string, relasi ke `cars`), `userId` (string, relasi ke `users`, nullable), `userName` (string), `comment` (text), `rating` (number, 1-5), `createdAt` (timestamp).
>
> **Catatan:** Kolom `image_filename` di tabel `cars` akan menyimpan nama file gambar (misal: 'all-new-avanza.png'), bukan URL lengkap.
>
> Setelah itu, buatkan script seeding (`drizzle/seed.ts`). **Script ini TIDAK perlu menambahkan mobil sama sekali.** Script ini hanya perlu membuat 10 review fake. Karena belum ada mobil, buatkan saja dummy `carId` untuk saat ini, atau biarkan `carId` null dan nanti bisa dihubungkan setelah admin menambahkan mobil."

**Hasil yang Diharapkan:**
*   File `src/schema.ts` yang diperbarui.
*   File `drizzle/seed.ts` yang hanya membuat review fake.

---

### **Langkah 2: Setup Internasionalisasi (8 Bahasa)**

**Tujuan:** Mengonfigurasi website agar dapat menampilkan 8 bahasa yang berbeda.

**Prompt untuk AI:**
> "Konfigurasi `next-intl` untuk proyek ini. Sediakan 8 bahasa dengan kode locale: **English (`en`), Indonesian (`id`), Chinese (`zh`), Korean (`ko`), Arabic (`ar`), Turkish (`tr`), Russian (`ru`), Portuguese (`pt`)**.
>
> Buat file `messages/en.json`, `messages/id.json`, dll. Isi dengan terjemahan dasar untuk navigasi: 'Home', 'Cars', 'About', 'Contact', 'Login', 'Register', 'Logout', 'Leave a Review', 'Duration: 10 Hours', 'Include Driver & Petrol'.
>
> Buat komponen `LanguageSwitcher` yang berupa dropdown di header untuk mengganti bahasa. **Perhatikan bahasa Arab (`ar`) yang menggunakan RTL (Right-to-Left). Siapkan konfigurasi di `tailwind.config.ts` untuk menangani ini dengan menambahkan `direction: 'rtl'` pada tag `html` jika locale adalah 'ar'."

**Hasil yang Diharapkan:**
*   Konfigurasi `next-intl` yang mendukung 8 bahasa dan RTL.
*   File terjemahan awal.
*   Komponen `LanguageSwitcher`.

---

### **Langkah 3: Sistem Autentikasi (Login Opsional)**

**Tujuan:** Membangun sistem login/register yang opsional bagi pengguna.

**Prompt untuk AI:**
> "Buat sistem autentikasi menggunakan Auth.js.
> 1.  Buat halaman `/login` dan `/register` dengan form yang valid.
> 2.  Gunakan Credentials Provider untuk email dan password. Hash password dengan `bcrypt`.
> 3.  Sistem ini bersifat opsional. User dapat mengakses semua halaman publik (Landing, Cars, dll) tanpa login.
> 4.  Middleware hanya diperlukan untuk melindungi API route yang akan kita buat nanti untuk menambah review."

**Hasil yang Diharapkan:**
*   Fitur login/register yang berfungsi.
*   Sesi user yang terkelola dengan baik.

---

### **Langkah 4: Fitur Admin (Dashboard Tersembunyi di /tanian)**

**Tujuan:** Membuat dashboard admin yang aman dan tersembunyi untuk mengelola mobil.

**Prompt untuk AI:**
> "Buatkan halaman admin yang sangat aman dengan metode berikut:
>
> 1.  Buat route group baru di `app/(tanian)`. Di dalamnya, buat `layout.tsx`. **Ini adalah Server Component.**
> 2.  Di baris paling atas dari komponen `layout.tsx`, lakukan pengecekan server-side:
>     - Ambil session user menggunakan `getServerSession(authOptions)`.
>     - Jika tidak ada session ATAU `session.user.role !== 'admin'`, panggil fungsi `notFound()`.
> 3.  Di dalam `app/(tanian)`, buatkan halaman `/tanian/cars/page.tsx` untuk manajemen mobil.
> 4.  Buat Server Action untuk CRUD mobil di `src/actions/admin-cars.ts`. Pastikan setiap aksi melakukan pengecekan role admin.
> 5.  Buat UI di `/tanian/cars/page.tsx` untuk menampilkan mobil dalam tabel. Untuk form menambah/mengedit mobil, sediakan:
>     - Input teks untuk `name`, `capacity`, `transmission`, `price`, `description`.
>     - **Dropdown `image_filename` yang berisi daftar semua nama file gambar yang ada di `public/images/cars/` (misal: 'all-new-avanza.png', 'xpander.png', dll).** Admin memilih dari daftar ini."

**Hasil yang Diharapkan:**
*   Dashboard admin yang aman di path `/tanian`.
*   Form manajemen mobil yang terintegrasi dengan aset gambar.

---

### **Langkah 5: Halaman Publik (Frontend dengan Gambar Spesifik)**

**Tujuan:** Membangun semua halaman yang dapat diakses oleh pengunjung.

**Prompt untuk AI:**
> "Buatkan halaman-halaman publik berikut:
> 1.  **Landing Page (`/`):**
>     - Buat Hero section dengan carousel yang menggunakan gambar dari `public/images/hero/`. **JANGAN gunakan gambar mobil generik.**
>     - Tampilkan 'Featured Cars' (ambil 3 mobil dari database yang sudah ditambahkan admin).
>     - Sertakan informasi 'Durasi: 10 Jam' dan 'Include Driver & Petrol'.
> 2.  **Halaman Mobil (`/cars`):** Tampilkan semua mobil dari database dalam grid. Untuk setiap mobil, tampilkan gambar dengan path `/images/cars/[image_filename]`, nama, kapasitas, transmisi, dan harga.
> 3.  **Halaman Detail Mobil (`/cars/[id]`):** Tampilkan detail mobil dengan gambar, spesifikasi, dan deskripsi.
> 4.  **Halaman About (`/about`):** Buat halaman statis yang menggunakan gambar dari `public/images/about/` untuk mempercantik tampilan.
> 5.  **Halaman Contact:** Buat halaman statis `/contact` dengan form kontak sederhana."

**Hasil yang Diharapkan:**
*   Semua halaman publik yang menarik, menggunakan aset gambar yang spesifik.

---

### **Langkah 6: Sistem Review (Login untuk Posting)**

**Tujuan:** Mengimplementasikan fitur review di mana user harus login untuk memberikan ulasan.

**Prompt untuk AI:**
> "Pada halaman detail mobil (`/cars/[id]`), implementasikan sistem review:
> 1.  Tampilkan semua review yang terkait dengan mobil tersebut, menampilkan `userName`, `rating` (bintang), `comment`, dan `createdAt`.
> 2.  Buat komponen `ReviewForm`. Jika user belum login, tampilkan tombol 'Login to Leave a Review'. Jika sudah login, tampilkan form untuk `rating` dan `comment`.
> 3.  Buat Server Action `addReview` di `src/actions/reviews.ts` yang aman dan hanya bisa diakses oleh user yang sudah login."

**Hasil yang Diharapkan:**
*   Sistem review yang dinamis dan aman.

---

### **Langkah 7: Finalisasi & Polish**

**Tujuan:** Menyempurnakan website dengan komponen global dan pengalaman pengguna yang baik.

**Prompt untuk AI:**
> "Buatkan komponen `Header` dan `Footer` yang konsisten untuk semua halaman. Header harus berisi logo 'GiorBaliTour', navigasi utama (Home, Cars, About, Contact), `LanguageSwitcher`, dan kondisional tombol Login/Profile. Footer berisi link-link dummy dan informasi kontak. Pastikan website sepenuhnya responsif di mobile dan desktop. Tambahkan loading state (misalnya menggunakan `loading.tsx`) dan error handling yang sederhana untuk setiap halaman."

**Hasil yang Diharapkan:**
*   Website GiorBaliTour yang utuh, profesional, responsif, dan siap diluncurkan.

Dengan mengikuti rencana master ini langkah demi langkah, Anda akan membangun proyek **GiorBaliTour** dengan fondasi yang kuat, aman, dan sesuai persis dengan visi Anda. Selamat mengerjakan