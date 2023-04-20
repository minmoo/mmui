import { useRef, useEffect, useContext, Context, useMemo } from 'react'
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

  const response = useMemo(
    () => ({
      async show(props?: P): Promise<R | undefined> {
        if (id.current) {
          return ctx.show(id.current, props)
        } else {
          throw new Error('No Layer Component registered')
        }
      },

      hide() {
        if (id.current) {
          return ctx.hide(id.current)
        } else {
          throw new Error('No Layer Component registered')
        }
      },

      hideAll() {
        ctx.hideAll()
      },
    }),
    [ctx],
  )

  useEffect(() => {
    id.current = ctx.register(component, options)
    return () => {
      if (id.current) {
        ctx.unregister(id.current)
      }
    }
  }, [])

  return response
}

export function useLayersUtils() {
  const ctx = useContext(LayersContext)

  const response = useMemo(
    () => ({
      hideLatest() {
        ctx.hideLatest()
      },

      hideAll() {
        ctx.hideAll()
      },

      getOpenLayers() {
        return ctx.getOpenLayers()
      },
    }),
    [ctx],
  )

  return response
}
