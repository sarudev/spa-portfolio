import React from 'react'
import { Background } from '../App'

const style: React.CSSProperties = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  minHeight: 'max-content',
  padding: '50px'
}

export default function Section ({ name, children, styles, bg }: { name: string, children: React.ReactElement | never[], styles?: React.CSSProperties, bg?: string }): React.ReactElement {
  return (
    <div style={{ ...style, ...styles }} id={name} className="section">
      {bg != null && <Background img={bg}/>}
      {children}
    </div>
  )
}
