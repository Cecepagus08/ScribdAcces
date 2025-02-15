# ScribdAcces

ScribdAcces adalah sebuah web yang berfungsi untuk mengakses dokumen berbayar di Scribd secara gratis. Web ini dibuat dengan **HTML, Bootstrap, dan JavaScript**, dengan desain yang simpel dan mudah digunakan.

## Fitur

- Mengakses dokumen yang terkunci di Scribd.
- Desain simpel dan ringan.
- Mudah digunakan tanpa perlu login atau registrasi.

## Teknologi yang Digunakan

- **HTML** - Struktur utama halaman web.
- **Bootstrap** - Untuk desain yang responsif dan modern.
- **JavaScript** - Untuk menangani logika dan interaksi pengguna.

## Inspirasi

Website ini dibuat terinspirasi dari artikel [Liputan6](https://www.liputan6.com/hot/read/5703741/cara-membuka-scribd-yang-terkunci-bisa-baca-file-dengan-mudah?page=2) yang membahas cara membuka Scribd yang terkunci agar dapat membaca file dengan lebih mudah. Dalam artikel tersebut dijelaskan bahwa kita bisa mengakses dokumen Scribd secara gratis dan tampa iklan dengan cara menyalin ID Scribd dan menempelkannya di URL berikut:

```
https://www.scribd.com/embeds/IDSCRIBD/content?start_page=1&view_mode=scroll&access_key=key-fFexxf7r1bzEfWu3HKwf
```

## Cara Menggunakan

1. Buka website ScribdAcces: [ScribdAcces](https://scribd-acces.vercel.app).
2. Masukkan URL dokumen Scribd yang ingin diakses.
3. Klik tombol **Read Now** dan tunggu proses selesai.
4. Dokumen akan tersedia untuk dibaca secara gratis.

## Implementasi Kode

Berikut adalah potongan kode JavaScript yang digunakan untuk mengekstrak ID dari URL Scribd dan membuka dokumen Scribd secara gratis:

```javascript
function proses(url) {
    // Fungsi untuk mengekstrak angka di antara '/' pertama dan terakhir
    function extractNumbers(url) {
        const regex = /\/(\d+)\//; // Regex untuk mengambil angka di antara '/'
        const match = url.match(regex); // Mencocokkan pola dengan URL
        if (match) {
            return match[1]; // Kembalikan angka yang ditemukan
        }
        return null;
    }

    const result = extractNumbers(url);
    if (result) {
        setTimeout(() => {
            window.open(`https://www.scribd.com/embeds/${result}/content?start_page=1&view_mode=scroll&access_key=key-fFexxf7r1bzEfWu3HKwf`, "_blank");
        }, 500);
    } else {
        notifOn();
        errorMsg.innerText = "Url tidak valid";
    }
}
```

## Catatan

Website ini dibuat untuk tujuan edukasi dan pembelajaran. Kami tidak menyimpan atau mendistribusikan konten dari Scribd.

## Kontribusi

Jika ingin berkontribusi dalam pengembangan ScribdAcces, silakan fork repositori ini dan buat pull request.

## Lisensi

Proyek ini dibuat untuk keperluan edukasi dan tidak berafiliasi dengan Scribd. Gunakan dengan bijak dan bertanggung jawab.

---

Dibuat dengan ❤️ oleh Developer ScribdAcces

