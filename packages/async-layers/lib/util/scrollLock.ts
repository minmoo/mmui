let scrollTop = 0
let locked = false
let prevStyle = {
  position: 'static',
  top: 'auto',
  left: 'auto',
  right: 'auto',
  overflow: 'visible',
}

export const lockScroll = (el: HTMLElement | null) => {
  if (locked) return

  const target = el ?? document.getElementsByTagName('body')[0]
  scrollTop =
    typeof window.pageYOffset !== 'undefined'
      ? window.pageYOffset
      : (document.documentElement || document.body).scrollTop

  prevStyle = {
    position: target.style.position || 'static',
    top: target.style.top || 'auto',
    left: target.style.left || 'auto',
    right: target.style.right || 'auto',
    overflow: target.style.overflow,
  }

  target.style.position = 'fixed'
  target.style.top = `-${scrollTop}px`
  target.style.left = '0px'
  target.style.right = '0px'
  //desktop에서 scroll이 사라지면 width가 변하는 것을 막기위해
  target.style.overflow = 'scroll'

  locked = true
}

export const unlockScroll = (el: HTMLElement | null) => {
  if (!locked) return
  const target = el ?? document.getElementsByTagName('body')[0]
  target.style.position = prevStyle.position
  target.style.top = prevStyle.top
  target.style.left = prevStyle.left
  target.style.right = prevStyle.right
  target.style.overflow = prevStyle.overflow

  window.scrollTo(0, scrollTop ?? 0)

  scrollTop = 0
  locked = false
}
