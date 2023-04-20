import React, { type ForwardedRef, forwardRef } from 'react'
import '../styles/observer.scss'

export const Observer = forwardRef((props, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <div className='observer' ref={ref}/>
  )
})
