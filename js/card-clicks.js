/**
 * Обработчик кликов для карточек
 * Делает всю карточку кликабельной, переходя по ссылке внутри
 */
(function() {
  'use strict';

  // Отслеживаем обработанные карточки, чтобы не добавлять дублирующиеся обработчики
  const processedCards = new WeakSet();

  function initCardClicks() {
    // Обработка карточек в слайдере
    const sliderCards = document.querySelectorAll('.card');
    sliderCards.forEach(card => {
      // Пропускаем уже обработанные карточки
      if (processedCards.has(card)) {
        return;
      }
      
      const link = card.querySelector('a[href]');
      if (link) {
        const href = link.getAttribute('href');
        // Обрабатываем только реальные ссылки (не #)
        if (href && href !== '#' && !href.startsWith('javascript:')) {
          card.addEventListener('click', function(e) {
            // Не перехватываем клики на саму ссылку или кнопки
            if (e.target.tagName === 'A' || e.target.closest('a') || e.target.tagName === 'BUTTON' || e.target.closest('button')) {
              return;
            }
            e.preventDefault();
            window.location.href = href;
          });
        }
        
        // Добавляем стиль для указания, что карточка кликабельна
        card.style.cursor = 'pointer';
        processedCards.add(card);
      }
    });

    // Обработка карточек товаров в секции "Лучшие предложения"
    const productCards = document.querySelectorAll('.stuff');
    productCards.forEach(card => {
      // Пропускаем уже обработанные карточки
      if (processedCards.has(card)) {
        return;
      }
      
      const link = card.querySelector('a[href]');
      if (link) {
        const href = link.getAttribute('href');
        // Обрабатываем только реальные ссылки (не #)
        if (href && href !== '#' && !href.startsWith('javascript:')) {
          card.addEventListener('click', function(e) {
            // Не перехватываем клики на ссылки, кнопки или их дочерние элементы
            if (e.target.tagName === 'A' || e.target.closest('a') || 
                e.target.tagName === 'BUTTON' || e.target.closest('button') ||
                e.target.tagName === 'SVG' || e.target.closest('svg')) {
              return;
            }
            e.preventDefault();
            window.location.href = href;
          });
        }
        
        card.style.cursor = 'pointer';
        processedCards.add(card);
      }
    });
  }

  // Инициализация при загрузке DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCardClicks);
  } else {
    initCardClicks();
  }

  // Обработка карточек в header/footer после их загрузки
  document.addEventListener('componentLoaded', function() {
    // Переинициализируем обработчики для новых карточек
    initCardClicks();
  });
})();

