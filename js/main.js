/**
 * Portofolio Farrel Hannan
 * JavaScript Vanilla Minimalis & Aksesibel
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle dengan Aksesibilitas ARIA
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isExpanded));
      navMenu.classList.toggle('is-open');

      if (!isExpanded) {
        navToggle.textContent = 'Tutup [×]';
      } else {
        navToggle.textContent = 'Menu [=]';
      }
    });

    // Tutup menu jika user menekan ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.textContent = 'Menu [=]';
        navToggle.focus();
      }
    });
  }

  // 2. Tandai Link Aktif Berdasarkan URL Halaman
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // 3. Format Tanggal / Waktu Lokal Surabaya (WIB / UTC+7) pada Colophon/Ticker jika ada
  const timeDisplay = document.querySelector('.current-time-display');
  if (timeDisplay) {
    const updateTime = () => {
      const now = new Date();
      // Format jam WIB
      const options = {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const formatter = new Intl.DateTimeFormat('id-ID', options);
      timeDisplay.textContent = `${formatter.format(now)} WIB`;
    };

    updateTime();
    setInterval(updateTime, 1000);
  }
});
