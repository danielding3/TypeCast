// type definitions, for defs that are shared. 

// Camera related types
export type FacingMode = 'environment' | 'user'

// Hand detection types
export interface Point2D {
  x: number,
  y: number
}

export interface Finger {
  base: Point2D,
  joint1: Point2D,
  joint2: Point2D,
  tip: Point2D
}