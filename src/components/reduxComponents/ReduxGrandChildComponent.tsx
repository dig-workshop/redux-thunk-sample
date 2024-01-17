import styles from '../styles/GrandChildComponent.module.scss'
import {ReduxGreatGrandChildComponent} from "./ReduxGreatGrandChildComponent.tsx";

export const ReduxGrandChildComponent = () => {

    return (
        <div className={styles.grandChildComponentArea}>
            <h3>孫</h3>
            <ReduxGreatGrandChildComponent/>
        </div>
    )
}

