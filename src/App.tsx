import React, { type ReactElement, useEffect, useState, useCallback, useRef } from 'react'
import type { Engine, RecursivePartial, IOptions } from 'tsparticles-engine'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import particles from './assets/particles.json'
import axios from 'axios'

const $ = (selector: string): Element => document.querySelector(selector)!

function Navigate ({ name, active, hack }: { name: string, active: boolean, hack: ({ event, originalString, origin }: { event?: React.MouseEvent<HTMLSpanElement, MouseEvent> | undefined, originalString: string, origin?: HTMLSpanElement | undefined }) => void }): React.ReactElement {
  const ref = useRef<HTMLSpanElement>(null)

  return (
    <a
      id={`btn-${name}`}
      style={{ width: `calc(${name.length}ch + 4ch)` }}
      className={`navigate ${active ? 'active' : ''}`}
      onClick={event => {
        $(`#${name}`).scrollIntoView({ behavior: 'smooth', block: 'end' })
      }}
      onMouseEnter={(e) => { hack({ originalString: name, origin: ref.current! }) }}
    >
      <span ref={ref}>{name}</span>
      <div style={{ width: `${name.length}ch` }} className='hover'/>
    </a>
  )
}

function Section ({ name, children }: { name: string, children: ReactElement | never[] }): React.ReactElement {
  return (
    <div id={name} className="section">{children}</div>
  )
}

function App (): React.ReactElement {
  const [loading, setLoading] = useState(true)
  const [currentElem, setCurrentElem] = useState<string>('')
  const [profPicURL, setProfPicURL] = useState<string>('')

  useEffect(() => {
    void axios.get('http://localhost:3000/ds/profpic/999693766313123860').then(res => {
      setProfPicURL(res.data)
      setLoading(false)
    })

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(elem => {
        if (elem.isIntersecting) setCurrentElem(elem.target.id)
      })
    }, {
      root: null,
      rootMargin: '40%',
      threshold: 1
    })

    observer.observe($('#Home'))
    observer.observe($('#About'))
    observer.observe($('#Knowledge'))
    observer.observe($('#Skills'))
    observer.observe($('#Proyects'))
    observer.observe($('#Education'))
    observer.observe($('#Contact'))

    return () => {
      observer.unobserve($('#Home'))
      observer.unobserve($('#About'))
      observer.unobserve($('#Knowledge'))
      observer.unobserve($('#Skills'))
      observer.unobserve($('#Proyects'))
      observer.unobserve($('#Education'))
      observer.unobserve($('#Contact'))
    }
  }, [])

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine)
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

      iteration += 1 / 3
    }, 50)
  }, [])

  return (
    <div className="App">
      <div className={loading ? 'loading' : ''} />
      <div style={{ backgroundColor: currentElem === 'Home' ? 'transparent' : '#3e3e3e' }} className="nav-container">
        <div className="nav">
          <div className="logo">
            <span>{'<'}</span>
            <span onMouseEnter={(e) => { hack({ event: e, originalString: 'Sarudev' }) }}>{'Sarudev'}</span>
            <span>{'/>'}</span>
          </div>
          <div className="navigation">
            <Navigate hack={hack} active={currentElem === 'Home'} name="Home" />
            <Navigate hack={hack} active={currentElem === 'About'} name="About" />
            <Navigate hack={hack} active={currentElem === 'Knowledge'} name="Knowledge" />
            <Navigate hack={hack} active={currentElem === 'Skills'} name="Skills" />
            <Navigate hack={hack} active={currentElem === 'Proyects'} name="Proyects" />
            <Navigate hack={hack} active={currentElem === 'Education'} name="Education" />
            <Navigate hack={hack} active={currentElem === 'Contact'} name="Contact" />
          </div>
        </div>
      </div>
      <div className="sections">
        <Section name="Home">
          <>
            <div className="background"/>
            <Particles
              id="tsparticles"
              init={particlesInit}
              // loaded={particlesLoaded}
              options={particles as RecursivePartial<IOptions>}
            />
            <div style={{ backgroundImage: `url(${profPicURL})` }} className='profilepic' />
            {/* My name is José, but you can call me Saru */}
            {/* I'm Sarudev, but you can call me Saru */}
          </>
        </Section>
        <Section name="About">
          <span>About</span>
        </Section>
        <Section name="Knowledge">
          <span>Knowledge</span>
        </Section>
        <Section name="Skills">
          <span>Skills</span>
        </Section>
        <Section name="Proyects">
          <span>Proyects</span>
        </Section>
        <Section name="Education">
          <span>Education</span>
        </Section>
        <Section name="Contact">
          <span>Contact</span>
        </Section>
      </div>
    </div>
  )
}

export default App
