import React, { type ReactElement, useState, useRef } from 'react'
import NavBar from './Components/NavBar'
import Cherry from './Components/Cherry'
import Section from './Components/Section'
import Skill from './Components/Skill'
import { $ } from './Helpers/Query'
import emailjs from '@emailjs/browser'

import { ReactComponent as Github } from './assets/github.svg'
import { ReactComponent as Link } from './assets/link.svg'
import { Observer } from './Components/Observer'
import useObserver from './hooks/useObserver'
import useProfPic from './hooks/useProfPic'

function App () {
  const [profPicURL, setProfPicURL] = useState<string>('')
  const form = useRef<HTMLFormElement>(null)

  const observerRef = useRef<HTMLDivElement>(null)
  const homeRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  useObserver(observerRef, [homeRef, aboutRef, skillsRef, projectsRef, contactRef])
  useProfPic('https://dsprofilepic-ker-production.up.railway.app', setProfPicURL)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // validate email using deep-email-validator in the backend

    emailjs.sendForm('service_hlwh1ue', 'template_bbh6qie', form.current!, 'wYl9iOiK7rs_ozSRy')
      .then((result) => {
        console.log(result.text)
      }, (error) => {
        console.log(error.text)
      })
  }

  return (
    <div className="App">
      <Observer ref={observerRef}/>
      <NavBar />
      <div style={{ color: 'white', position: 'absolute' }}>width: {window.innerWidth} height: {window.innerHeight}</div>
      <div className="sections">
        <Section ref={homeRef} bg='/static/ohto.jpg' name="Home">
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
        <Section ref={aboutRef} name="About">
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
        <Section ref={skillsRef} bg='/static/kuriyama.jpg' name="Skills">
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
        <Section ref={projectsRef} name="Projects">
          <ContainerWithTitle title='Projects'>
            <div className="cards">
              <ProjectCard name={'Uno'} img={'/static/ohto.jpg'} tags={['React', 'Typescript', 'Redux']} description={'aaaaaaaaa bbbbbbbbbbbbbbb cccccc dddd eeeeeeeeeeeeeee ffffffff ggggggggggggg'} repo={'5'} />
              <ProjectCard name={'Dos'} img={'/static/kuriyama.jpg'} tags={['React', 'Typescript', 'Redux']} description={'aaaaaaaaa bbbbbbbbbbbbbbb cccccc dddd eeeeeeeeeeeeeee ffffffff ggggggggggggg hhhhhhhhhhhh iiiiiiiiiiiii jjj kkkkkk'} repo={'5'} web={'6'} />
            </div>
          </ContainerWithTitle>
        </Section>
        <Section ref={contactRef} bg='/static/kuriyama.jpg' name="Contact">
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

const map = (colors: string[]) => {
  return colors.map(color => {
    const styles: React.CSSProperties = {
      display: 'inline-flex',
      width: 150,
      height: 150,
      backgroundColor: color,
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      textShadow: '5px 5px 5px black'
    }

    return <div key={color} style={styles}>{color}</div>
  })
}

function Pepo () {
  const grises = [
    '#000000', '#101010', '#1E1E1E', '#242424', '#303030', '#404040', '#606060', '#808080', '#C0C0C0', '#ffffff'
  ]
  const programming = [
    '#fbbe5b', '#1e9ae0', '#e1b2f0', '#f46049'
  ]
  const coding = [
    '#ce9178', '#c586c0', '#4ec9b0', '#dcdcaa'
  ]
  const pasteles = [
    '#faedcb', '#c9e4de', '#c6def1', '#bdb2ff', '#fa9bcf', '#ffadad'
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        {map(grises)}
      </div>
      <div>
        {map(programming)}
      </div>
      <div>
        {map(coding)}
      </div>
      <div>
        {map(pasteles)}
      </div>
    </div>
  )
}

export default App

// 509 x 1035
// 351 x 625
// 320 x 570
