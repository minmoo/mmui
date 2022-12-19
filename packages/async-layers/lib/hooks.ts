import { useRef, useEffect, useContext, Context } from 'react'
import { Options } from './options'
import { ContentComponent, ContextState, LayerContext } from './Provider'

export function useBottomSheet<P, R>(
  component: ContentComponent<P, R>,
  options?: Partial<Options>,
) {
  const id = useRef<string>()

  const ctx = useContext<ContextState<P, R>>(
    LayerContext as Context<ContextState<P, R>>,
  )

  useEffect(() => {
    id.current = ctx.register(component, options)
    return () => {
      if (id.current) {
        ctx.unregister(id.current)
      }
    }
  }, [])

  const show = async (props: P): Promise<R | undefined> => {
    if (id.current) {
      return ctx.show(id.current, props)
    } else {
      throw new Error('No BottomSheet Component registered')
    }
  }

  const hide = () => {
    if (id.current) {
      return ctx.hide(id.current)
    } else {
      throw new Error('No BottomSheet Component registered')
    }
  }

  const hideAll = () => {
    ctx.hideAll()
  }

  return { show, hide, hideAll }
}

export function useBottomSheetHide() {
  const ctx = useContext(LayerContext)

  const hideAll = () => {
    ctx.hideAll()
  }

  const hideLatest = () => {
    ctx.hideLatest()
  }

  return { hideAll, hideLatest }
}
