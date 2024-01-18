import styles from "./Difference.module.scss"
import {ChildComponent} from "./useStateComponents/ChildComponent.tsx";
import {setReduxText} from "../redux/slices/TextSlice.ts";
import {ReduxChildComponent} from "./reduxComponents/ReduxChildComponent.tsx";
import {useState} from "react";
import {useDispatch} from "react-redux";

export const DifferenceUseStateAndRedux = () => {
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    console.log('親コンポーネント')

    return (
        <div className={styles.differenceArea}>
            <h1>UseStateよりReduxの方が良いところ</h1>
            <p>値のバケツリレーをしなくて良くなる(コード参照)</p>
            <p>ステートを更新する場合、UseStateではバケツリレーをしたコンポーネント全てを再レンダリングするが、Reduxでは対象のステートを使用しているコンポーネントのみ再レンダリングするためパフォーマンスが向上する（ステートの値を変えてコンソールのログ参照）</p>
            <p>バケツリレーを解消するだけならUseContext+UseStateでもOKだが、これはアンチパターンでもあるので扱いには注意しないと不要なレンダリングが発生しがち。下手に使うくらいならUseStateバケツリレーのがマシである。</p>
            <p>非同期処理とステートの更新がセットになるアプリケーションは、Redux-Thunkで綺麗にかけるのでReduxの方がおすすめ（多少の慣れは必要）</p>
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

        </div>
    )
}