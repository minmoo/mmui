<hr>
<div align="center">
  <h1 align="center">
    useLayers()
  </h1>
</div>

<pre align="center">npm i @minmoo/async-layers</pre>
<hr>

## Basic Example

```tsx
import { AsyncLayersProvider, useLayers } from '@minmoo/async-layers'

export default function App() {
  return (
    <AsyncLayersProvider>
      <Example />
    </AsyncLayersProvider>
  )
}

function Example() {
  const { show } = useLayers(Content)
  return (
    <div>
      <h2>Example</h2>
      <button onClick={() => show()}>show</button>
    </div>
  )
}

function Content() {
  return <h2>Content</h2>
}
```

## Options

default options

```tsx
<AsyncLayersProvider
  options={{
    position: 'bottom', // component position: 'top', 'bottom', 'left', 'right', 'center'
    dimmed: true, // dimmed background
    transitionDelay: 350, // component animation time(ms)
    draggable: false, //only position bottom has draggable option
    dragOptions: {
      minHeight: 300, // size when the component is first shown
      minY: 80, // maximum draggable position
    },
    scrollLockElement: null, // background scroll lock element. (default: body)
  }}
>
  {children}
</AsyncLayersProvider>

useLayers(component, options)
```
