declare module 'canvas-confetti' {
  export interface Options {
    particleCount?: number
    angle?: number
    spread?: number
    startVelocity?: number
    decay?: number
    gravity?: number
    drift?: number
    ticks?: number
    origin?: {
      x?: number
      y?: number
    }
    colors?: string[]
    shapes?: ('circle' | 'square' | 'triangle' | 'star' | 'rect')[]
    zIndex?: number
    disableForReducedMotion?: boolean
    scalar?: number
  }

  export interface CreateTypes {
    (opts?: Options): void | Promise<void>
    promise(opts?: Options): Promise<void>
  }

  export function create(
    global?: boolean,
    defaults?: Options
  ): CreateTypes

  export default function(opts?: Options): void | Promise<void>
}
