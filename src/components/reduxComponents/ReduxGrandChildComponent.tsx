import styles from '../styles/GrandChildComponent.module.scss'
import {ReduxGreatGrandChildComponent} from "./ReduxGreatGrandChildComponent.tsx";

export const ReduxGrandChildComponent = () => {
    console.log('redux孫コンポーネント')
    return (
        <div className={styles.grandChildComponentArea}>
            <h3>孫</h3>
            <ReduxGreatGrandChildComponent/>
        </div>
    )
}

