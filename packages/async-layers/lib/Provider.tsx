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
import { OPTIONS, Options } from './config/options'
import { Layout } from './Layout'

export interface ContentProps<Props = void, Response = undefined> {
  open: boolean
  onClose: (response?: Response) => void
  props: Props
}

export type ContentComponent<P, R> = ComponentType<ContentProps<P, R>>

interface Layer {
  component: ContentComponent<unknown, unknown>
  isOpen: boolean
  options: Options
  props?: unknown
  resolve?: (value: unknown) => void
}

export interface ContextState<P, R> {
  register: (obj: ContentComponent<P, R>, opts?: Partial<Options>) => string
  unregister: (id: string) => void
  show: (id: string, props?: P) => Promise<R | undefined>
  hide: (id: string) => void
  hideAll: () => void
  hideLatest: () => void
  updateProps: (id: string, props: unknown) => void
}

export const LayerContext = createContext<ContextState<unknown, unknown>>({
  register: () => '',
  unregister: () => undefined,
  show: async () => undefined,
  hide: () => undefined,
  hideAll: () => undefined,
  hideLatest: () => undefined,
  updateProps: () => undefined,
})

interface ProviderProps {
  children: ReactNode
  options?: Partial<Options>
}

const defaultOptions = OPTIONS

const layerMap = new Map<string, Layer>()

/**
 * 전역 변수를 활용한 Provider
 * @param param0
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
        const latest = _.find(
          [...layerMap].reverse(),
          (arr) => arr[1].isOpen === true,
        )
        if (latest) {
          const id = latest[0]
          context.hide(id)
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
    }),
    [forceUpdate],
  )

  useEffect(() => {
    if (options) {
      _.extend(defaultOptions, options)
    }
  }, [options])

  return (
    <LayerContext.Provider value={context}>
      {children}
      {[...layerMap].map(([key, layer]) => {
        const { component: C, isOpen, props, resolve, options } = layer
        if (resolve) {
          const onClose = (value: unknown) => {
            context.hide(key)
            resolve(value)
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
    </LayerContext.Provider>
  )
}

/**
 * State를 활용한 Provider
 * @param param0
 */
export const BottomSheetProvider2 = ({ children, options }: ProviderProps) => {
  const [layers, setLayers] = useState<{
    [key: string]: Layer
  }>({})

  //Layer이 뜬 순서를 기억하기 위해서 사용(선언과 순서를 다르게 하면 안맞기 떄문)
  const [orders, setOrders] = useState<string[]>([])
  const uniqueId = useRef(0)
  const latestId = useRef('')

  const getUniqueId = () => {
    const id = uniqueId.current
    uniqueId.current++
    return id
  }

  const context: ContextState<unknown, unknown> = useMemo(
    () => ({
      register(component, opts) {
        const options = _.extend({}, defaultOptions, opts)
        const item = {
          component,
          options,
          isOpen: false,
        }

        const id = getUniqueId()

        setLayers((layers) => ({ ...layers, [id]: item }))
        return String(id)
      },

      unregister(id) {
        setOrders((orders) => orders.filter((order) => order !== id))
        setLayers(({ [id]: _, ...rest }) => rest)
      },

      show(id, props) {
        latestId.current = id
        setOrders((orders) => orders.filter((order) => order !== id).concat(id))
        return new Promise((resolve) => {
          setLayers((layers) => ({
            ...layers,
            [id]: { ...layers[id], props, isOpen: true, resolve } as Layer,
          }))
        })
      },

      hide(id) {
        setLayers((layers) => ({
          ...layers,
          [id]: { ...layers[id], isOpen: false } as Layer,
        }))
      },

      hideLatest() {
        setLayers((layers) => ({
          ...layers,
          [latestId.current]: {
            ...layers[latestId.current],
            isOpen: false,
          } as Layer,
        }))
      },

      hideAll() {
        setLayers((layers) =>
          _.mapObject(layers, (val) => {
            return { ...val, isOpen: false }
          }),
        )
      },

      updateProps(id, props) {
        setLayers((layers) => ({
          ...layers,
          [id]: { ...layers[id], props } as Layer,
        }))
      },
    }),
    [],
  )

  useEffect(() => {
    if (options) {
      _.extend(defaultOptions, options)
    }
  }, [options])

  return (
    <LayerContext.Provider value={context}>
      {children}
      {orders.map((id) => {
        const {
          component: C,
          isOpen,
          props,
          resolve,
          options,
        } = layers[id] as Layer
        if (resolve) {
          const onClose = (value: unknown) => {
            context.hide(id)
            resolve(value)
          }

          return (
            <Layout key={id} open={isOpen} onClose={onClose} options={options}>
              <C open={isOpen} onClose={onClose} props={props} />
            </Layout>
          )
        } else {
          return null
        }
      })}
    </LayerContext.Provider>
  )
}
