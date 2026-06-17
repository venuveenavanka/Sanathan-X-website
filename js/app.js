/* 
  =========================================
  Sanathan X - "The Way of Life" JS System
  =========================================
*/

/* =========================================
   CONTENT PROTECTION — Disable Copy / Right-Click
   ========================================= */
document.addEventListener("contextmenu", e => e.preventDefault());

document.addEventListener("keydown", e => {
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase())) ||
    (e.ctrlKey && e.key.toUpperCase() === "U")
  ) {
    e.preventDefault();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Cinematic Page Preloader
  initPreloader();

  // Initialize Header Scroll Listener
  initStickyHeader();

  // Initialize Dynamic simulated Panchangam
  initPanchangWidget();

  // Initialize Back to Top Button
  initBackToTopButton();

  // Initialize Real Stories Testimonials Slider
  initStoriesSlider();

  // Initialize Footer Giant Text Scroll Animation
  initFooterGiantTextAnimation();

  // Initialize Core Features Sliding Carousel
  initFeaturesCarousel();

  // Initialize Scroll Reveal Elements (Bottom to Top & 3D Tilts)
  initScrollRevealAnimations();

  // Initialize 3D Tilt Hover Interaction System
  initTiltHoverCards();

  // Initialize Scroll-linked Parallax & Mockups 3D Tilting
  initScrollParallax();

  // Initialize Scroll-velocity Skew for Marquee Showcase
  initScrollSkewMarquee();
});

/* --- 1. Sticky Header & Scrollspy Engine --- */
function initStickyHeader() {
  const header = document.querySelector('.navbar-custom');
  const navLinks = document.querySelectorAll('.navbar-custom .nav-link');
  const sections = document.querySelectorAll('section[id]');
  if (!header) return;

  // Create lookup dictionary for nav links to avoid querySelector inside scroll listener
  const linkLookup = {};
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      linkLookup[href.substring(1)] = link;
    }
  });

  // Cache sections' positions (offsetTop and offsetHeight) to prevent layout thrashing
  let sectionPositions = [];
  const updateSectionPositions = () => {
    sectionPositions = Array.from(sections).map(sec => ({
      element: sec,
      id: sec.getAttribute('id'),
      top: sec.offsetTop,
      height: sec.offsetHeight
    }));
  };

  updateSectionPositions();
  window.addEventListener('load', updateSectionPositions);
  window.addEventListener('resize', updateSectionPositions);

  // Collapse mobile menu when clicking any nav link or the brand logo
  const collapseMobileMenu = () => {
    const navbarCollapse = document.getElementById('navbarSupportedContent');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
      if (bsCollapse) bsCollapse.hide();
      else new bootstrap.Collapse(navbarCollapse).hide();
    }
  };

  navLinks.forEach(link => {
    link.addEventListener('click', collapseMobileMenu);
  });

  const brandLink = header.querySelector('.navbar-brand');
  if (brandLink) {
    brandLink.addEventListener('click', collapseMobileMenu);
  }

  const downloadBtn = header.querySelector('.btn-primary-custom');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', collapseMobileMenu);
  }

  let isTicking = false;

  const handleScroll = () => {
    const scrollY = window.scrollY;

    // 1. Handle Sticky Header Background
    if (scrollY > 50) {
      header.classList.add('navbar-scrolled');
    } else {
      header.classList.remove('navbar-scrolled');
    }

    // 2. Custom Robust Scrollspy
    let currentSectionId = '';
    const scrollPos = scrollY + 150; // Offset for header height and comfortable scanning threshold

    sectionPositions.forEach(sec => {
      if (scrollPos >= sec.top && scrollPos < sec.top + sec.height) {
        currentSectionId = sec.id;
      }
    });

    if (currentSectionId) {
      const targetLink = linkLookup[currentSectionId];
      if (targetLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        targetLink.classList.add('active');
      }
    } else {
      // Fallback: If at the very top of the page, ensure Home is highlighted
      if (scrollY < 200) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#hero') {
            link.classList.add('active');
          }
        });
      }
    }
  };

  window.addEventListener('scroll', () => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        isTicking = false;
      });
      isTicking = true;
    }
  }, { passive: true });

  // Run once initially
  handleScroll();
}


