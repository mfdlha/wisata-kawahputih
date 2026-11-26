
/* ===================================================
   WEBSITE WISATA KAWAH PUTIH — SCRIPT.JS
   HTML: index.html | CSS: style.css

   Fitur:
   - Navbar dan navigasi aktif
   - Dark Mode
   - Bahasa Indonesia / English
   - Rencanakan Kunjungan
   - Detail Wisata dan Galeri
   - Ulasan dan Rating lokal
   - Kembali ke atas
=================================================== */

(function () {
  'use strict';

  let halamanDirefresh = false;

  try {
    const temaTersimpan =
      localStorage.getItem('kawah-tema') ||
      localStorage.getItem('kp-theme') ||
      'light';

    if (temaTersimpan === 'dark') {
      document.documentElement.setAttribute(
        'data-theme',
        'dark'
      );
    }

    const navigasi =
      performance.getEntriesByType('navigation');

    halamanDirefresh =
      navigasi.length > 0 &&
      navigasi[0].type === 'reload' &&
      window.location.hash === '';

    if (
      halamanDirefresh &&
      'scrollRestoration' in history
    ) {
      history.scrollRestoration = 'manual';
    }
  } catch (error) {
    // Tetap berjalan jika localStorage dibatasi.
  }

  document.addEventListener(
    'DOMContentLoaded',
    function () {

      // ==========================================
      // 01. TEMA DAN BAHASA
      // ==========================================

      function bacaPenyimpanan(kunci, nilaiAwal) {
        try {
          return localStorage.getItem(kunci) || nilaiAwal;
        } catch (error) {
          return nilaiAwal;
        }
      }

      function simpanPenyimpanan(kunci, nilai) {
        try {
          localStorage.setItem(kunci, nilai);
          return true;
        } catch (error) {
          return false;
        }
      }

      let bahasa = bacaPenyimpanan(
        'kawah-bahasa',
        bacaPenyimpanan('kp-language', 'id')
      );

      if (bahasa !== 'en') {
        bahasa = 'id';
      }

      let tema = bacaPenyimpanan(
        'kawah-tema',
        bacaPenyimpanan('kp-theme', 'light')
      );

      if (tema !== 'dark') {
        tema = 'light';
      }

      const translations = {
        'Beranda': 'Home',
        'Tentang': 'About',
        'Jelajahi': 'Explore',
        'Galeri': 'Gallery',
        'Ulasan': 'Reviews',
        'Panduan & Lokasi': 'Visitor Guide & Location',
        'Rencanakan Kunjungan': 'Plan Your Visit',

        'CIWIDEY, KABUPATEN BANDUNG':
          'CIWIDEY, BANDUNG REGENCY',

        'Kawah Putih, lanskap vulkanik di selatan Bandung.':
          'Kawah Putih, a volcanic landscape south of Bandung.',

        'Jelajahi danau kawah Gunung Patuha yang dikenal dengan warna airnya yang berubah-ubah, udara pegunungan yang sejuk, dan pemandangan berkabut.':
          'Discover Mount Patuha’s crater lake, known for its changing water colours, cool mountain air, and misty scenery.',

        'Jelajahi Kawah Putih': 'Explore Kawah Putih',
        'Lihat Galeri': 'View Gallery',

        'Satu destinasi, beberapa sudut untuk dijelajahi.':
          'One destination, many perspectives to explore.',

        'Foto panorama Kawah Putih belum tersedia.':
          'The Kawah Putih panorama photo is unavailable.',

        'Panorama Kawah Putih — Ciwidey, Kabupaten Bandung':
          'Kawah Putih panorama — Ciwidey, Bandung Regency',

        'Foto danau Kawah Putih belum tersedia.':
          'The Kawah Putih lake photo is unavailable.',

        'Danau kawah Gunung Patuha':
          'Mount Patuha crater lake',

        'MENGENAL DESTINASI':
          'ABOUT THE DESTINATION',

        'Mengenal Kawah Putih':
          'Discover Kawah Putih',

        'Kawah Putih adalah danau kawah vulkanik di kawasan Gunung Patuha, wilayah Ciwidey/Rancabali, Kabupaten Bandung, Jawa Barat.':
          'Kawah Putih is a volcanic crater lake on Mount Patuha, in the Ciwidey/Rancabali area of Bandung Regency, West Java.',

        'Permukaan airnya dapat tampak putih kehijauan atau memiliki rona berbeda mengikuti kondisi alam. Lanskap danau, pegunungan, dan kabut menjadi ciri khas tempat ini.':
          'Its water can appear pale green or take on different shades depending on natural conditions. The lake, mountains, and mist define this landscape.',

        'Rancabali / Ciwidey, Kabupaten Bandung':
          'Rancabali / Ciwidey, Bandung Regency',

        'PILIH PENGALAMANMU':
          'CHOOSE YOUR EXPERIENCE',

        'Apa yang Ingin Kamu Lakukan?':
          'What Would You Like to Explore?',

        'Kenali aktivitas, suasana, dan hal penting pada setiap area sebelum memilih tujuan kunjungan.':
          'Get to know the activities, scenery, and important considerations at each spot before your visit.',

        'PANORAMA DANAU': 'LAKE VIEW',
        'Danau Kawah': 'Crater Lake',

        'Nikmati warna khas air danau vulkanik, bentang tebing, dan suasana Kawah Putih dari area pengunjung yang diizinkan.':
          'Enjoy the volcanic lake’s distinctive colours, crater cliffs, and atmosphere from designated visitor areas.',

        'Lihat Info & Foto': 'View Details & Photo',
        'Cocok untuk': 'Best for',

        'Menikmati lanskap dan fotografi alam.':
          'Scenic views and nature photography.',

        'Perlu diperhatikan': 'Things to consider',

        'Kawasan mengandung gas belerang. Tetap di jalur aman dan ikuti arahan petugas.':
          'Sulphur gases are present. Stay on designated paths and follow staff instructions.',

        'Tips sebelum ke danau':
          'Tips before visiting the lake',

        'Siapkan jaket, hindari menyentuh air kawah, dan segera menjauh jika merasa tidak nyaman dengan udara sekitar.':
          'Bring a jacket, avoid touching crater water, and leave the area if the air makes you uncomfortable.',

        'JALUR PANDANG': 'SCENIC WALKWAY',
        'Skywalk Cantigi': 'Cantigi Skywalk',

        'Jelajahi jalur pandang di antara vegetasi cantigi untuk melihat kawasan kawah dari sudut yang lebih tinggi.':
          'Walk among cantigi vegetation for an elevated view of the crater area.',

        'Pengunjung yang menyukai berjalan kaki dan sudut pandang berbeda.':
          'Visitors who enjoy walking and different viewpoints.',

        'Kondisi jalur dan akses bisa berubah mengikuti cuaca serta kebijakan pengelola.':
          'Trail conditions and access may change with the weather and site rules.',

        'Tips sebelum ke Skywalk':
          'Tips before visiting the Skywalk',

        'Gunakan alas kaki dengan daya cengkeram baik. Tanyakan lebih dahulu apakah jalur dibuka dan aman dilalui.':
          'Wear shoes with good grip. Check that the walkway is open and safe before visiting.',

        'TITIK PANDANG': 'VIEWPOINT',
        'Panorama Sunan Ibu': 'Sunan Ibu Viewpoint',

        'Saksikan lanskap kawah dan perbukitan dari ketinggian. Tempat ini dikenal sebagai salah satu sudut untuk menikmati suasana pagi.':
          'Take in the crater and surrounding hills from above. The viewpoint is known for its early-morning scenery.',

        'Panorama pegunungan dan fotografi pemandangan luas.':
          'Mountain panoramas and wide-angle photography.',

        'Jika ingin melihat matahari terbit, konfirmasi akses pagi, cuaca, dan aturan kunjungan lebih dahulu.':
          'For sunrise visits, confirm early access, weather, and visitor rules in advance.',

        'Tips sebelum ke Sunan Ibu':
          'Tips before visiting Sunan Ibu',

        'Bawa pakaian hangat dan periksa kondisi jalur. Panorama dapat tertutup kabut sewaktu-waktu.':
          'Bring warm clothing and check trail conditions. Mist can obscure the view at any time.',

        'Catatan kunjungan:': 'Visitor note:',

        'akses lokasi, kemungkinan biaya tambahan, dan kondisi cuaca dapat berubah. Periksa informasi terbaru sebelum berangkat.':
          'Access, possible additional fees, and weather can change. Check current information before travelling.',

        'Baca Panduan & Lokasi ↗':
          'Read Visitor Guide & Location ↗',

        'GALERI FOTO': 'PHOTO GALLERY',
        'Potret Kawah Putih': 'Kawah Putih in Pictures',

        'Jelajahi suasana danau, jalur, dan perbukitan melalui foto. Klik gambar untuk memperbesarnya.':
          'Explore views of the lake, trails, and hills through photos. Select an image to enlarge it.',

        'Semua': 'All',
        'Danau': 'Lake',
        'Jalur Wisata': 'Walking Trails',
        'Tepi danau': 'Lakeshore',
        'Warna air kawah': 'Crater water colours',
        'Jalur menuju kawah': 'Path to the crater',
        'Pemandangan Sunan Ibu': 'Sunan Ibu view',
        'Lanskap kawah': 'Crater landscape',
        'Kabut pegunungan': 'Mountain mist',

        'Foto galeri belum tersedia.':
          'Gallery photo unavailable.',

        'Sebelum Berkunjung': 'Before You Visit',

        'Informasi praktis untuk membantu menyiapkan perjalanan menuju Kawah Putih.':
          'Practical information to help you prepare for a trip to Kawah Putih.',

        'Lokasi dan akses': 'Location and access',

        'Kawah Putih berada di kawasan Rancabali/Ciwidey, Kabupaten Bandung. Dari Bandung, perjalanan umumnya menuju arah Soreang dan Ciwidey sebelum mengikuti petunjuk menuju kawasan wisata.':
          'Kawah Putih is in Rancabali/Ciwidey, Bandung Regency. From Bandung, travellers generally head towards Soreang and Ciwidey, then follow directions to the site.',

        'Tiket dan jam operasional':
          'Tickets and opening hours',

        'Harga tiket dan jam operasional dapat berubah. Pastikan informasi terbaru melalui pengelola wisata sebelum berkunjung.':
          'Ticket prices and opening hours may change. Check the latest information from the site operator before visiting.',

        'Tips berkunjung': 'Visitor tips',

        'Gunakan pakaian hangat dan alas kaki yang nyaman.':
          'Wear warm clothing and comfortable footwear.',

        'Perhatikan cuaca, kabut, dan kondisi jalur.':
          'Check the weather, mist, and trail conditions.',

        'Ikuti petunjuk keselamatan serta batasan dari pengelola.':
          'Follow safety signs and restrictions set by staff.',

        'Hindari terlalu lama berada di area dengan paparan gas belerang.':
          'Avoid spending too long in areas exposed to sulphur gases.',

        'Jaga kebersihan dan jangan membuang sampah sembarangan.':
          'Keep the area clean and do not litter.',

        'PERTANYAAN UMUM':
          'FREQUENTLY ASKED QUESTIONS',

        'Yang perlu diketahui': 'Good to Know',

        'Apakah harus membawa jaket?':
          'Should I bring a jacket?',

        'Disarankan membawa jaket atau pakaian hangat karena area Kawah Putih berada di dataran tinggi.':
          'A jacket or warm clothes are recommended because Kawah Putih is at a high elevation.',

        'Apakah harga tiket selalu sama?':
          'Are ticket prices always the same?',

        'Belum tentu. Periksa tarif terkini melalui informasi resmi pengelola sebelum berangkat.':
          'Not necessarily. Check current prices with the site operator before travelling.',

        'Bagaimana jika cuaca berkabut?':
          'What if it is misty?',

        'Perhatikan jarak pandang, tetap di jalur yang diizinkan, dan patuhi arahan petugas kawasan.':
          'Watch your visibility, stay on permitted paths, and follow staff guidance.',

        'Apakah perlu memperhatikan gas belerang?':
          'Should I be careful of sulphur gas?',

        'Ya. Ikuti informasi keselamatan setempat dan segera menjauh jika merasa tidak nyaman.':
          'Yes. Follow on-site safety guidance and move away if you feel unwell.',

        'LOKASI DESTINASI': 'DESTINATION LOCATION',
        'Temukan Lokasinya': 'Find Kawah Putih',

        'Rancabali / Ciwidey, Kabupaten Bandung, Jawa Barat, Indonesia.':
          'Rancabali / Ciwidey, Bandung Regency, West Java, Indonesia.',

        'Gunakan tautan peta untuk mencari lokasi dan menentukan rute dari tempat keberangkatanmu.':
          'Open the map to locate the destination and plan your route.',

        'Buka Google Maps': 'Open Google Maps',

        'Website informasi wisata Kawah Putih di kawasan Ciwidey, Kabupaten Bandung.':
          'A visitor information website for Kawah Putih in Ciwidey, Bandung Regency.',

        'Navigasi': 'Navigation',
        'Informasi': 'Information',
        'Kabupaten Bandung, Jawa Barat':
          'Bandung Regency, West Java',

        'Nikmati panorama danau vulkanik, udara pegunungan, dan keindahan alam kawasan Gunung Patuha.':
          'Discover the volcanic lake, mountain air, and natural beauty of Mount Patuha.',

        'Periksa informasi tiket, jam operasional, dan kondisi kawasan sebelum berkunjung.':
          'Check ticket details, opening hours, and site conditions before visiting.',

        '© 2026 Kawah Putih. Pesona Alam Ciwidey.':
          '© 2026 Kawah Putih. The Beauty of Ciwidey.',

        'Informasi destinasi dapat berubah mengikuti kondisi dan kebijakan kawasan.':
          'Destination details may change according to site conditions and regulations.',

        'Foto detail belum tersedia.':
          'Detail photo unavailable.',

        'DANAU VULKANIK': 'VOLCANIC LAKE',

        'Danau Kawah Putih merupakan bagian dari kawasan vulkanik Gunung Patuha. Warna permukaan air dapat terlihat berbeda mengikuti kondisi alam. Pengunjung perlu tetap mengikuti batas aman dan arahan petugas saat menikmati pemandangan.':
          'Kawah Putih is a volcanic crater lake on Mount Patuha. Its water may appear in different colours depending on natural conditions. Stay within designated safe areas and follow staff instructions.',

        'Skywalk Cantigi merupakan jalur wisata yang melewati vegetasi cantigi di kawasan Kawah Putih. Jalur ini memberikan sudut pandang berbeda ke arah lanskap sekitar. Ikuti ketentuan akses dan keselamatan yang berlaku di lokasi.':
          'Cantigi Skywalk passes through cantigi vegetation and offers a different view of Kawah Putih. Follow current access and safety rules.',

        'Panorama Sunan Ibu menawarkan pemandangan kawasan kawah dan perbukitan dari sudut yang berbeda. Kabut serta cuaca dapat memengaruhi jarak pandang. Periksa kondisi dan akses lokasi sebelum berkunjung.':
          'Sunan Ibu offers a different perspective over the crater and surrounding hills. Mist and weather affect visibility. Check access and conditions before visiting.',

        'PERSIAPKAN PERJALANAN': 'PLAN YOUR TRIP',

        'Pilih tanggal, waktu, dan tempat yang ingin dijelajahi. Kami akan menyusun ringkasan rencana kunjunganmu.':
          'Choose a date, preferred time, and places to explore. A simple visit summary will be prepared for you.',

        'Tanggal kunjungan': 'Visit date',
        'Waktu pilihan': 'Preferred time',
        'Pagi': 'Morning',
        'Siang': 'Afternoon',

        'Tempat yang ingin dikunjungi':
          'Places to visit',

        'Buat Rencana Kunjungan':
          'Create Visit Plan',

        'Ringkasan Rencana':
          'Your Visit Summary',

        'Ini merupakan rencana sementara, bukan reservasi. Periksa kondisi cuaca, akses wisata, tiket, dan jam operasional sebelum berangkat.':
          'This is a suggested plan, not a reservation. Check weather, site access, tickets, and opening hours before travelling.',

        'Pilih tanggal hari ini atau tanggal yang akan datang.':
          'Select today or a future date.',

        'Pilih minimal satu tempat yang ingin dikunjungi.':
          'Choose at least one place to visit.',

        'Danau Kawah — menikmati panorama danau vulkanik dan kawasan sekitarnya.':
          'Crater Lake — enjoy the volcanic lake and surrounding scenery.',

        'Skywalk Cantigi — menjelajahi jalur wisata dan menikmati suasana vegetasi cantigi.':
          'Cantigi Skywalk — explore the walkway and cantigi vegetation.',

        'Panorama Sunan Ibu — melihat bentang alam kawah dari sudut pandang yang berbeda.':
          'Sunan Ibu Viewpoint — enjoy a different perspective on the crater landscape.',

        'Tepi danau Kawah Putih': 'Kawah Putih lakeshore',
        'Warna air Kawah Putih': 'Kawah Putih water colours',
        'Jalur menuju kawasan kawah': 'Path to the crater area',
        'Panorama dari Sunan Ibu': 'Panorama from Sunan Ibu',
        'Lanskap Kawah Putih': 'Kawah Putih landscape',
        'Kabut di Sunan Ibu': 'Mist at Sunan Ibu',

        'Lanskap tepian danau Kawah Putih':
          'Kawah Putih lakeshore landscape',

        'Danau Kawah Putih dengan air pucat':
          'Kawah Putih crater lake with pale water',

        'Jalur akses menuju Kawah Putih':
          'Access path to Kawah Putih',

        'Panorama alam dari kawasan Sunan Ibu':
          'Landscape panorama from Sunan Ibu',

        'Panorama luas danau Kawah Putih':
          'Wide panorama of Kawah Putih',

        'Pemandangan berkabut di Panorama Sunan Ibu':
          'Misty view from Sunan Ibu',

        'Lihat Ulasan →': 'View Reviews →',
        'Pengaturan tampilan': 'Display settings',
        'Rencanakan': 'Plan Visit',

        '1 bintang': '1 star',
        '2 bintang': '2 stars',
        '3 bintang': '3 stars',
        '4 bintang': '4 stars',
        '5 bintang': '5 stars',

        'ULASAN PENGUNJUNG': 'VISITOR REVIEWS',
        'Cerita Kunjungan': 'Visitor Stories',

        'Bagikan pengalaman dan tips setelah mengunjungi Kawah Putih.':
          'Share your experience and tips after visiting Kawah Putih.',

        'Lihat Ulasan': 'View Reviews',

        'Belum ada ulasan di browser ini. Jadilah yang pertama menuliskan pengalamanmu.':
          'No reviews saved in this browser yet. Be the first to share your experience.',

        'Ulasan di halaman ini hanya tersimpan pada browser ini, bukan ulasan publik dan tidak dikirim ke server.':
          'Reviews on this page are stored only in this browser. They are not public and are not sent to a server.',

        'Ulasan disimpan hanya di browser ini, bukan ulasan publik dan tidak dikirim ke server.':
          'Reviews are saved only in this browser. They are not public or sent to a server.',

        'Tulis ulasan': 'Write a review',
        'Nama panggilan': 'Display name',
        'Penilaian kamu': 'Your rating',
        'Ceritakan pengalamanmu': 'Tell us about your visit',
        'Kirim ulasan': 'Save review',
        'Belum ada penilaian': 'No ratings yet',
        'Ulasan lokal': 'Local reviews',
        'Hapus': 'Delete',

        'Pilih bintang terlebih dahulu.':
          'Select a star rating first.',

        'Isi nama 2–30 karakter dan ulasan 15–400 karakter.':
          'Enter a 2–30 character name and a 15–400 character review.',

        'Ulasan berhasil disimpan di browser ini.':
          'Review saved in this browser.',

        'Browser tidak mengizinkan penyimpanan. Ulasan belum tersimpan.':
          'Browser storage is unavailable. The review was not saved.',

        'Ulasan dihapus dari browser ini.':
          'Review deleted from this browser.',

        'Mode gelap': 'Dark mode',
        'Mode terang': 'Light mode',
        'Bahasa': 'Language',
        'Pilih rating': 'Choose rating',
        'Kembali ke atas': 'Back to top',
        'Tutup detail wisata': 'Close attraction details',
        'Tutup foto galeri': 'Close gallery photo',
        'Tutup perencana kunjungan': 'Close visit planner',
        'Buka menu navigasi': 'Open navigation menu',
        'Tutup menu navigasi': 'Close navigation menu',
        'Tampilan': 'Appearance',
        'Rencana': 'Plan',
        'Bahasa Indonesia atau Inggris': 'Indonesian or English language',
        'Ganti bahasa': 'Switch language',
        'Rata-rata ulasan lokal': 'Average of local reviews',
        'Ulasan telah tersimpan di browser ini.':
          'Review saved in this browser.'
      };

      function terjemahkan(teks) {
        if (bahasa === 'en' && translations[teks]) {
          return translations[teks];
        }
        return teks;
      }

      const daftarTeks = [];
      const daftarAtribut = [];

      function siapkanTerjemahan() {
        document.querySelectorAll('body *').forEach(function (elemen) {
          if (elemen.closest('#review-list')) {
            return;
          }

          elemen.childNodes.forEach(function (node) {
            if (
              node.nodeType === 3 &&
              node.nodeValue.trim()
            ) {
              daftarTeks.push({
                node: node,
                teksAsli: node.nodeValue
              });
            }
          });

          [
            'aria-label',
            'placeholder',
            'alt',
            'title'
          ].forEach(function (atribut) {
            if (elemen.hasAttribute(atribut)) {
              daftarAtribut.push({
                elemen: elemen,
                atribut: atribut,
                teksAsli: elemen.getAttribute(atribut)
              });
            }
          });
        });
      }

      function ubahBahasa() {
        document.documentElement.lang = bahasa;

        document.title = bahasa === 'en'
          ? 'Kawah Putih Ciwidey | Visitor Guide'
          : 'Kawah Putih Ciwidey | Panduan Wisata';

        daftarTeks.forEach(function (item) {
          const teksAsli = item.teksAsli;

          const teksBersih = teksAsli
            .trim()
            .replace(/\s+/g, ' ');

          const awalan =
            (teksAsli.match(/^\s*/) || [''])[0];

          const akhiran =
            (teksAsli.match(/\s*$/) || [''])[0];

          item.node.nodeValue =
            awalan +
            terjemahkan(teksBersih) +
            akhiran;
        });

        daftarAtribut.forEach(function (item) {
          item.elemen.setAttribute(
            item.atribut,
            terjemahkan(item.teksAsli)
          );
        });

        document.querySelectorAll(
          '[data-language-toggle]'
        ).forEach(function (tombol) {
          tombol.querySelector(
            '.language-label'
          ).textContent =
            bahasa === 'id'
              ? 'ID / EN'
              : 'EN / ID';
        });

        document.querySelector(
          '.mini-plan'
        ).textContent =
          bahasa === 'en'
            ? 'Plan'
            : 'Rencana';

        perbaruiTombolTema();
        perbaruiStatusGaleri();
        tampilkanUlasan();

        if (detailAktif && detailDialog.open) {
          tampilkanIsiDetail(detailAktif);
        }

        if (!hasilRencana.hidden) {
          tampilkanHasilRencana();
        }
      }

      function perbaruiTombolTema() {
        const modeGelap = tema === 'dark';

        document.querySelectorAll(
          '[data-theme-toggle]'
        ).forEach(function (tombol) {
          tombol.querySelector(
            '.theme-symbol'
          ).textContent =
            modeGelap ? '☀' : '☾';

          const nama = terjemahkan(
            modeGelap ? 'Mode terang' : 'Mode gelap'
          );

          tombol.setAttribute('aria-label', nama);
          tombol.title = nama;
        });
      }

      function ubahTema() {
        document.documentElement.setAttribute(
          'data-theme',
          tema
        );

        simpanPenyimpanan('kawah-tema', tema);
        perbaruiTombolTema();
      }

      document.querySelectorAll(
        '[data-theme-toggle]'
      ).forEach(function (tombol) {
        tombol.addEventListener('click', function () {
          tema = tema === 'dark'
            ? 'light'
            : 'dark';

          ubahTema();
        });
      });

      document.querySelectorAll(
        '[data-language-toggle]'
      ).forEach(function (tombol) {
        tombol.addEventListener('click', function () {
          bahasa = bahasa === 'id'
            ? 'en'
            : 'id';

          simpanPenyimpanan(
            'kawah-bahasa',
            bahasa
          );

          ubahBahasa();
        });
      });

      // ==========================================
      // 02. NAVBAR DAN MENU MOBILE
      // ==========================================

      const header =
        document.querySelector('.site-header');

      const menu =
        document.getElementById('main-nav');

      const tombolMenu =
        document.getElementById('menu-toggle');

      const tautanMenu =
        document.querySelectorAll(
          '#main-nav .nav-link'
        );

      const daftarSection =
        document.querySelectorAll(
          'main > section[id]'
        );

      let scrollTujuan = null;

      function tutupMenu() {
        menu.classList.remove('is-open');
        header.classList.remove('is-menu-open');

        tombolMenu.setAttribute(
          'aria-expanded',
          'false'
        );

        tombolMenu.setAttribute(
          'aria-label',
          terjemahkan('Buka menu navigasi')
        );
      }

      tombolMenu.addEventListener('click', function () {
        const terbuka =
          menu.classList.toggle('is-open');

        header.classList.toggle(
          'is-menu-open',
          terbuka
        );

        tombolMenu.setAttribute(
          'aria-expanded',
          String(terbuka)
        );

        tombolMenu.setAttribute(
          'aria-label',
          terjemahkan(
            terbuka
              ? 'Tutup menu navigasi'
              : 'Buka menu navigasi'
          )
        );
      });

      tautanMenu.forEach(function (tautan) {
        tautan.addEventListener(
          'click',
          tutupMenu
        );
      });

      document.addEventListener('click', function (event) {
        if (
          menu.classList.contains('is-open') &&
          !event.target.closest('.site-header')
        ) {
          tutupMenu();
        }
      });

      document.addEventListener('keydown', function (event) {
        if (
          event.key === 'Escape' &&
          menu.classList.contains('is-open')
        ) {
          tutupMenu();
          tombolMenu.focus();
        }
      });

      // Setiap section kini punya menu sendiri.
      // Ulasan tidak lagi dianggap bagian Galeri.
      function setMenuAktif(id) {
        if (id === 'lokasi') {
          id = 'panduan';
        }

        tautanMenu.forEach(function (tautan) {
          const aktif =
            tautan.getAttribute('href') ===
            '#' + id;

          tautan.classList.toggle(
            'is-active',
            aktif
          );

          if (aktif) {
            tautan.setAttribute(
              'aria-current',
              'page'
            );
          } else {
            tautan.removeAttribute(
              'aria-current'
            );
          }
        });
      }

      function posisiTujuan(elemen) {
        const tujuan =
          elemen.getBoundingClientRect().top +
          window.scrollY -
          header.offsetHeight -
          12;

        const batas =
          document.documentElement.scrollHeight -
          window.innerHeight;

        return Math.max(
          0,
          Math.min(tujuan, batas)
        );
      }

      document.querySelectorAll(
        'a[href^="#"]'
      ).forEach(function (tautan) {
        tautan.addEventListener('click', function (event) {
          if (
            event.defaultPrevented ||
            tautan.classList.contains('header-cta')
          ) {
            return;
          }

          if (
            event.ctrlKey ||
            event.metaKey ||
            event.shiftKey ||
            event.altKey
          ) {
            return;
          }

          const id =
            tautan.getAttribute('href').slice(1);

          const tujuan =
            document.getElementById(id);

          if (!tujuan) {
            return;
          }

          setMenuAktif(id);

          const posisi = posisiTujuan(tujuan);

          scrollTujuan =
            Math.abs(window.scrollY - posisi) > 3
              ? posisi
              : null;

          if (event.detail > 0) {
            tautan.blur();
          }
        });
      });

      function perbaruiNavbar() {
        header.classList.toggle(
          'is-scrolled',
          window.scrollY > 20
        );

        if (scrollTujuan !== null) {
          if (
            Math.abs(
              window.scrollY - scrollTujuan
            ) > 4
          ) {
            return;
          }

          scrollTujuan = null;
        }

        let sectionAktif = 'beranda';

        daftarSection.forEach(function (section) {
          if (
            section.getBoundingClientRect().top <=
            header.offsetHeight + 28
          ) {
            sectionAktif = section.id;
          }
        });

        // Ulasan adalah section terakhir.
        if (
          window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 4
        ) {
          sectionAktif = 'ulasan';
        }

        setMenuAktif(sectionAktif);
      }

      window.addEventListener(
        'scroll',
        perbaruiNavbar,
        { passive: true }
      );

      window.addEventListener('scrollend', function () {
        scrollTujuan = null;
        perbaruiNavbar();
      });

      window.addEventListener(
        'wheel',
        function () {
          scrollTujuan = null;
        },
        { passive: true }
      );

      window.addEventListener(
        'touchstart',
        function () {
          scrollTujuan = null;
        },
        { passive: true }
      );

      window.addEventListener('resize', function () {
        scrollTujuan = null;

        if (window.innerWidth > 860) {
          tutupMenu();
        }

        perbaruiNavbar();
      });

      window.addEventListener(
        'hashchange',
        perbaruiNavbar
      );

      document.addEventListener('keydown', function (event) {
        const tombolScroll = [
          'ArrowUp',
          'ArrowDown',
          'PageUp',
          'PageDown',
          'Home',
          'End',
          ' '
        ];

        if (tombolScroll.includes(event.key)) {
          scrollTujuan = null;
        }
      });

      // ==========================================
      // 03. RENCANAKAN KUNJUNGAN
      // ==========================================

      const dialogRencana =
        document.getElementById(
          'visit-planner-dialog'
        );

      const formRencana =
        document.getElementById('planner-form');

      const tanggalRencana =
        document.getElementById('planner-date');

      const hasilRencana =
        document.getElementById('planner-result');

      const pesanRencana =
        document.getElementById('planner-error');

      function tanggalHariIni() {
        const sekarang = new Date();

        return sekarang.getFullYear() + '-' +
          String(
            sekarang.getMonth() + 1
          ).padStart(2, '0') + '-' +
          String(
            sekarang.getDate()
          ).padStart(2, '0');
      }

      function bukaRencana() {
        tutupMenu();

        tanggalRencana.min = tanggalHariIni();

        if (
          tanggalRencana.value &&
          tanggalRencana.value < tanggalHariIni()
        ) {
          tanggalRencana.value = '';
          hasilRencana.hidden = true;
        }

        if (!dialogRencana.open) {
          dialogRencana.showModal();
        }
      }

      document.querySelector(
        '.header-cta'
      ).addEventListener('click', function (event) {
        event.preventDefault();
        bukaRencana();
      });

      document.querySelectorAll(
        '[data-open-planner]'
      ).forEach(function (tombol) {
        tombol.addEventListener(
          'click',
          bukaRencana
        );
      });

      const aktivitasRencana = {
        danau:
          'Danau Kawah — menikmati panorama danau vulkanik dan kawasan sekitarnya.',

        skywalk:
          'Skywalk Cantigi — menjelajahi jalur wisata dan menikmati suasana vegetasi cantigi.',

        sunan:
          'Panorama Sunan Ibu — melihat bentang alam kawah dari sudut pandang yang berbeda.'
      };

      function tampilkanHasilRencana() {
        const [tahun, bulan, hari] =
          tanggalRencana.value
            .split('-')
            .map(Number);

        const formatTanggal =
          new Intl.DateTimeFormat(
            bahasa === 'en'
              ? 'en-GB'
              : 'id-ID',
            {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            }
          ).format(
            new Date(tahun, bulan - 1, hari)
          );

        const waktu =
          document.getElementById(
            'planner-time'
          ).value;

        const namaWaktu = bahasa === 'en'
          ? (
            waktu === 'pagi'
              ? 'Morning'
              : 'Afternoon'
          )
          : (
            waktu === 'pagi'
              ? 'Pagi'
              : 'Siang'
          );

        document.getElementById(
          'planner-summary'
        ).textContent = bahasa === 'en'
          ? 'Date: ' + formatTanggal +
            ' | Preferred time: ' + namaWaktu
          : 'Tanggal: ' + formatTanggal +
            ' | Waktu pilihan: ' + namaWaktu;

        const daftar =
          document.getElementById('planner-list');

        daftar.replaceChildren();

        formRencana.querySelectorAll(
          'input[name="destinasi"]:checked'
        ).forEach(function (pilihan) {
          const item = document.createElement('li');

          item.textContent = terjemahkan(
            aktivitasRencana[pilihan.value]
          );

          daftar.appendChild(item);
        });
      }

      formRencana.addEventListener('submit', function (event) {
        event.preventDefault();
        tanggalRencana.min = tanggalHariIni();

        if (
          !tanggalRencana.value ||
          tanggalRencana.value < tanggalHariIni()
        ) {
          pesanRencana.hidden = false;

          pesanRencana.textContent = terjemahkan(
            'Pilih tanggal hari ini atau tanggal yang akan datang.'
          );

          hasilRencana.hidden = true;
          tanggalRencana.focus();
          return;
        }

        if (
          !formRencana.querySelector(
            'input[name="destinasi"]:checked'
          )
        ) {
          pesanRencana.hidden = false;

          pesanRencana.textContent = terjemahkan(
            'Pilih minimal satu tempat yang ingin dikunjungi.'
          );

          hasilRencana.hidden = true;
          return;
        }

        pesanRencana.hidden = true;

        tampilkanHasilRencana();
        hasilRencana.hidden = false;
        hasilRencana.focus();
      });

      formRencana.addEventListener('change', function () {
        hasilRencana.hidden = true;
        pesanRencana.hidden = true;
      });

      // ==========================================
      // 04. FOTO, DETAIL, DAN GALERI
      // ==========================================

      function statusGambar(gambar) {
        const bingkai =
          gambar.closest('.media-frame');

        if (!bingkai) {
          return;
        }

        bingkai.classList.remove(
          'is-loading',
          'is-ready',
          'is-error'
        );

        bingkai.classList.add(
          gambar.naturalWidth > 0
            ? 'is-ready'
            : 'is-error'
        );
      }

      document.querySelectorAll(
        '.media-frame img'
      ).forEach(function (gambar) {
        gambar.addEventListener('load', function () {
          statusGambar(gambar);
        });

        gambar.addEventListener('error', function () {
          statusGambar(gambar);
        });

        if (
          gambar.getAttribute('src') &&
          gambar.complete
        ) {
          statusGambar(gambar);
        }
      });

      function ubahFotoDialog(
        idGambar,
        idBingkai,
        sumber,
        keterangan
      ) {
        const gambar =
          document.getElementById(idGambar);

        const bingkai =
          document.getElementById(idBingkai);

        bingkai.classList.remove(
          'is-ready',
          'is-error'
        );

        bingkai.classList.add('is-loading');

        gambar.alt = terjemahkan(keterangan);
        gambar.src = sumber;

        if (gambar.complete) {
          statusGambar(gambar);
        }
      }

      const detailDialog =
        document.getElementById('detail-dialog');

      const dayaTarik = {
        danau: {
          kategori: 'DANAU VULKANIK',
          judul: 'Danau Kawah',

          deskripsi:
            'Danau Kawah Putih merupakan bagian dari kawasan vulkanik Gunung Patuha. Warna permukaan air dapat terlihat berbeda mengikuti kondisi alam. Pengunjung perlu tetap mengikuti batas aman dan arahan petugas saat menikmati pemandangan.',

          gambar: 'images/danau_kawah.jpeg',

          alt:
            'Danau Kawah Putih dan bentang alam sekitarnya'
        },

        skywalk: {
          kategori: 'JALUR PANDANG',
          judul: 'Skywalk Cantigi',

          deskripsi:
            'Skywalk Cantigi merupakan jalur wisata yang melewati vegetasi cantigi di kawasan Kawah Putih. Jalur ini memberikan sudut pandang berbeda ke arah lanskap sekitar. Ikuti ketentuan akses dan keselamatan yang berlaku di lokasi.',

          gambar: 'images/Skywalk_Cantigi.jpeg',

          alt:
            'Jalur Skywalk Cantigi di kawasan Kawah Putih'
        },

        sunan: {
          kategori: 'PANORAMA',
          judul: 'Panorama Sunan Ibu',

          deskripsi:
            'Panorama Sunan Ibu menawarkan pemandangan kawasan kawah dan perbukitan dari sudut yang berbeda. Kabut serta cuaca dapat memengaruhi jarak pandang. Periksa kondisi dan akses lokasi sebelum berkunjung.',

          gambar: 'images/sunan_ibu.jpeg',

          alt:
            'Pemandangan kawasan Kawah Putih dari Sunan Ibu'
        }
      };

      let detailAktif = '';

      function tampilkanIsiDetail(id) {
        const info = dayaTarik[id];

        if (!info) {
          return;
        }

        document.getElementById(
          'detail-category'
        ).textContent = terjemahkan(info.kategori);

        document.getElementById(
          'detail-title'
        ).textContent = terjemahkan(info.judul);

        document.getElementById(
          'detail-description'
        ).textContent = terjemahkan(info.deskripsi);
      }

      document.querySelectorAll(
        '.detail-trigger'
      ).forEach(function (tombol) {
        tombol.addEventListener('click', function () {
          detailAktif = tombol.dataset.detail;

          const info = dayaTarik[detailAktif];

          if (!info) {
            return;
          }

          tampilkanIsiDetail(detailAktif);

          ubahFotoDialog(
            'detail-image',
            'detail-image-frame',
            info.gambar,
            info.alt
          );

          detailDialog.showModal();
        });
      });

      const tombolFilter =
        document.querySelectorAll('.filter-button');

      const gambarGaleri =
        document.querySelectorAll('.gallery-item');

      const statusGaleri =
        document.getElementById('gallery-status');

      function perbaruiStatusGaleri() {
        let jumlah = 0;

        gambarGaleri.forEach(function (item) {
          if (!item.hidden) {
            jumlah++;
          }
        });

        statusGaleri.textContent = bahasa === 'en'
          ? 'Showing ' + jumlah + ' gallery photos.'
          : 'Menampilkan ' + jumlah + ' item galeri.';
      }

      tombolFilter.forEach(function (tombol) {
        tombol.addEventListener('click', function () {
          const filter = tombol.dataset.filter;

          tombolFilter.forEach(function (item) {
            const aktif = item === tombol;

            item.classList.toggle(
              'is-selected',
              aktif
            );

            item.setAttribute(
              'aria-pressed',
              String(aktif)
            );
          });

          gambarGaleri.forEach(function (item) {
            item.hidden =
              filter !== 'semua' &&
              item.dataset.category !== filter;
          });

          perbaruiStatusGaleri();
        });
      });

      const fotoCadangan = {
        'images/hero-kawah-putih.jpg':
          'images/kawah.jpeg',

        'images/sunan-ibu.jpg':
          'images/sunan_ibu.jpeg'
      };

      const dialogGaleri =
        document.getElementById('gallery-dialog');

      document.querySelectorAll(
        '.gallery-open'
      ).forEach(function (tombol) {
        const gambar = tombol.querySelector('img');

        const pengganti =
          fotoCadangan[gambar.getAttribute('src')];

        if (pengganti) {
          function pakaiFotoCadangan() {
            if (
              gambar.dataset.fallbackUsed === 'yes'
            ) {
              return;
            }

            gambar.dataset.fallbackUsed = 'yes';
            gambar.src = pengganti;
            tombol.dataset.image = pengganti;
          }

          gambar.addEventListener(
            'error',
            pakaiFotoCadangan
          );

          if (
            gambar.complete &&
            !gambar.naturalWidth
          ) {
            pakaiFotoCadangan();
          }
        }

        tombol.addEventListener('click', function () {
          const judulAsli =
            tombol.getAttribute('data-title');

          const altAsli =
            tombol.getAttribute('data-alt');

          document.getElementById(
            'gallery-dialog-title'
          ).textContent = terjemahkan(judulAsli);

          ubahFotoDialog(
            'gallery-dialog-image',
            'gallery-image-frame',
            tombol.dataset.image,
            altAsli
          );

          dialogGaleri.showModal();
        });
      });

      document.querySelectorAll(
        '[data-close-dialog]'
      ).forEach(function (tombol) {
        tombol.addEventListener('click', function () {
          tombol.closest('dialog').close();
        });
      });

      document.querySelectorAll(
        'dialog'
      ).forEach(function (dialog) {
        dialog.addEventListener('click', function (event) {
          if (event.target === dialog) {
            dialog.close();
          }
        });
      });

      // ==========================================
      // 05. ULASAN DAN RATING
      // ==========================================

      const kunciUlasan = 'kawah-ulasan-v1';

      const formUlasan =
        document.getElementById('review-form');

      const daftarUlasan =
        document.getElementById('review-list');

      const pesanUlasan =
        document.getElementById('review-status');

      const bintangRating =
        document.querySelectorAll(
          '#star-options input[name="rating"]'
        );

      function ambilUlasan() {
        try {
          let sumber = bacaPenyimpanan(
            kunciUlasan,
            ''
          );

          if (!sumber) {
            const lama = bacaPenyimpanan(
              'kp-reviews-v1',
              ''
            );

            if (lama) {
              const dataLama = JSON.parse(lama);

              if (Array.isArray(dataLama)) {
                const konversi = dataLama.map(
                  function (item) {
                    return {
                      nama: item.name,
                      pesan: item.message,
                      rating: item.rating,
                      tanggal: item.date
                    };
                  }
                );

                sumber = JSON.stringify(konversi);

                simpanPenyimpanan(
                  kunciUlasan,
                  sumber
                );
              }
            }
          }

          const data = JSON.parse(
            sumber || '[]'
          );

          if (!Array.isArray(data)) {
            return [];
          }

          return data.filter(function (item) {
            return (
              item &&
              typeof item.nama === 'string' &&
              typeof item.pesan === 'string' &&
              Number.isInteger(item.rating) &&
              item.rating >= 1 &&
              item.rating <= 5 &&
              typeof item.tanggal === 'string'
            );
          }).slice(0, 20);
        } catch (error) {
          return [];
        }
      }

      let semuaUlasan = ambilUlasan();

      function perbaruiBintang() {
        const dipilih =
          document.querySelector(
            '#star-options input[name="rating"]:checked'
          );

        const nilai = dipilih
          ? Number(dipilih.value)
          : 0;

        bintangRating.forEach(function (input) {
          input.nextElementSibling.classList.toggle(
            'selected',
            Number(input.value) <= nilai
          );
        });
      }

      bintangRating.forEach(function (input) {
        input.addEventListener(
          'change',
          perbaruiBintang
        );
      });

      function tampilkanUlasan() {
        daftarUlasan.replaceChildren();

        const rataElemen =
          document.getElementById('rating-average');

        const bintangElemen =
          document.getElementById(
            'rating-average-stars'
          );

        const jumlahElemen =
          document.getElementById('review-count');

        if (semuaUlasan.length === 0) {
          rataElemen.textContent = '—';
          bintangElemen.textContent = '☆☆☆☆☆';

          jumlahElemen.textContent = terjemahkan(
            'Belum ada penilaian'
          );

          const kosong =
            document.createElement('p');

          kosong.className = 'review-empty';

          kosong.textContent = terjemahkan(
            'Belum ada ulasan di browser ini. Jadilah yang pertama menuliskan pengalamanmu.'
          );

          daftarUlasan.appendChild(kosong);
          return;
        }

        const totalNilai = semuaUlasan.reduce(
          function (jumlah, item) {
            return jumlah + item.rating;
          },
          0
        );

        const rata =
          totalNilai / semuaUlasan.length;

        rataElemen.textContent =
          rata.toFixed(1).replace(
            '.',
            bahasa === 'id' ? ',' : '.'
          );

        const bulat = Math.round(rata);

        bintangElemen.textContent =
          '★'.repeat(bulat) +
          '☆'.repeat(5 - bulat);

        jumlahElemen.textContent = bahasa === 'en'
          ? semuaUlasan.length + ' local reviews'
          : semuaUlasan.length + ' ulasan lokal';

        semuaUlasan.forEach(function (item, urutan) {
          const artikel =
            document.createElement('article');

          artikel.className = 'review-item';

          const baris =
            document.createElement('div');

          baris.className = 'review-item-head';

          const nama =
            document.createElement('strong');

          nama.textContent = item.nama;

          const tanggal =
            document.createElement('time');

          tanggal.dateTime = item.tanggal;

          const tanggalAsli =
            new Date(item.tanggal);

          tanggal.textContent =
            isNaN(tanggalAsli.getTime())
              ? ''
              : tanggalAsli.toLocaleDateString(
                  bahasa === 'en'
                    ? 'en-GB'
                    : 'id-ID',
                  {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  }
                );

          baris.appendChild(nama);
          baris.appendChild(tanggal);

          const nilai =
            document.createElement('p');

          nilai.className = 'rating-stars';

          nilai.textContent =
            '★'.repeat(item.rating) +
            '☆'.repeat(5 - item.rating);

          nilai.setAttribute(
            'aria-label',
            item.rating + ' / 5'
          );

          const isi =
            document.createElement('p');

          isi.className = 'review-message';
          isi.textContent = item.pesan;

          const hapus =
            document.createElement('button');

          hapus.type = 'button';
          hapus.className = 'review-delete';

          hapus.textContent = terjemahkan('Hapus');

          hapus.addEventListener('click', function () {
            const dataBaru = semuaUlasan.filter(
              function (_, indeks) {
                return indeks !== urutan;
              }
            );

            if (
              simpanPenyimpanan(
                kunciUlasan,
                JSON.stringify(dataBaru)
              )
            ) {
              semuaUlasan = dataBaru;
              tampilkanUlasan();

              pesanUlasan.textContent = terjemahkan(
                'Ulasan dihapus dari browser ini.'
              );
            } else {
              pesanUlasan.textContent = terjemahkan(
                'Browser tidak mengizinkan penyimpanan. Ulasan belum tersimpan.'
              );
            }
          });

          artikel.appendChild(baris);
          artikel.appendChild(nilai);
          artikel.appendChild(isi);
          artikel.appendChild(hapus);

          daftarUlasan.appendChild(artikel);
        });
      }

      formUlasan.addEventListener('submit', function (event) {
        event.preventDefault();

        const nama =
          document.getElementById(
            'review-name'
          ).value.trim();

        const pesan =
          document.getElementById(
            'review-message'
          ).value.trim();

        const inputBintang =
          formUlasan.querySelector(
            'input[name="rating"]:checked'
          );

        const rating = inputBintang
          ? Number(inputBintang.value)
          : 0;

        if (rating < 1 || rating > 5) {
          pesanUlasan.textContent = terjemahkan(
            'Pilih bintang terlebih dahulu.'
          );
          return;
        }

        if (
          nama.length < 2 ||
          nama.length > 30 ||
          pesan.length < 15 ||
          pesan.length > 400
        ) {
          pesanUlasan.textContent = terjemahkan(
            'Isi nama 2–30 karakter dan ulasan 15–400 karakter.'
          );
          return;
        }

        const dataBaru = [{
          nama: nama,
          pesan: pesan,
          rating: rating,
          tanggal: new Date().toISOString()
        }].concat(semuaUlasan).slice(0, 20);

        if (
          !simpanPenyimpanan(
            kunciUlasan,
            JSON.stringify(dataBaru)
          )
        ) {
          pesanUlasan.textContent = terjemahkan(
            'Browser tidak mengizinkan penyimpanan. Ulasan belum tersimpan.'
          );
          return;
        }

        semuaUlasan = dataBaru;

        formUlasan.reset();
        perbaruiBintang();
        tampilkanUlasan();

        pesanUlasan.textContent = terjemahkan(
          'Ulasan berhasil disimpan di browser ini.'
        );
      });

      // ==========================================
      // 06. TOMBOL KEMBALI KE ATAS
      // ==========================================

      const kembaliAtas =
        document.getElementById('back-to-top');

      function perbaruiKembaliAtas() {
        kembaliAtas.hidden =
          window.scrollY < 650;
      }

      window.addEventListener(
        'scroll',
        perbaruiKembaliAtas,
        { passive: true }
      );

      kembaliAtas.addEventListener('click', function () {
        const kurangiGerak =
          window.matchMedia(
            '(prefers-reduced-motion: reduce)'
          ).matches;

        setMenuAktif('beranda');

        scrollTujuan =
          window.scrollY > 3 ? 0 : null;

        window.scrollTo({
          top: 0,
          behavior: kurangiGerak
            ? 'auto'
            : 'smooth'
        });
      });

      // ==========================================
      // 07. INISIALISASI
      // ==========================================

      siapkanTerjemahan();
      ubahTema();
      ubahBahasa();
      perbaruiBintang();
      perbaruiNavbar();
      perbaruiKembaliAtas();

      // Atur posisi awal jika browser direfresh.
      if (halamanDirefresh) {
        const akar =
          document.documentElement;

        const sebelumnya =
          akar.style.scrollBehavior;

        akar.style.scrollBehavior = 'auto';
        window.scrollTo(0, 0);

        requestAnimationFrame(function () {
          akar.style.scrollBehavior = sebelumnya;
        });

        window.addEventListener('load', function () {
          akar.style.scrollBehavior = 'auto';
          window.scrollTo(0, 0);

          requestAnimationFrame(function () {
            akar.style.scrollBehavior = sebelumnya;
            perbaruiNavbar();
            perbaruiKembaliAtas();
          });
        }, { once: true });
      }
    }
  );
})();
