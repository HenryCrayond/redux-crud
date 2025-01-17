import { configureStore } from '@reduxjs/toolkit'
import participantReducer from '../slice/participantSlice'
export const store = configureStore({
    reducer: {
        participant: participantReducer
    }
})