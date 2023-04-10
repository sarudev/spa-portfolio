import React, { type ReactElement, useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import NavBar from './Components/NavBar'
import Cherry from './Components/Cherry'
import Section from './Components/Section'
import Skill from './Components/Skill'
import { $, $$ } from './Helpers/Query'

import { ReactComponent as Github } from '../public/static/github.svg'
import { ReactComponent as Link } from '../public/static/link.svg'

const url = 'https://dsprofilepic-ker-production.up.railway.app'

function App (): React.ReactElement {
  // const [loading, setLoading] = useState(true)

  const [profPicURL, setProfPicURL] = useState<string>('')

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

        const threshold = 50

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

  // if (loading) return (<></>)

  return (
    <div className="App">
      <div className='observer' />
      <NavBar />
      {/* <div style={{ color: 'white' }}>: {} height: {window.innerHeight}</div> */}
      <div className="sections">
        <Section bg={'/static/ohto.jpg'} name="Home" styles={{ minHeight: '100vh' }}>
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
        <Section bg={'/static/kuriyama.jpg'} name="Skills">
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
              <ProjectCard name={'Uno'} img={'/static/ohto.jpg'} tags={['React', 'Typescript', 'Redux']} description={'aaaaaaaaa bbbbbbbbbbbbbbb cccccccc dddd eeeeeeeeeeeeeee ffffffff ggggggggggggg'} repo={'5'} />
              <ProjectCard name={'Dos'} img={'/static/kuriyama.jpg'} tags={['React', 'Typescript', 'Redux']} description={'aaaaaaaaa bbbbbbbbbbbbbbb cccccccc dddd eeeeeeeeeeeeeee ffffffff ggggggggggggg hhhhhhhhhhhh iiiiiiiiiiiii jjj kkkkkk'} repo={'5'} web={'6'} />
              <ProjectCard name={'Uno'} img={'/static/ohto.jpg'} tags={['React', 'Typescript', 'Redux']} description={'aaaaaaaaa bbbbbbbbbbbbbbb cccccccc dddd eeeeeeeeeeeeeee ffffffff ggggggggggggg'} repo={'5'} />
              <ProjectCard name={'Dos'} img={'/static/kuriyama.jpg'} tags={['React', 'Typescript', 'Redux']} description={'aaaaaaaaa bbbbbbbbbbbbbbb cccccccc dddd eeeeeeeeeeeeeee ffffffff ggggggggggggg hhhhhhhhhhhh iiiiiiiiiiiii jjj kkkkkk'} repo={'5'} web={'6'} />
              <ProjectCard name={'Uno'} img={'/static/ohto.jpg'} tags={['React', 'Typescript', 'Redux']} description={'aaaaaaaaa bbbbbbbbbbbbbbb cccccccc dddd eeeeeeeeeeeeeee ffffffff ggggggggggggg'} repo={'5'} />
              <ProjectCard name={'Dos'} img={'/static/kuriyama.jpg'} tags={['React', 'Typescript', 'Redux']} description={'aaaaaaaaa bbbbbbbbbbbbbbb cccccccc dddd eeeeeeeeeeeeeee ffffffff ggggggggggggg hhhhhhhhhhhh iiiiiiiiiiiii jjj kkkkkk'} repo={'5'} web={'6'} />
              <ProjectCard name={'Uno'} img={'/static/ohto.jpg'} tags={['React', 'Typescript', 'Redux']} description={'aaaaaaaaa bbbbbbbbbbbbbbb cccccccc dddd eeeeeeeeeeeeeee ffffffff ggggggggggggg'} repo={'5'} />
              <ProjectCard name={'Dos'} img={'/static/kuriyama.jpg'} tags={['React', 'Typescript', 'Redux']} description={'aaaaaaaaa bbbbbbbbbbbbbbb cccccccc dddd eeeeeeeeeeeeeee ffffffff ggggggggggggg hhhhhhhhhhhh iiiiiiiiiiiii jjj kkkkkk'} repo={'5'} web={'6'} />
              <ProjectCard name={'Uno'} img={'/static/ohto.jpg'} tags={['React', 'Typescript', 'Redux']} description={'aaaaaaaaa bbbbbbbbbbbbbbb cccccccc dddd eeeeeeeeeeeeeee ffffffff ggggggggggggg'} repo={'5'} />
              <ProjectCard name={'Dos'} img={'/static/kuriyama.jpg'} tags={['React', 'Typescript', 'Redux']} description={'aaaaaaaaa bbbbbbbbbbbbbbb cccccccc dddd eeeeeeeeeeeeeee ffffffff ggggggggggggg hhhhhhhhhhhh iiiiiiiiiiiii jjj kkkkkk'} repo={'5'} web={'6'} />
              <ProjectCard name={'Uno'} img={'/static/ohto.jpg'} tags={['React', 'Typescript', 'Redux']} description={'aaaaaaaaa bbbbbbbbbbbbbbb cccccccc dddd eeeeeeeeeeeeeee ffffffff ggggggggggggg'} repo={'5'} />
              <ProjectCard name={'Dos'} img={'/static/kuriyama.jpg'} tags={['React', 'Typescript', 'Redux']} description={'aaaaaaaaa bbbbbbbbbbbbbbb cccccccc dddd eeeeeeeeeeeeeee ffffffff ggggggggggggg hhhhhhhhhhhh iiiiiiiiiiiii jjj kkkkkk'} repo={'5'} web={'6'} />
              <ProjectCard name={'Uno'} img={'/static/ohto.jpg'} tags={['React', 'Typescript', 'Redux']} description={'aaaaaaaaa bbbbbbbbbbbbbbb cccccccc dddd eeeeeeeeeeeeeee ffffffff ggggggggggggg'} repo={'5'} />
              <ProjectCard name={'Dos'} img={'/static/kuriyama.jpg'} tags={['React', 'Typescript', 'Redux']} description={'aaaaaaaaa bbbbbbbbbbbbbbb cccccccc dddd eeeeeeeeeeeeeee ffffffff ggggggggggggg hhhhhhhhhhhh iiiiiiiiiiiii jjj kkkkkk'} repo={'5'} web={'6'} />
              <ProjectCard name={'Uno'} img={'/static/ohto.jpg'} tags={['React', 'Typescript', 'Redux']} description={'aaaaaaaaa bbbbbbbbbbbbbbb cccccccc dddd eeeeeeeeeeeeeee ffffffff ggggggggggggg'} repo={'5'} />
              <ProjectCard name={'Dos'} img={'/static/kuriyama.jpg'} tags={['React', 'Typescript', 'Redux']} description={'aaaaaaaaa bbbbbbbbbbbbbbb cccccccc dddd eeeeeeeeeeeeeee ffffffff ggggggggggggg hhhhhhhhhhhh iiiiiiiiiiiii jjj kkkkkk'} repo={'5'} web={'6'} />
              <ProjectCard name={'Uno'} img={'/static/ohto.jpg'} tags={['React', 'Typescript', 'Redux']} description={'aaaaaaaaa bbbbbbbbbbbbbbb cccccccc dddd eeeeeeeeeeeeeee ffffffff ggggggggggggg'} repo={'5'} />
              <ProjectCard name={'Dos'} img={'/static/kuriyama.jpg'} tags={['React', 'Typescript', 'Redux']} description={'aaaaaaaaa bbbbbbbbbbbbbbb cccccccc dddd eeeeeeeeeeeeeee ffffffff ggggggggggggg hhhhhhhhhhhh iiiiiiiiiiiii jjj kkkkkk'} repo={'5'} web={'6'} />
              <ProjectCard name={'Uno'} img={'/static/ohto.jpg'} tags={['React', 'Typescript', 'Redux']} description={'aaaaaaaaa bbbbbbbbbbbbbbb cccccccc dddd eeeeeeeeeeeeeee ffffffff ggggggggggggg'} repo={'5'} />
              <ProjectCard name={'Dos'} img={'/static/kuriyama.jpg'} tags={['React', 'Typescript', 'Redux']} description={'aaaaaaaaa bbbbbbbbbbbbbbb cccccccc dddd eeeeeeeeeeeeeee ffffffff ggggggggggggg hhhhhhhhhhhh iiiiiiiiiiiii jjj kkkkkk'} repo={'5'} web={'6'} />
            </div>
          </ContainerWithTitle>
        </Section>
        <Section name="Contact">
          <span>Contact</span>
        </Section>
      </div>
    </div>
  )
}

function ProjectCard ({ name, img, tags, description, repo, web }: { name: string, img: string, description: string, tags: string[], repo?: string, web?: string }): React.ReactElement {
  return (
    <div className="container">
      <div className="project-card">
        <div className='title'>{name}</div>
        <div className='img' style={{ backgroundImage: `url(${img})` }} />
        <div className='tags'>{tags}</div>
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
  const style: React.CSSProperties = {
    textAlign: 'center',
    color: 'white',
    fontSize: '3.5rem',
    fontWeight: 'bold',
    textShadow: '#242424 3px 5px 5px'
  }

  return <div style={style}>{text}</div>
}

function ContainerWithTitle ({ title, children, style, className }: { title: string, children: ReactElement, style?: React.CSSProperties, className?: string }): React.ReactElement {
  const styles: React.CSSProperties = {
    ...{
      width: 'min(1200px, 100%)',
      height: 'max-content',
      color: 'white',
      gap: '40px',
      display: 'flex',
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
  const style: React.CSSProperties = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundImage: `url(${img})`,
    backgroundPosition: '50% center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    opacity: 0.4,
    top: 0,
    left: 0
  }

  return (
    <div style={style} />
  )
}

export default App

// 509 x 1035
// 351 x 625
