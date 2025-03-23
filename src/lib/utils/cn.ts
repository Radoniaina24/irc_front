import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combine et optimise les classes Tailwind CSS
 * @param inputs - Liste de classes CSS
 * @returns Une chaîne de classes optimisée
 */
export function cn(...inputs: (string | undefined | null | boolean)[]) {
  return twMerge(clsx(inputs));
}
