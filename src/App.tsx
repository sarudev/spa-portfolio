import { useState } from 'react'
import DynamicSVG from './Components/svgs/DynamicSVG'
import { useLoadImage, useLoadImageHelpers } from './hooks/useLoadedImages'
import useProfPic from './hooks/useProfPic'
import './styles/app.scss'

export default function App () {
  const { onLoad } = useLoadImageHelpers()
  useLoadImage()

  return (
    <>
      <Loader />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
      <DynamicSVG svgName='about' id='img-about01' onLoad={onLoad}/>
      <DynamicSVG svgName='contact' id='img-about02' onLoad={onLoad}/>
      <DynamicSVG svgName='gear' id='img-about03' onLoad={onLoad}/>
      <DynamicSVG svgName='github' id='img-about04' onLoad={onLoad}/>
      <DynamicSVG svgName='home' id='img-about05' onLoad={onLoad}/>
      <DynamicSVG svgName='link' id='img-about06' onLoad={onLoad}/>
      <DynamicSVG svgName='logo' id='img-about07' onLoad={onLoad}/>
      <DynamicSVG svgName='projects' id='img-about08' onLoad={onLoad}/>
      <DynamicSVG svgName='react' id='img-about09' onLoad={onLoad}/>
      <DynamicSVG svgName='skills' id='img-about10' onLoad={onLoad}/>
      <DynamicSVG svgName='about' id='img-about11' onLoad={onLoad}/>
      <DynamicSVG svgName='contact' id='img-about12' onLoad={onLoad}/>
      <DynamicSVG svgName='gear' id='img-about13' onLoad={onLoad}/>
      <DynamicSVG svgName='github' id='img-about14' onLoad={onLoad}/>
      <DynamicSVG svgName='home' id='img-about15' onLoad={onLoad}/>
      <DynamicSVG svgName='link' id='img-about16' onLoad={onLoad}/>
      <DynamicSVG svgName='logo' id='img-about17' onLoad={onLoad}/>
      <DynamicSVG svgName='projects' id='img-about18' onLoad={onLoad}/>
      <DynamicSVG svgName='react' id='img-about19' onLoad={onLoad}/>
      <DynamicSVG svgName='skills' id='img-about20' onLoad={onLoad}/>
      <DynamicSVG svgName='about' id='img-about21' onLoad={onLoad}/>
      <DynamicSVG svgName='contact' id='img-about22' onLoad={onLoad}/>
      <DynamicSVG svgName='gear' id='img-about23' onLoad={onLoad}/>
      <DynamicSVG svgName='github' id='img-about24' onLoad={onLoad}/>
      <DynamicSVG svgName='home' id='img-about25' onLoad={onLoad}/>
      <DynamicSVG svgName='link' id='img-about26' onLoad={onLoad}/>
      <DynamicSVG svgName='logo' id='img-about27' onLoad={onLoad}/>
      <DynamicSVG svgName='projects' id='img-about28' onLoad={onLoad}/>
      <DynamicSVG svgName='react' id='img-about29' onLoad={onLoad}/>
      <DynamicSVG svgName='skills' id='img-about30' onLoad={onLoad}/>
      <DynamicSVG svgName='about' id='img-about31' onLoad={onLoad}/>
      <DynamicSVG svgName='contact' id='img-about32' onLoad={onLoad}/>
      <DynamicSVG svgName='gear' id='img-about33' onLoad={onLoad}/>
      <DynamicSVG svgName='github' id='img-about34' onLoad={onLoad}/>
      <DynamicSVG svgName='home' id='img-about35' onLoad={onLoad}/>
      <DynamicSVG svgName='link' id='img-about36' onLoad={onLoad}/>
      <DynamicSVG svgName='logo' id='img-about37' onLoad={onLoad}/>
      <DynamicSVG svgName='projects' id='img-about38' onLoad={onLoad}/>
      <DynamicSVG svgName='react' id='img-about39' onLoad={onLoad}/>
      <DynamicSVG svgName='skills' id='img-about40' onLoad={onLoad}/>
      <DynamicSVG svgName='about' id='img-about41' onLoad={onLoad}/>
      <DynamicSVG svgName='contact' id='img-about42' onLoad={onLoad}/>
      <DynamicSVG svgName='gear' id='img-about43' onLoad={onLoad}/>
      <DynamicSVG svgName='github' id='img-about44' onLoad={onLoad}/>
      <DynamicSVG svgName='home' id='img-about45' onLoad={onLoad}/>
      <DynamicSVG svgName='link' id='img-about46' onLoad={onLoad}/>
      <DynamicSVG svgName='logo' id='img-about47' onLoad={onLoad}/>
      <DynamicSVG svgName='projects' id='img-about48' onLoad={onLoad}/>
      <DynamicSVG svgName='react' id='img-about49' onLoad={onLoad}/>
      <DynamicSVG svgName='skills' id='img-about50' onLoad={onLoad}/>
      <DynamicSVG svgName='about' id='img-about51' onLoad={onLoad}/>
      <DynamicSVG svgName='contact' id='img-about52' onLoad={onLoad}/>
      <DynamicSVG svgName='gear' id='img-about53' onLoad={onLoad}/>
      <DynamicSVG svgName='github' id='img-about54' onLoad={onLoad}/>
      <DynamicSVG svgName='home' id='img-about55' onLoad={onLoad}/>
      <DynamicSVG svgName='link' id='img-about56' onLoad={onLoad}/>
      <DynamicSVG svgName='logo' id='img-about57' onLoad={onLoad}/>
      <DynamicSVG svgName='projects' id='img-about58' onLoad={onLoad}/>
      <DynamicSVG svgName='react' id='img-about59' onLoad={onLoad}/>
      <DynamicSVG svgName='skills' id='img-about60' onLoad={onLoad}/>
      <DynamicSVG svgName='about' id='img-about61' onLoad={onLoad}/>
      <DynamicSVG svgName='contact' id='img-about62' onLoad={onLoad}/>
      <DynamicSVG svgName='gear' id='img-about63' onLoad={onLoad}/>
      <DynamicSVG svgName='github' id='img-about64' onLoad={onLoad}/>
      <DynamicSVG svgName='home' id='img-about65' onLoad={onLoad}/>
      <DynamicSVG svgName='link' id='img-about66' onLoad={onLoad}/>
      <DynamicSVG svgName='logo' id='img-about67' onLoad={onLoad}/>
      <DynamicSVG svgName='projects' id='img-about68' onLoad={onLoad}/>
      <DynamicSVG svgName='react' id='img-about69' onLoad={onLoad}/>
      <DynamicSVG svgName='skills' id='img-about70' onLoad={onLoad}/>
      <DynamicSVG svgName='about' id='img-about71' onLoad={onLoad}/>
      <DynamicSVG svgName='contact' id='img-about72' onLoad={onLoad}/>
      <DynamicSVG svgName='gear' id='img-about73' onLoad={onLoad}/>
      <DynamicSVG svgName='github' id='img-about74' onLoad={onLoad}/>
      <DynamicSVG svgName='home' id='img-about75' onLoad={onLoad}/>
      <DynamicSVG svgName='link' id='img-about76' onLoad={onLoad}/>
      <DynamicSVG svgName='logo' id='img-about77' onLoad={onLoad}/>
      <DynamicSVG svgName='projects' id='img-about78' onLoad={onLoad}/>
      <DynamicSVG svgName='react' id='img-about79' onLoad={onLoad}/>
      <DynamicSVG svgName='skills' id='img-about80' onLoad={onLoad}/>
      <DynamicSVG svgName='about' id='img-about81' onLoad={onLoad}/>
      <DynamicSVG svgName='contact' id='img-about82' onLoad={onLoad}/>
      <DynamicSVG svgName='gear' id='img-about83' onLoad={onLoad}/>
      <DynamicSVG svgName='github' id='img-about84' onLoad={onLoad}/>
      <DynamicSVG svgName='home' id='img-about85' onLoad={onLoad}/>
      <DynamicSVG svgName='link' id='img-about86' onLoad={onLoad}/>
      <DynamicSVG svgName='logo' id='img-about87' onLoad={onLoad}/>
      <DynamicSVG svgName='projects' id='img-about88' onLoad={onLoad}/>
      <DynamicSVG svgName='react' id='img-about89' onLoad={onLoad}/>
      <DynamicSVG svgName='skills' id='img-about90' onLoad={onLoad}/>
      <DynamicSVG svgName='about' id='img-about91' onLoad={onLoad}/>
      <DynamicSVG svgName='contact' id='img-about92' onLoad={onLoad}/>
      <DynamicSVG svgName='gear' id='img-about93' onLoad={onLoad}/>
      <DynamicSVG svgName='github' id='img-about94' onLoad={onLoad}/>
      <DynamicSVG svgName='home' id='img-about95' onLoad={onLoad}/>
      <DynamicSVG svgName='link' id='img-about96' onLoad={onLoad}/>
      <DynamicSVG svgName='logo' id='img-about97' onLoad={onLoad}/>
      <DynamicSVG svgName='projects' id='img-about98' onLoad={onLoad}/>
      <DynamicSVG svgName='react' id='img-about99' onLoad={onLoad}/>
      <DynamicSVG svgName='skills' id='img-about100' onLoad={onLoad}/>
      </div>
    </>
  )
}

function Loader () {
  const [profPic, setProfPic] = useState('')
  const { onLoad } = useLoadImageHelpers()
  // useProfPic()

  return (
    <div className="loader-background">
      <div className="loader-container">
        <img src={''} alt="Discord Profile Picture" onLoad={(e) => { onLoad(e.currentTarget.id) }} />
        <div className="loader" />
      </div>
    </div>
  )
}

// para el movimiento de la barra de carga
// será mejor hacer una progress bar recta
// y que el llenado sea mediante %
// de esta manera, al hacer
// fotosCargadas / fotoTotales
// se puede obtener el porcentaje
// para "cargar" la progress bar
// al tener un transition funcionará correctamente
