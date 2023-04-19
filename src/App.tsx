import React, { type ReactElement, useCallback, useEffect, useState, useRef } from 'react'
import axios from 'axios'
import NavBar from './Components/NavBar'
import Cherry from './Components/Cherry'
import Section from './Components/Section'
import Skill from './Components/Skill'
import { $, $$ } from './Helpers/Query'
import emailjs from '@emailjs/browser'

import { ReactComponent as Github } from './assets/github.svg'
import { ReactComponent as Link } from './assets/link.svg'

const url = 'https://dsprofilepic-ker-production.up.railway.app'

function App (): React.ReactElement {
  const [profPicURL, setProfPicURL] = useState<string>('')
  const form = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const source = axios.CancelToken.source()

    const loadData = async (): Promise<void> => {
      try {
        const res = await axios.get(`${url}/ds/profpic/999693766313123860`, { cancelToken: source.token })
        setProfPicURL(res.data)
        // setLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    void loadData()

    function observer (): () => void {
      const observer = $('.observer')!
      const toObserve = $$('.section')!

      let lastIntersected: HTMLElement

      const scroll = (): void => {
        const { top: y } = getCoords(observer)

        const threshold = 75

        const yDetection = y + observer.clientHeight * threshold / 100

        const coords = toObserve.map((elem, i) => {
          elem.dataset.observerId = i.toString()

          return { top: getCoords(elem).top, bot: getCoords(elem).top + elem.clientHeight, target: elem }
        })

        const entries = coords.map((vec, i) => {
          const isIntersecting = yDetection > vec.top && yDetection < vec.bot
          if (isIntersecting) lastIntersected = vec.target

          return { target: vec.target, isIntersecting, wasIntercepted: lastIntersected?.dataset.observerId === vec.target.dataset.observerId }
        })

        window.dispatchEvent(new CustomEvent('observer', { detail: entries }))
      }

      scroll()

      return scroll
    }

    const resize = (): void => {
      const elem = $('.me-pic')!
      const style = window.getComputedStyle(elem)
      elem.style.height = style.width
    }

    resize()
    const scroll = observer()

    window.addEventListener('resize', resize)
    window.addEventListener('scroll', scroll)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', scroll)
      source.cancel()
    }
  }, [])

  const getCoords = useCallback((elem: HTMLElement): { top: number, left: number } => { // crossbrowser version
    const box = elem.getBoundingClientRect()

    const body = document.body
    const docEl = document.documentElement

    const scrollTop = window.pageYOffset ?? docEl.scrollTop ?? body.scrollTop
    const scrollLeft = window.pageXOffset ?? docEl.scrollLeft ?? body.scrollLeft

    const clientTop = docEl.clientTop ?? body.clientTop ?? 0
    const clientLeft = docEl.clientLeft ?? body.clientLeft ?? 0

    const top = box.top + scrollTop - clientTop
    const left = box.left + scrollLeft - clientLeft

    return { top: Math.round(top), left: Math.round(left) }
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    emailjs.sendForm('service_hlwh1ue', 'template_bbh6qie', form.current!, 'wYl9iOiK7rs_ozSRy')
      .then((result) => {
        console.log(result.text)
      }, (error) => {
        console.log(error.text)
      })
  }

  return (
    <div className="App">
      <div className='observer' />
      <NavBar />
      <div style={{ color: 'white', position: 'absolute' }}>width: {window.innerWidth} height: {window.innerHeight}</div>
      <div className="sections">
        <Section bg='/static/ohto.jpg' name="Home" style={{ minHeight: '100vh' }}>
          <>
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
          </>
        </Section>
        <Section name="About">
          <div className="container">
              <div className="me-pic">
                <div className="border">
                  <div className="pic"/>
                </div>
              </div>
              <div className='about-me'>
                <div className="title">React-Based Frontend Developer</div>
                <div className="description">
                  Hi, I&apos;m <span>José María Coria</span>, known on the internet as <span>Saru</span>. I like videogames, anime, and short hair girls. In my spare time I like to play the piano and code stuffs. I started learning programming self-taught in April 2021, shortly after starting my university studies. My first project was a discord bot with JavaScript, in which I spent 2 months programming it and thanks to that, and more, today I have a high level.
                </div>
                <div className="data">
                  <div>
                    <span>Age</span>:&nbsp;<span>{20}</span>
                  </div>
                  <div>
                    <span>Country</span>:&nbsp;<span>Argentina</span>
                  </div>
                </div>
                <div className="buttons">
                  <button className='btn contact' onClick={() => { $('#Contact')!.scrollIntoView({ behavior: 'smooth', block: 'end' }) }}>
                    Contact me
                  </button>
                  <button className='btn curriculum'>
                    <span>Curriculum</span>
                  </button>
                </div>
              </div>
          </div>
        </Section>
        <Section bg='/static/kuriyama.jpg' name="Skills">
            <ContainerWithTitle className='container' title='Skills'>
              <div className="skills-container">
                <Skill name="JavaScript" level={85} />
                <Skill name="TypeScript" level={70} />
                <Skill name="React" level={75} />
                <Skill name="Express" level={60} />
                <Skill name="Git" level={55} />
                <Skill name="SQL" level={50} />
              </div>
            </ContainerWithTitle>
        </Section>
        <Section name="Projects">
          <ContainerWithTitle title='Projects'>
            <div className="cards">
              <ProjectCard name={'Uno'} img={'/static/ohto.jpg'} tags={['React', 'Typescript', 'Redux']} description={'aaaaaaaaa bbbbbbbbbbbbbbb cccccc dddd eeeeeeeeeeeeeee ffffffff ggggggggggggg'} repo={'5'} />
              <ProjectCard name={'Dos'} img={'/static/kuriyama.jpg'} tags={['React', 'Typescript', 'Redux']} description={'aaaaaaaaa bbbbbbbbbbbbbbb cccccc dddd eeeeeeeeeeeeeee ffffffff ggggggggggggg hhhhhhhhhhhh iiiiiiiiiiiii jjj kkkkkk'} repo={'5'} web={'6'} />
            </div>
          </ContainerWithTitle>
        </Section>
        <Section bg='/static/kuriyama.jpg' name="Contact">
          <ContainerWithTitle title='Contact'>
            <>
              <form className="form" ref={form} onSubmit={handleSubmit}>
                <div className="container">
                  <Input placeholder='Name' name='sender_name' type='text' />
                  <Input placeholder='Email' name='sender_email' type='email' />
                </div>
                <Input placeholder='Subject' name='sender_subject' type='text' />
                <Input placeholder='Message' name='sender_message' type='textarea' />
                <button className='send' type='submit'>Send</button>
              </form>
              {/* <div className="info"></div> */}
            </>
          </ContainerWithTitle>
        </Section>
      </div>
    </div>
  )
}

