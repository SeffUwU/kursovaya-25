export function formatPhone(phoneNumber: string) {
  let normalized = phoneNumber.replace(/[^\d+]/g, '');

  if (normalized.startsWith('+')) {
    normalized = '+' + normalized.slice(1).replace(/\D/g, '');
  } else {
    normalized = normalized.replace(/\D/g, '');
  }

  return normalized;
}
