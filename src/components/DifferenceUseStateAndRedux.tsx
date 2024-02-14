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
            <p>Reduxのいいところは、バケツリレー解消と雑に扱っても不要なレンダリングが発生しないことがあります。（あと堅牢とか）</p>
            <h2>値のバケツリレーをしなくて良くなるについて</h2>
            <p><strong>（コード参照）</strong></p>
            <h2>不要なレンダリングについて</h2>
            <p>ステートを更新する時、UseStateではバケツリレーをしたコンポーネント全てを再レンダリングする。</p>
            <p>Reduxでは対象のステートを使用しているコンポーネントのみ再レンダリングするためパフォーマンスが向上する</p>
            <p><strong>（ステートの値を変えてコンソールのログを見てみましょう）</strong></p>
            <p>バケツリレーを解消するだけならUseContext+UseStateでもOKだが、Context を更新したら、その Context を利用しているコンポーネントがすべて再レンダリングされてしまうのでこれも良くない。</p>
            <p>扱いには注意しないと不要なレンダリングが発生しがち。下手に使うくらいならUseStateバケツリレーのがマシまである。アンチパターンとか書いてる記事もあります。対策もあるらしいのでこのパターンを使うなら調べてみてください。</p>
            <p>非同期処理とステートの更新がセットになるアプリケーションは、Redux-Thunkで綺麗にかけるのでReduxの方がおすすめ</p>
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