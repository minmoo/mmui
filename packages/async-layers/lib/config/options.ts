export interface DragOptions {
  minHeight: number
  minY: number
}
export type LayerPosition = 'bottom' | 'top' | 'left' | 'right' | 'center'
interface CommonOptions {
  dimmed: boolean
  transitionDelay: number
  scrollLockElement: HTMLElement | null
}
export interface BottomLayerOptions extends CommonOptions {
  position: Extract<LayerPosition, 'bottom'>
  draggable: boolean
  dragOptions: DragOptions
}

interface OthersLayerOptions extends CommonOptions {
  position: Exclude<LayerPosition, 'bottom'>
}

export type Options = OthersLayerOptions | BottomLayerOptions

export const OPTIONS: Options = {
  position: 'bottom',
  dimmed: true,
  transitionDelay: 350,
  draggable: false,
  dragOptions: { minHeight: 300, minY: 80 },
  scrollLockElement: null,
}

export const DEFAULT_VALUE = {
  POSITION: 'bottom' as LayerPosition,
  DIMMED: true,
  TRANSITION_DELAY: 350,
  DRAGGABLE: false,
  MIN_HEIGHT: 300,
  MIN_Y: 80,
  SCROLL_LOCK_ELEMENT: null,
}
