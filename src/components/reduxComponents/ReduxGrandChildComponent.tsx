import styles from '../styles/GrandChildComponent.module.scss'
import {ReduxGreatGrandChildComponent} from "./ReduxGreatGrandChildComponent.tsx";

export const ReduxGrandChildComponent = () => {
    console.log('Redux孫')
    return (
        <div className={styles.grandChildComponentArea}>
            <h3>Redux孫</h3>
            <ReduxGreatGrandChildComponent/>
        </div>
    )
}

