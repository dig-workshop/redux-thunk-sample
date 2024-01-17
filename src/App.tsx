import styles from './App.module.scss'
import {ChildComponent} from "./components/useStateComponents/ChildComponent.tsx";
import {useState} from "react";
import {ReduxChildComponent} from "./components/reduxComponents/ReduxChildComponent.tsx";
import {setReduxText} from "./redux/slices/TextSlice.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "./redux/Store.ts";
import axios, {AxiosResponse} from 'axios'
import {setPokemon} from "./redux/slices/PokemonSlice.ts";
import {getAndSetPokemonThunk} from "./redux/thunks/PokemonThunk.ts";
import {ReduxThunkChildComponent} from "./components/reduxThunkComponents/ReduxThunkChildComponent.tsx";

type PokeApiResponse = {
    name:string,
    sprites:{
        other:{
            showdown:{
                front_default:string
            }
        }
    }
}

export const App = () => {
    const [text, setText] = useState('')
    const dispatch: AppDispatch = useDispatch()
    console.log('親コンポーネント')

    const reduxClickEventHandler = async () => {

        // ポケモンをランダムに取得する関数
        const getRandomPokemon = async () => {
            const randomNum = Math.floor(Math.random()* 1000) + 1
            const res:AxiosResponse<PokeApiResponse> = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNum}`)
            return {
                name:res.data.name,
                imageUrl:res.data.sprites.other.showdown.front_default
            }
        }

        // 非同期処理の結果取得を待って、dispatch（ステートの更新）をする必要がある。
        // いろんなコンポーネントで書くとなると冗長なコードが増える
        const pokeObj = await getRandomPokemon()
        dispatch(setPokemon(pokeObj))
    }

    const reduxThunkClickEventHandler = async () => {
        // dispatchにアクションを指定するだけでOK
        // reducerで非同期処理の状態に応じた処理ができる（redux-thunkではない場合、スクラッチで書く必要があるのでコードが増える）
        // viewの汚染を防げる
        dispatch(getAndSetPokemonThunk())
    }

    return (
        <div className={styles.appArea}>
            <h1>UseStateとReduxの違い</h1>
            <p>値のバケツリレーをしなくて良くなる</p>
            <p>バケツリレーを解消するだけならUseContextでもOK</p>
            <p>必要なコンポーネントのみ再レンダリングするため、パフォーマンスの向上</p>
            <p>多くのアプリの場合、非同期処理が入るからReduxの方がおすすめ（この後説明するRedux-Thunkがあるから）</p>
            <div>
                <div>
                    <h2>UseStateの場合</h2>
                    <h3>親</h3>
                    <label htmlFor="useStateInput">ステートの値: </label>
                    <input name="useStateInput" type="text" onChange={(e) => setText(e.target.value)}/>
                    <ChildComponent text={text}/>
                </div>
                <div>
                    <h2>Reduxの場合</h2>
                    <h3>親</h3>
                    <label htmlFor="reduxInput">ステートの値: </label>
                    <input name="reduxInput" type="text" onChange={(e) => dispatch(setReduxText(e.target.value))}/>
                    <ReduxChildComponent/>
                </div>
            </div>

            <hr/>

            <h1>【本題】非同期処理を含むステート更新はRedux-Thunkがおすすめ！</h1>
            <p>非同期処理をした後にその結果をReduxやUseContextのステートに入れるならRedux-Thunkを使うとクール！</p>
            <p>動作は一緒だけどコード実装で便利になる（実装、テストコードの低減）</p>
            <p>Redux-Thunkを使うとpromiseのpending,fulfilled,rejectedの実装が楽になるよん</p>
            <div>
                <div>
                    <h2>Reduxの場合</h2>
                    <h3>親</h3>
                    <button onClick={reduxClickEventHandler}>pokeAPIのレスポンスをreduxステートにセット</button>
                    <ReduxThunkChildComponent />
                </div>
                <div>
                    <h2>Redux-Thunkの場合</h2>
                    <h3>親</h3>
                    <button onClick={reduxThunkClickEventHandler}>pokeAPIのレスポンスをreduxステートにセット</button>
                    <ReduxThunkChildComponent />
                </div>
            </div>
        </div>
    )
}
