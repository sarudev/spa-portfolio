import React from 'react'
import { Background } from '../App'

interface SectionI {
  name: string
  children: React.ReactElement | never[]
  style?: React.CSSProperties
  bg?: string
}

export default function Section ({ name, children, style, bg }: SectionI): React.ReactElement {
  return (
    <div style={style} id={name} className="section">
      {bg != null && <Background img={bg}/>}
      {children}
    </div>
  )
}
