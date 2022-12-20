import { MouseEvent, RefObject, TouchEvent, useEffect, useRef } from 'react'
import _ from 'underscore'
import { DragOptions, OPTIONS } from '../config/options'
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
}

export const useDrag = (
  targetRef: RefObject<HTMLElement>,
  {
    minHeight = OPTIONS.dragOptions.minHeight,
    minY = OPTIONS.dragOptions.minY,
  }: DragOptions,
) => {
  const info = useRef(DRAG_INFO_INIT)
  const options = useRef({ minY: 0, maxY: 0 })

  const setTranslateY = (y: number) => {
    if (targetRef.current) {
      targetRef.current.style.transform = `translateY(${y}px)`
    }
  }

  const onDragStart = (e: any) => {
    if (isDragEvent(e)) {
      const target = e.currentTarget
      info.current = _.extend({}, info.current, {
        isDown: true,
        startY: getClientY(e),
        startLayerY: target.getBoundingClientRect().y,
        prevY: getClientY(e),
        prevTransition: getComputedStyle(target).transition,
      })

      target.style.transition = 'none'
    }
  }

  const onDragMove = (e: any) => {
    if (!info.current.isDown) return
    e.preventDefault()
    if (isDragEvent(e)) {
      const currentY = getClientY(e)

      //방향설정
      if (info.current.prevY < currentY) {
        info.current.direction = 'down'
      }

      if (info.current.prevY > currentY) {
        info.current.direction = 'up'
      }

      const offsetY = currentY - info.current.startY //움직인 거리
      let nextLayerY = info.current.startLayerY + offsetY

      if (nextLayerY <= options.current.minY) {
        nextLayerY = options.current.minY
      }
      if (nextLayerY >= options.current.maxY) {
        nextLayerY = options.current.maxY
      }

      setTranslateY(nextLayerY - options.current.minY)
      info.current.prevY = currentY
    }
  }

  const onDragEnd = (e: any) => {
    if (isDragEvent(e) && targetRef.current) {
      const currentSheetY = targetRef.current.getBoundingClientRect().y

      if (currentSheetY !== options.current.maxY) {
        if (info.current.direction === 'down') {
          setTranslateY(options.current.maxY)
        }

        if (info.current.direction === 'up') {
          setTranslateY(0)
        }
      }

      //초기화
      targetRef.current.style.transition = info.current.prevTransition
      info.current = DRAG_INFO_INIT
    }
  }

  useEffect(() => {
    if (!targetRef.current) return
    options.current = {
      minY,
      maxY: window?.innerHeight - minHeight,
    }

    const target = targetRef.current
    if (isMobile()) {
      target.addEventListener('touchstart', onDragStart)
      target.addEventListener('touchmove', onDragMove)
      target.addEventListener('touchend', onDragEnd)
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
      } else {
        target.removeEventListener('mousedown', onDragStart)
        target.removeEventListener('mousemove', onDragMove)
        target.removeEventListener('mouseup', onDragEnd)
        target.removeEventListener('mouseleave', onDragEnd)
      }
    }
  }, [])
}
