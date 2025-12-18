# CSS Переменные SAASUNG Shop

## Обзор

Проект использует систему CSS переменных для обеспечения консистентности дизайна и упрощения поддержки кода.

## Цветовая палитра

См. [COLOR_PALETTE.md](./COLOR_PALETTE.md) для полного описания цветовой палитры.

## Spacing система

Система отступов основана на rem единицах для масштабируемости:

```css
--spacing-xs: 0.25rem;    /* 4px */
--spacing-sm: 0.5rem;     /* 8px */
--spacing-md: 1rem;       /* 16px */
--spacing-lg: 1.5rem;     /* 24px */
--spacing-xl: 2rem;       /* 32px */
--spacing-2xl: 3rem;      /* 48px */
--spacing-3xl: 4rem;      /* 64px */
```

### Использование

```css
.element {
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  gap: var(--spacing-sm);
}
```

## Typography система

### Размеры шрифтов

```css
--font-size-xs: 0.75rem;      /* 12px */
--font-size-sm: 0.875rem;     /* 14px */
--font-size-base: 1rem;       /* 16px */
--font-size-lg: 1.125rem;     /* 18px */
--font-size-xl: 1.25rem;      /* 20px */
--font-size-2xl: 1.5rem;      /* 24px */
--font-size-3xl: 2rem;        /* 32px */
--font-size-4xl: 2.25rem;     /* 36px */
```

### Высота строки

```css
--line-height-tight: 1.25;    /* Для заголовков */
--line-height-normal: 1.5;    /* Для основного текста */
--line-height-relaxed: 1.75;  /* Для длинных текстов */
```

### Насыщенность шрифта

```css
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Использование

```css
.heading {
  font-size: var(--font-size-2xl);
  line-height: var(--line-height-tight);
  font-weight: var(--font-weight-semibold);
}

.body-text {
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
}
```

## Border Radius

```css
--radius-sm: 0.25rem;     /* 4px */
--radius-md: 0.5rem;      /* 8px */
--radius-lg: 1rem;        /* 16px */
--radius-xl: 1.5rem;      /* 24px */
--radius-full: 9999px;    /* Полный круг */
```

### Использование

```css
.button {
  border-radius: var(--radius-md);
}

.card {
  border-radius: var(--radius-lg);
}

.avatar {
  border-radius: var(--radius-full);
}
```

## Shadows

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
```

### Использование

```css
.card {
  box-shadow: var(--shadow-md);
}

.modal {
  box-shadow: var(--shadow-xl);
}
```

## Transitions

```css
--transition-fast: 0.15s ease;
--transition-base: 0.3s ease;
--transition-slow: 0.5s ease;
```

### Использование

```css
.button {
  transition: background-color var(--transition-base);
}

.card {
  transition: transform var(--transition-fast);
}
```

## Рекомендации

1. **Всегда используйте переменные** вместо хардкода значений
2. **Используйте spacing систему** для консистентных отступов
3. **Следуйте типографической системе** для единообразия текста
4. **Используйте transitions** для плавных анимаций
5. **Применяйте shadows** для создания глубины

## Примеры

### Карточка продукта

```css
.product-card {
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  background-color: var(--white);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}
```

### Кнопка

```css
.button {
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-md);
  background-color: var(--primary-blue);
  color: var(--white);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  transition: background-color var(--transition-base);
}

.button:hover {
  background-color: var(--accent-blue);
}
```

