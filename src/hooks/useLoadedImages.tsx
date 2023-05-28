import { useEffect, useLayoutEffect } from 'react'
import { useAppDispatch, useAppSelector } from './Redux'
import { multipleAdd, removeAll, setLoaded } from '../redux/reducer/imagesLoaded'
import { setTrue } from '../redux/reducer/allImagesLoaded'

export function useLoadImage () {
  const imagesLoaded = useAppSelector(s => s.imagesLoaded)
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
    let imgLen = imagesLoaded.length
    let imgLoadedLen = imagesLoaded.filter(e => e.loaded).length
    imgLoadedLen = imgLen === 0 ? 1 : imgLoadedLen
    imgLen = imgLen === 0 ? 1 : imagesLoaded.length
    const percentage = imgLoadedLen / imgLen * 100

    const loader = document.querySelector('.loader-background .loader-container .loader') as HTMLDivElement

    loader.style.width = `${percentage}%`
    if (imagesLoaded.length > 0 && imagesLoaded.every(e => e.loaded)) {
      setTimeout(() => {
        setTrue()
        document.body.style.overflow = 'initial'
      }, 1250)
    }
  }, [imagesLoaded])
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
