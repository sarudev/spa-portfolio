import { useRef } from 'react'
import { ReactComponent as Logo } from '../assets/logo.svg'
import { ReactComponent as Gear } from '../assets/gear.svg'
import { ReactComponent as Home } from '../assets/home.svg'
import { ReactComponent as About } from '../assets/about.svg'
import { ReactComponent as Skills } from '../assets/skills.svg'
import { ReactComponent as Projects } from '../assets/projects.svg'
import { ReactComponent as Contact } from '../assets/contact.svg'
import '../styles/navbar.scss'

export default function Navbar () {
  const navRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <nav ref={navRef} className="nav">
        <div className="logo item">
          <Logo className='icon' />
        </div>
        <div className="bot">
          <ul className="items">
            <li className='item'>
              <Home className='icon'/>
              <span className="text">Home</span>
            </li>
            <li className='item'>
              <About className='icon'/>
              <span className="text">About me</span>
            </li>
            <li className='item'>
              <Skills className='icon'/>
              <span className="text">Skills</span>
            </li>
            <li className='item'>
              <Projects className='icon'/>
              <span className="text">Projects</span>
            </li>
            <li className='item'>
              <Contact className='icon'/>
              <span className="text">Contact</span>
            </li>
          </ul>
          <div className="extra item">
            <Gear className='icon' />
            <span className="text">Extra</span>
          </div>
        </div>
      </nav>
      <div className="ham" onClick={(e) => {
        navRef.current?.classList.toggle('open')
      }}>
        <div className="top line"></div>
        <div className="mid line"></div>
        <div className="bot line"></div>
      </div>
    </>
  )
}
