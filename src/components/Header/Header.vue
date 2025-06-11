<template>
  <header class="header" role="banner">
    <div class="header__container">
      <div class="header__container-wrapper">
        <div class="header__container-nav">
          <nav class="header__nav" aria-label="Основная навигация">
            <ul class="header__nav-list">
              <li class="header__nav-item">
                <img
                  src="../../assets/image/header/location.svg"
                  alt="Иконка локации"
                  class="header__nav-item-location"
                />
                <a href="#" class="header__nav-link">Тула</a>
              </li>
              <li class="header__nav-item">
                <a href="#" class="header__nav-link">Доставка и оплата</a>
              </li>
              <li class="header__nav-item">
                <a href="#" class="header__nav-link">Гарантия</a>
              </li>
              <li class="header__nav-item">
                <a href="#" class="header__nav-link">Возврат</a>
              </li>
              <li class="header__nav-item">
                <a href="#" class="header__nav-link">Отзывы</a>
              </li>
              <li class="header__nav-item">
                <a href="#" class="header__nav-link">Установка</a>
              </li>
              <li class="header__nav-item">
                <a href="#" class="header__nav-link">Дизайнерам</a>
              </li>
              <li class="header__nav-item">
                <a href="#" class="header__nav-link">Бренды</a>
              </li>
              <li class="header__nav-item">
                <a href="#" class="header__nav-link">Контакты</a>
              </li>
            </ul>
          </nav>
        </div>
        <button
          class="header__login-button"
          @click="handleLoginClick"
          aria-label="Войти в личный кабинет"
        >
          Войти
        </button>
      </div>
      <div class="header__actions">
        <div class="header__logo">
          <img
            src="../../assets/image/header/logo.svg"
            alt="Логотип магазина светильников"
            class="header__logo-image"
          />
        </div>

        <button class="header__catalog-button" aria-label="Открыть каталог">Каталог</button>
        <div class="header__block">
          <div class="header__search-wrapper">
            <input
              type="text"
              class="header__search-input"
              placeholder="Торшеры"
              aria-label="Поиск по сайту"
            />
            <button class="header__search-button" aria-label="Искать"></button>
          </div>
          <div class="header__contacts">
            <div class="header__phones">
              <a href="tel:88001004453" class="header__phone">8 (800) 100-44-53</a>
              <span class="header__phone-description">Бесплатно по России</span>
            </div>
            <div class="header__phones">
              <a href="tel:+74951049955" class="header__phone">+7 (495) 104-99-55</a>
              <span class="header__phone-description">Бесплатная доставка</span>
            </div>
          </div>
          <div class="header__utilities" role="group" aria-label="Пользовательские инструменты">
            <button 
              class="header__utilities-styles header__utilities-compare"
              aria-label="Сравнение товаров"
            >
              Сравнение
            </button>
            <button
              class="header__utilities-styles header__utilities-favorites"
              aria-label="Избранные товары"
            >
              Нравится
            </button>
            <button 
              class="header__utilities-styles header__utilities-cart"
              aria-label="Корзина"
            >
              Корзина
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const emit = defineEmits(['open-auth'])

const handleLoginClick = () => {
  emit('open-auth', 'login')
}
</script>

<style src="./Header.scss" lang="scss"></style>
