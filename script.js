
/* ==========================================
   KAWAH PUTIH — JAVASCRIPT LENGKAP

   Fitur:
   1. Navbar dan menu mobile
   2. Navigasi aktif saat klik dan scroll
   3. Perencana kunjungan
   4. Validasi tanggal kunjungan
   5. Status pemuatan gambar
   6. Modal Lihat Detail
   7. Filter dan lightbox Galeri
   8. Tombol kembali ke atas

   Hero memakai Cinematic Zoom dari CSS.
========================================== */


// ==========================================
// 01. NAVBAR DAN MENU MOBILE
// ==========================================

const siteHeader =
  document.querySelector('.site-header');

const menuToggle =
  document.getElementById('menu-toggle');

const mainNav =
  document.getElementById('main-nav');

const navLinks =
  document.querySelectorAll('.nav-link');

const pageSections =
  document.querySelectorAll('main > section[id]');

let pendingNavigation = null;


// Mengubah navbar menjadi putih saat scroll.
function updateHeaderAppearance() {

  siteHeader.classList.toggle(
    'is-scrolled',
    window.scrollY > 20
  );

}


// Menutup menu mobile.
function closeMenu() {

  mainNav.classList.remove('is-open');

  siteHeader.classList.remove('is-menu-open');

  menuToggle.setAttribute(
    'aria-expanded',
    'false'
  );

  menuToggle.setAttribute(
    'aria-label',
    'Buka menu navigasi'
  );

}


// Membuka atau menutup menu hamburger.
menuToggle.addEventListener(
  'click',
  function () {

    const isOpen =
      mainNav.classList.toggle('is-open');

    siteHeader.classList.toggle(
      'is-menu-open',
      isOpen
    );

    menuToggle.setAttribute(
      'aria-expanded',
      String(isOpen)
    );

    menuToggle.setAttribute(
      'aria-label',
      isOpen
        ? 'Tutup menu navigasi'
        : 'Buka menu navigasi'
    );

  }
);


// Tutup menu setelah memilih navigasi.
navLinks.forEach(function (link) {

  link.addEventListener(
    'click',
    closeMenu
  );

});


// Tutup menu jika klik di luar header.
document.addEventListener(
  'click',
  function (event) {

    if (
      mainNav.classList.contains('is-open') &&
      !event.target.closest('.site-header')
    ) {

      closeMenu();

    }

  }
);


// Menutup menu dengan tombol Escape.
document.addEventListener(
  'keydown',
  function (event) {

    if (
      event.key === 'Escape' &&
      mainNav.classList.contains('is-open')
    ) {

      closeMenu();
      menuToggle.focus();

    }

  }
);


// ==========================================
// 02. NAVIGASI AKTIF
// ==========================================

// Memindahkan garis aktif navbar.
function setActiveNavigation(activeId) {

  navLinks.forEach(function (link) {

    const isActive =
      link.getAttribute('href') ===
      '#' + activeId;

    link.classList.toggle(
      'is-active',
      isActive
    );

    if (isActive) {

      link.setAttribute(
        'aria-current',
        'page'
      );

    } else {

      link.removeAttribute(
        'aria-current'
      );

    }

  });

}


// Menghitung posisi tujuan.
function getTargetScrollPosition(target) {

  const targetY =
    target.getBoundingClientRect().top +
    window.scrollY -
    siteHeader.offsetHeight -
    12;

  const maxY =
    document.documentElement.scrollHeight -
    window.innerHeight;

  return Math.max(
    0,
    Math.min(targetY, maxY)
  );

}


// Navbar langsung aktif saat diklik.
document.querySelectorAll(
  'a[href^="#"]'
).forEach(function (link) {

  link.addEventListener(
    'click',
    function (event) {

      if (
        event.defaultPrevented ||
        link.classList.contains('header-cta') ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      ) {

        return;

      }

      const targetId =
        link.getAttribute('href').slice(1);

      const target =
        document.getElementById(targetId);

      if (!target) return;

      const activeId =
        targetId === 'lokasi'
          ? 'panduan'
          : targetId;

      setActiveNavigation(activeId);

      const destination =
        getTargetScrollPosition(target);

      pendingNavigation =
        Math.abs(
          window.scrollY - destination
        ) > 3

          ? {
              id: activeId,
              position: destination
            }

          : null;

      if (event.detail > 0) {

        link.blur();

      }

    }
  );

});


