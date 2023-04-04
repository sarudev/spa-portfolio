import React, { type ReactElement, useEffect, useState, useCallback, useRef } from 'react'
import type { Engine } from 'tsparticles-engine'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import axios from 'axios'

const url = 'https://dsprofilepic-ker-production.up.railway.app'

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
    void axios.get(`${url}/ds/profpic/999693766313123860`).then(res => {
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
    observer.observe($('#Skills'))
    observer.observe($('#Proyects'))
    observer.observe($('#Education'))
    observer.observe($('#Contact'))

    return () => {
      observer.unobserve($('#Home'))
      observer.unobserve($('#About'))
      observer.unobserve($('#Skills'))
      observer.unobserve($('#Proyects'))
      observer.unobserve($('#Education'))
      observer.unobserve($('#Contact'))
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
            <Navigate hack={hack} active={currentElem === 'Skills'} name="Skills" />
            <Navigate hack={hack} active={currentElem === 'Proyects'} name="Proyects" />
            <Navigate hack={hack} active={currentElem === 'Education'} name="Education" />
            <Navigate hack={hack} active={currentElem === 'Contact'} name="Contact" />
          </div>
        </div>
      </div>
      <div className="sections">
        <Section name="Home">
          <div className='home'>
            <div className="background"/>
            <Cherry />
            <div className='profile-container'>
              <div style={{ backgroundImage: `url(${profPicURL})` }} className='profilepic' />
              <div className="saru-container">
                <span className="in-kwnon-as">
                  <span>I&apos;m</span>
                  <span>known</span>
                  <span>as</span>
                </span>
                <span className="saru">Saru</span>
              </div>
            </div>
          </div>
        </Section>
        <Section name="About">
          <div className='about'>
            <div className="me-pic">
              <div className="border">
                <div className="pic"/>
              </div>
            </div>
            <div className='about-me'>
              <div className="title">React-Based Frontend Developer</div>
              <div className="description">
                Hi, I&apos;m <span>José María Coria</span>, known on the internet as <span>Saru</span>. I like videogames, anime, and girls with short hair. In my spare time I like to play the piano and code something. I started learning programming self-taught in April 2021, shortly after starting my university studies. My first project was a discord bot with JavaScript, in which I spent 2 months programming it and thanks to that, and more, today I have a high level.
              </div>
              <div className="data">
                <div>
                  <span>Age</span>:&nbsp;<span>{20}</span>
                </div>
                <div>
                  <span>Country</span>:&nbsp;<span>Argentina</span>
                </div>
              </div>
              <div className="button">
                <button onClick={() => { $('#Contact').scrollIntoView({ behavior: 'smooth', block: 'end' }) }}
                >
                  Contact me
                </button>
                <button>
                  <span>
                    Curriculum
                  </span>
                </button>
              </div>
            </div>
          </div>
        </Section>
        <Section name="Skills">
          <div className="skills">
            <div className="background"/>
            <div className="container"></div>
          </div>
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

function Cherry (): ReactElement {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine)
  }, [])

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        style: {
          position: 'relative'
        },
        fpsLimit: 60,
        particles: {
          color: {
            value: '#ffffff'
          },
          move: {
            direction: 'bottom-left',
            enable: true,
            outModes: {
              default: 'out'
            },
            random: false,
            speed: 10,
            straight: false
          },
          number: {
            value: 50
          },
          opacity: {
            value: 1
          },
          shape: {
            type: 'image',
            image: [
              {
                src: '/static/petals/petal1.png',
                width: 100,
                height: 100
              },
              {
                src: '/static/petals/petal2.png',
                width: 100,
                height: 100
              },
              {
                src: '/static/petals/petal3.png',
                width: 100,
                height: 100
              },
              {
                src: '/static/petals/petal4.png',
                width: 100,
                height: 100
              },
              {
                src: '/static/petals/petal5.png',
                width: 100,
                height: 100
              },
              {
                src: '/static/petals/petal6.png',
                width: 100,
                height: 100
              },
              {
                src: '/static/petals/petal7.png',
                width: 100,
                height: 100
              },
              {
                src: '/static/petals/petal8.png',
                width: 100,
                height: 100
              },
              {
                src: '/static/petals/petal9.png',
                width: 100,
                height: 100
              }
            ]
          },
          size: {
            value: 20
          }
        }
      }}
    />
  )
}

export default App
