// lib/registry/reference.ts

function padNumber(value: number, size: number) {
  return String(value).padStart(size, "0");
}

export function generatePassportNumber(sequence: number) {
  return `ER-${padNumber(sequence, 6)}`;
}