import { configureStore } from '@reduxjs/toolkit'
import { textSlice } from './textSlice.ts'
import {pokeSlice} from "./pokeSlice.ts";

export const store = configureStore({
    reducer: {
        textReducer: textSlice.reducer,
        pokeReducer: pokeSlice.reducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch