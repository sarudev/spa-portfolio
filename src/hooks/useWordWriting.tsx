import { useLayoutEffect, useRef, useState } from 'react'

export default function useWordWriting (words: string[], durationPerCh: number, waitWrited: number, waitErased: number) {
  const [currentWord, setCurrentWord] = useState(words[0])

  const index = useRef(0)
  const firstRender = useRef(true)
  const wordLength = useRef(words[0].length)
  const timeoutId = useRef<unknown>()
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }

    const animationText = `${durationPerCh * wordLength.current}ms steps(${wordLength.current}) forwards`

    writeWord()

    function writeWord () {
      ref.current!.style.setProperty('--width', `${wordLength.current}ch`)
      ref.current!.style.animation = `write ${animationText}`

      timeoutId.current = setTimeout(() => {
        eraseWord()
      }, durationPerCh * wordLength.current + waitWrited)
    }

    function eraseWord () {
      ref.current!.style.animation = `write-back ${animationText}`

      timeoutId.current = setTimeout(() => {
        index.current = index.current + 1 >= words.length ? 0 : index.current + 1
        wordLength.current = words[index.current].length
        setCurrentWord(words[index.current])
      }, durationPerCh * wordLength.current + waitErased)
    }

    return () => {
      clearTimeout(timeoutId.current as NodeJS.Timeout)
    }
  }, [currentWord])

  return { currentWord, ref }
}
