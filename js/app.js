/* 
  =========================================
  Sanathan X - "The Way of Life" JS System
  =========================================
*/

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Cinematic Page Preloader
  initPreloader();

  // Initialize Header Scroll Listener
  initStickyHeader();

  // Initialize Adaptive Routine Engine
  initRoutineEngine();

  // Initialize Sankalp Swapper
  initSankalpSwapper();

  // Initialize Dynamic simulated Panchangam
  initPanchangWidget();

  // Initialize Festival Countdown Timer
  initFestivalCountdown();

  // Initialize Invite Simulator
  initInviteSimulator();

  // Initialize Multilingual Switcher
  initLanguageSwitcher();

  // Initialize Daily Quote System
  initDailyQuoteRotator();

  // Initialize Back to Top Button
  initBackToTopButton();
});

/* --- 1. Sticky Header & Scrollspy Engine --- */
function initStickyHeader() {
  const header = document.querySelector('.navbar-custom');
  const navLinks = document.querySelectorAll('.navbar-custom .nav-link');
  const sections = document.querySelectorAll('section[id]');
  if (!header) return;

  const handleScroll = () => {
    // 1. Handle Sticky Header Background
    if (window.scrollY > 50) {
      header.classList.add('navbar-scrolled');
    } else {
      header.classList.remove('navbar-scrolled');
    }

    // 2. Custom Robust Scrollspy
    let currentSectionId = '';
    const scrollPos = window.scrollY + 150; // Offset for header height and comfortable scanning threshold

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    if (currentSectionId) {
      const targetLink = document.querySelector(`.navbar-custom .nav-link[href="#${currentSectionId}"]`);
      if (targetLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        targetLink.classList.add('active');
      }
    } else {
      // Fallback: If at the very top of the page, ensure Home is highlighted
      if (window.scrollY < 200) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#hero') {
            link.classList.add('active');
          }
        });
      }
    }
  };

  window.addEventListener('scroll', handleScroll);
  // Run once on load to catch refreshed states
  handleScroll();
}

/* --- 2. Adaptive Routine Engine --- */
const ROUTINE_DATABASE = {
  beginner: {
    '15': [
      { name: 'Gratitude Practice', duration: '3 mins', icon: 'bi-heart' },
      { name: 'Simple Mindfulness Breathing', duration: '5 mins', icon: 'bi-wind' },
      { name: 'Sacred Quote / Devotional Reading', duration: '7 mins', icon: 'bi-book' }
    ],
    '30': [
      { name: 'Surya Namaskaram / Light Stretch', duration: '8 mins', icon: 'bi-sun' },
      { name: 'Gratitude & Devotional Intention Setting', duration: '5 mins', icon: 'bi-heart' },
      { name: 'Mindfulness Meditation', duration: '10 mins', icon: 'bi-wind' },
      { name: 'Sacred Reading / Stotra Listening', duration: '7 mins', icon: 'bi-music-note-beamed' }
    ],
    '60': [
      { name: 'Surya Namaskaram & Postures', duration: '15 mins', icon: 'bi-sun' },
      { name: 'Sankalpa & Daily Gratitude Prayers', duration: '10 mins', icon: 'bi-heart' },
      { name: 'Guided Silent Meditation', duration: '15 mins', icon: 'bi-wind' },
      { name: 'Spiritual Sacred Chanting', duration: '10 mins', icon: 'bi-music-note-beamed' },
      { name: 'Devotional Reading (Bhagavad Gita)', duration: '10 mins', icon: 'bi-book' }
    ]
  },
  intermediate: {
    '15': [
      { name: 'Pranayama Breathing Cycles', duration: '5 mins', icon: 'bi-wind' },
      { name: 'Devotional Chanting (Stotras)', duration: '5 mins', icon: 'bi-music-note-beamed' },
      { name: 'Gratitude & Intention Setting', duration: '5 mins', icon: 'bi-heart' }
    ],
    '30': [
      { name: 'Surya Namaskaram Series', duration: '10 mins', icon: 'bi-sun' },
      { name: 'Pranayama & Nadishodhana Breathing', duration: '5 mins', icon: 'bi-wind' },
      { name: 'Japam Chanting with Mala', duration: '10 mins', icon: 'bi-gem' },
      { name: 'Devotional Scripture Reading', duration: '5 mins', icon: 'bi-book' }
    ],
    '60': [
      { name: 'Full Surya Namaskaram Flow', duration: '15 mins', icon: 'bi-sun' },
      { name: 'Pranayama & Alternate Nostril Breath', duration: '10 mins', icon: 'bi-wind' },
      { name: 'Mantra Japam (108 repetitions)', duration: '15 mins', icon: 'bi-gem' },
      { name: 'Devotional Stotra Recitations', duration: '10 mins', icon: 'bi-music-note-beamed' },
      { name: 'Scripture Analysis & Reflection', duration: '10 mins', icon: 'bi-book' }
    ]
  },
  devoted: {
    '15': [
      { name: 'Pranayama & Silent Dhyana', duration: '7 mins', icon: 'bi-wind' },
      { name: 'Deep Mantra Japam', duration: '8 mins', icon: 'bi-gem' }
    ],
    '30': [
      { name: 'Surya Namaskaram with Mantras', duration: '10 mins', icon: 'bi-sun' },
      { name: 'Pranayama & Breath Retention', duration: '5 mins', icon: 'bi-wind' },
      { name: 'Rigorous Mantra Japam Chants', duration: '10 mins', icon: 'bi-gem' },
      { name: 'Traditional Pujas / Offerings', duration: '5 mins', icon: 'bi-flower1' }
    ],
    '60': [
      { name: 'Yogic Postures & Detailed Surya Namaskar', duration: '20 mins', icon: 'bi-sun' },
      { name: 'Deep Pranayama / Kundalini Breathwork', duration: '10 mins', icon: 'bi-wind' },
      { name: 'Extended Mala Japam Session', duration: '15 mins', icon: 'bi-gem' },
      { name: 'Traditional Daily Pooja / Archana', duration: '10 mins', icon: 'bi-flower1' },
      { name: 'Scripture Meditation & Swadhyaya', duration: '5 mins', icon: 'bi-book' }
    ]
  }
};

