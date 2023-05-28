import { useLoadImage } from './hooks/useLoadedImages'
import Loader from './Components/Loader'
import Navbar from './Components/NavBar'

export default function App () {
  useLoadImage()

  return (
    <>
      <Loader />
      <Navbar />
    </>
  )
}
