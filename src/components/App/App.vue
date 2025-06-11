<script setup>
import Header from '../Header/Header.vue';
import AuthModal from '../Modal/AuthModal.vue';
import { ref } from 'vue';

const isAuthModalOpen = ref(false);
const authModalType = ref('login'); // 'login' или 'register'

const openAuthModal = (type = 'login') => {
  console.log("Событие open-auth получено с типом:", type);
  authModalType.value = type;
  isAuthModalOpen.value = true;
  console.log("Состояние isAuthModalOpen:", isAuthModalOpen.value);
};

const handleAuthSuccess = (userData) => {
  console.log('Успешная авторизация:', userData);
  // Здесь можно обновить состояние пользователя в хранилище (Pinia/Vuex)
};
</script>

<template>
  <div id="app" class="app">
    <Header @open-auth="openAuthModal" />

    <AuthModal 
      :isVisible="isAuthModalOpen"
      :initial-type="authModalType"
      @close="isAuthModalOpen = false"
      @success="handleAuthSuccess"
    />

    <!-- Остальное содержимое приложения -->
  </div>
</template>

<style src="./App.scss" lang="scss"></style>
