import React, { useEffect, useState, useCallback } from 'react'
import Navigate from './Navigate'

export default function NavBar (): React.ReactElement {
  const [currentElem, setCurrentElem] = useState<string>('')
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    window.addEventListener('observer', (e: CustomEventInit<Array<{ target: HTMLElement, isIntersecting: boolean, wasIntercepted: boolean }>>) => {
      const entries = e.detail!

      entries.forEach(elem => {
        if (elem.isIntersecting) setCurrentElem(elem.target.id)
      })
    })

    return () => {
      // observer.unobserve($('#Home')!)
      // observer.unobserve($('#About')!)
      // observer.unobserve($('#Skills')!)
      // observer.unobserve($('#Projects')!)
      // observer.unobserve($('#Contact')!)
    }
  }, [])

  const hack = useCallback(({ event, originalString, origin }: { event?: React.MouseEvent<HTMLSpanElement, MouseEvent>, originalString: string, origin?: HTMLSpanElement }) => {
    const letters = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz'
    let iteration = 0
    const interval = setInterval(() => {
      if (origin == null && event == null) throw new Error('Event not specified')

      let span: HTMLSpanElement
      if (origin != null) span = origin
      else span = event!.target as HTMLSpanElement
      span.innerText = span.innerText.split('').map((l, i) => {
        if (i < iteration) {
          return originalString[i]
        }

        return letters[Math.floor(Math.random() * letters.length)]
      }).join('')

      if (iteration >= originalString.length) clearInterval(interval)

      iteration += 1 / 2
    }, 50)
  }, [])

  return (
    <div className={`nav-container ${currentElem === 'Home' ? 'home' : ''}`}>
      <div className="nav">
        <Hamburger opened={opened} setOpened={setOpened}/>
        <div className="logo">
          <span>{'<'}</span>
          <span onMouseEnter={(e) => { hack({ event: e, originalString: 'Sarudev' }) }}>{'Sarudev'}</span>
          <span>{'/>'}</span>
        </div>

        <div className={`navigation ${opened ? 'opened' : ''}`}>
          <Navigate hack={hack} active={currentElem === 'Home'} name="Home" />
          <Navigate hack={hack} active={currentElem === 'About'} name="About" />
          <Navigate hack={hack} active={currentElem === 'Skills'} name="Skills" />
          <Navigate hack={hack} active={currentElem === 'Projects'} name="Projects" />
          <Navigate hack={hack} active={currentElem === 'Contact'} name="Contact" />
        </div>
      </div>
    </div>
  )
}

function Hamburger ({ opened, setOpened }: { opened: boolean, setOpened: React.Dispatch<React.SetStateAction<boolean>> }): React.ReactElement {
  return (
    <div className={`hamburger ${opened ? 'opened' : ''}`} onClick={(e) => { setOpened(prev => !prev) }}>
      <div className="top"></div>
      <div className="mid"></div>
      <div className="bot"></div>
    </div>
  )
}
