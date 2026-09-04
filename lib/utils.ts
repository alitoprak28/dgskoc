import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Tailwind sinif cakismalarini onleyen yardimci
export function cn(...girdiler: ClassValue[]) {
  return twMerge(clsx(girdiler));
}
