import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";
import {PokeObj} from "./pokeSlice.ts";

export const getAndSetPokemonThunk = createAsyncThunk(
    'getAndSetPokemonThunk',
    async (): Promise<PokeObj> => {
        const randomNum = Math.floor(Math.random() * 1000) + 1
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNum}`)

        return {
            name:res.data.name,
            imageUrl:res.data.sprites.other.showdown.front_default
        }
    }
)
