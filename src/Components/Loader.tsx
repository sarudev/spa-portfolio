import { useLoadImageHelpers } from '../hooks/useLoadedImages'
import { ReactComponent as LoaderSVG } from '../assets/loader.svg'
import { ReactComponent as CheckSVG } from '../assets/check.svg'
import '../styles/loader.scss'

export default function Loader () {
  const { allImagesLoaded } = useLoadImageHelpers()

  return (
    <div className="progress-bar-outer-container">
      <div className="progress-bar-content">
        { allImagesLoaded ? <CheckSVG /> : <LoaderSVG /> }
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div className="progress-bar-head" />
          </div>
        </div>
      </div>
    </div>
  )
}