// Menentukan navbar aktif dari posisi scroll.
function updateActiveNavigation() {

  if (pendingNavigation) {

    if (
      Math.abs(
        window.scrollY -
        pendingNavigation.position
      ) > 4
    ) {

      return;

    }

    pendingNavigation = null;

  }

  let activeId = 'beranda';

  const activationLine =
    siteHeader.offsetHeight + 28;

  pageSections.forEach(function (section) {

    if (
      section.getBoundingClientRect().top <=
      activationLine
    ) {

      activeId = section.id;

    }

  });

  const nearBottom =
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight - 4;

  if (
    nearBottom &&
    pageSections.length > 0
  ) {

    activeId =
      pageSections[
        pageSections.length - 1
      ].id;

  }

  setActiveNavigation(activeId);

}


// Membatalkan navigasi otomatis saat scroll manual.
function cancelPendingNavigation() {

  pendingNavigation = null;

}


window.addEventListener(
  'wheel',
  cancelPendingNavigation,
  { passive: true }
);

window.addEventListener(
  'touchstart',
  cancelPendingNavigation,
  { passive: true }
);


document.addEventListener(
  'keydown',
  function (event) {

    const scrollKeys = [
      'ArrowUp',
      'ArrowDown',
      'PageUp',
      'PageDown',
      'Home',
      'End',
      ' '
    ];

    if (scrollKeys.includes(event.key)) {

      cancelPendingNavigation();

    }

  }
);


window.addEventListener(
  'scroll',
  updateHeaderAppearance,
  { passive: true }
);

window.addEventListener(
  'scroll',
  updateActiveNavigation,
  { passive: true }
);


window.addEventListener(
  'scrollend',
  function () {

    pendingNavigation = null;

    updateActiveNavigation();

  }
);


window.addEventListener(
  'resize',
  function () {

    pendingNavigation = null;

    updateHeaderAppearance();
    updateActiveNavigation();

    if (window.innerWidth > 860) {

      closeMenu();

    }

  }
);


window.addEventListener(
  'hashchange',
  function () {

    if (!pendingNavigation) {

      updateActiveNavigation();

    }

  }
);


window.addEventListener(
  'load',
  function () {

    updateHeaderAppearance();
    updateActiveNavigation();

  }
);


// Jalankan saat halaman pertama dibuka.
updateHeaderAppearance();
updateActiveNavigation();


// ==========================================
// 03. POPUP RENCANAKAN KUNJUNGAN
// ==========================================

// Fitur ini tidak menggunakan database.
// Hanya membuat ringkasan rencana kunjungan.

const headerPlannerButton =
  document.querySelector('.header-cta');

const plannerDialog =
  document.createElement('dialog');

plannerDialog.id =
  'visit-planner-dialog';

plannerDialog.className =
  'site-dialog planner-dialog';

plannerDialog.setAttribute(
  'aria-labelledby',
  'planner-title'
);


