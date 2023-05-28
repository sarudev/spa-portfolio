import { useEffect, useLayoutEffect } from 'react'
import { useAppDispatch, useAppSelector } from './Redux'
import { multipleAdd, removeAll, setLoaded } from '../redux/reducer/imagesLoaded'
import { setTrue } from '../redux/reducer/allImagesLoaded'

export function useLoadImage () {
  const imagesLoaded = useAppSelector(s => s.imagesLoaded)
  const allImagesLoaded = useAppSelector(s => s.allImagesLoaded)
  const dispatch = useAppDispatch()

  useLayoutEffect(() => {
    document.body.style.overflow = 'hidden'

    const imgs = document.querySelectorAll('.img-to-load')
    dispatch(multipleAdd([...imgs].map(item => item.id)))

    return () => {
      dispatch(removeAll())
    }
  }, [])

  useEffect(() => {
    const loader = document.querySelector('.progress-bar-outer-container .progress-bar') as HTMLDivElement

    let imgLen = imagesLoaded.length
    let imgLoadedLen = imagesLoaded.filter(e => e.loaded).length
    imgLoadedLen = imgLen === 0 ? 1 : imgLoadedLen
    imgLen = imgLen === 0 ? 1 : imagesLoaded.length
    const percentage = imgLoadedLen / imgLen * 100

    loader.style.setProperty('--progress-bar-width-percentage', `${percentage}%`)

    if (imagesLoaded.length > 0 && imagesLoaded.every(e => e.loaded)) {
      dispatch(setTrue())
    }
  }, [imagesLoaded])

  useEffect(() => {
    if (allImagesLoaded) {
      const loaderContainer = document.querySelector('.progress-bar-outer-container') as HTMLDivElement

      loaderContainer.classList.add('preloaded')

      setTimeout(() => {
        document.body.style.overflow = 'initial'
        loaderContainer.classList.remove('preloaded')
        loaderContainer.classList.add('loaded')
      }, 1250)
    }
  }, [allImagesLoaded])
}

export function useLoadImageHelpers () {
  const imagesLoaded = useAppSelector(s => s.imagesLoaded)
  const allImagesLoaded = useAppSelector(s => s.allImagesLoaded)
  const dispatch = useAppDispatch()

  const onLoad = (id: string) => {
    dispatch(setLoaded(id))
  }

  return { onLoad, imagesLoaded, allImagesLoaded }
}
