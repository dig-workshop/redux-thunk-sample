import styles from './App.module.scss'
import axios, {AxiosResponse} from 'axios'
import {ChildComponent} from "./useStateComponents/ChildComponent.tsx";
import {useState} from "react";
import {ReduxChildComponent} from "./reduxComponents/ReduxChildComponent.tsx";
import {setReduxText} from "./redux/textSlice.ts";
import {useDispatch} from "react-redux";
import {getAndSetPokemonThunk} from "./redux/getAndSetPokemonThunk.ts";
import {AppDispatch} from "./redux/store.ts";
import {setPokemon} from "./redux/pokeSlice.ts";
import {ReduxThunkChildComponent} from "./reduxThunkComponents/ReduxThunkChildComponent.tsx";

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
    const dispatch:AppDispatch = useDispatch()

    const getRandomPokemon = async () => {
        const randomNum = Math.floor(Math.random()* 1000) + 1
        const res:AxiosResponse<PokeApiResponse> = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNum}`)
        return {
            name:res.data.name,
            imageUrl:res.data.sprites.other.showdown.front_default
        }
    }

    const reduxClickEventHandler = async () => {
        const pokeObj = await getRandomPokemon()
        dispatch(setPokemon(pokeObj))
    }

    const reduxThunkClickEventHandler = async () => {
        dispatch(getAndSetPokemonThunk())
    }

    return (
        <div className={styles.appArea}>
            <h1>UseStateとReduxの違い</h1>
            <p>値のバケツリレーをしなくて良くなる</p>
            <p>バケツリレーを解消するだけならUseContextでもOK</p>
            <p>多くのアプリの場合、非同期処理が入るからReduxの方がおすすめ（この後説明するRedux-Thunkがあるから）</p>
            <div>
                <div>
                    <h2>UseStateの場合</h2>
                    <label htmlFor="useStateInput">ひ孫コンポーネントに渡すステートの値：</label>
                    <input name="useStateInput" type="text" onChange={(e) => setText(e.target.value)}/>
                    <ChildComponent text={text}/>
                </div>
                <div>
                    <h2>Reduxの場合</h2>
                    <label htmlFor="reduxInput">ひ孫コンポーネントに渡すステートの値：</label>
                    <input name="reduxInput" type="text" onChange={(e) => dispatch(setReduxText(e.target.value))}/>
                    <ReduxChildComponent/>
                </div>
            </div>

            <hr/>

            <h1>【本題】非同期処理を含むステート更新はRedux-Thunkがおすすめ！</h1>
            <p>非同期処理をした後にその結果をReduxやUseContextのステートに入れるならRedux-Thunkを使うとクール！</p>
            <p>動作は一緒だが、コード実装で便利になるよん</p>
            <div>
                <div>
                    <h2>Reduxの場合</h2>
                    <button onClick={reduxClickEventHandler}>pokeAPIのレスポンスをreduxステートにセット</button>
                    <ReduxThunkChildComponent />
                </div>
                <div>
                    <h2>Redux-Thunkの場合</h2>
                    <button onClick={reduxThunkClickEventHandler}>pokeAPIのレスポンスをreduxステートにセット</button>
                    <ReduxThunkChildComponent />
                </div>
            </div>
        </div>
    )
}
