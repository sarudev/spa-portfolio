import React from 'react'
import useDynamicSVGImport from '../../hooks/useDynamicSVGImport'

interface ExtraTypes {
  onLoad: (id: string) => void
  svgName: string
}

export default function DynamicSVG ({ svgName, onLoad, ...props }: Omit<React.SVGProps<SVGSVGElement>, 'onLoad'> & ExtraTypes) {
  const { SVG } = useDynamicSVGImport(svgName, () => { onLoad(props.id!) })

  if (SVG == null) return <svg className={`img-to-load ${props.className ?? ''}`} id={props.id}></svg>

  return (
    <SVG className={`img-to-load ${props.className ?? ''}`} {...props} />
  )
}
