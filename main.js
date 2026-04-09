/* ============================================
   MONICA BORRELL — Minimal JavaScript
   Handles nav toggle + subtle entrance animations
   ============================================ */

(function () {
  'use strict';

  /**
   * Mobile navigation toggle
   */
  function initNavToggle() {
    var toggle = document.querySelector('.nav-toggle');
    var navLinks = document.querySelector('.nav-links');

    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /**
   * Intersection Observer for fade-in animations.
   * Elements with the class "fade-in" will animate
   * into view when they enter the viewport.
   */
  function initScrollAnimations() {
    var targets = document.querySelectorAll('.fade-in');

    if (!targets.length) return;

    // Use IntersectionObserver if supported
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );

      targets.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      // Fallback: just show everything immediately
      targets.forEach(function (el) {
        el.classList.add('visible');
      });
    }
  }

  /**
   * Add fade-in class to animatable elements
   * after DOM is ready.
   */
  function setup() {
    initNavToggle();

    var selectors = [
      '.about-content',
      '.work-card',
      '.contact-links',
      '.blog-card',
      '.post-body'
    ];

    selectors.forEach(function (selector) {
      var elements = document.querySelectorAll(selector);
      elements.forEach(function (el) {
        el.classList.add('fade-in');
      });
    });

    initScrollAnimations();
  }

  // Kick off when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();
