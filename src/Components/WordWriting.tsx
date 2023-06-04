import useWordWriting from '../hooks/useWordWriting'
import '../styles/wordWriting.scss'
import { type IWordWriting } from '../types/types'

export default function WordWriting ({ words, durationPerCh, waitWrited, waitErased }: IWordWriting) {
  const { currentWord, ref } = useWordWriting(words, durationPerCh, waitWrited, waitErased)

  return (
    <><div ref={ref} className='word'>{currentWord}</div><div className="blinker"></div></>
  )
}
