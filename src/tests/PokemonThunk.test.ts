import {vi} from 'vitest'
import {getAndSetPokemonThunk} from "../redux/PokemonThunk.ts";
import axios from "axios";

vi.mock('axios')

describe('PokemonThunk Tests', () => {
    test('getAndSetPokemonThunkを呼んだ時、axiosを正しい引数で呼んでいること', async () => {
        vi.spyOn(Math, 'floor').mockReturnValue(0);

        // コンポーネント外でdispatch無しでthunk関数を呼ぶにはこのようにする（特許出願中）
        await getAndSetPokemonThunk()(vi.fn(), vi.fn(), vi.fn())

        expect(axios.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/1', {timeout: 2000})
    })

    test('getAndSetPokemonThunkを呼んだ時、payloadの値が正しい値になっていること', async () => {
        vi.mocked(axios.get).mockResolvedValue({
            data: {
                name: 'hoge1',
                sprites: {
                    other: {
                        showdown: {
                            front_default: 'hoge2'
                        }
                    }
                }
            }
        })

        const result = await getAndSetPokemonThunk()(vi.fn(), vi.fn(), vi.fn())

        expect(result.payload).toEqual({
            "imageUrl": "hoge2",
            "name": "hoge1",
            "status": "fulfilled",
        })
    })
})
