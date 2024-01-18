import { configureStore } from '@reduxjs/toolkit'
import { textSlice } from './slices/TextSlice.ts'
import {pokemonSlice} from "./slices/PokemonSlice.ts";

export const store = configureStore({
    reducer: {
        textReducer: textSlice.reducer,
        pokemonReducer: pokemonSlice.reducer,
    },
})

// 各コンポーネントでステートを利用できるようにするためにエクスポート（ステートを読み込みたい時に使う）
export type RootState = ReturnType<typeof store.getState>

// 各コンポーネントでdispatchを利用できるようにするためにエクスポート（ステート更新をしたい時に使う）
// redux-thunkを使用しない場合、このエクスポートは不要
export type AppDispatch = typeof store.dispatch