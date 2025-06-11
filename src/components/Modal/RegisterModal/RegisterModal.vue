<script setup>
import { ref, computed } from "vue";

const emit = defineEmits(["switch-form", "success"]);

const form = ref({
  fullName: "",
  phone: "",
  login: "",
  userType: "", // Изменяем начальное значение на пустое
  captcha: "",
});

const errors = ref({
  phone: "",
});

const validation = ref({
  fullName: false,
  phone: false,
  login: false,
});

const isLoading = ref(false);

const isFormEmpty = computed(() => {
  return (
    !form.value.fullName &&
    !form.value.phone &&
    !form.value.login &&
    !form.value.userType &&
    !form.value.captcha
  );
});

const handleSubmit = async () => {
  isLoading.value = true;
  try {
    // Здесь будет запрос к API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    emit("success", {
      login: form.value.login,
      phone: form.value.phone,
    });
  } finally {
    isLoading.value = false;
  }
};

const validateField = (field) => {
  switch (field) {
    case "fullName":
      validation.value.fullName = form.value.fullName.length >= 3;
      break;
    case "phone":
      validation.value.phone = validatePhone(form.value.phone);
      break;
    case "login":
      validation.value.login = form.value.login.length >= 3;
      break;
  }
};

const validatePhone = (value) => {
  if (!value) {
    errors.value.phone = "Введите номер телефона";
    return false;
  }
  if (!/^\+7\s\d{3}\s\d{3}-\d{2}-\d{2}$/.test(value)) {
    errors.value.phone = "Номер телефона введен некорректно";
    return false;
  }
  errors.value.phone = "";
  return true;
};

const formatPhone = (event) => {
  let value = event.target.value.replace(/\D/g, "");
  if (value.length > 0) {
    if (value[0] !== "7") {
      value = "7" + value;
    }
    value = "+" + value.substring(0, 11);
    if (value.length > 2) {
      value = value.substring(0, 2) + " " + value.substring(2);
    }
    if (value.length > 6) {
      value = value.substring(0, 6) + " " + value.substring(6);
    }
    if (value.length > 10) {
      value = value.substring(0, 10) + "-" + value.substring(10);
    }
    if (value.length > 13) {
      value = value.substring(0, 13) + "-" + value.substring(13);
    }
  }
  form.value.phone = value;
  validation.value.phone = validatePhone(value);
};
</script>

<template>
  <div class="register-modal">
    <h2 class="register-modal__title">РЕГИСТРАЦИЯ</h2>

    <form @submit.prevent="handleSubmit" class="register-modal__form">
      <div class="register-modal__group">
        <div class="register-modal__input-wrapper">
          <input
            v-model="form.fullName"
            type="text"
            class="register-modal__input"
            :class="{ 'is-valid': validation.fullName }"
            placeholder="Ф.И.О."
            required
            @input="validateField('fullName')"
          />
          <span
            v-if="validation.fullName"
            class="register-modal__valid-icon"
          ></span>
        </div>
      </div>

      <div class="register-modal__group">
        <div class="register-modal__input-wrapper">
          <input
            v-model="form.phone"
            type="tel"
            class="register-modal__input"
            :class="{
              'is-valid': validation.phone,
              'is-invalid': errors.phone,
            }"
            placeholder="+7"
            required
            @input="formatPhone"
          />
          <span
            v-if="validation.phone"
            class="register-modal__valid-icon"
          ></span>
        </div>
        <span v-if="errors.phone" class="register-modal__error">{{
          errors.phone
        }}</span>
      </div>

      <div class="register-modal__user-type register-modal__group">
        <select v-model="form.userType" class="register-modal__select" required>
          <option value="" disabled selected>Пользователь</option>
          <option value="designer">Дизайнер</option>
          <option value="partner">Партнер</option>
          <option value="user">Пользователь</option>
        </select>
      </div>

      <div class="register-modal__captcha">
        <div class="captcha-mockup">
          <span class="captcha-mockup__text">sdhgfjh</span>
        </div>
        <input
          v-model="form.captcha"
          type="text"
          class="register-modal__input captcha-input"
          placeholder="Введите символы"
          required
        />
      </div>
      <button
        type="submit"
        class="register-modal__submit"
        :class="{ 'is-active': !isFormEmpty }"
        :disabled="isLoading"
      >
        Регистрация
      </button>
    </form>

    <p class="register-modal__hint">
      Пароль будет отправлен на указанный номер телефона
    </p>
  </div>
</template>

<style src="./RegisterModal.scss" lang="scss"></style>
