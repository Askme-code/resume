/**
* Template Name: MyResume
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  // Header toggle
  const headerToggleBtn = document.querySelector('.header-toggle');
  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn?.addEventListener('click', headerToggle);

  // Close mobile nav on link click
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) headerToggle();
    });
  });

  // Toggle dropdown in nav
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  // Remove preloader
  const preloader = document.querySelector('#preloader');
  if (preloader) window.addEventListener('load', () => preloader.remove());

  // Scroll top button
  const scrollTop = document.querySelector('.scroll-top');
  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  // Animate on scroll init
  function aosInit() {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  // Typed effect
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    const typed_strings = selectTyped.getAttribute('data-typed-items').split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  new PureCounter();

  // Skills animation
  document.querySelectorAll('.skills-animation').forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function () {
        item.querySelectorAll('.progress .progress-bar').forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  // Lightbox
  GLightbox({ selector: '.glightbox' });

  // Isotope filtering
  document.querySelectorAll('.isotope-layout').forEach(isotopeItem => {
    const layout = isotopeItem.getAttribute('data-layout') || 'masonry';
    const filter = isotopeItem.getAttribute('data-default-filter') || '*';
    const sort = isotopeItem.getAttribute('data-sort') || 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), () => {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(filterBtn => {
      filterBtn.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active')?.classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({ filter: this.getAttribute('data-filter') });
        aosInit();
      });
    });
  });

  // Swiper
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(swiperElement => {
      const config = JSON.parse(swiperElement.querySelector(".swiper-config").textContent.trim());
      new Swiper(swiperElement, config);
    });
  }
  window.addEventListener("load", initSwiper);

  // Scroll to section by hash
  window.addEventListener('load', () => {
    if (window.location.hash && document.querySelector(window.location.hash)) {
      setTimeout(() => {
        const section = document.querySelector(window.location.hash);
        const scrollMarginTop = parseInt(getComputedStyle(section).scrollMarginTop);
        window.scrollTo({ top: section.offsetTop - scrollMarginTop, behavior: 'smooth' });
      }, 100);
    }
  });

  // Scrollspy
  const navmenulinks = document.querySelectorAll('.navmenu a');
  function navmenuScrollspy() {
    const scrollY = window.scrollY + 200;
    navmenulinks.forEach(link => {
      if (!link.hash) return;
      const section = document.querySelector(link.hash);
      if (!section) return;

      if (scrollY >= section.offsetTop && scrollY <= section.offsetTop + section.offsetHeight) {
        document.querySelectorAll('.navmenu a.active').forEach(el => el.classList.remove('active'));
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  // ✅ Contact form via Formspree
  const contactForm = document.querySelector('.php-email-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const loading = document.createElement('div');
      loading.className = 'loading';
      loading.textContent = 'Sending...';
      contactForm.appendChild(loading);

      const errorMessage = document.createElement('div');
      errorMessage.className = 'error-message';
      contactForm.appendChild(errorMessage);

      const sentMessage = document.createElement('div');
      sentMessage.className = 'sent-message';
      contactForm.appendChild(sentMessage);

      loading.style.display = 'block';
      errorMessage.style.display = 'none';
      sentMessage.style.display = 'none';

      try {
        const response = await fetch('https://formspree.io/f/xldneegq', {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        loading.style.display = 'none';

        if (response.ok) {
          sentMessage.textContent = 'Thanks for contacting us!';
          sentMessage.style.display = 'block';
          contactForm.reset();
        } else {
          const data = await response.json();
          errorMessage.textContent = data.errors ? data.errors.map(e => e.message).join(', ') : 'Oops! Something went wrong.';
          errorMessage.style.display = 'block';
        }
      } catch (error) {
        loading.style.display = 'none';
        errorMessage.textContent = 'Failed to send the message.';
        errorMessage.style.display = 'block';
      }
    });
  }

})();
