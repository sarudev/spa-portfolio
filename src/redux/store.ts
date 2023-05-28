import { configureStore } from '@reduxjs/toolkit'
import imagesLoaded from './reducer/imagesLoaded'
import allImagesLoaded from './reducer/allImagesLoaded'

const store = configureStore({
  reducer: {
    imagesLoaded,
    allImagesLoaded
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
