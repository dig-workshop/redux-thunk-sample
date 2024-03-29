import styles from "./Difference.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {getAndSetPokemonThunk} from "../redux/thunks/PokemonThunk.ts";
import axios, {AxiosResponse} from "axios";
import {PokeObj, setPending, setPokemon, setRejected} from "../redux/slices/PokemonSlice.ts";
import {AppDispatch, RootState} from "../redux/Store.ts";

type PokeApiResponse = {
    name: string,
    sprites: {
        other: {
            showdown: {
                front_default: string
            }
        }
    }
}

export const DifferenceUseReduxAndReduxThunk = () => {
    const {status, name, imageUrl} = useSelector((state: RootState) => state.pokemonReducer)
    const dispatch: AppDispatch = useDispatch()

    const reduxClickEventHandler = async () => {

        // ポケモンをランダムに取得する関数
        const getRandomPokemon = async (): Promise<Pick<PokeObj, 'name' | 'imageUrl'> | undefined> => {
            const randomNum = Math.floor(Math.random() * 1000) + 1
            // const res: AxiosResponse<PokeApiResponse> = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNum}`,{timeout:2000})

            return axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNum}`, {timeout: 2000}).then((res: AxiosResponse<PokeApiResponse>) => {
                return {
                    name: res.data.name,
                    imageUrl: res.data.sprites.other.showdown.front_default
                }
            }).catch(() => {
                return undefined
            })

        }

        // 非同期処理の結果取得を待って、dispatch（ステートの更新）をする必要がある。
        // いろんなコンポーネントで書くとなると冗長なコードが増える
        dispatch(setPending())
        const pokeObj = await getRandomPokemon()
        if (pokeObj) {
            dispatch(setPokemon(pokeObj))
        } else {
            dispatch(setRejected())
        }
    }

    const reduxThunkClickEventHandler = async () => {
        // dispatchにアクションを指定するだけでOK
        // reducerで非同期処理の状態に応じた処理ができる（redux-thunkではない場合、スクラッチで書く必要があるのでコードが増える）
        // viewの汚染を防げる
        dispatch(getAndSetPokemonThunk())
    }

    return (
        <div className={styles.differenceArea}>
            <h1>Redux-Thunkの良いところ</h1>
            <h2>非同期処理の状態に応じてステート管理ができる（pending,fulfilled,rejected）</h2>
            <p>例えば下のボタンのような実装。pending,fulfilled,rejectedの状態を書くのって結構大変。そしていろんなviewに実装しなければならないとなるとコードが増える...</p>
            <p>こんな処理でもredux-thunkなら、viewに1行で書くだけで終わる。<strong>（下のボタンは同じ動作をしている項に見えるが、コードは異なるのでコード見てください）</strong></p>
            <h2>テストはredux側に集約される</h2>
            <p>メリットなのか分からん。（個人的にはpromiseの状態のテストが見易いから好き。sliceのテスト見て〜）</p>
            <div>
                <div>
                    <h2>Reduxの場合</h2>
                    <button onClick={reduxClickEventHandler}>pokeAPIのレスポンスをreduxステートにセット</button>
                    <div className={styles.pokemonArea}>
                        {status === 'pending' && <div className={styles.loading}>Loading...</div>}
                        {(status === 'fulfilled' || status === 'rejected') && <div>
                            <p>名前：{name}</p>
                            <img alt='pokeImage' src={imageUrl}/>
                        </div>}
                    </div>
                </div>
                <div>
                    <h2>Redux-Thunkの場合</h2>
                    <button
                        onClick={reduxThunkClickEventHandler}>pokeAPIのレスポンスをreduxステートにセット(redux-thunk)
                    </button>
                    <div className={styles.pokemonArea}>
                        {status === 'pending' && <div className={styles.loading}>Loading...</div>}
                        {(status === 'fulfilled' || status === 'rejected') && <div>
                            <p>名前：{name}</p>
                            <img alt='pokeImage' src={imageUrl}/>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}