function initRoutineEngine() {
  const levelSelect = document.getElementById('routineLevel');
  const timeSelect = document.getElementById('routineTime');
  const routineList = document.getElementById('routineList');

  if (!levelSelect || !timeSelect || !routineList) return;

  const updateRoutineDisplay = () => {
    const level = levelSelect.value;
    const time = timeSelect.value;
    const items = ROUTINE_DATABASE[level][time] || [];

    routineList.innerHTML = ''; // Clear current display

    items.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = 'routine-item';
      li.style.animationDelay = `${index * 0.1}s`;

      li.innerHTML = `
        <div class="d-flex align-items-center">
          <div class="icon-wrapper-mint me-3 mb-0" style="width:40px; height:40px; font-size:1.1rem;">
            <i class="bi ${item.icon}"></i>
          </div>
          <div>
            <span class="fw-bold text-dark d-block">${item.name}</span>
            <small class="text-muted">Structured Practice</small>
          </div>
        </div>
        <span class="badge rounded-pill bg-light text-primary border px-3 py-2">${item.duration}</span>
      `;
      routineList.appendChild(li);
    });
  };

  levelSelect.addEventListener('change', updateRoutineDisplay);
  timeSelect.addEventListener('change', updateRoutineDisplay);
  
  // Set default initial view
  updateRoutineDisplay();
}

/* --- 3. Sankalp Category Swapper --- */
const SANKALP_DATA = {
  hanuman: {
    title: 'Hanuman Sankalp',
    subtitle: 'Strength, Devotion & Discipline',
    rules: [
      'Chant Hanuman Chalisa 1, 7, or 11 times daily.',
      'Maintain complete pure vegetarian diet.',
      'Practice absolute truthfulness in speech.',
      'Early morning rising before sunrise recommended.'
    ],
    duration: '40 Days Journey',
    difficulty: 'Intermediate'
  },
  ekadashi: {
    title: 'Ekadashi Sankalp',
    subtitle: 'Mental Purification & Fasting',
    rules: [
      'Fast from grains and lentils completely.',
      'Dedicating time to absolute silence (Mauna) during sunset.',
      'Increase reading or listening of sacred scriptures.',
      'Gentle activities only; absolute rest for digestion.'
    ],
    duration: '24 Hours (Twice a Month)',
    difficulty: 'Advanced'
  },
  japam: {
    title: 'Japam Sankalp',
    subtitle: 'Mantra Focus & Mindfulness',
    rules: [
      'Perform dedicated repetition of chosen sacred mantra.',
      'Set clear goals (e.g. 108, 1008, or 10000 chants).',
      'Use traditional Japam Mala (Rudraksha, Tulsi or Sandalwood).',
      'Maintain upright spine and static posture throughout.'
    ],
    duration: '21 Days Foundation',
    difficulty: 'Beginner-Friendly'
  }
};

