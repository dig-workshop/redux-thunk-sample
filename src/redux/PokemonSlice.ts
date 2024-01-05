import {createSlice} from '@reduxjs/toolkit'
import {getAndSetPokemonThunk} from "./PokemonThunk.ts";

export type PokeObj = {
    status: 'initial' | 'pending' | 'fulfilled' | 'rejected',
    name: string,
    imageUrl: string
}

const initialState: PokeObj = {
    status: 'initial',
    name: 'initial',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/999.png'
}

export const pokemonSlice = createSlice({
    name: 'pokeSlice',
    initialState: initialState,

    // actionがオブジェクトの場合reducersを使う。関数の場合extraReducersを使う。

    // 即座にステートを更新する
    reducers: {
        setPokemon: (_prevState, action) => {
            return {
                status: 'fulfilled',
                name: action.payload.name,
                imageUrl: action.payload.imageUrl
            }

        },
    },
    // 非同期処理を待って結果に応じて処理を分岐
    extraReducers: (builder) => {
        builder.addCase(getAndSetPokemonThunk.pending, () => {
            return {
                status: 'pending',
                name: 'Pending...',
                imageUrl: 'https://usagif.com/wp-content/uploads/loading-58.gif'
            }
        }).addCase(getAndSetPokemonThunk.fulfilled, (_prevState, action) => {
            return action.payload
        }).addCase(getAndSetPokemonThunk.rejected, () => {
            return {
                status: 'rejected',
                name: '取得失敗',
                imageUrl: 'https://img.freepik.com/free-vector/red-prohibited-sign-no-icon-warning-or-stop-symbol-safety-danger-isolated-vector-illustration_56104-912.jpg?w=1480&t=st=1704434917~exp=1704435517~hmac=83f54db37c704470ca4b7cd5607efaacc682376f90b7f7f64611ff3cbbc2669b'
            }
        })
    }
})

export const {setPokemon} = pokemonSlice.actions