plannerDialog.innerHTML = `

  <div class="planner-content">

    <button
      type="button"
      class="dialog-close"
      data-close-dialog
      aria-label="Tutup perencana kunjungan"
    >
      &times;
    </button>

    <p class="eyebrow">
      PERSIAPKAN PERJALANAN
    </p>

    <h2 id="planner-title">
      Rencanakan Kunjungan
    </h2>

    <p class="planner-description">
      Pilih tanggal, waktu, dan tempat yang
      ingin dijelajahi. Kami akan menyusun
      ringkasan rencana kunjunganmu.
    </p>

    <form
      id="planner-form"
      class="planner-form"
    >

      <div class="planner-row">

        <label class="planner-field">

          <span>
            Tanggal kunjungan
          </span>

          <input
            type="date"
            id="planner-date"
            name="tanggal"
            required
          >

        </label>

        <label class="planner-field">

          <span>
            Waktu pilihan
          </span>

          <select
            id="planner-time"
            name="waktu"
          >

            <option value="pagi">
              Pagi
            </option>

            <option value="siang">
              Siang
            </option>

          </select>

        </label>

      </div>

      <fieldset class="planner-options">

        <legend>
          Tempat yang ingin dikunjungi
        </legend>

        <label class="planner-choice">

          <input
            type="checkbox"
            name="destinasi"
            value="danau"
            checked
          >

          <span>
            Danau Kawah
          </span>

        </label>

        <label class="planner-choice">

          <input
            type="checkbox"
            name="destinasi"
            value="skywalk"
            checked
          >

          <span>
            Skywalk Cantigi
          </span>

        </label>

        <label class="planner-choice">

          <input
            type="checkbox"
            name="destinasi"
            value="sunan"
          >

          <span>
            Panorama Sunan Ibu
          </span>

        </label>

      </fieldset>

      <button
        type="submit"
        class="button button-primary planner-submit"
      >
        Buat Rencana Kunjungan
      </button>

      <p
        id="planner-error"
        class="planner-error"
        role="alert"
        hidden
      ></p>

    </form>

    <div
      id="planner-result"
      class="planner-result"
      tabindex="-1"
      hidden
    >

      <h3>
        Ringkasan Rencana
      </h3>

      <p id="planner-summary"></p>

      <ol id="planner-list"></ol>

      <p class="planner-note">

        Ini merupakan rencana sementara,
        bukan reservasi.

        Periksa kondisi cuaca, akses wisata,
        tiket, dan jam operasional sebelum
        berangkat.

      </p>

    </div>

  </div>

`;

document.body.appendChild(plannerDialog);


// ==========================================
// 04. VALIDASI TANGGAL KUNJUNGAN
// ==========================================

const plannerForm =
  document.getElementById('planner-form');

const plannerDate =
  document.getElementById('planner-date');

const plannerTime =
  document.getElementById('planner-time');

const plannerError =
  document.getElementById('planner-error');

const plannerResult =
  document.getElementById('planner-result');

const plannerSummary =
  document.getElementById('planner-summary');

const plannerList =
  document.getElementById('planner-list');


// Mengambil tanggal hari ini berdasarkan
// waktu lokal pengguna.
function getTodayLocal() {

  const now = new Date();

  const year = now.getFullYear();

  const month = String(
    now.getMonth() + 1
  ).padStart(2, '0');

  const day = String(
    now.getDate()
  ).padStart(2, '0');

  return (
    year + '-' +
    month + '-' +
    day
  );

}


// Membatasi pilihan tanggal mulai hari ini.
function updateMinimumDate() {

  const today = getTodayLocal();

  plannerDate.min = today;

  if (
    plannerDate.value &&
    plannerDate.value < today
  ) {

    plannerDate.value = '';

    plannerResult.hidden = true;

  }

}


// Membuka popup perencana kunjungan.
function openVisitPlanner() {

  closeMenu();

  updateMinimumDate();

  if (!plannerDialog.open) {

    plannerDialog.showModal();

  }

}


// Tombol Rencanakan Kunjungan pada desktop.
if (headerPlannerButton) {

  headerPlannerButton.addEventListener(
    'click',
    function (event) {

      event.preventDefault();

      openVisitPlanner();

    }
  );

}


// Tombol Rencanakan Kunjungan pada mobile.
const mobilePlannerLink =
  document.createElement('a');

mobilePlannerLink.href =
  '#rencanakan-kunjungan';

mobilePlannerLink.className =
  'nav-link mobile-planner-link';

mobilePlannerLink.textContent =
  'Rencanakan Kunjungan';


mobilePlannerLink.addEventListener(
  'click',
  function (event) {

    event.preventDefault();

    openVisitPlanner();

  }
);


// Menambahkan tombol ke menu mobile.
function updateMobilePlannerLink() {

  if (window.innerWidth <= 860) {

    if (
      !mainNav.contains(mobilePlannerLink)
    ) {

      mainNav.appendChild(
        mobilePlannerLink
      );

    }

  } else {

    if (
      mainNav.contains(mobilePlannerLink)
    ) {

      mobilePlannerLink.remove();

    }

  }

}


window.addEventListener(
  'resize',
  updateMobilePlannerLink
);

