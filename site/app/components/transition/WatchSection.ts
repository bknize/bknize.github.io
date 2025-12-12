import type { RefObject } from "react"

export type WatchSection = {
    name: string,
  ref: RefObject<HTMLElement | null>,
  sprite: string,
  paint: string
}