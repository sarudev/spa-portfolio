import Navbar from './Components/Navbar'

export default function App () {
  return (
    <>
      <Navbar />
      <div>App</div>
    </>
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
