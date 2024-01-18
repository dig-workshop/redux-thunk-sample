import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";
import {PokeObj} from "../slices/PokemonSlice.ts";

export const getAndSetPokemonThunk = createAsyncThunk(
    'getAndSetPokemonThunk',
    async (): Promise<PokeObj> => {

        // ポケモンをランダムに取得するための乱数生成
        const randomNum = Math.floor(Math.random() * 1000) + 1

        // ポケモンAPIを叩く　成功したらレスポンスを返す　失敗したらエラーを投げる
        return axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNum}`, {timeout: 2000})
            .then((res) => {
                return {
                    name: res.data.name,
                    imageUrl: res.data.sprites.other.showdown.front_default
                } as PokeObj
            })
            .catch((error) => {
                throw Error(error)
            })

    }
)
