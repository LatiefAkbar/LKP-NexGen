// Mobile Menu Toggle dengan body scroll lock
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");
const body = document.body;

if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    body.classList.toggle("menu-open");
    
    const icon = mobileMenuBtn.querySelector('i');
    if (icon) {
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove("active");
      body.classList.remove("menu-open");
      
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  });

  document.addEventListener('click', (e) => {
    const isClickInsideNav = navLinks.contains(e.target);
    const isClickOnMenuBtn = mobileMenuBtn.contains(e.target);
    
    if (!isClickInsideNav && !isClickOnMenuBtn && navLinks.classList.contains('active')) {
      navLinks.classList.remove("active");
      body.classList.remove("menu-open");
      
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
      navLinks.classList.remove("active");
      body.classList.remove("menu-open");
      
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }
  });
}

// Header Scroll Effect
const header = document.getElementById("header");

if (header) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement && header) {
      const headerHeight = header.offsetHeight;
      const isMobile = window.innerWidth <= 768;
      const additionalOffset = isMobile ? 10 : 0;
      const targetPosition = targetElement.offsetTop - headerHeight - additionalOffset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove("active");
        body.classList.remove("menu-open");
        
        const icon = mobileMenuBtn?.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    }
  });
});

// Animation on Scroll
const fadeElements = document.querySelectorAll(".fade-in-up");

fadeElements.forEach((element) => {
  element.style.opacity = 0;
  element.style.transform = "translateY(30px)";
  element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  element.style.willChange = "opacity, transform";
});

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

const fadeInOnScroll = () => {
  fadeElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.style.opacity = 1;
      element.style.transform = "translateY(0)";
    }
  });
};

const throttledFadeIn = throttle(fadeInOnScroll, 50);

window.addEventListener("scroll", throttledFadeIn);
window.addEventListener("load", fadeInOnScroll);

// ========================================
// TESTIMONIALS SLIDER
// ========================================
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
let slideInterval;

function showSlide(index) {
  if (slides.length === 0) return;
  
  if (index >= slides.length) currentSlide = 0;
  else if (index < 0) currentSlide = slides.length - 1;
  else currentSlide = index;
  
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === currentSlide) {
      slide.classList.add("active");
    }
  });
  
  updateHeight();
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

let touchStartX = 0;
let touchEndX = 0;
const sliderContainer = document.querySelector('.testimonials-slider');

function handleTouchStart(e) {
  touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}

function handleSwipe() {
  const swipeThreshold = 50;
  
  if (touchEndX < touchStartX - swipeThreshold) {
    nextSlide();
    resetAutoSlide();
  }
  
  if (touchEndX > touchStartX + swipeThreshold) {
    prevSlide();
    resetAutoSlide();
  }
}

if (sliderContainer) {
  sliderContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
  sliderContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
}

function startAutoSlide() {
  if (slides.length > 0) {
    slideInterval = setInterval(nextSlide, 5000);
  }
}

function resetAutoSlide() {
  clearInterval(slideInterval);
  startAutoSlide();
}

function updateHeight() {
  const activeSlide = document.querySelector(".slide.active");
  const slider = document.querySelector(".testimonials-slider");
  
  if (activeSlide && slider) {
    requestAnimationFrame(() => {
      const activeHeight = activeSlide.offsetHeight;
      slider.style.height = activeHeight + "px";
    });
  }
}

// ========================================
// CAROUSEL (About Section) - COMPLETELY FIXED
// ========================================
let carouselCurrentSlide = 0;
const carouselSlides = document.querySelectorAll('.carousel-slide');
const carouselDots = document.querySelectorAll('.carousel-dot');
const carouselPrevBtn = document.querySelector('.carousel-nav.prev');
const carouselNextBtn = document.querySelector('.carousel-nav.next');
const carouselContainer = document.querySelector('.carousel-container');
let carouselInterval;

// CRITICAL FIX: Force display styles
function carouselShowSlide(index) {
  if (carouselSlides.length === 0) {
    console.error('❌ No carousel slides found!');
    return;
  }

  // Wrap index
  if (index >= carouselSlides.length) {
    carouselCurrentSlide = 0;
  } else if (index < 0) {
    carouselCurrentSlide = carouselSlides.length - 1;
  } else {
    carouselCurrentSlide = index;
  }

  console.log('🎠 Showing carousel slide:', carouselCurrentSlide);

  // FORCE HIDE ALL SLIDES FIRST
  carouselSlides.forEach((slide, i) => {
    slide.classList.remove('active');
    // Force hide dengan inline style sebagai backup
    slide.style.opacity = '0';
    slide.style.visibility = 'hidden';
    slide.style.zIndex = '0';
  });
  
  // FORCE HIDE ALL DOTS
  carouselDots.forEach((dot) => {
    dot.classList.remove('active');
  });

  // FORCE SHOW ACTIVE SLIDE
  const activeSlide = carouselSlides[carouselCurrentSlide];
  if (activeSlide) {
    activeSlide.classList.add('active');
    // Force show dengan inline style
    activeSlide.style.opacity = '1';
    activeSlide.style.visibility = 'visible';
    activeSlide.style.zIndex = '1';
    
    console.log('✅ Active slide:', carouselCurrentSlide, activeSlide.querySelector('img')?.src);
  }
  
  // ACTIVATE DOT
  const activeDot = carouselDots[carouselCurrentSlide];
  if (activeDot) {
    activeDot.classList.add('active');
  }
}

