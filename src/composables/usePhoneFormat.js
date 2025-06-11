import { ref } from 'vue';

export function usePhoneFormat() {
  const errors = ref({
    phone: '',
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

  const formatPhone = (value) => {
    let formattedValue = value.replace(/\D/g, "");
    if (formattedValue.length > 0) {
      if (formattedValue[0] !== "7") {
        formattedValue = "7" + formattedValue;
      }
      formattedValue = "+" + formattedValue.substring(0, 11);
      if (formattedValue.length > 2) {
        formattedValue = formattedValue.substring(0, 2) + " " + formattedValue.substring(2);
      }
      if (formattedValue.length > 6) {
        formattedValue = formattedValue.substring(0, 6) + " " + formattedValue.substring(6);
      }
      if (formattedValue.length > 10) {
        formattedValue = formattedValue.substring(0, 10) + "-" + formattedValue.substring(10);
      }
      if (formattedValue.length > 13) {
        formattedValue = formattedValue.substring(0, 13) + "-" + formattedValue.substring(13);
      }
    }
    return formattedValue;
  };

  return {
    errors,
    validatePhone,
    formatPhone,
  };
}
