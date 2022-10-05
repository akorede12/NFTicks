import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './features/modal'

export const store = configureStore({
    reducer: {
        modal: modalReducer
    },
})