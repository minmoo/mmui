import _ from 'underscore'

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

  scrollTop =
    typeof window.pageYOffset !== 'undefined'
      ? window.pageYOffset
      : (document.documentElement || document.body).scrollTop
  const isBody = _.isEmpty(el) || _.isNull(el)
  const target = isBody ? document.getElementsByTagName('body')[0] : el

  prevStyle = {
    position: target.style.position || 'static',
    top: target.style.top || 'auto',
    left: target.style.left || 'auto',
    right: target.style.right || 'auto',
    overflow: target.style.overflow,
  }

  target.style.position = 'fixed'
  target.style.left = '0px'
  target.style.right = '0px'
  target.style.overflow = 'auto'

  if (isBody) {
    target.style.top = `-${scrollTop}px`
  } else {
    target.style.top = `0px` // moving scrollTo! no Top
    target.style.height = `${document.body.clientHeight}px` //height for scroll
    if (scrollTop > 0) {
      target.scrollTo(0, scrollTop)
    }
  }

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
  target.style.height = '' //reset height

  window.scrollTo(0, scrollTop ?? 0)

  scrollTop = 0
  locked = false
}