function initSankalpSwapper() {
  const buttons = document.querySelectorAll('[data-sankalp-btn]');
  const titleEl = document.getElementById('sankalpTitle');
  const subtitleEl = document.getElementById('sankalpSubtitle');
  const rulesList = document.getElementById('sankalpRules');
  const badgeDuration = document.getElementById('sankalpDuration');
  const badgeDifficulty = document.getElementById('sankalpDifficulty');

  if (!titleEl || buttons.length === 0) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active states on UI buttons
      buttons.forEach(b => b.classList.remove('active', 'btn-primary-custom'));
      buttons.forEach(b => b.classList.add('btn-outline-dark'));
      
      btn.classList.add('active', 'btn-primary-custom');
      btn.classList.remove('btn-outline-dark');

      const key = btn.getAttribute('data-sankalp-btn');
      const data = SANKALP_DATA[key];
      if (!data) return;

      // Animate transition using simple opacity transition
      const panel = document.getElementById('sankalpPanel');
      panel.style.opacity = '0';
      panel.style.transform = 'translateY(10px)';

      setTimeout(() => {
        titleEl.textContent = data.title;
        subtitleEl.textContent = data.subtitle;
        badgeDuration.textContent = data.duration;
        badgeDifficulty.textContent = data.difficulty;

        rulesList.innerHTML = '';
        data.rules.forEach(rule => {
          const li = document.createElement('li');
          li.className = 'mb-2 d-flex align-items-start';
          li.innerHTML = `<i class="bi bi-patch-check-fill text-primary me-2 mt-1"></i> <span>${rule}</span>`;
          rulesList.appendChild(li);
        });

        panel.style.opacity = '1';
        panel.style.transform = 'translateY(0)';
      }, 250);
    });
  });
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

/* --- 5. Festival Countdown Timer --- */
function initFestivalCountdown() {
  const daysEl = document.getElementById('cntDays');
  const hoursEl = document.getElementById('cntHours');
  const minutesEl = document.getElementById('cntMins');
  const secondsEl = document.getElementById('cntSecs');

  if (!daysEl) return;

  // Set standard landing destination for next big spiritual observance (e.g. Guru Purnima)
  // We'll set it to 12 days from today dynamically so the countdown is ALWAYS active and beautiful
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 12);
  targetDate.setHours(0, 0, 0, 0);

  const updateTimer = () => {
    const now = new Date().getTime();
    const difference = targetDate.getTime() - now;

    if (difference <= 0) {
      // Loop or restart timer so it is never expired
      targetDate.setDate(targetDate.getDate() + 15);
      return;
    }

    const d = Math.floor(difference / (1000 * 60 * 60 * 24));
    const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((difference % (1000 * 60)) / 1000);

    daysEl.textContent = String(d).padStart(2, '0');
    hoursEl.textContent = String(h).padStart(2, '0');
    minutesEl.textContent = String(m).padStart(2, '0');
    secondsEl.textContent = String(s).padStart(2, '0');
  };

  // Run initial call and loop every second
  updateTimer();
  setInterval(updateTimer, 1000);
}

