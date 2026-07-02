export const cleanPhoneNumber = (phone: string): string => {
  const digits = phone.replace(/\D/g, "");
  return `+${digits}`;
};