updateMobilePlannerLink();

updateMinimumDate();


// ==========================================
// 05. HASIL RENCANA KUNJUNGAN
// ==========================================

const plannerDestinations = {

  danau:
    'Danau Kawah — menikmati panorama danau vulkanik dan kawasan sekitarnya.',

  skywalk:
    'Skywalk Cantigi — menjelajahi jalur wisata dan menikmati suasana vegetasi cantigi.',

  sunan:
    'Panorama Sunan Ibu — melihat bentang alam kawah dari sudut pandang yang berbeda.'

};


// Mengubah format tanggal ke bahasa Indonesia.
function formatPlannerDate(value) {

  const parts =
    value.split('-').map(Number);

  const date = new Date(
    parts[0],
    parts[1] - 1,
    parts[2]
  );

  return new Intl.DateTimeFormat(
    'id-ID',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }
  ).format(date);

}


// Menampilkan pesan validasi.
function showPlannerError(message) {

  plannerError.textContent = message;

  plannerError.hidden = false;

  plannerResult.hidden = true;

}


// Membuat hasil rencana kunjungan.
plannerForm.addEventListener(
  'submit',
  function (event) {

    event.preventDefault();

    updateMinimumDate();

    // Tidak boleh memilih tanggal lampau.
    if (
      !plannerDate.value ||
      plannerDate.value < getTodayLocal()
    ) {

      showPlannerError(
        'Pilih tanggal hari ini atau tanggal yang akan datang.'
      );

      plannerDate.focus();

      return;

    }

    // Mengambil destinasi yang dipilih.
    const selectedInputs =
      plannerForm.querySelectorAll(
        'input[name="destinasi"]:checked'
      );

    const selectedDestinations =
      Array.from(selectedInputs).map(
        function (input) {

          return input.value;

        }
      );

    // Minimal memilih satu destinasi.
    if (
      selectedDestinations.length === 0
    ) {

      showPlannerError(
        'Pilih minimal satu tempat yang ingin dikunjungi.'
      );

      return;

    }

    plannerError.hidden = true;

    // Tanggal dan waktu pilihan.
    const formattedDate =
      formatPlannerDate(plannerDate.value);

    const preferredTime =
      plannerTime.value === 'pagi'
        ? 'Pagi'
        : 'Siang';

    plannerSummary.textContent =
      'Tanggal: ' + formattedDate +
      ' | Waktu pilihan: ' + preferredTime;

    // Hapus hasil rencana sebelumnya.
    plannerList.replaceChildren();

    // Tampilkan semua destinasi pilihan.
    selectedDestinations.forEach(
      function (destinationId) {

        const listItem =
          document.createElement('li');

        listItem.textContent =
          plannerDestinations[destinationId];

        plannerList.appendChild(listItem);

      }
    );

    plannerResult.hidden = false;

    plannerResult.focus();

  }
);


// Jika pilihan berubah, hasil lama disembunyikan.
plannerForm.addEventListener(
  'change',
  function () {

    plannerResult.hidden = true;

    plannerError.hidden = true;

  }
);


// ==========================================
// 06. STATUS PEMUATAN GAMBAR
// ==========================================

// Mengatur status loading, berhasil,
// atau gagal untuk seluruh foto.
function updateImageState(image) {

  const frame =
    image.closest('.media-frame');

  if (!frame) return;

  frame.classList.remove(
    'is-loading',
    'is-ready',
    'is-error'
  );

  if (image.naturalWidth > 0) {

    frame.classList.add('is-ready');

  } else {

    frame.classList.add('is-error');

  }

}


// Menjalankan pengecekan gambar.
document.querySelectorAll(
  '.media-frame img'
).forEach(function (image) {

  image.addEventListener(
    'load',
    function () {

      updateImageState(image);

    }
  );

  image.addEventListener(
    'error',
    function () {

      updateImageState(image);

    }
  );

  if (
    image.getAttribute('src') &&
    image.complete
  ) {

    updateImageState(image);

  }

});


