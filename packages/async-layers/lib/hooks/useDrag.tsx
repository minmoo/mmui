import { MouseEvent, RefObject, TouchEvent, useEffect, useRef } from 'react'
import _ from 'underscore'
import { DEFAULT_VALUE, DragOptions } from '../config/options'
import { isMobile } from '../util/deviceCheck'

const isDragEvent = (e: any): e is DragEvent => {
  return e && ('touches' in e || 'clientY' in e)
}

const isTouchEvent = (e: DragEvent): e is TouchEvent<HTMLDivElement> => {
  return e && 'touches' in e
}

const getClientY = (e: DragEvent) => {
  if (isTouchEvent(e)) {
    return e.touches[0].clientY
  }
  return e.clientY
}

type DragEvent = MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>

const DRAG_INFO_INIT = {
  isDown: false,
  startY: 0,
  startLayerY: 0,
  direction: '',
  prevY: 0,
  prevTransition: '',
  isTouchContentArea: false,
}

export const useDrag = (
  targetRef: RefObject<HTMLElement>,
  contentRef: RefObject<HTMLElement>,
  {
    minHeight = DEFAULT_VALUE.MIN_HEIGHT,
    minY = DEFAULT_VALUE.MIN_Y,
  }: DragOptions,
  enable: boolean,
) => {
  const info = useRef(DRAG_INFO_INIT)
  const options = useRef({ minY: 0, maxY: 0 })

  const setTranslateY = (y: number) => {
    if (targetRef.current) {
      targetRef.current.style.transform = `translateY(${y}px)`
    }
  }

  const canUserMoveBottomSheet = (target: HTMLElement) => {
    const { direction, isTouchContentArea } = info.current

    // 바텀시트에서 컨텐츠 영역이 아닌 부분을 터치하면 항상 바텀시트를 움직입니다.
    if (!isTouchContentArea) {
      return true
    }

    // 바텀시트가 올라와있는 상태가 아닐 때는 컨텐츠 영역을 터치해도 바텀시트를 움직이는 것이 자연스럽습니다.
    if (target.getBoundingClientRect().y !== minY) {
      return true
    }

    if (direction === 'down' && contentRef.current) {
      // 스크롤을 더 이상 올릴 것이 없다면, 바텀시트를 움직이는 것이 자연스럽습니다.
      // Safari 에서는 bounding 효과 때문에 scrollTop 이 음수가 될 수 있습니다. 따라서 0보다 작거나 같음 (<=)으로 검사합니다.
      return contentRef.current.scrollTop <= 0
    }

    return false
  }

  const onDragStart = (e: unknown) => {
    if (!isDragEvent(e)) return

    const target = e.currentTarget
    info.current = _.extend({}, info.current, {
      isDown: true,
      startY: getClientY(e),
      // minY부터 시작하기 때문에 minY를 빼준다.
      startLayerY: target.getBoundingClientRect().y - options.current.minY,
      prevY: getClientY(e),
      prevTransition: getComputedStyle(target).transition,
    })

    target.style.transition = 'none'
  }

  const onDragMove = (e: unknown) => {
    if (!info.current.isDown || !isDragEvent(e) || !contentRef.current) return

    const currentY = getClientY(e)

    //방향설정
    if (info.current.prevY < currentY) {
      info.current.direction = 'down'
    }

    if (info.current.prevY > currentY) {
      info.current.direction = 'up'
    }

    if (canUserMoveBottomSheet(e.currentTarget)) {
      // content에서 scroll이 발생하는 것을 막습니다.
      e.preventDefault()
      // sheet움직일때 scroll이 같이 움직이는걸 막음
      contentRef.current.style.overflow = 'hidden'

      const offsetY = currentY - info.current.startY //움직인 거리
      let nextLayerY = info.current.startLayerY + offsetY

      if (nextLayerY <= 0) {
        nextLayerY = 0
      }
      if (nextLayerY >= options.current.maxY) {
        nextLayerY = options.current.maxY
      }

      setTranslateY(nextLayerY - options.current.minY)
      info.current.prevY = currentY
    }
  }

  const onDragEnd = (e: unknown) => {
    if (!isDragEvent(e) || !targetRef.current || !contentRef.current) return

    const currentSheetY = targetRef.current.getBoundingClientRect().y

    if (currentSheetY !== options.current.minY) {
      if (info.current.direction === 'down') {
        setTranslateY(options.current.maxY)
      }

      if (info.current.direction === 'up') {
        setTranslateY(0)
      }
    }

    //초기화
    contentRef.current.style.overflow = 'auto'
    targetRef.current.style.transition = info.current.prevTransition
    info.current = DRAG_INFO_INIT
  }

  const onContentTouchStart = () => {
    info.current.isTouchContentArea = true
  }

  useEffect(() => {
    if (!targetRef.current || !contentRef.current || !enable) return
    options.current = {
      minY,
      maxY: window?.innerHeight - minHeight,
    }

    const target = targetRef.current
    const content = contentRef.current
    if (isMobile()) {
      target.addEventListener('touchstart', onDragStart)
      target.addEventListener('touchmove', onDragMove)
      target.addEventListener('touchend', onDragEnd)
      content.addEventListener('touchstart', onContentTouchStart)
    } else {
      target.addEventListener('mousedown', onDragStart)
      target.addEventListener('mousemove', onDragMove)
      target.addEventListener('mouseup', onDragEnd)
      target.addEventListener('mouseleave', onDragEnd)
    }

    return () => {
      if (isMobile()) {
        target.removeEventListener('touchstart', onDragStart)
        target.removeEventListener('touchmove', onDragMove)
        target.removeEventListener('touchend', onDragEnd)
        content.removeEventListener('touchstart', onContentTouchStart)
      } else {
        target.removeEventListener('mousedown', onDragStart)
        target.removeEventListener('mousemove', onDragMove)
        target.removeEventListener('mouseup', onDragEnd)
        target.removeEventListener('mouseleave', onDragEnd)
      }
    }
  }, [])
}
