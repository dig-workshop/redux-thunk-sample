import {createSlice} from '@reduxjs/toolkit'
import {getAndSetPokemonThunk} from "../thunks/PokemonThunk.ts";

export type PokeObj = {
    status: 'initial' | 'pending' | 'fulfilled' | 'rejected',
    name: string,
    imageUrl: string
}

// ステートの型と初期値
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
        setPending: (_prevState) => {
            return {
                status: 'pending',
                name: '取得中...',
                imageUrl: '取得中...',
            }
        },
        setPokemon: (_prevState, action) => {
            return {
                status: 'fulfilled',
                name: action.payload.name,
                imageUrl: action.payload.imageUrl
            }
        },
        setRejected: (_prevState) => {
            return {
                status: 'rejected',
                name: '取得失敗',
                imageUrl: 'https://img.freepik.com/free-vector/red-prohibited-sign-no-icon-warning-or-stop-symbol-safety-danger-isolated-vector-illustration_56104-912.jpg?w=1480&t=st=1704434917~exp=1704435517~hmac=83f54db37c704470ca4b7cd5607efaacc682376f90b7f7f64611ff3cbbc2669b'
            }
        }
    },
    // 非同期処理を待って結果に応じて処理を分岐
    extraReducers: (builder) => {
        builder.addCase(getAndSetPokemonThunk.pending, () => {
            return {
                status: 'pending',
                name: '取得中...',
                imageUrl: '取得中...',
            }
        }).addCase(getAndSetPokemonThunk.fulfilled, (_prevState, action) => {
            return {
                ...action.payload,
                status: 'fulfilled',
            }
        }).addCase(getAndSetPokemonThunk.rejected, () => {
            return {
                status: 'rejected',
                name: '取得失敗',
                imageUrl: 'https://img.freepik.com/free-vector/red-prohibited-sign-no-icon-warning-or-stop-symbol-safety-danger-isolated-vector-illustration_56104-912.jpg?w=1480&t=st=1704434917~exp=1704435517~hmac=83f54db37c704470ca4b7cd5607efaacc682376f90b7f7f64611ff3cbbc2669b'
            }
        })
    }
})

// 各コンポーネントで使用するためにactionをエクスポート
export const {setPokemon,setPending,setRejected} = pokemonSlice.actions