// Mengganti foto di popup.
function setDialogImage(
  imageId,
  frameId,
  source,
  altText
) {

  const image =
    document.getElementById(imageId);

  const frame =
    document.getElementById(frameId);

  frame.classList.remove(
    'is-ready',
    'is-error'
  );

  frame.classList.add('is-loading');

  image.alt = altText;

  image.src = source;

  if (image.complete) {

    updateImageState(image);

  }

}


// ==========================================
// 07. MODAL LIHAT DETAIL
// ==========================================

/*
  PERBAIKAN:
  Foto menggunakan nama file asli yang
  sebelumnya ditemukan pada ZIP proyek.

  Jadi tidak perlu menggandakan atau
  mengganti nama gambar yang sudah ada.
*/

const attractionDetails = {

  danau: {

    category:
      'DANAU VULKANIK',

    title:
      'Danau Kawah',

    description:
      'Danau Kawah Putih merupakan bagian dari kawasan vulkanik Gunung Patuha. Warna permukaan air dapat terlihat berbeda mengikuti kondisi alam. Pengunjung perlu tetap mengikuti batas aman dan arahan petugas saat menikmati pemandangan.',

    image:
      'images/danau_kawah.jpeg',

    alt:
      'Danau Kawah Putih dan bentang alam sekitarnya'

  },

  skywalk: {

    category:
      'JALUR PANDANG',

    title:
      'Skywalk Cantigi',

    description:
      'Skywalk Cantigi merupakan jalur wisata yang melewati vegetasi cantigi di kawasan Kawah Putih. Jalur ini memberikan sudut pandang berbeda ke arah lanskap sekitar. Ikuti ketentuan akses dan keselamatan yang berlaku di lokasi.',

    image:
      'images/Skywalk_Cantigi.jpeg',

    alt:
      'Jalur Skywalk Cantigi di kawasan Kawah Putih'

  },

  sunan: {

    category:
      'PANORAMA',

    title:
      'Panorama Sunan Ibu',

    description:
      'Panorama Sunan Ibu menawarkan pemandangan kawasan kawah dan perbukitan dari sudut yang berbeda. Kabut serta cuaca dapat memengaruhi jarak pandang. Periksa kondisi dan akses lokasi sebelum berkunjung.',

    image:
      'images/sunan_ibu.jpeg',

    alt:
      'Pemandangan kawasan Kawah Putih dari Sunan Ibu'

  }

};


// Mengambil dialog detail.
const detailDialog =
  document.getElementById('detail-dialog');


// Membuka detail berdasarkan tombol.
document.querySelectorAll(
  '.detail-trigger'
).forEach(function (button) {

  button.addEventListener(
    'click',
    function () {

      const detail =
        attractionDetails[
          button.dataset.detail
        ];

      if (!detail) return;

      // Kategori.
      document.getElementById(
        'detail-category'
      ).textContent =
        detail.category;

      // Judul.
      document.getElementById(
        'detail-title'
      ).textContent =
        detail.title;

      // Deskripsi.
      document.getElementById(
        'detail-description'
      ).textContent =
        detail.description;

      // Foto.
      setDialogImage(
        'detail-image',
        'detail-image-frame',
        detail.image,
        detail.alt
      );

      // Menampilkan popup.
      detailDialog.showModal();

    }
  );

});


// ==========================================
// 08. FILTER FOTO GALERI
// ==========================================

const filterButtons =
  document.querySelectorAll('.filter-button');

const galleryItems =
  document.querySelectorAll('.gallery-item');

const galleryStatus =
  document.getElementById('gallery-status');


// Mengubah kategori foto.
filterButtons.forEach(function (button) {

  button.addEventListener(
    'click',
    function () {

      const selected =
        button.dataset.filter;

      let total = 0;

      // Mengubah tombol aktif.
      filterButtons.forEach(function (item) {

        const isSelected =
          item === button;

        item.classList.toggle(
          'is-selected',
          isSelected
        );

        item.setAttribute(
          'aria-pressed',
          String(isSelected)
        );

      });

      // Menampilkan foto sesuai kategori.
      galleryItems.forEach(function (item) {

        const visible =
          selected === 'semua' ||
          item.dataset.category === selected;

        item.hidden = !visible;

        if (visible) {

          total++;

        }

      });

      // Jumlah foto yang ditampilkan.
      galleryStatus.textContent =
        'Menampilkan ' +
        total +
        ' item galeri.';

    }
  );

});