/* --- 6. Family Circle Invite Simulator --- */
function initInviteSimulator() {
  const invitePhoneBtn = document.getElementById('invitePhoneBtn');
  const inviteLinkBtn = document.getElementById('inviteLinkBtn');
  const inviteQRBtn = document.getElementById('inviteQRBtn');
  const inviteOutput = document.getElementById('inviteOutput');

  if (!invitePhoneBtn || !inviteOutput) return;

  const resetActiveButtons = () => {
    [invitePhoneBtn, inviteLinkBtn, inviteQRBtn].forEach(btn => {
      btn.classList.remove('btn-primary-custom');
      btn.classList.add('btn-outline-dark');
    });
  };

  invitePhoneBtn.addEventListener('click', () => {
    resetActiveButtons();
    invitePhoneBtn.classList.add('btn-primary-custom');
    invitePhoneBtn.classList.remove('btn-outline-dark');

    inviteOutput.innerHTML = `
      <div class="card bg-light border-0 p-3 mt-3 animate__animated animate__fadeIn">
        <label class="form-label fw-bold">Invite via Phone Number</label>
        <div class="input-group">
          <input type="tel" class="form-control" placeholder="+91 98765 43210" id="phoneNumberInput">
          <button class="btn btn-primary-custom" type="button" onclick="alert('Invitation sent successfully!')">Send Invite</button>
        </div>
        <small class="text-muted mt-2">Perfect for family members to sync calendars instantly.</small>
      </div>
    `;
  });

  inviteLinkBtn.addEventListener('click', () => {
    resetActiveButtons();
    inviteLinkBtn.classList.add('btn-primary-custom');
    inviteLinkBtn.classList.remove('btn-outline-dark');

    inviteOutput.innerHTML = `
      <div class="card bg-light border-0 p-3 mt-3 animate__animated animate__fadeIn">
        <label class="form-label fw-bold">Spiritual Sharing Link</label>
        <div class="input-group">
          <input type="text" class="form-control" value="https://sanathanx.app/share/family-circle-58291" readonly id="shareLinkInput">
          <button class="btn btn-primary-custom" type="button" onclick="navigator.clipboard.writeText(document.getElementById('shareLinkInput').value); alert('Share link copied to clipboard!')"><i class="bi bi-copy"></i> Copy</button>
        </div>
        <small class="text-muted mt-2">Send this secure link through any messaging app.</small>
      </div>
    `;
  });

  inviteQRBtn.addEventListener('click', () => {
    resetActiveButtons();
    inviteQRBtn.classList.add('btn-primary-custom');
    inviteQRBtn.classList.remove('btn-outline-dark');

    inviteOutput.innerHTML = `
      <div class="card bg-light border-0 p-3 mt-3 text-center animate__animated animate__fadeIn">
        <span class="fw-bold d-block mb-3">Scan QR to Join Family Circle</span>
        <!-- Crisp SVG Mock QR code -->
        <svg class="mx-auto mb-3" width="150" height="150" viewBox="0 0 100 100" fill="var(--primary)">
          <rect width="100" height="100" fill="#ffffff" />
          <path d="M5,5 h20 v20 h-20 z M9,9 h12 v12 h-12 z M14,14 h2 v2 h-2 z" />
          <path d="M75,5 h20 v20 h-20 z M79,9 h12 v12 h-12 z M84,14 h2 v2 h-2 z" />
          <path d="M5,75 h20 v20 h-20 z M9,79 h12 v12 h-12 z M14,84 h2 v2 h-2 z" />
          <path d="M35,10 h5 v5 h-5 z M45,5 h10 v5 h-10 z M35,20 h10 v5 h-10 z M50,15 h5 v10 h-5 z" />
          <path d="M60,10 h5 v15 h-5 z M65,5 h5 v5 h-5 z M70,15 h5 v5 h-5 z" />
          <path d="M10,35 h5 v10 h-5 z M5,50 h15 v5 h-15 z M20,40 h5 v15 h-5 z" />
          <path d="M35,35 h15 v5 h-15 z M40,45 h10 v10 h-10 z M35,60 h5 v5 h-5 z M50,55 h5 v10 h-5 z" />
          <path d="M60,35 h10 v5 h-10 z M65,45 h15 v5 h-15 z M60,55 h5 v5 h-5 z M75,55 h10 v15 h-10 z" />
          <path d="M35,75 h5 v15 h-5 z M45,70 h15 v5 h-15 z M50,85 h10 v10 h-10 z" />
          <path d="M65,75 h5 v5 h-5 z M75,80 h15 v5 h-15 z M70,90 h10 v5 h-10 z" />
        </svg>
        <span class="text-muted d-block small">Invite family members by scanning this code directly in their SanathanX app.</span>
      </div>
    `;
  });

  // Default to phone tab on initial load
  invitePhoneBtn.click();
}

