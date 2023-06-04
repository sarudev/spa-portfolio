import { useLoadImageHelpers, useLoadImage } from '../hooks/useLoadedImages'
import { ReactComponent as LoaderSVG } from '../assets/loader.svg'
import { ReactComponent as CheckSVG } from '../assets/check.svg'
import '../styles/loader.scss'

export default function Loader ({ disabled }: { disabled?: boolean }) {
  useLoadImage(disabled != null && disabled)
  const { allImagesLoaded } = useLoadImageHelpers()

  if (disabled != null && disabled) return null

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