// ==========================================
// 09. FOTO CADANGAN GALERI
// ==========================================

/*
  PERBAIKAN:

  Galeri ke-5 dan ke-6 sebelumnya
  menggunakan nama file berbeda.

  Jika foto baru tersedia, foto baru
  tetap digunakan.

  Jika tidak ditemukan, gunakan foto
  asli yang sudah tersedia di folder.
*/

const galleryFallbacks = {

  'images/hero-kawah-putih.jpg':
    'images/kawah.jpeg',

  'images/sunan-ibu.jpg':
    'images/sunan_ibu.jpeg'

};


// ==========================================
// 10. LIGHTBOX GALERI
// ==========================================

const galleryDialog =
  document.getElementById('gallery-dialog');

document.querySelectorAll(
  '.gallery-open'
).forEach(function (button) {

  const thumbnail =
    button.querySelector('img');

  if (thumbnail) {

    const originalPath =
      thumbnail.getAttribute('src');

    const fallback =
      galleryFallbacks[originalPath];

    if (fallback) {

      // Menggunakan foto cadangan jika
      // foto utama gagal ditemukan.
      function useExistingPhoto() {

        if (
          thumbnail.dataset.fallbackUsed ===
          'true'
        ) {

          return;

        }

        thumbnail.dataset.fallbackUsed =
          'true';

        // Ubah sumber foto di lightbox juga.
        button.dataset.image = fallback;

        // Ubah sumber foto thumbnail.
        thumbnail.src = fallback;

      }

      thumbnail.addEventListener(
        'error',
        useExistingPhoto
      );

      // Menangani gambar yang sudah gagal
      // dimuat sebelum event dipasang.
      if (
        thumbnail.complete &&
        thumbnail.naturalWidth === 0
      ) {

        useExistingPhoto();

      }

    }

  }

  // Saat pengunjung klik foto galeri.
  button.addEventListener(
    'click',
    function () {

      document.getElementById(
        'gallery-dialog-title'
      ).textContent =
        button.dataset.title;

      setDialogImage(
        'gallery-dialog-image',
        'gallery-image-frame',
        button.dataset.image,
        button.dataset.alt
      );

      galleryDialog.showModal();

    }
  );

});


// ==========================================
// 11. MENUTUP SELURUH MODAL
// ==========================================

// Tombol silang pada modal.
document.querySelectorAll(
  '[data-close-dialog]'
).forEach(function (button) {

  button.addEventListener(
    'click',
    function () {

      button.closest('dialog').close();

    }
  );

});


// Klik pada area gelap di luar modal.
document.querySelectorAll(
  'dialog'
).forEach(function (dialog) {

  dialog.addEventListener(
    'click',
    function (event) {

      if (event.target === dialog) {

        dialog.close();

      }

    }
  );

});


// ==========================================
// 12. TOMBOL KEMBALI KE ATAS
// ==========================================

const backToTop =
  document.getElementById('back-to-top');


// Menampilkan tombol setelah scroll.
function updateBackToTop() {

  backToTop.hidden =
    window.scrollY < 650;

}


window.addEventListener(
  'scroll',
  updateBackToTop,
  { passive: true }
);

updateBackToTop();


// Kembali ke bagian Beranda.
backToTop.addEventListener(
  'click',
  function () {

    const reduceMotion =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

    setActiveNavigation('beranda');

    pendingNavigation =
      window.scrollY > 3

        ? {
            id: 'beranda',
            position: 0
          }

        : null;

    window.scrollTo({

      top: 0,

      behavior:
        reduceMotion
          ? 'auto'
          : 'smooth'

    });

  }
);


// ==========================================
// 13. KETERANGAN
// ==========================================

// FAQ menggunakan <details> bawaan HTML.
// Lokasi menggunakan link Google Maps.
// Foto Hero tetap menggunakan Cinematic Zoom
// yang sudah dibuat pada style.css.
//
// Website menggunakan:
// HTML, CSS, dan JavaScript vanilla.
// Tidak menggunakan database atau framework.
