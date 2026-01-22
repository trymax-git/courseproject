/**
 * Мобильное меню для header
 */
(function() {
  'use strict';

  function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.main-nav');
    
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function() {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !isExpanded);
      nav.classList.toggle('active');
      
      // блокировка скролл body когда меню открыто
      if (!isExpanded) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // закрытие меню при клике на ссылку
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          toggle.setAttribute('aria-expanded', 'false');
          nav.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    });

    // закрытие меню при клике вне его
    document.addEventListener('click', function(e) {
      if (window.innerWidth <= 768 && nav.classList.contains('active')) {
        if (!nav.contains(e.target) && !toggle.contains(e.target)) {
          toggle.setAttribute('aria-expanded', 'false');
          nav.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    });
  }

  // инициализация при загрузке DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
  } else {
    initMobileMenu();
  }
})();

