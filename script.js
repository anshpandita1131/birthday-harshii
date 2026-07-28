// ===== BIRTHDAY PAGE JAVASCRIPT =====
// All animations, interactions, and magic for Harshita's birthday page

(function () {
  'use strict';

  // ===== LOADING SCREEN =====
  const loadingScreen = document.getElementById('loadingScreen');

  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 800);
    }, 1500);
  });

  // ===== SCROLL PROGRESS BAR =====
  const scrollProgress = document.getElementById('scrollProgress');

  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  // ===== FLOATING HEARTS =====
  const floatingHeartsContainer = document.getElementById('floatingHearts');
  const heartEmojis = ['💗', '💕', '💖', '🤍', '💛', '🌸', '✨', '🎂', '🎈', '🎁', '🎀', '🥂'];

  function createFloatingHeart() {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

    const left = Math.random() * 100;
    const duration = 15 + Math.random() * 20;
    const delay = Math.random() * 10;
    const size = 12 + Math.random() * 18;

    heart.style.left = left + '%';
    heart.style.fontSize = size + 'px';
    heart.style.animationDuration = duration + 's';
    heart.style.animationDelay = delay + 's';

    floatingHeartsContainer.appendChild(heart);

    // Clean up after animation completes
    setTimeout(() => {
      if (heart.parentNode) {
        heart.parentNode.removeChild(heart);
      }
      createFloatingHeart();
    }, (duration + delay) * 1000);
  }

  // Create initial floating hearts
  for (let i = 0; i < 15; i++) {
    createFloatingHeart();
  }

  // ===== SPARKLE PARTICLES =====
  const sparkleContainer = document.getElementById('sparkleContainer');

  function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';

    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const duration = 3 + Math.random() * 4;
    const delay = Math.random() * 5;
    const size = 2 + Math.random() * 4;

    sparkle.style.left = left + '%';
    sparkle.style.top = top + '%';
    sparkle.style.width = size + 'px';
    sparkle.style.height = size + 'px';
    sparkle.style.animationDuration = duration + 's';
    sparkle.style.animationDelay = delay + 's';

    sparkleContainer.appendChild(sparkle);

    setTimeout(() => {
      if (sparkle.parentNode) {
        sparkle.parentNode.removeChild(sparkle);
      }
      createSparkle();
    }, (duration + delay) * 1000);
  }

  for (let i = 0; i < 20; i++) {
    createSparkle();
  }

  // ===== FOOTER FLOATING HEARTS =====
  const footerHearts = document.getElementById('footerHearts');

  for (let i = 0; i < 6; i++) {
    const heart = document.createElement('span');
    heart.className = 'footer-heart';
    heart.textContent = ['💗', '💕', '🤍', '💛', '🌸', '✨'][i % 6];
    heart.style.left = (10 + Math.random() * 80) + '%';
    heart.style.top = (10 + Math.random() * 80) + '%';
    heart.style.animationDelay = (Math.random() * 4) + 's';
    heart.style.animationDuration = (6 + Math.random() * 4) + 's';
    footerHearts.appendChild(heart);
  }

  // ===== FADE-IN ON SCROLL (Intersection Observer) =====
  const fadeElements = document.querySelectorAll('.fade-in');

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => fadeObserver.observe(el));

  // ===== SMOOTH SCROLL FOR "Open Your Gift" BUTTON =====
  const openGiftBtn = document.getElementById('openGiftBtn');
  openGiftBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const gallery = document.getElementById('gallery');
    gallery.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // ===== GALLERY LIGHTBOX =====
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const galleryItems = document.querySelectorAll('.gallery-item, .polaroid');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      lightboxImg.src = '';
    }, 400);
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  // ===== REMINDER BUTTON =====
  const reminderBtn = document.getElementById('reminderBtn');
  const reminderMessage = document.getElementById('reminderMessage');
  let reminderShown = false;

  reminderBtn.addEventListener('click', () => {
    reminderShown = !reminderShown;
    if (reminderShown) {
      reminderMessage.classList.add('show');
      reminderBtn.innerHTML = '<span>Close</span> <span>💗</span>';

      // Scroll the message into view gently
      setTimeout(() => {
        reminderMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 200);
    } else {
      reminderMessage.classList.remove('show');
      reminderBtn.innerHTML = '<span>Press When You Need This</span> <span>💗</span>';
    }
  });

  // ===== MUSIC PLAYER =====
  const musicBtn = document.getElementById('musicBtn');
  const bgMusic = document.getElementById('bgMusic');
  let isPlaying = false;

  musicBtn.addEventListener('click', () => {
    if (!bgMusic.querySelector('source').src && !bgMusic.src) {
      // No song loaded — show a hint
      musicBtn.textContent = '🎶';
      setTimeout(() => {
        musicBtn.textContent = '🎵';
      }, 2000);
      return;
    }

    if (isPlaying) {
      bgMusic.pause();
      musicBtn.textContent = '🎵';
      musicBtn.classList.remove('playing');
    } else {
      bgMusic.play().catch(() => {
        // Autoplay blocked — that's okay
      });
      musicBtn.textContent = '🎶';
      musicBtn.classList.add('playing');
    }
    isPlaying = !isPlaying;
  });

  // ===== PARALLAX-LIKE SUBTLE EFFECT ON HERO =====
  const heroSection = document.getElementById('hero');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroHeight = heroSection.offsetHeight;

    if (scrollY < heroHeight) {
      const opacity = 1 - (scrollY / heroHeight) * 0.5;
      const translateY = scrollY * 0.3;
      const heroContent = heroSection.querySelector('.hero-content');
      heroContent.style.transform = `translateY(${translateY}px)`;
      heroContent.style.opacity = opacity;
    }
  }, { passive: true });

  // ===== TOUCH/CURSOR SPARKLE EFFECT =====
  let sparkleTimeout;
  document.addEventListener('mousemove', (e) => {
    clearTimeout(sparkleTimeout);
    sparkleTimeout = setTimeout(() => {
      createCursorSparkle(e.clientX, e.clientY);
    }, 80);
  });

  function createCursorSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.width = '6px';
    sparkle.style.height = '6px';
    sparkle.style.borderRadius = '50%';
    sparkle.style.background = 'radial-gradient(circle, #f8c8dc, #e0d0f5)';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '50';
    sparkle.style.opacity = '0.7';
    sparkle.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    sparkle.style.transform = 'scale(1)';

    document.body.appendChild(sparkle);

    requestAnimationFrame(() => {
      sparkle.style.opacity = '0';
      sparkle.style.transform = 'scale(0) translateY(-20px)';
    });

    setTimeout(() => {
      if (sparkle.parentNode) {
        sparkle.parentNode.removeChild(sparkle);
      }
    }, 800);
  }

  // ===== COUNTDOWN TIMER FOR JULY 31, 2026 =====
  const countdownDate = new Date('July 31, 2026 00:00:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    if (distance < 0) {
      daysEl.innerText = '00';
      hoursEl.innerText = '00';
      minutesEl.innerText = '00';
      secondsEl.innerText = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.innerText = String(days).padStart(2, '0');
    hoursEl.innerText = String(hours).padStart(2, '0');
    minutesEl.innerText = String(minutes).padStart(2, '0');
    secondsEl.innerText = String(seconds).padStart(2, '0');
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // ===== LOVE JOURNEY COUNT-UP TIMER (SINCE JAN 1, 2025) =====
  const loveStartDate = new Date('January 1, 2025 00:00:00').getTime();

  function updateLoveTimer() {
    const now = new Date().getTime();
    const distance = now - loveStartDate;

    const loveDaysEl = document.getElementById('love-days');
    const loveHoursEl = document.getElementById('love-hours');
    const loveMinutesEl = document.getElementById('love-minutes');
    const loveSecondsEl = document.getElementById('love-seconds');

    if (!loveDaysEl || !loveHoursEl || !loveMinutesEl || !loveSecondsEl) return;

    if (distance < 0) {
      loveDaysEl.innerText = '00';
      loveHoursEl.innerText = '00';
      loveMinutesEl.innerText = '00';
      loveSecondsEl.innerText = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    loveDaysEl.innerText = String(days).padStart(2, '0');
    loveHoursEl.innerText = String(hours).padStart(2, '0');
    loveMinutesEl.innerText = String(minutes).padStart(2, '0');
    loveSecondsEl.innerText = String(seconds).padStart(2, '0');
  }

  setInterval(updateLoveTimer, 1000);
  updateLoveTimer();

  // ===== PASSWORD PROTECTION FOR SCRAPBOOK =====
  const scrapbookLock = document.getElementById('scrapbookLock');
  const scrapbookContent = document.getElementById('scrapbookContent');
  const scrapbookPass = document.getElementById('scrapbookPass');
  const scrapbookUnlockBtn = document.getElementById('scrapbookUnlockBtn');
  const scrapbookError = document.getElementById('scrapbookError');
  const lockCard = document.getElementById('lockCard');

  const CORRECT_PASSWORD = '31072008';

  function attemptUnlock() {
    if (!scrapbookPass || !scrapbookLock || !scrapbookContent || !scrapbookError) return;

    const entered = scrapbookPass.value.trim();
    if (entered === CORRECT_PASSWORD) {
      scrapbookError.textContent = '';

      // Unlock animation
      scrapbookLock.style.transition = 'all 0.6s ease';
      scrapbookLock.style.opacity = '0';
      scrapbookLock.style.transform = 'scale(0.9)';

      setTimeout(() => {
        scrapbookLock.classList.add('hidden');
        scrapbookContent.classList.remove('hidden');

        // Trigger reveal fade-in/slide-up
        setTimeout(() => {
          scrapbookContent.classList.add('reveal');
          // Re-trigger Intersection Observer check for scroll effects inside scrapbook
          const scrapbookFadeElements = scrapbookContent.querySelectorAll('.fade-in');
          scrapbookFadeElements.forEach(el => {
            el.classList.add('visible');
          });
        }, 50);
      }, 600);

    } else {
      // Shaking animation on incorrect password
      if (lockCard) {
        lockCard.classList.remove('shake');
        void lockCard.offsetWidth; // Trigger reflow to restart animation
        lockCard.classList.add('shake');
      }
      scrapbookError.textContent = 'Hmm, that doesn\'t feel right... Try another key? 🗝️';
      scrapbookPass.value = '';
      scrapbookPass.focus();
    }
  }

  if (scrapbookUnlockBtn) {
    scrapbookUnlockBtn.addEventListener('click', attemptUnlock);
  }
  if (scrapbookPass) {
    scrapbookPass.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        attemptUnlock();
      }
    });
  }

  // ===== TYPED EFFECT FOR HERO SUBTITLE (subtle) =====
  // Not a full typewriter — just a gentle fade-in of each word
  const heroSubtitle = document.querySelector('.hero-subtitle');
  if (heroSubtitle) {
    heroSubtitle.style.opacity = '0';
    heroSubtitle.style.transition = 'opacity 1.5s ease';

    setTimeout(() => {
      heroSubtitle.style.opacity = '1';
    }, 800);
  }

  // ===== EASTER EGG: Konami-style heart burst on double-click =====
  document.addEventListener('dblclick', (e) => {
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        createHeartBurst(e.clientX, e.clientY);
      }, i * 60);
    }
  });

  function createHeartBurst(x, y) {
    const heart = document.createElement('span');
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = (14 + Math.random() * 16) + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '100';
    heart.style.opacity = '1';
    heart.style.transition = 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    heart.style.transform = 'scale(1)';

    document.body.appendChild(heart);

    const angle = Math.random() * Math.PI * 2;
    const distance = 60 + Math.random() * 80;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance - 40;

    requestAnimationFrame(() => {
      heart.style.opacity = '0';
      heart.style.transform = `translate(${dx}px, ${dy}px) scale(0) rotate(${Math.random() * 360}deg)`;
    });

    setTimeout(() => {
      if (heart.parentNode) {
        heart.parentNode.removeChild(heart);
      }
    }, 1200);
  }

  // ===== INITIAL CONFETTI BURST =====
  window.addEventListener('load', () => {
    // A soft, romantic confetti burst on load
    const end = Date.now() + 1.5 * 1000;
    const colors = ['#ffd6e5', '#ffdde8', '#f5e6ff', '#ffffff'];

    (function frame() {
      if (typeof confetti === 'undefined') return;
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  });

  // ===== CURSOR HEART TRAIL =====
  let lastHeartTime = 0;
  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    // Throttle heart creation to every 80ms
    if (now - lastHeartTime > 80) {
      lastHeartTime = now;
      const trailHeart = document.createElement('div');
      trailHeart.innerHTML = '💗';
      trailHeart.style.position = 'fixed';
      trailHeart.style.left = `${e.clientX}px`;
      trailHeart.style.top = `${e.clientY}px`;
      trailHeart.style.fontSize = `${Math.random() * 10 + 10}px`;
      trailHeart.style.pointerEvents = 'none';
      trailHeart.style.zIndex = '9999';
      trailHeart.style.transform = 'translate(-50%, -50%)';
      trailHeart.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';
      document.body.appendChild(trailHeart);

      // Trigger animation
      requestAnimationFrame(() => {
        trailHeart.style.transform = `translate(-50%, calc(-50% - ${Math.random() * 30 + 20}px)) scale(0)`;
        trailHeart.style.opacity = '0';
      });

      setTimeout(() => {
        if (trailHeart.parentNode) trailHeart.parentNode.removeChild(trailHeart);
      }, 800);
    }
  });

  // ===== 3D PHOTO TILT EFFECT =====
  const tiltGalleryItems = document.querySelectorAll('.gallery-item');
  tiltGalleryItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top; // y position within the element
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10; // max 10 deg
      const rotateY = ((x - centerX) / centerX) * 10;
      
      item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
      item.style.transition = 'transform 0.1s ease-out';
      item.style.zIndex = '10';
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
      item.style.transition = 'transform 0.5s ease-out';
      item.style.zIndex = '1';
    });
  });

  // ===== VIRTUAL CAKE & CANDLES =====
  const candles = document.querySelectorAll('.candle');
  let candlesBlownOut = 0;

  candles.forEach(candle => {
    candle.addEventListener('click', function() {
      const flame = this.querySelector('.flame');
      if (flame && flame.style.display !== 'none') {
        flame.style.display = 'none';
        
        // Add smoke puff
        const puff = document.createElement('div');
        puff.className = 'smoke-puff';
        this.appendChild(puff);
        
        candlesBlownOut++;
        if (candlesBlownOut === candles.length) {
          // Trigger small confetti burst when all candles are out
          setTimeout(() => {
            if (typeof confetti !== 'undefined') {
              confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
              });
            }
          }, 500);
        }
      }
    });
  });

  // ===== MAKE A WISH =====
  const sendWishBtn = document.getElementById('sendWishBtn');
  const wishInput = document.getElementById('wishInput');
  const wishContainer = document.getElementById('wishContainer');
  const wishSentMsg = document.getElementById('wishSentMsg');

  if (sendWishBtn) {
    sendWishBtn.addEventListener('click', () => {
      if (wishInput.value.trim() !== '') {
        // Animate the container flying away
        wishContainer.classList.add('fly-away');
        
        setTimeout(() => {
          wishContainer.classList.add('hidden');
          wishSentMsg.classList.remove('hidden');
        }, 1500); // Matches the animation duration
      }
    });
  }

  // ===== FIREWORKS / COUNTDOWN ZERO HANDLER =====
  let hasTriggeredFireworks = false;
  
  // We'll wrap the existing countdown interval logic or just poll it here.
  setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;
    
    if (distance <= 0 && !hasTriggeredFireworks) {
      hasTriggeredFireworks = true;
      triggerMidnightFireworks();
    }
  }, 1000);

  function triggerMidnightFireworks() {
    if (typeof confetti === 'undefined') return;
    
    const duration = 15 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff0000', '#ffc0cb', '#ffd700']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff0000', '#ffc0cb', '#ffd700']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }

  // ===== SURPRISE SECTION =====
  const surpriseBtn = document.getElementById('surpriseBtn');
  const hiddenMessage = document.getElementById('hiddenMessage');

  if (surpriseBtn && hiddenMessage) {
    surpriseBtn.addEventListener('click', () => {
      // 1. Show hidden message
      hiddenMessage.classList.remove('hidden');
      surpriseBtn.style.display = 'none';

      // 2. Play music
      if (bgMusic && bgMusic.paused) {
        bgMusic.play().catch(e => console.log('Audio autoplay prevented'));
        isPlaying = true;
        if(musicBtn) {
          musicBtn.textContent = '🎶';
          musicBtn.classList.add('playing');
        }
      }

      // 3. Confetti Burst
      if (typeof confetti !== 'undefined') {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
          return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);
          confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
          confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
      }

      // 4. Balloons
      const balloonColors = ['#ff6b9d', '#ffd6e5', '#f4a5c7', '#dcc4f5', '#f7d88a', '#e8a0a8'];
      
      for (let i = 0; i < 15; i++) {
        setTimeout(() => {
          const balloon = document.createElement('div');
          balloon.className = 'balloon';
          
          const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
          balloon.style.backgroundColor = color;
          balloon.style.setProperty('--balloon-color', color);
          
          const sizeStr = (0.8 + Math.random() * 0.6);
          balloon.style.transform = `scale(${sizeStr})`;
          
          const leftStr = Math.random() * 90 + 5;
          balloon.style.left = `${leftStr}%`;
          
          const animDur = (6 + Math.random() * 4) + 's';
          balloon.style.animationDuration = animDur;

          document.body.appendChild(balloon);

          setTimeout(() => {
            if (balloon.parentNode) {
              balloon.parentNode.removeChild(balloon);
            }
          }, 12000);
        }, i * 400); // Stagger spawning
      }
    });
  }

  // ===== QUIZ SECTION =====
  const quizData = [
    {
      question: "When did we officially become 'us'?",
      options: ["January 1, 2025", "May 15, 2025", "June 7, 2025", "July 31, 2025"],
      correct: 2,
      successMsg: "Yes! The best day ever. 💖",
      errorMsg: "Oops! (Hint: It was June 7, 2025) 🙊"
    },
    {
      question: "Where did we have our first date as a couple?",
      options: ["Starbucks", "Daily Dose Cafe", "At the park", "Movie Theater"],
      correct: 1,
      successMsg: "Exactly! Daily Dose Cafe. ☕️💕",
      errorMsg: "Haha no! It was Daily Dose Cafe! 🤭"
    },
    {
      question: "What is my absolute favourite feature of yours?",
      options: ["Your cute smile", "Your gorgeous eyes", "Your soft heart", "All of the above"],
      correct: 3,
      successMsg: "Duh! Obviously all of them. 😍",
      errorMsg: "Nice try, but I love everything about you! (All of the above) 😘"
    },
    {
      question: "What makes everything feel best according to me?",
      options: ["Your cooking", "Your softness", "Your intelligence", "Your style"],
      correct: 1,
      successMsg: "Yes! Your softness is your superpower. ✨",
      errorMsg: "Hmm, it's actually your softness! 💌"
    },
    {
      question: "Who is the most beautiful, caring girl in the world?",
      options: ["Someone else", "Harshita", "Nobody", "I don't know"],
      correct: 1,
      successMsg: "100% correct. It's YOU. 🌸",
      errorMsg: "Wrong! It's obviously Harshita! 🥺"
    }
  ];

  let currentQuestion = 0;
  let score = 0;

  const startQuizBtn = document.getElementById('startQuizBtn');
  const quizIntro = document.getElementById('quizIntro');
  const quizQuestionBox = document.getElementById('quizQuestionBox');
  const quizResultBox = document.getElementById('quizResultBox');
  
  const quizProgress = document.getElementById('quizProgress');
  const quizQuestionText = document.getElementById('quizQuestionText');
  const quizOptions = document.getElementById('quizOptions');
  const quizFeedback = document.getElementById('quizFeedback');
  const nextQuizBtn = document.getElementById('nextQuizBtn');
  
  const quizResultText = document.getElementById('quizResultText');
  const restartQuizBtn = document.getElementById('restartQuizBtn');

  function loadQuestion() {
    const q = quizData[currentQuestion];
    quizProgress.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
    quizQuestionText.textContent = q.question;
    quizOptions.innerHTML = '';
    
    quizFeedback.classList.add('hidden');
    quizFeedback.className = 'quiz-feedback hidden'; // reset classes
    
    nextQuizBtn.classList.add('hidden');

    q.options.forEach((opt, index) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `<span>${opt}</span> <span></span>`;
      btn.addEventListener('click', () => selectOption(index, btn));
      quizOptions.appendChild(btn);
    });
  }

  function selectOption(index, btn) {
    // Disable all options
    const allBtns = quizOptions.querySelectorAll('.quiz-option-btn');
    allBtns.forEach(b => {
      b.disabled = true;
      b.style.pointerEvents = 'none';
    });

    const q = quizData[currentQuestion];
    const isCorrect = (index === q.correct);

    if (isCorrect) {
      score++;
      btn.classList.add('correct');
      btn.querySelector('span:last-child').textContent = '✅';
      quizFeedback.textContent = q.successMsg;
      quizFeedback.classList.add('success');
    } else {
      btn.classList.add('wrong');
      btn.querySelector('span:last-child').textContent = '❌';
      
      // Highlight correct answer
      allBtns[q.correct].classList.add('correct');
      allBtns[q.correct].querySelector('span:last-child').textContent = '✅';
      
      quizFeedback.textContent = q.errorMsg;
      quizFeedback.classList.add('error');
    }

    quizFeedback.classList.remove('hidden');
    nextQuizBtn.classList.remove('hidden');
  }

  if (startQuizBtn) {
    startQuizBtn.addEventListener('click', () => {
      quizIntro.style.display = 'none';
      quizQuestionBox.classList.remove('hidden');
      quizQuestionBox.classList.add('fade-in', 'visible');
      currentQuestion = 0;
      score = 0;
      loadQuestion();
    });
  }

  if (nextQuizBtn) {
    nextQuizBtn.addEventListener('click', () => {
      currentQuestion++;
      if (currentQuestion < quizData.length) {
        loadQuestion();
      } else {
        showResults();
      }
    });
  }

  function showResults() {
    quizQuestionBox.classList.add('hidden');
    quizResultBox.classList.remove('hidden');
    quizResultBox.classList.add('fade-in', 'visible');
    
    quizResultText.textContent = `You got ${score} out of ${quizData.length} right!`;
    
    if (score === quizData.length) {
      quizResultText.textContent += " A perfect score for a perfect girl! 💖";
    }
    
    // Trigger some confetti for finishing
    if (typeof confetti !== 'undefined') {
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    }
  }

  if (restartQuizBtn) {
    restartQuizBtn.addEventListener('click', () => {
      quizResultBox.classList.add('hidden');
      quizIntro.style.display = 'block';
    });
  }

  console.log(
    '%c💗 Made with love for Harshita Chaudhary 💗',
    'color: #d4789c; font-size: 16px; font-family: Georgia, serif; padding: 8px;'
  );

})();
