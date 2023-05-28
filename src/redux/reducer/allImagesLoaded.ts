import { createSlice } from '@reduxjs/toolkit'

const initialState = false

export const selectedPlayer = createSlice({
  name: 'allImagesLoaded',
  initialState,
  reducers: {
    setTrue: (state) => true
  }
})

export const { setTrue } = selectedPlayer.actions

export default selectedPlayer.reducer
