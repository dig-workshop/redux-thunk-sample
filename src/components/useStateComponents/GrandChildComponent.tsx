import styles from '../styles/GrandChildComponent.module.scss'
import {GreatGrandChildComponent} from "./GreatGrandChildComponent.tsx";

type Props = {
    text: string
}

export const GrandChildComponent = (props: Props) => {
    console.log('孫コンポーネント')
    return (
        <div className={styles.grandChildComponentArea}>
            <h3>孫</h3>
            <GreatGrandChildComponent text={props.text}/>
        </div>
    )
}

