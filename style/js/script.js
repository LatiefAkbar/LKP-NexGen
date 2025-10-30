// Mobile Menu Toggle dengan body scroll lock
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");
const body = document.body;

mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  body.classList.toggle("menu-open");
  
  // Ubah icon menu menjadi X ketika aktif
  const icon = mobileMenuBtn.querySelector('i');
  if (navLinks.classList.contains('active')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove("active");
    body.classList.remove("menu-open");
    
    // Kembalikan icon ke burger
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  const isClickInsideNav = navLinks.contains(e.target);
  const isClickOnMenuBtn = mobileMenuBtn.contains(e.target);
  
  if (!isClickInsideNav && !isClickOnMenuBtn && navLinks.classList.contains('active')) {
    navLinks.classList.remove("active");
    body.classList.remove("menu-open");
    
    // Kembalikan icon ke burger
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('active')) {
    navLinks.classList.remove("active");
    body.classList.remove("menu-open");
    
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});

// Header Scroll Effect
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("header-scrolled");
  } else {
    header.classList.remove("header-scrolled");
  }
});

// Smooth Scrolling for Anchor Links dengan offset untuk mobile
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Calculate offset based on screen size
      const headerHeight = header.offsetHeight;
      const isMobile = window.innerWidth <= 768;
      const additionalOffset = isMobile ? 10 : 0; // Extra offset for mobile
      const targetPosition = targetElement.offsetTop - headerHeight - additionalOffset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // Close mobile menu if open
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove("active");
        body.classList.remove("menu-open");
        
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }
  });
});

// Animation on Scroll dengan throttling untuk performance
const fadeElements = document.querySelectorAll(".fade-in-up");

// Set initial state for fade elements
fadeElements.forEach((element) => {
  element.style.opacity = 0;
  element.style.transform = "translateY(30px)";
  element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  element.style.willChange = "opacity, transform"; // Performance hint
});

// Throttle function untuk optimasi performance
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

// Gunakan throttled version untuk scroll event
const throttledFadeIn = throttle(fadeInOnScroll, 50);

window.addEventListener("scroll", throttledFadeIn);
window.addEventListener("load", fadeInOnScroll);

// Testimonials Slider dengan touch support
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
let slideInterval;

function showSlide(index) {
  // Handle wrap-around
  if (index >= slides.length) currentSlide = 0;
  if (index < 0) currentSlide = slides.length - 1;
  
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

// Touch support untuk slider
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
    // Swipe kiri - next slide
    nextSlide();
    resetAutoSlide();
  }
  
  if (touchEndX > touchStartX + swipeThreshold) {
    // Swipe kanan - prev slide
    prevSlide();
    resetAutoSlide();
  }
}

// Tambahkan event listeners untuk touch
if (sliderContainer) {
  sliderContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
  sliderContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
}

// Auto slide functionality
function startAutoSlide() {
  slideInterval = setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
  clearInterval(slideInterval);
  startAutoSlide();
}

// Height calculation untuk testimonials slider
function updateHeight() {
  const activeSlide = document.querySelector(".slide.active");
  const slider = document.querySelector(".testimonials-slider");
  
  if (activeSlide && slider) {
    // Gunakan requestAnimationFrame untuk smooth transition
    requestAnimationFrame(() => {
      const activeHeight = activeSlide.offsetHeight;
      slider.style.height = activeHeight + "px";
    });
  }
}

// Optimized resize handler dengan debounce
let resizeTimeout;
function handleResize() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    updateHeight();
    fadeInOnScroll(); // Re-trigger animations on resize
  }, 250);
}

// Pause auto-slide ketika tab tidak aktif
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    clearInterval(slideInterval);
  } else {
    resetAutoSlide();
  }
});

// Initialize everything
function init() {
  // Initial slide show
  showSlide(currentSlide);
  
  // Start auto slide
  startAutoSlide();
  
  // Initial height calculation
  updateHeight();
  
  // Initial fade in check
  fadeInOnScroll();
  
  // Add resize listener
  window.addEventListener("resize", handleResize);
  
  // Prevent horizontal scroll on mobile
  document.body.style.overflowX = 'hidden';
}

// Start when DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Fallback untuk browsers yang tidak support smooth scrolling
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