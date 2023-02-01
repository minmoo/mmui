export interface DragOptions {
  minHeight: number
  minY: number
}
export type LayerPosition = 'bottom' | 'top' | 'left' | 'right' | 'center'
export type DimmedType = 'show' | 'hide' | 'closeable'

export const CLOSE_TYPE = {
  DIMMED: 'dimmed',
  BACK: 'back',
  CUSTOM: 'custom',
} as const
export type CloseType = typeof CLOSE_TYPE[keyof typeof CLOSE_TYPE]
interface CommonOptions<R = undefined> {
  dimmedType: DimmedType
  transitionDelay: number
  scrollLockElement: HTMLElement | null
  onClose?: (value: R | CloseType) => Promise<boolean> | boolean
}
export interface BottomLayerOptions<R> extends CommonOptions<R> {
  position: Extract<LayerPosition, 'bottom'>
  draggable: boolean
  dragOptions: DragOptions
}

interface OthersLayerOptions<R> extends CommonOptions<R> {
  position: Exclude<LayerPosition, 'bottom'>
}

export type Options<R> = OthersLayerOptions<R> | BottomLayerOptions<R>
export interface DefaultOptions
  extends Omit<OthersLayerOptions<unknown>, 'position'>,
    Omit<BottomLayerOptions<unknown>, 'position'> {
  position: LayerPosition
}

export const DEFAULT_VALUE = {
  POSITION: 'bottom' as LayerPosition,
  DIMMED_TYPE: 'closeable' as DimmedType,
  TRANSITION_DELAY: 350,
  DRAGGABLE: false,
  MIN_HEIGHT: 300,
  MIN_Y: 80,
  SCROLL_LOCK_ELEMENT: null,
}

export const defaultOptions: DefaultOptions = {
  position: DEFAULT_VALUE.POSITION,
  dimmedType: DEFAULT_VALUE.DIMMED_TYPE,
  transitionDelay: DEFAULT_VALUE.TRANSITION_DELAY,
  draggable: DEFAULT_VALUE.DRAGGABLE,
  dragOptions: {
    minHeight: DEFAULT_VALUE.MIN_HEIGHT,
    minY: DEFAULT_VALUE.MIN_Y,
  },
  scrollLockElement: DEFAULT_VALUE.SCROLL_LOCK_ELEMENT,
}