/* --- 4. Today's simulated Panchangam --- */
function initPanchangWidget() {
  // Update mock current calendar components with real system-based offsets
  const tithiEl = document.getElementById('panchangTithi');
  const nakshatraEl = document.getElementById('panchangNakshatra');
  const masaEl = document.getElementById('panchangMasa');
  const pakshaEl = document.getElementById('panchangPaksha');

  if (!tithiEl) return;

  const date = new Date();
  const day = date.getDate();

  // Simulated algorithm to map system day of month to real traditional Panchang elements
  const tithis = ['Prathama', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Pournami', 'Amavasya'];
  const nakshatras = ['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'];
  const masas = ['Chaitra', 'Vaishakha', 'Jyeshtha', 'Ashadha', 'Shravana', 'Bhadrapada', 'Ashvina', 'Kartika', 'Margashirsha', 'Pausha', 'Magha', 'Phalguna'];

  // Map elements deterministically based on today's calendar attributes
  tithiEl.textContent = tithis[day % tithis.length];
  nakshatraEl.textContent = nakshatras[day % nakshatras.length];
  masaEl.textContent = masas[date.getMonth() % masas.length];
  pakshaEl.textContent = (day < 15) ? 'Shukla Paksha (Waxing)' : 'Krishna Paksha (Waning)';
}



/* --- 9. Back to Top Scroll Engine --- */
function initBackToTopButton() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  let isTicking = false;
  const handleScroll = () => {
    if (window.scrollY > 300) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  };

  window.addEventListener('scroll', () => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        isTicking = false;
      });
      isTicking = true;
    }
  }, { passive: true });

  // Run once on load to sync initial state
  handleScroll();

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --- 10. Cinematic Page Preloader Engine --- */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  // Clear preloader with elegant fade out and DOM removal
  const clearPreloader = () => {
    document.body.classList.add('preloader-loaded');
    setTimeout(() => {
      preloader.remove();
    }, 800); // Wait for transition fade to complete before removing
  };

  // Bind to window load event
  if (document.readyState === 'complete') {
    setTimeout(clearPreloader, 1000);
  } else {
    window.addEventListener('load', () => {
      setTimeout(clearPreloader, 1000); // 1s delay to let logo pulse cinematic effect play out beautifully
    });
  }

  // Safety fallback timeout (maximum 3.5 seconds) in case network, media, or fonts hang
  setTimeout(() => {
    if (!document.body.classList.contains('preloader-loaded')) {
      clearPreloader();
    }
  }, 3500);
}

/* --- 11. Real Stories Slider Navigation --- */
function initStoriesSlider() {
  const prevBtn = document.getElementById('prevStoryBtn');
  const nextBtn = document.getElementById('nextStoryBtn');
  const viewport = document.getElementById('storiesViewport');

  if (!prevBtn || !nextBtn || !viewport) return;

  const getScrollAmount = () => {
    const card = viewport.querySelector('.story-slide');
    return card ? card.offsetWidth + 24 : 340; // card width + gap
  };

  prevBtn.addEventListener('click', () => {
    viewport.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    viewport.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
  });

  // Toggle button state based on scroll position
  let isTicking = false;
  const handleScroll = () => {
    const isAtStart = viewport.scrollLeft <= 5;
    const isAtEnd = viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 5;
    
    prevBtn.disabled = isAtStart;
    nextBtn.disabled = isAtEnd;
  };

  viewport.addEventListener('scroll', () => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        isTicking = false;
      });
      isTicking = true;
    }
  }, { passive: true });

  // Run once to initialize button states
  handleScroll();
}

/* --- 12. Footer Giant Text Scroll Animation --- */
function initFooterGiantTextAnimation() {
  const giantText = document.querySelector('.footer-giant-text');
  if (!giantText) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        giantText.classList.add('animate-active');
        observer.unobserve(giantText); // Keep the animated state permanent
      }
    });
  }, {
    threshold: 0.05
  });

  observer.observe(giantText);
}

