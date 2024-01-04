import {createSlice} from '@reduxjs/toolkit'
import {getAndSetPokemonThunk} from "./getAndSetPokemonThunk.ts";

export type PokeObj = {
    name:string,
    imageUrl:string

}

const initialState: PokeObj = {
    name:'initial-999',
    imageUrl:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/999.png'

}

export const pokeSlice = createSlice({
    name: 'pokeSlice',
    initialState: initialState,
    reducers: {
        setPokemon: (_prevState, action) => {
            return {
                name:action.payload.name,
                imageUrl: action.payload.imageUrl
            }

        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAndSetPokemonThunk.fulfilled, (_prevState, action) => {
            return action.payload
        })
    }
})

export const { setPokemon } = pokeSlice.actions
