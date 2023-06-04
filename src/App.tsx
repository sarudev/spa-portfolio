import Loader from './Components/Loader'
import Navbar from './Components/NavBar'
import Portfolio from './Components/Portfolio'

export default function App () {
  return (
    <>
      <Loader disabled />
      <Navbar />
      <Portfolio />
    </>
  )
}