/* --- 7. Multilingual Headline Switcher --- */
const HEADLINE_TRANSLATIONS = {
  telugu: {
    heroTitle: 'సనాతన ఎక్స్ - జీవన విధానం',
    subtitle: 'భక్తి, క్రమశిక్షణ, మరియు ప్రశాంతతను మీ దైనందిన జీవితంలోకి తీసుకురండి.',
    badge: 'భారతీయ భాషల అనుభవం'
  },
  hindi: {
    heroTitle: 'सनातन एक्स - जीवन का मार्ग',
    subtitle: 'भक्ति, अनुशासन और मानसिक शांति को अपने दैनिक जीवन का हिस्सा बनाएं।',
    badge: 'भारतीय भाषा अनुभव'
  },
  tamil: {
    heroTitle: 'சநாதன எக்ஸ் - வாழ்க்கை முறை',
    subtitle: 'பக்தி, ஒழுக்கம் மற்றும் மன அமைதியை உங்கள் தினசரி வாழ்க்கையில் கொண்டு வாருங்கள்.',
    badge: 'இந்திய மொழி அனுபவம்'
  },
  kannada: {
    heroTitle: 'ಸನಾತನ ಎಕ್ಸ್ - ಜೀವನ ವಿಧಾನ',
    subtitle: 'ಭಕ್ತಿ, ಶಿಸ್ತು ಮತ್ತು ಮನಸ್ಸಿನ ಶಾಂತಿಯನ್ನು ನಿಮ್ಮ ದಿನನಿತ್ಯದ ಜೀವನಕ್ಕೆ ತೃಪ್ತಿಗೊಳಿಸಿ.',
    badge: 'ಭಾರತೀಯ ಭಾಷಾ ಅನುಭವ'
  },
  english: {
    heroTitle: 'Sanathan X - The Way of Life',
    subtitle: 'Bring devotion, discipline, mindfulness and spiritual balance into your everyday life.',
    badge: 'Multilingual Experience'
  }
};

function initLanguageSwitcher() {
  const buttons = document.querySelectorAll('[data-lang-btn]');
  const mainTitleEl = document.getElementById('langTitle');
  const mainSubEl = document.getElementById('langSub');
  const mainBadgeEl = document.getElementById('langBadge');

  if (!mainTitleEl || buttons.length === 0) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button highlights
      buttons.forEach(b => b.classList.remove('btn-primary-custom', 'active'));
      buttons.forEach(b => b.classList.add('btn-outline-dark'));

      btn.classList.add('btn-primary-custom', 'active');
      btn.classList.remove('btn-outline-dark');

      const langKey = btn.getAttribute('data-lang-btn');
      const data = HEADLINE_TRANSLATIONS[langKey];
      if (!data) return;

      const container = document.getElementById('langSwapContainer');
      container.style.opacity = '0';
      container.style.transform = 'translateY(8px)';

      setTimeout(() => {
        mainTitleEl.textContent = data.heroTitle;
        mainSubEl.textContent = data.subtitle;
        mainBadgeEl.textContent = data.badge;

        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
      }, 250);
    });
  });
}

/* --- 8. Dynamic Quote Rotator (Calendar Seeded) --- */
const WISDOM_QUOTES = [
  { text: "Discipline in devotion becomes peace in life.", author: "Sanathan Wisdom" },
  { text: "Mindfulness is the bridge between actions and the spiritual self.", author: "Rig Veda" },
  { text: "He who has control over their morning routines holds control over their inner peace.", author: "Sacred Upanishads" },
  { text: "True strength lies in quietness, consistent chanting, and unwavering faith.", author: "Hanuman Upasana" },
  { text: "Let your actions be dedicated to the higher self; only then will you find absolute freedom.", author: "Bhagavad Gita" },
  { text: "Aligning daily life with cosmic patterns brings rhythm and health to the body.", author: "Surya Siddhanta" }
];

function initDailyQuoteRotator() {
  const quoteTextEl = document.getElementById('quoteText');
  const quoteAuthorEl = document.getElementById('quoteAuthor');
  const copyBtn = document.getElementById('copyQuoteBtn');

  if (!quoteTextEl) return;

  // Use current date day-of-year or day-of-month to seed quote choice
  const today = new Date();
  const index = (today.getDate() + today.getMonth()) % WISDOM_QUOTES.length;
  const quote = WISDOM_QUOTES[index];

  quoteTextEl.textContent = `"${quote.text}"`;
  quoteAuthorEl.textContent = `— ${quote.author}`;

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const textToCopy = `${quoteTextEl.textContent} ${quoteAuthorEl.textContent}`;
      navigator.clipboard.writeText(textToCopy);
      alert('Daily Quote copied to clipboard!');
    });
  }
}

/* --- 9. Back to Top Scroll Engine --- */
function initBackToTopButton() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  const handleScroll = () => {
    if (window.scrollY > 300) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  };

  window.addEventListener('scroll', handleScroll);
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
