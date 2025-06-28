<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
const emit = defineEmits(["open-auth"]);
const isMobile = ref(false);
const isMobileSearchActive = ref(false);
const searchInput = ref(null);
const isTablet = ref(false);
const compareCount = ref(3);

const checkDevice = () => {
  const width = window.innerWidth;
  isMobile.value = width < 768;
  isTablet.value = width >= 768 && width <= 1024;
};

onMounted(() => {
  checkDevice();
  window.addEventListener("resize", checkDevice); // Update device state on resize
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", checkDevice);
});
const handleLoginClick = () => {
  emit("open-auth", "login");
};
const toggleSearch = () => {
  isMobileSearchActive.value = !isMobileSearchActive.value;
  if (isMobileSearchActive.value) {
    nextTick(() => searchInput.value?.focus());
  }
};

const closeSearch = () => {
  isMobileSearchActive.value = false;
  searchQuery.value = "";
};
const performSearch = () => {
  console.log("Search for:", searchQuery.value);
  if (isMobile.value) closeMobileSearch();
};
</script>

<template>
  <header class="header" role="banner">
    <div class="header__container">
      <div class="header__container-wrapper" v-if="!isMobile">
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
        <div class="header__actions-wrapper">
          <div
            class="header__logo"
            v-if="!isMobile || (isMobile && !isMobileSearchActive)"
          >
            <img
              src="../../assets/image/header/logo.svg"
              alt="Логотип магазина светильников"
              class="header__logo-image"
            />
          </div>

          <button
            class="header__catalog-button"
            v-if="!isMobile"
            aria-label="Открыть каталог"
          >
            Каталог
          </button>
          <div
            class="header__block"
            :class="{ 'search-active': isMobileSearchActive }"
          >
            <button
              class="header__mobile-search header__mobile-icons"
              v-if="isMobile && !isMobileSearchActive"
              @click="toggleSearch"
              aria-label="Поиск"
            ></button>
            <button
              v-if="isMobile && !isMobileSearchActive"
              class="header__mobile-phone header__mobile-icons"
              @click="handleLoginClick"
              aria-label="Контакты"
            ></button>
            <button
              v-if="isMobile && !isMobileSearchActive"
              class="header__mobile-login header__mobile-icons"
              @click="handleLoginClick"
              aria-label="Войти в личный кабинет"
            ></button>
            <div
              class="header__search-wrapper"
              :class="{ 'search-active': isMobileSearchActive }"
              v-if="!isMobile || (isMobile && isMobileSearchActive)"
            >
              <input
                type="text"
                class="header__search-input"
                placeholder="Торшеры"
                aria-label="Поиск по сайту"
              />
              <button
                class="header__search-button"
                :class="{ 'search-active': isMobileSearchActive }"
                @click="toggleSearch"
                aria-label="Искать"
              ></button>
              <button
                class="header__search-close"
                v-if="isMobile && isMobileSearchActive"
                aria-label="Закрыть поиск"
                @click="closeSearch"
              ></button>
            </div>
            <div class="header__contacts" v-if="!isMobile">
              <div class="header__phones">
                <a href="tel:88001004453" class="header__phone"
                  >8 (800) 100-44-53
                </a>
                <span class="header__phone-description"
                  >Бесплатно по России</span
                >
              </div>
              <div class="header__phones">
                <a href="tel:+74951049955" class="header__phone"
                  >+7 (495) 104-99-55</a
                >
                <span class="header__phone-description"
                  >Бесплатная доставка</span
                >
              </div>
            </div>
            <div
              class="header__utilities"
              v-if="!isMobile"
              role="group"
              aria-label="Пользовательские инструменты"
            >
              <button
                class="header__utilities-styles header__utilities-compare"
                aria-label="Сравнение товаров"
              >
                <span v-if="!isTablet">Сравнение</span>
                <div v-if="isTablet" class="header__utilities-badge">
                  <span class="header__utilities-count">{{ compareCount }}</span>
                </div>
              </button>
              <button
                class="header__utilities-styles header__utilities-favorites"
                aria-label="Избранные товары"
              >
                <span v-if="!isTablet">Нравится</span>
              </button>
              <button
                class="header__utilities-styles header__utilities-cart"
                aria-label="Корзина"
              >
                <span v-if="!isTablet">Корзина</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style src="./Header.scss" lang="scss"></style>
