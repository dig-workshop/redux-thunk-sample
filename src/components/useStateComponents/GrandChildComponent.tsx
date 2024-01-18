import styles from '../styles/GrandChildComponent.module.scss'
import {GreatGrandChildComponent} from "./GreatGrandChildComponent.tsx";

type Props = {
    text: string
}

export const GrandChildComponent = (props: Props) => {
    console.log('UseState孫')
    return (
        <div className={styles.grandChildComponentArea}>
            <h3>UseState孫</h3>
            <GreatGrandChildComponent text={props.text}/>
        </div>
    )
}

