import {
  ComponentType,
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import _ from 'underscore'
import { defaultOptions, DefaultOptions, Options } from './config/options'

import { Layout } from './Layout'

export interface ContentProps<Props = void, Response = undefined> {
  open: boolean
  onClose: (response?: Response) => void
  props: Props
}

export type ContentComponent<P, R> = ComponentType<ContentProps<P, R>>

export interface Layer {
  component: ContentComponent<unknown, unknown>
  isOpen: boolean
  options: DefaultOptions
  props?: unknown
  resolve?: (value: unknown) => void
}

export interface ContextState<P, R> {
  register: (obj: ContentComponent<P, R>, opts?: Partial<Options<R>>) => string
  unregister: (id: string) => void
  show: (id: string, props?: P) => Promise<R | undefined>
  hide: (id: string) => void
  hideAll: () => void
  hideLatest: () => void
  updateProps: (id: string, props: unknown) => void
  getOpenLayers: () => Array<[string, Layer]>
}

export const LayersContext = createContext<ContextState<unknown, unknown>>({
  register: () => '',
  unregister: () => undefined,
  show: async () => undefined,
  hide: () => undefined,
  hideAll: () => undefined,
  hideLatest: () => undefined,
  updateProps: () => undefined,
  getOpenLayers: () => [],
})

interface ProviderProps {
  children: ReactNode
  options?: Partial<Options<unknown>>
}
const layerMap = new Map<string, Layer>()

/**
 * 전역 변수를 활용한 Provider
 * @param options
 */
export const Provider = ({ children, options }: ProviderProps) => {
  const forceUpdate = useState({})[1]
  const uniqueId = useRef(0)

  const getUniqueId = () => {
    const id = uniqueId.current
    uniqueId.current++
    return String(id)
  }

  const context: ContextState<unknown, unknown> = useMemo(
    () => ({
      register(component, opts) {
        const options = _.extend({}, defaultOptions, opts)
        const layer = {
          component,
          options,
          isOpen: false,
        }

        const id = getUniqueId()
        layerMap.set(id, layer)
        forceUpdate({})
        return id
      },

      unregister(id) {
        layerMap.delete(id)
        forceUpdate({})
      },

      show(id, props) {
        return new Promise((resolve) => {
          const layer = {
            ...layerMap.get(id),
            isOpen: true,
            props,
            resolve,
          } as Layer
          //순서 바꾸기
          layerMap.delete(id)
          layerMap.set(id, layer)
          forceUpdate({})
        })
      },

      hide(id) {
        layerMap.set(id, { ...layerMap.get(id), isOpen: false } as Layer)
        forceUpdate({})
      },

      hideLatest() {
        const latestLayer = _.last(context.getOpenLayers())
        if (latestLayer) {
          context.hide(latestLayer[0])
        }
      },

      hideAll() {
        layerMap.forEach((layer) => {
          layer.isOpen = false
        })
        forceUpdate({})
      },

      updateProps(id, props) {
        layerMap.set(id, { ...layerMap.get(id), props } as Layer)
        forceUpdate({})
      },

      getOpenLayers() {
        return _.filter([...layerMap], (arr) => arr[1].isOpen === true)
      },
    }),
    [forceUpdate],
  )

  useEffect(() => {
    if (options) {
      _.extend(defaultOptions, options)
    }
  }, [options])

  return (
    <LayersContext.Provider value={context}>
      {children}
      {[...layerMap].map(([key, layer]) => {
        const { component: C, isOpen, props, resolve, options } = layer
        if (resolve) {
          const onClose = async (value: unknown) => {
            let layerClose = true
            if (_.isFunction(options.onClose)) {
              layerClose = await options.onClose(value)
            }

            if (layerClose) {
              context.hide(key)
              resolve(value)
            }
          }

          return (
            <Layout key={key} open={isOpen} onClose={onClose} options={options}>
              <C open={isOpen} onClose={onClose} props={props} />
            </Layout>
          )
        } else {
          return null
        }
      })}
    </LayersContext.Provider>
  )
}
