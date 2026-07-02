import { CheckoutFormData, FormErrors } from "@/types/checkout";

export const validateForm = (formData: CheckoutFormData): FormErrors => {
  const newErrors: FormErrors = {};

  if (!formData.name.trim()) {
    newErrors.name = "Ім'я обов'язкове";
  }

  if (!formData.email.trim()) {
    newErrors.email = "Email обов'язковий";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = "Невірний формат email";
  }

  if (!formData.phone.trim() || formData.phone === "+38 (___) ___-__-__") {
    newErrors.phone = "Номер телефону обов'язковий";
  } else {
    const digits = formData.phone.replace(/\D/g, "");
    if (digits.length !== 12 || !digits.startsWith("380")) {
      newErrors.phone = "Номер має бути +38 (0XX) XXX-XX-XX";
    }
  }

  if (formData.deliveryType === "delivery") {
    if (!formData.address?.trim()) {
      newErrors.address = "Адреса обов'язкова";
    }
    if (!formData.city?.trim()) {
      newErrors.city = "Місто обов'язкове";
    }
    if (!formData.postalCode?.trim()) {
      newErrors.postalCode = "Поштовий індекс обов'язковий";
    }

    if (formData.deliveryTime === "scheduled" && !formData.deliveryHour) {
      newErrors.deliveryHour = "Виберіть час доставки";
    }
  }

  return newErrors;
};
