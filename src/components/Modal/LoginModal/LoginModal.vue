<script setup>
import { ref } from "vue";
import visibleIcon from '../../../assets/image/modals/visible.svg';
import notVisibleIcon from '../../../assets/image/modals/not_visible.svg';

const emit = defineEmits(["switch-form", "success", "forgot-password"]);

const form = ref({
  login: "",
  password: "",
  remember: false,
});

const errors = ref({
  login: "",
  password: "",
});

const showPassword = ref(false);
const isLoading = ref(false);

const validateForm = () => {
  let isValid = true;

  // Проверка логина
  if (!form.value.login) {
    errors.value.login = "Введите логин";
    isValid = false;
  } else {
    errors.value.login = "";
  }

  // Проверка пароля
  if (!form.value.password) {
    errors.value.password = "Введите пароль";
    isValid = false;
  } else if (form.value.password.length < 6) {
    errors.value.password = "Пароль должен быть не менее 6 символов";
    isValid = false;
  } else {
    errors.value.password = "";
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  isLoading.value = true;
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    emit("success", {
      login: form.value.login,
      remember: form.value.remember,
    });
  } finally {
    isLoading.value = false;
  }
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<template>
  <div class="login-modal">
    <h2 class="login-modal__title">ВХОД</h2>

    <form @submit.prevent="handleSubmit" class="login-modal__form">
      <div class="login-modal__group">
        <div class="login-modal__input-wrapper">
          <input
            v-model="form.login"
            type="text"
            class="login-modal__input"
            :class="{ 'is-invalid': errors.login }"
            placeholder="Логин"
            required
          />
        </div>
        <span v-if="errors.login" class="login-modal__error">{{
          errors.login
        }}</span>
      </div>

      <div class="login-modal__group">
        <div class="login-modal__input-wrapper">
          <input
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            class="login-modal__input"
            :class="{ 'is-invalid': errors.password }"
            placeholder="Пароль"
            required
          />
          <button
            type="button"
            class="login-modal__toggle-password"
            @click="togglePasswordVisibility"
          >
            <img
              :src="showPassword ? visibleIcon : notVisibleIcon"
              :alt="showPassword ? 'Скрыть пароль' : 'Показать пароль'"
            />
          </button>
        </div>
        <span v-if="errors.password" class="login-modal__error">{{
          errors.password
        }}</span>
      </div>

      <div class="login-modal__remember">
        <input
          v-model="form.remember"
          type="checkbox"
          id="remember"
          class="login-modal__checkbox"
        />
        <label for="remember" class="login-modal__remember-label">
          Запомнить меня
        </label>
      </div>

      <button type="submit" class="login-modal__submit" :disabled="isLoading">
        {{ isLoading ? "Вход..." : "Войти" }}
      </button>

      <button
        class="login-modal__switch"
        @click="emit('switch-form', 'register')"
      >
        Регистрация
      </button>
    </form>

    <div class="login-modal__footer">
      <button
        type="button"
        class="login-modal__forgot"
        @click="emit('forgot-password')"
      >
        Не помню свой пароль
      </button>
    </div>
  </div>
</template>

<style src="./LoginModal.scss" lang="scss"></style>
