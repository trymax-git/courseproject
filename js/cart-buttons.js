/**
 * Обработчик кнопок "В корзину"
 * Добавляет товары в корзину и показывает уведомление
 */
(function() {
  'use strict';

  function initCartButtons() {
    const cartButtons = document.querySelectorAll('.add-to-cart-btn, .product-detail-cart');
    
    cartButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation(); // Предотвращаем всплытие события на карточку
        
        // Получаем информацию о товаре из ближайшей карточки
        const productCard = button.closest('.stuff, .goods_item, .stuff_item');
        let productName = 'Товар';
        
        if (productCard) {
          const nameElement = productCard.querySelector('h3, h1');
          if (nameElement) {
            productName = nameElement.textContent.trim();
          }
        }
        
        // Показываем уведомление
        showCartNotification(productName);
        
        // Здесь можно добавить логику добавления в корзину через API
        // Например: addToCart(productId, quantity);
      });
    });
  }

  function showCartNotification(productName) {
    // Создаем уведомление
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
      <div class="cart-notification-content">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 13L9 17L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Товар "${productName}" добавлен в корзину</span>
      </div>
    `;
    
    // Добавляем стили для уведомления
    if (!document.querySelector('#cart-notification-styles')) {
      const style = document.createElement('style');
      style.id = 'cart-notification-styles';
      style.textContent = `
        .cart-notification {
          position: fixed;
          top: 100px;
          right: 20px;
          background-color: var(--bg-card);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-xl);
          padding: 1rem 1.5rem;
          z-index: 10000;
          animation: slideInRight 0.3s ease-out;
          max-width: 400px;
        }
        
        .cart-notification-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--text-primary);
          font-size: var(--font-size-base);
        }
        
        .cart-notification-content svg {
          color: var(--success);
          flex-shrink: 0;
        }
        
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        .cart-notification.hiding {
          animation: slideOutRight 0.3s ease-out forwards;
        }
      `;
      document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Удаляем уведомление через 3 секунды
    setTimeout(() => {
      notification.classList.add('hiding');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  // Инициализация при загрузке DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCartButtons);
  } else {
    initCartButtons();
  }
})();

