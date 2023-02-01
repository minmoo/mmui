import { useRef, useEffect, useContext, Context } from 'react'
import { Options } from '../config/options'
import { ContentComponent, ContextState, LayersContext } from '../Provider'

export function useLayers<P, R>(
  component: ContentComponent<P, R>,
  options?: Partial<Options<R>>,
) {
  const id = useRef<string>()

  const ctx = useContext<ContextState<P, R>>(
    LayersContext as Context<ContextState<P, R>>,
  )

  useEffect(() => {
    id.current = ctx.register(component, options)
    return () => {
      if (id.current) {
        ctx.unregister(id.current)
      }
    }
  }, [])

  const show = async (props?: P): Promise<R | undefined> => {
    if (id.current) {
      return ctx.show(id.current, props)
    } else {
      throw new Error('No Layer Component registered')
    }
  }

  const hide = () => {
    if (id.current) {
      return ctx.hide(id.current)
    } else {
      throw new Error('No Layer Component registered')
    }
  }

  const hideAll = () => {
    ctx.hideAll()
  }

  return { show, hide, hideAll }
}

export function useLayersHide() {
  const ctx = useContext(LayersContext)

  const hideAll = () => {
    ctx.hideAll()
  }

  const hideLatest = () => {
    ctx.hideLatest()
  }

  return { hideAll, hideLatest }
}
