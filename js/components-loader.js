(function() {
  'use strict';

  /**
   * Загружает HTML компонент и вставляет его в указанный элемент
   * @param {string} componentPath - путь к компоненту
   * @param {HTMLElement} targetElement - элемент, в который нужно вставить компонент
   * @returns {Promise<void>}
   */
  async function loadComponent(componentPath, targetElement) {
    try {
      const response = await fetch(componentPath);
      if (!response.ok) {
        throw new Error(`Failed to load component: ${componentPath}`);
      }
      const html = await response.text();
      targetElement.innerHTML = html;
      
      // пути в загруженном компоненте относительно текущей страницы
      fixRelativePaths(targetElement);
      
      const event = new CustomEvent('componentLoaded', { 
        detail: { component: componentPath, element: targetElement } 
      });
      document.dispatchEvent(event);
    } catch (error) {
      console.error(`Error loading component ${componentPath}:`, error);
      // показывается сообщение об ошибке в production, но не ломается страница
      if (targetElement) {
        targetElement.innerHTML = `<!-- Ошибка загрузки компонента: ${componentPath} -->`;
      }
    }
  }

  /**
   * Исправляет относительные пути в компоненте в зависимости от глубины вложенности страницы
   * @param {HTMLElement} element - элемент с загруженным компонентом
   */
  function fixRelativePaths(element) {
    const currentPath = window.location.pathname;
    // Более точное определение: страница в корне, если путь заканчивается на .html в корне или это index.html
    const pathParts = currentPath.split('/').filter(part => part);
    const htmlFileInPath = pathParts.find(part => part.endsWith('.html'));
    const isRoot = !htmlFileInPath || htmlFileInPath === 'index.html' || pathParts.length <= 1;
    const basePath = isRoot ? './' : '../';
    
    // Исправляем пути к изображениям
    const images = element.querySelectorAll('img[src^="assets/"]');
    images.forEach(img => {
      const src = img.getAttribute('src');
      if (src && src.startsWith('assets/')) {
        img.src = basePath + src;
      }
    });
    
    // Исправляем пути к ссылкам
    const links = element.querySelectorAll('a[href]');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
        // Обрабатываем только ссылки на HTML файлы
        if (href.endsWith('.html')) {
          // Если ссылка уже содержит путь (./ или ../), не трогаем её
          if (href.startsWith('./') || href.startsWith('../')) {
            return;
          }
          // Если ссылка не содержит слэшей (просто имя файла), все HTML файлы в корне
          // Поэтому для ссылок между HTML файлами в корне используем просто имя файла
          // Но если мы не в корне, нужно добавить ../ для возврата в корень
          if (!href.includes('/')) {
            // Все HTML файлы в корне проекта, поэтому ссылки между ними должны быть просто именами файлов
            // Но если текущая страница не в корне, нужно вернуться в корень
            if (!isRoot) {
              link.href = '../' + href;
            } else {
              // Если мы в корне, ссылка должна быть просто именем файла (без ./)
              link.href = href;
            }
          }
        }
      }
    });
  }

  /**
   * Инициализирует загрузку всех компонентов на странице
   */
  function initComponents() {
    // Определяем базовый путь к компонентам
    const currentPath = window.location.pathname;
    const isRoot = currentPath === '/' || currentPath.endsWith('/index.html') || currentPath.split('/').filter(part => part && part.endsWith('.html')).length <= 1;
    const componentBasePath = isRoot ? 'components/' : '../components/';
    
    // Загружаем header
    const headerPlaceholder = document.querySelector('[data-component="header"]');
    if (headerPlaceholder) {
      loadComponent(componentBasePath + 'header.html', headerPlaceholder);
    }

    // Загружаем footer
    const footerPlaceholder = document.querySelector('[data-component="footer"]');
    if (footerPlaceholder) {
      loadComponent(componentBasePath + 'footer.html', footerPlaceholder);
    }
  }

  // Загружаем компоненты когда DOM готов
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initComponents);
  } else {
    initComponents();
  }
})();

