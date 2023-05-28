import React from 'react'
import useDynamicSVGImport from '../hooks/useDynamicSVGImport'
import { useLoadImageHelpers } from '../hooks/useLoadedImages'

interface ExtraTypes {
  className?: string
  svgName: string
  id: string
}

export default function DynamicSVG ({ className, svgName, id, ...props }: Omit<React.SVGProps<SVGSVGElement>, 'onLoad'> & ExtraTypes) {
  const { onLoad } = useLoadImageHelpers()
  const { SVG } = useDynamicSVGImport(svgName, () => { onLoad(id) })

  if (SVG == null) return <svg className={`img-to-load ${className ?? ''}`} id={id}></svg>

  return (
    <SVG className={`img-to-load ${className ?? ''}`} {...props} />
  )
}
