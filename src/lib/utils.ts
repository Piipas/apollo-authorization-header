import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getObjectProperty = (obj: Record<string, never>, path: string) =>
  path.split(".").reduce((acc, key) => acc?.[key], obj as Record<string, never>);