function Input ({ type, name, placeholder }: { type: React.HTMLInputTypeAttribute | 'textarea', name: string, placeholder: string }): React.ReactElement {
  return (
    <div className={`custom-input ${type}`}>
      {
        type === 'textarea'
          ? <textarea className='input' spellCheck='false' placeholder={placeholder} name={name} required />
          : <input className='input' placeholder={placeholder} type={type} name={name} required />
      }
      {/* <div className="top line" />
      <div className="left line" />
      <div className="right line" />
      <div className="bottom line" /> */}
    </div>
  )
}

function ProjectCard ({ name, img, tags, description, repo, web }: { name: string, img: string, description: string, tags: string[], repo?: string, web?: string }): React.ReactElement {
  return (
    <div className="container">
      <div className="project-card">
        <div className='title'>{name}</div>
        <div className='img' style={{ backgroundImage: `url(${img})` }} />
        <div className='tags'>
          {tags.map((e, i) => <div className={`tag ${e}`} key={i}>{e}</div>)}
        </div>
        <div className='description'>{description}</div>
        <div className='links'>
          {repo != null && (
            <a target='_blank' href={repo} className="link repo" rel="noreferrer">
              <Github />
            </a>
          )}
          {web != null && (
            <a target='_blank' href={web} className="link web" rel="noreferrer">
              <Link />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function Title ({ text }: { text: string }): React.ReactElement {
  return <div className='title'>{text}</div>
}

function ContainerWithTitle ({ title, children, style, className }: { title: string, children: ReactElement, style?: React.CSSProperties, className?: string }): React.ReactElement {
  const styles: React.CSSProperties = {
    ...{
      width: 'min(1200px, 100%)',
      height: 'max-content',
      color: 'white',
      gap: '40px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      zIndex: 5
    },
    ...style
  }

  return (
    <div className={className} style={styles}>
      <Title text={title} />
      {children}
    </div>
  )
}

export function Background ({ img }: { img: string }): React.ReactElement {
  return (
    <div className='background' style={{ backgroundImage: `url(${img})` }} />
  )
}

export default App

// 509 x 1035
// 351 x 625
// 320 x 570
