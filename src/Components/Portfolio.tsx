import { useState } from 'react'
import '../styles/portfolio.scss'
import useProfPic from '../hooks/useProfPic'
import { useLoadImageHelpers } from '../hooks/useLoadedImages'
import WordWriting from './WordWriting'
const { VITE_PROF_PIC_BASE_URL, VITE_PROF_PIC_PATH_URL, VITE_DISCORD_ID } = import.meta.env as Record<string, string>

export default function Portfolio () {
  const { onLoad } = useLoadImageHelpers()
  const [profPic, setProfPic] = useState('')
  useProfPic(`${VITE_PROF_PIC_BASE_URL}/${VITE_PROF_PIC_PATH_URL}/${VITE_DISCORD_ID}`, setProfPic)

  return (
    <main>
      <section id="home">
        <div className="container">
          <div className="self">
            <div className='hi'>Hi 👋, Sarudev here!</div>
            <div className='ima'><span>And I&apos;m a&nbsp;</span><WordWriting words={['Programmer', 'Gamer', 'Weeb']} durationPerCh={75} waitWrited={1000} waitErased={250} /></div>
          </div>
          <img src={profPic} alt="Profile picture form my discord account" onLoad={(e) => { onLoad(e.currentTarget.id) }} />
        </div>
      </section>
    </main>
  )
}
