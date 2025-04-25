// lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines class names using clsx and merges Tailwind CSS classes using tailwind-merge.
 *
 * @param inputs - A list of class values (strings, arrays, objects).
 * @returns A string of merged and optimized class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}