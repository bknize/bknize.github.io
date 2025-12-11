import type { RefObject } from "react"

export type WatchSection = {
  ref: RefObject<HTMLElement | null>,
  sprite: string,
  paint: string
}