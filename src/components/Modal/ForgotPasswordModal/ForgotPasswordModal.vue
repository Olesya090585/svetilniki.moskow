<script setup>
import { ref, computed } from "vue";

const emit = defineEmits(["switch-form", "success"]);

const form = ref({
  phone: "",
});

const errors = ref({
  phone: "",
});

const isLoading = ref(false);

const isFormEmpty = computed(() => {
  return !form.value.phone;
});

const validatePhone = (value) => {
  if (!value) {
    errors.value.phone = "Введите номер телефона";
    return false;
  }
  if (!/^\+7\s\d{3}\s\d{3}-\d{2}-\d{2}$/.test(value)) {
    errors.value.phone = "Некорректный формат номера";
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
};

const handleSubmit = async () => {
  if (!validatePhone(form.value.phone)) return;

  isLoading.value = true;
  try {
    // Имитируем задержку API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    emit("success", { phone: form.value.phone });
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="forgot-password-modal">
    <h2 class="forgot-password-modal__title">Восстановление доступа</h2>

    <form @submit.prevent="handleSubmit" class="forgot-password-modal__form">
      <div class="forgot-password-modal__group">
        <input
          v-model="form.phone"
          type="tel"
          class="forgot-password-modal__input"
          :class="{ 'is-invalid': errors.phone }"
          placeholder="+7"
          @input="formatPhone"
          required
        />
        <span v-if="errors.phone" class="forgot-password-modal__error">{{
          errors.phone
        }}</span>
      </div>

      <button
        type="submit"
        class="forgot-password-modal__submit"
        :class="{ 'is-active': !isFormEmpty }"
        :disabled="isLoading"
      >
        {{ isLoading ? "Отправка..." : "Отправить" }}
      </button>
    </form>

    <p class="forgot-password-modal__hint">
      Пароль будет отправлен на указанный номер телефона
    </p>
  </div>
</template>

<style src="./ForgotPasswordModal.scss" lang="scss"></style>
