import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type ImageLoaded } from '../../types/types'

const initialState = [] as ImageLoaded[]

export const selectedPlayer = createSlice({
  name: 'imagesLoaded',
  initialState,
  reducers: {
    add: (state, { payload }: PayloadAction<string>) => {
      state.push({ id: payload, loaded: false })
    },
    multipleAdd: (state, { payload }: PayloadAction<string[]>) => {
      for (const id of payload) {
        if (state.find(e => e.id === id) != null) return
      }

      state.push(...payload.map(e => ({ id: e, loaded: false })))
    },
    setLoaded: (state, { payload }: PayloadAction<string>) => {
      const idx = state.findIndex(e => e.id === payload)

      if (idx < 0) return

      state[idx].loaded = true
    },
    removeAll: (state) => {
      state.splice(0, state.length)
    }
  }
})

export const { add, multipleAdd, setLoaded, removeAll } = selectedPlayer.actions

export default selectedPlayer.reducer
