import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generatePhoneUrl(phone: string): string {
  return `tel:${phone.replace(/\D/g, "")}`
}
