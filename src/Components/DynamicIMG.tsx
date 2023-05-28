import React from 'react'
import { useLoadImageHelpers } from '../hooks/useLoadedImages'

interface ExtraTypes {
  className?: string
  src: string
  id: string
}

export default function DynamicIMG ({ className, src, id, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & ExtraTypes) {
  const { onLoad } = useLoadImageHelpers()

  return (
    <img src={src} className={`img-to-load ${className ?? ''}`} id={id} {...props} onLoad={(e) => { onLoad(e.currentTarget.id) }}/>
  )
}
