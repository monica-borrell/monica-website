/* ============================================
   MONICA BORRELL — Minimal JavaScript
   Handles nav toggle + subtle entrance animations
   ============================================ */

(function () {
  'use strict';

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
    var selectors = [
      '.about-content',
      '.work-card',
      '.contact-links',
      '.blog-card'
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
