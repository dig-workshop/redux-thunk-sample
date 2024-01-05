import { configureStore } from '@reduxjs/toolkit'
import { textSlice } from './TextSlice.ts'
import {pokemonSlice} from "./PokemonSlice.ts";

export const store = configureStore({
    reducer: {
        textReducer: textSlice.reducer,
        pokeReducer: pokemonSlice.reducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch