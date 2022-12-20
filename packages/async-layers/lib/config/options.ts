export interface DragOptions {
  minHeight: number
  minY: number
}

export interface Options {
  type: 'dialog' | 'bottomsheet'
  dimmed: boolean
  transitionDelay: number
  draggable: boolean
  dragOptions: DragOptions
  scrollLockElement: HTMLElement | null
}

export const OPTIONS: Options = {
  type: 'bottomsheet',
  dimmed: true,
  transitionDelay: 350,
  draggable: false,
  dragOptions: { minHeight: 300, minY: 80 },
  scrollLockElement: null,
}
