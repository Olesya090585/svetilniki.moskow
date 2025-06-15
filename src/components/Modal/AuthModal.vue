<script setup>
import { ref, watch } from "vue";
import LoginModal from "./LoginModal/LoginModal.vue";
import RegisterModal from "./RegisterModal/RegisterModal.vue";
import ForgotPasswordModal from "./ForgotPasswordModal/ForgotPasswordModal.vue";
import SuccessPasswordModal from "./SuccessPasswordModal/SuccessPasswordModal.vue";

const props = defineProps({
  initialType: {
    type: String,
    default: "login",
    validator: (value) =>
      ["login", "register", "forgot-password", "success-password"].includes(
        value
      ),
  },
  isVisible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "success"]);
const currentForm = ref(props.initialType);
const phone = ref("");

watch(
  () => props.initialType,
  (newType) => {
    currentForm.value = newType;
  }
);

const resetAllForms = () => {
  // Создаем refs на компоненты форм
  const loginModalRef = ref(null);
  const registerModalRef = ref(null);
  const forgotPasswordModalRef = ref(null);

  // Сбрасываем данные форм
  if (loginModalRef.value) {
    loginModalRef.value.form = { login: "", password: "", remember: false };
  }
  if (registerModalRef.value) {
    registerModalRef.value.form = {
      fullName: "",
      phone: "",
      login: "",
      userType: "",
      captcha: "",
    };
  }
  if (forgotPasswordModalRef.value) {
    forgotPasswordModalRef.value.form = { phone: "" };
  }

  // Сбрасываем текущую форму на login
  currentForm.value = "login";
  phone.value = "";
};

const handleClose = () => {
  resetAllForms();
  emit("close");
};

const switchForm = (type) => {
  currentForm.value = type;
};

const handleSuccess = (data) => {
  if (currentForm.value === "forgot-password") {
    phone.value = data.phone;
    currentForm.value = "success-password";
    return;
  }

  if (currentForm.value === "register") {
    phone.value = data.phone;
    currentForm.value = "success-password";
    return;
  }

  emit("success", data);
};
</script>

<template>
  <div v-if="isVisible" class="auth-modal-overlay" @click.self="handleClose">
    <div class="auth-modal">
      <button
        class="auth-modal__back"
        v-if="currentForm === 'register' || currentForm === 'forgot-password'"
        @click="switchForm('login')"
      >
        <img class="auth-modal__back-img" src="../../assets/image/modals/back.svg" alt="Назад" />
      </button>

      <button class="auth-modal__close" @click="handleClose">
        <img src="../../assets/image/modals/close.svg" alt="Закрыть" />
      </button>

      <LoginModal
        v-if="currentForm === 'login'"
        @switch-form="switchForm"
        @success="handleSuccess"
        @forgot-password="() => switchForm('forgot-password')"
      />

      <RegisterModal
        v-else-if="currentForm === 'register'"
        @switch-form="switchForm"
        @success="handleSuccess"
      />

      <ForgotPasswordModal
        v-else-if="currentForm === 'forgot-password'"
        @switch-form="switchForm"
        @success="handleSuccess"
      />

      <SuccessPasswordModal
        v-if="currentForm === 'success-password'"
        :phone="phone"
        @close="emit('close')"
      />
    </div>
  </div>
</template>

<style src="./AuthModal.scss" lang="scss"></style>
