import React, { type ForwardedRef, forwardRef } from 'react'
import { Background } from '../App'

interface SectionI {
  name: string
  children: React.ReactElement | never[]
  style?: React.CSSProperties
  bg?: string
}

export default forwardRef(({ name, children, style, bg }: SectionI, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <div ref={ref} style={style} id={name} className="section">
      {bg != null && <Background img={bg}/>}
      {children}
    </div>
  )
})
