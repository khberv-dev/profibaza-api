export function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, '');

  const match = digits.match(/^(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/);
  if (!match) {
    return phone;
  }

  return `+${match[1]} (${match[2]}) ${match[3]} ${match[4]} ${match[5]}`;
}