/* --- 13. General Scroll Reveal Animations --- */
function initScrollRevealAnimations() {
  const revealElements = document.querySelectorAll(
    '.scroll-reveal-text, .scroll-reveal-phone, .scroll-tilt-3d, .scroll-tilt-left, .scroll-tilt-right, .scroll-zoom-tilt, .scroll-tilt-flip-up, .scroll-skew-left, .scroll-skew-right, .scroll-tilt-rotate-z'
  );
  if (revealElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-active');
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -45px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* --- 14. 3D Tilt Card Hover System --- */
function initTiltHoverCards() {
  const cards = document.querySelectorAll('.tilt-hover-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const pctX = (x / rect.width) * 100;
      const pctY = (y / rect.height) * 100;
      
      card.style.setProperty('--mouse-x', `${pctX}%`);
      card.style.setProperty('--mouse-y', `${pctY}%`);
      
      // Calculate 3D Tilt angles (max 6 degrees for subtle premium feel)
      const tiltX = ((rect.height / 2 - y) / (rect.height / 2)) * 5;
      const tiltY = ((x - rect.width / 2) / (rect.width / 2)) * 5;
      
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px)`;
      card.dataset.isHovered = 'true';
    });
    
    card.addEventListener('mouseleave', () => {
      card.dataset.isHovered = 'false';
      if (card.classList.contains('scroll-tilt-phone')) {
        applySingleScrollTilt(card);
      } else {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      }
      card.style.setProperty('--mouse-x', '50%');
      card.style.setProperty('--mouse-y', '50%');
    });
  });
}

/* --- 15. Scroll-linked Parallax & 3D Tilt Engine --- */
function applySingleScrollTilt(phone) {
  const viewportHeight = window.innerHeight;
  const rect = phone.getBoundingClientRect();
  if (rect.top < viewportHeight && rect.bottom > 0) {
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = viewportHeight / 2;
    const scrollRatio = (elementCenter - viewportCenter) / (viewportHeight / 2 + rect.height / 2);
    
    // Tilt calculations: rotX based on scroll pos, rotY slightly skewed
    const rotateX = Math.max(-12, Math.min(12, scrollRatio * 10));
    const rotateY = Math.max(-6, Math.min(6, scrollRatio * -4));
    const scale = Math.max(0.97, Math.min(1.03, 1 + (1 - Math.abs(scrollRatio)) * 0.03));
    
    phone.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
  }
}

function initScrollParallax() {
  const parallaxItems = document.querySelectorAll('.scroll-parallax-float');
  const scrollTiltPhones = document.querySelectorAll('.scroll-tilt-phone');
  
  let itemCache = [];
  let phoneCache = [];
  
  // Cache dimensions and document-relative positions to completely avoid layout thrashing during scroll
  const updateCache = () => {
    const scrollY = window.scrollY;
    
    itemCache = Array.from(parallaxItems).map(item => {
      const rect = item.getBoundingClientRect();
      return {
        element: item,
        speed: parseFloat(item.getAttribute('data-parallax-speed')) || 0.15,
        pageTop: rect.top + scrollY,
        height: rect.height
      };
    });
    
    phoneCache = Array.from(scrollTiltPhones).map(phone => {
      const rect = phone.getBoundingClientRect();
      return {
        element: phone,
        pageTop: rect.top + scrollY,
        height: rect.height
      };
    });
  };
  
  // Initialize and bind updates
  updateCache();
  window.addEventListener('load', updateCache);
  window.addEventListener('resize', updateCache);
  
  let isTicking = false;
  
  const handleScroll = () => {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    
    // Parallax layers (floating badges, background stars)
    itemCache.forEach(item => {
      const relativeTop = item.pageTop - scrollY;
      const relativeBottom = relativeTop + item.height;
      if (relativeTop < viewportHeight && relativeBottom > 0) {
        const relativeOffset = (relativeTop - viewportHeight / 2) * item.speed;
        item.element.style.transform = `translateY(${relativeOffset}px)`;
      }
    });
    
    // Scroll-linked 3D tilting for mockup devices
    phoneCache.forEach(phone => {
      if (phone.element.dataset.isHovered !== 'true') {
        const relativeTop = phone.pageTop - scrollY;
        const relativeBottom = relativeTop + phone.height;
        if (relativeTop < viewportHeight && relativeBottom > 0) {
          const elementCenter = relativeTop + phone.height / 2;
          const viewportCenter = viewportHeight / 2;
          const scrollRatio = (elementCenter - viewportCenter) / (viewportCenter + phone.height / 2);
          
          // Tilt calculations: rotX based on scroll pos, rotY slightly skewed
          const rotateX = Math.max(-12, Math.min(12, scrollRatio * 10));
          const rotateY = Math.max(-6, Math.min(6, scrollRatio * -4));
          const scale = Math.max(0.97, Math.min(1.03, 1 + (1 - Math.abs(scrollRatio)) * 0.03));
          
          phone.element.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
        }
      }
    });
  };
  
  window.addEventListener('scroll', () => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        isTicking = false;
      });
      isTicking = true;
    }
  }, { passive: true });
  
  // Execute initially
  handleScroll();
}

/* --- 16. Scroll Velocity Skew for Marquee Track --- */
function initScrollSkewMarquee() {
  const container = document.querySelector('.marquee-container');
  if (!container) return;
  
  let lastScrollY = window.scrollY;
  let scrollSpeed = 0;
  let skewTimeout = null;
  let isTicking = false;
  
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    scrollSpeed = currentScrollY - lastScrollY;
    lastScrollY = currentScrollY;
    
    // Convert speed to skew degrees (max 5 degrees skew)
    const skewDeg = Math.max(-5, Math.min(5, scrollSpeed * 0.15));
    
    // Apply skewX to the marquee container dynamically
    container.style.transition = 'transform 0.1s ease';
    container.style.transform = `skewX(${skewDeg}deg)`;
    
    // Smoothly ease back to 0 skew when scroll stops
    clearTimeout(skewTimeout);
    skewTimeout = setTimeout(() => {
      container.style.transition = 'transform 0.4s ease';
      container.style.transform = 'skewX(0deg)';
    }, 100);
  };
  
  window.addEventListener('scroll', () => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        isTicking = false;
      });
      isTicking = true;
    }
  }, { passive: true });
}


/* --- 19. Core Features Sliding Carousel --- */
function initFeaturesCarousel() {
  const prevBtn = document.getElementById('prevFeatureBtn');
  const nextBtn = document.getElementById('nextFeatureBtn');
  const viewport = document.getElementById('featuresViewport');
  const track = document.getElementById('featuresTrack');
  const section = document.getElementById('core-features');
  const dotsContainer = document.getElementById('featuresDots');

  if (!viewport || !track || !section) return;

  const slides = Array.from(track.querySelectorAll('.feature-slide'));
  if (slides.length === 0) return;

  let currentIndex = 0;
  let autoPlayInterval = null;

  // Sync active dots indicators
  const updateDots = () => {
    if (!dotsContainer) return;
    const dots = Array.from(dotsContainer.querySelectorAll('.dot-indicator'));
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  };

  // Sync background gradient transitions
  const updateBackground = () => {
    const activeSlide = slides[currentIndex];
    const targetBg = activeSlide.getAttribute('data-bg') || 'bg-white';
    
    // Remove background utility classes
    section.classList.remove('bg-gradient-mint', 'bg-gradient-peach', 'bg-white');
    
    // Add target class
    section.classList.add(targetBg);
  };

  // Navigate to slide
  const goToSlide = (index) => {
    if (index < 0 || index >= slides.length) return;
    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    updateDots();
    updateBackground();
    
    if (prevBtn) prevBtn.disabled = false;
    if (nextBtn) nextBtn.disabled = false;

    // Update active nav links in navbar
    const navLinks = document.querySelectorAll('.navbar-custom .nav-link');
    
    // Check if user is scrolled near the section to update highlights
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.2) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector('.navbar-custom .nav-link[href="#core-features"]');
      if (activeLink) activeLink.classList.add('active');
    }
  };

  // Set up button listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const targetIndex = (currentIndex - 1 + slides.length) % slides.length;
      goToSlide(targetIndex);
      resetAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const targetIndex = (currentIndex + 1) % slides.length;
      goToSlide(targetIndex);
      resetAutoPlay();
    });
  }

  // Set up dots listeners
  if (dotsContainer) {
    const dots = Array.from(dotsContainer.querySelectorAll('.dot-indicator'));
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        goToSlide(index);
        resetAutoPlay();
      });
    });
  }

  // Autoplay Logic (Disabled)
  const startAutoPlay = () => {};
  const stopAutoPlay = () => {};
  const resetAutoPlay = () => {};

  // Handle external navbar navigation to specific slides
  const handleNavClick = (e, targetId, slideIndex) => {
    e.preventDefault();
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      // Collapse mobile menu if open
      const navbarCollapse = document.getElementById('navbarSupportedContent');
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) bsCollapse.hide();
        else new bootstrap.Collapse(navbarCollapse).hide();
      }
      
      const offsetTop = targetSection.offsetTop - 80; // offset for sticky header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      if (slideIndex !== null) {
        setTimeout(() => {
          goToSlide(slideIndex);
          resetAutoPlay();
        }, 300);
      }
    }
  };

  const featuresLink = document.querySelector('a[href="#features"]');
  if (featuresLink) {
    featuresLink.addEventListener('click', (e) => handleNavClick(e, 'features', null));
  }

  const exploreLink = document.querySelector('a[href="#core-features"]');
  if (exploreLink) {
    exploreLink.addEventListener('click', (e) => handleNavClick(e, 'core-features', null));
  }

  // Initialize display
  goToSlide(0);
}

