"use client";

/**
 * Hook to detect if component has mounted on the client.
 * Returns false during SSR and true after hydration.
 * Useful for components that need to avoid hydration mismatches.
 */
export function useMounted(): boolean {
  return typeof window !== "undefined";
}
