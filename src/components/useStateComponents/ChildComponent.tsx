import styles from '../styles/ChildComponent.module.scss'
import {GrandChildComponent} from "./GrandChildComponent.tsx";

type Props = {
    text: string
}

export const ChildComponent = (props: Props) => {
    console.log('子コンポーネント')
    return (
        <div className={styles.childComponentArea}>
            <h3>子</h3>
            <GrandChildComponent text={props.text}/>
        </div>
    )
}

