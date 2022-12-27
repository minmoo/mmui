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
export interface DefaultOptions
  extends Omit<OthersLayerOptions, 'position'>,
    Omit<BottomLayerOptions, 'position'> {
  position: LayerPosition
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

export const defaultOptions: DefaultOptions = {
  position: DEFAULT_VALUE.POSITION,
  dimmed: DEFAULT_VALUE.DIMMED,
  transitionDelay: DEFAULT_VALUE.TRANSITION_DELAY,
  draggable: DEFAULT_VALUE.DRAGGABLE,
  dragOptions: {
    minHeight: DEFAULT_VALUE.MIN_HEIGHT,
    minY: DEFAULT_VALUE.MIN_Y,
  },
  scrollLockElement: DEFAULT_VALUE.SCROLL_LOCK_ELEMENT,
}
