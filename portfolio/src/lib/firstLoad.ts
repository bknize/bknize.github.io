import { useEffect, useState } from "react";

let hasMounted = false;

/**
 * True on the very first page render of the session, false after any
 * client-side navigation. Lets load-time intros (hero plates, staged hero
 * reveal) run immediately on a cold load but wait for the plate wipe to
 * uncover the page after a route change.
 */
export function useIsFirstLoad(): boolean {
  const [first] = useState(() => !hasMounted);
  useEffect(() => {
    hasMounted = true;
  }, []);
  return first;
}
