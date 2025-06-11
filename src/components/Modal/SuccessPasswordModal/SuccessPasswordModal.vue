<script setup>
const props = defineProps({
  phone: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["close"]);
</script>

<template>
  <div class="success-password-modal">
    <div class="success-password-modal__content">
      <h2 class="success-password-modal__title">
        Пароль от личного кабинета<br />
        отправлен на указанный<br />
        вами номер
        <span class="success-password-modal__phone">{{ phone }}</span>
      </h2>

      <button class="success-password-modal__button" @click="emit('close')">
        Войти
      </button>

      <div class="success-password-modal__info">
        <p>Номер указан неверно</p>
        <p>Пароль не пришел</p>
      </div>
    </div>
  </div>
</template>

<style src="./SuccessPasswordModal.scss" lang="scss"></style>
