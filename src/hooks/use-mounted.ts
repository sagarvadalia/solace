"use client";

import { useEffect, useState } from "react";

/**
 * Hook to detect if component has mounted on the client.
 * Returns false during SSR and true after hydration.
 * Useful for components that need to avoid hydration mismatches.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return mounted;
}