function carouselNext() {
  carouselCurrentSlide = (carouselCurrentSlide + 1) % carouselSlides.length;
  carouselShowSlide(carouselCurrentSlide);
}

function carouselPrev() {
  carouselCurrentSlide = (carouselCurrentSlide - 1 + carouselSlides.length) % carouselSlides.length;
  carouselShowSlide(carouselCurrentSlide);
}

function carouselGoTo(index) {
  carouselShowSlide(index);
  carouselResetAutoPlay();
}

function carouselStartAutoPlay() {
  if (carouselSlides.length > 0) {
    clearInterval(carouselInterval);
    carouselInterval = setInterval(carouselNext, 5000);
    console.log('▶️ Carousel autoplay started');
  }
}

function carouselResetAutoPlay() {
  clearInterval(carouselInterval);
  carouselStartAutoPlay();
}

// Navigation buttons
if (carouselPrevBtn) {
  carouselPrevBtn.addEventListener('click', () => {
    console.log('⬅️ Previous clicked');
    carouselPrev();
    carouselResetAutoPlay();
  });
}

if (carouselNextBtn) {
  carouselNextBtn.addEventListener('click', () => {
    console.log('➡️ Next clicked');
    carouselNext();
    carouselResetAutoPlay();
  });
}

// Dots navigation
carouselDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    const slideIndex = parseInt(dot.getAttribute('data-slide'));
    console.log('🔵 Dot clicked, going to slide:', slideIndex);
    carouselGoTo(slideIndex);
  });
});

// Touch support
let carouselTouchStartX = 0;
let carouselTouchEndX = 0;

function carouselHandleTouchStart(e) {
  carouselTouchStartX = e.changedTouches[0].screenX;
}

function carouselHandleTouchEnd(e) {
  carouselTouchEndX = e.changedTouches[0].screenX;
  carouselHandleSwipe();
}

function carouselHandleSwipe() {
  const swipeThreshold = 50;
  
  if (carouselTouchEndX < carouselTouchStartX - swipeThreshold) {
    carouselNext();
    carouselResetAutoPlay();
  }
  
  if (carouselTouchEndX > carouselTouchStartX + swipeThreshold) {
    carouselPrev();
    carouselResetAutoPlay();
  }
}

if (carouselContainer) {
  carouselContainer.addEventListener('touchstart', carouselHandleTouchStart, { passive: true });
  carouselContainer.addEventListener('touchend', carouselHandleTouchEnd, { passive: true });
  
  // Keyboard navigation
  carouselContainer.setAttribute('tabindex', '0');
  carouselContainer.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      carouselPrev();
      carouselResetAutoPlay();
    } else if (e.key === 'ArrowRight') {
      carouselNext();
      carouselResetAutoPlay();
    }
  });
}

// Pause when tab hidden
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    clearInterval(carouselInterval);
    clearInterval(slideInterval);
  } else {
    carouselResetAutoPlay();
    resetAutoSlide();
  }
});

// Resize handler
let resizeTimeout;
function handleResize() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    updateHeight();
    fadeInOnScroll();
  }, 250);
}

// Initialize
function init() {
  console.log('🚀 Initializing...');
  
  // Carousel initialization
  if (carouselSlides.length > 0) {
    console.log('🎠 Found', carouselSlides.length, 'carousel slides');
    
    // Log all images
    carouselSlides.forEach((slide, i) => {
      const img = slide.querySelector('img');
      console.log(`Slide ${i}:`, img?.src || 'NO IMAGE');
    });
    
    carouselShowSlide(0);
    carouselStartAutoPlay();
  } else {
    console.error('❌ No carousel slides found in DOM!');
  }
  
  // Testimonials
  if (slides.length > 0) {
    showSlide(currentSlide);
    startAutoSlide();
  }
  
  updateHeight();
  fadeInOnScroll();
  window.addEventListener("resize", handleResize);
  document.body.style.overflowX = 'hidden';
  
  console.log('✅ Initialization complete');
}

// Start
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Smooth scroll fallback
if (!('scrollBehavior' in document.documentElement.style)) {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView();
      }
    });
  });
}

// Debug helper
window.debugCarousel = function() {
  console.log('=== 🔍 CAROUSEL DEBUG ===');
  console.log('Total slides:', carouselSlides.length);
  console.log('Current slide:', carouselCurrentSlide);
  console.log('Active slides:', document.querySelectorAll('.carousel-slide.active').length);
  
  carouselSlides.forEach((slide, i) => {
    const img = slide.querySelector('img');
    const computed = window.getComputedStyle(slide);
    console.log(`Slide ${i}:`, {
      hasActive: slide.classList.contains('active'),
      opacity: computed.opacity,
      visibility: computed.visibility,
      zIndex: computed.zIndex,
      display: computed.display,
      imageSrc: img?.src,
      imageLoaded: img?.complete
    });
  });
};

// Manual slide changer untuk testing
window.goToSlide = function(index) {
  console.log('🎯 Manually going to slide:', index);
  carouselShowSlide(index);
};
