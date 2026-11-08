"use client";

import { useSyncExternalStore } from "react";
import { getMotion, getServerMotion, subscribeMotion } from "./motion-store";

export function useMotion() {
  const enabled = useSyncExternalStore(subscribeMotion, getMotion, getServerMotion);
  return { enabled };
}
