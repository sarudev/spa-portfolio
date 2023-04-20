import { type RefObject, useCallback, useEffect } from 'react'
import clamp from '../Helpers/Clamp'

interface IuseObserverOptions {
  threshold: number
}

export default function useObserver (observer: RefObject<HTMLElement>, toObserve: Array<RefObject<HTMLElement>>, options?: IuseObserverOptions) {
  useEffect(() => {
    function observerFunc () {
      let lastIntersected: HTMLElement
      const observing = toObserve.map(e => e.current!)

      const scroll = (): void => {
        const { top: y } = getCoords(observer.current!)

        const threshold = clamp(0, options?.threshold ?? 75, 100)

        const yDetection = y + observer.current!.clientHeight * threshold / 100

        const coords = observing.map((elem, i) => {
          elem.dataset.observerId = i.toString()

          return { top: getCoords(elem).top, bot: getCoords(elem).top + elem.clientHeight, target: elem }
        })

        const entries = coords.map((vec, i) => {
          const isIntersecting = yDetection > vec.top && yDetection < vec.bot
          if (isIntersecting) lastIntersected = vec.target

          return { target: vec.target, isIntersecting, wasIntercepted: lastIntersected?.dataset.observerId === vec.target.dataset.observerId }
        })

        window.dispatchEvent(new CustomEvent('observer', { detail: entries }))
      }

      scroll()

      return scroll
    }

    const scroll = observerFunc()

    window.addEventListener('scroll', scroll)

    return () => {
      window.removeEventListener('scroll', scroll)
    }
  }, [])

  const getCoords = useCallback((elem: HTMLElement): { top: number, left: number } => {
    const box = elem.getBoundingClientRect()

    const body = document.body
    const docEl = document.documentElement

    const scrollTop = window.pageYOffset ?? docEl.scrollTop ?? body.scrollTop
    const scrollLeft = window.pageXOffset ?? docEl.scrollLeft ?? body.scrollLeft

    const clientTop = docEl.clientTop ?? body.clientTop ?? 0
    const clientLeft = docEl.clientLeft ?? body.clientLeft ?? 0

    const top = box.top + scrollTop - clientTop
    const left = box.left + scrollLeft - clientLeft

    return { top: Math.round(top), left: Math.round(left) }
  }, [])
}
