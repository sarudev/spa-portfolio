export interface ImageLoaded {
  id: string
  loaded: boolean
}

export interface IWordWriting {
  words: string[]
  durationPerCh: number
  waitWrited: number
  waitErased: number
}
