document.addEventListener('DOMContentLoaded', function() {
    try {
        const slider = document.querySelector('.cards_support');
        const cards = document.querySelectorAll('.card');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const dotsContainer = document.querySelector('.slider-dots');
        
        // Проверка существования необходимых элементов
        if (!slider || !cards.length || !prevBtn || !nextBtn || !dotsContainer) {
            console.warn('Slider elements not found. Slider functionality disabled.');
            return;
        }
        
        let currentSlide = 0;
        let cardsPerView = 4;
        let totalSlides = Math.ceil(cards.length / cardsPerView);
        let resizeTimeout;
        
        // Debounce функция для оптимизации производительности
        function debounce(func, wait) {
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(resizeTimeout);
                    func(...args);
                };
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(later, wait);
            };
        }
        
        // Функция для обновления количества карточек в зависимости от ширины экрана
        function updateCardsPerView() {
            try {
                if (window.innerWidth >= 992) {
                    cardsPerView = 4;
                } else if (window.innerWidth >= 768) {
                    cardsPerView = 3;
                } else if (window.innerWidth >= 576) {
                    cardsPerView = 2;
                } else {
                    cardsPerView = 1;
                }
                totalSlides = Math.ceil(cards.length / cardsPerView);
                
                // Проверка, что currentSlide не выходит за границы
                if (currentSlide >= totalSlides) {
                    currentSlide = Math.max(0, totalSlides - 1);
                }
                
                createDots();
                updateSlider();
            } catch (error) {
                console.error('Error in updateCardsPerView:', error);
            }
        }
        
        // Создание точек навигации
        function createDots() {
            try {
                if (!dotsContainer) return;
                
                dotsContainer.innerHTML = '';
                for (let i = 0; i < totalSlides; i++) {
                    const dot = document.createElement('div');
                    dot.classList.add('slider-dot');
                    dot.setAttribute('role', 'button');
                    dot.setAttribute('aria-label', `Перейти к слайду ${i + 1}`);
                    dot.setAttribute('tabindex', '0');
                    
                    if (i === currentSlide) {
                        dot.classList.add('active');
                        dot.setAttribute('aria-current', 'true');
                    }
                    
                    // Обработчик клика
                    dot.addEventListener('click', () => {
                        currentSlide = i;
                        updateSlider();
                    });
                    
                    // Обработчик клавиатуры для доступности
                    dot.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            currentSlide = i;
                            updateSlider();
                        }
                    });
                    
                    dotsContainer.appendChild(dot);
                }
            } catch (error) {
                console.error('Error in createDots:', error);
            }
        }
        
        // Обновление слайдера
        function updateSlider() {
            try {
                if (!slider || !cards.length) return;
                
                const firstCard = cards[0];
                if (!firstCard) return;
                
                const cardWidth = firstCard.offsetWidth + 16; // 16px - gap между карточками
                const translateX = -currentSlide * cardsPerView * cardWidth;
                slider.style.transform = `translateX(${translateX}px)`;
                
                // Обновление активной точки
                const dots = document.querySelectorAll('.slider-dot');
                dots.forEach((dot, index) => {
                    const isActive = index === currentSlide;
                    dot.classList.toggle('active', isActive);
                    if (isActive) {
                        dot.setAttribute('aria-current', 'true');
                    } else {
                        dot.removeAttribute('aria-current');
                    }
                });
            } catch (error) {
                console.error('Error in updateSlider:', error);
            }
        }
        
        // Обработчики событий для кнопок
        prevBtn.addEventListener('click', () => {
            try {
                if (currentSlide > 0) {
                    currentSlide--;
                } else {
                    currentSlide = totalSlides - 1;
                }
                updateSlider();
            } catch (error) {
                console.error('Error in prevBtn click handler:', error);
            }
        });
        
        nextBtn.addEventListener('click', () => {
            try {
                if (currentSlide < totalSlides - 1) {
                    currentSlide++;
                } else {
                    currentSlide = 0;
                }
                updateSlider();
            } catch (error) {
                console.error('Error in nextBtn click handler:', error);
            }
        });
        
        // Добавление атрибутов доступности для кнопок
        prevBtn.setAttribute('aria-label', 'Предыдущий слайд');
        nextBtn.setAttribute('aria-label', 'Следующий слайд');
        
        // Инициализация
        updateCardsPerView();
        
        // Использование debounce для resize события
        const debouncedUpdateCardsPerView = debounce(updateCardsPerView, 150);
        window.addEventListener('resize', debouncedUpdateCardsPerView);
        
    } catch (error) {
        console.error('Error initializing slider:', error);
    }
});