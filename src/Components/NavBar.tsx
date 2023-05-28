import { useRef } from 'react'
import DynamicSVG from './DynamicSVG'
import '../styles/navbar.scss'

export default function Navbar () {
  const navRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <nav ref={navRef} className="nav">
        <div className="logo item">
          <DynamicSVG svgName='logo' id='svg-loable-logo' className='icon' />
        </div>
        <div className="bot">
          <ul className="items">
            <li className='item'>
              <DynamicSVG svgName='home' id='svg-loable-home' className='icon'/>
              <span className="text">Home</span>
            </li>
            <li className='item'>
              <DynamicSVG svgName='about' id='svg-loable-about' className='icon'/>
              <span className="text">About me</span>
            </li>
            <li className='item'>
              <DynamicSVG svgName='skills' id='svg-loable-skills' className='icon'/>
              <span className="text">Skills</span>
            </li>
            <li className='item'>
              <DynamicSVG svgName='projects' id='svg-loable-projects' className='icon'/>
              <span className="text">Projects</span>
            </li>
            <li className='item'>
              <DynamicSVG svgName='contact' id='svg-loable-contact' className='icon'/>
              <span className="text">Contact</span>
            </li>
          </ul>
          <div className="extra item">
            <DynamicSVG svgName='gear' id='svg-loable-gear' className='icon' />
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
