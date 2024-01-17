import styles from '../styles/GrandChildComponent.module.scss'
import {ReduxThunkGreatGrandChildComponent} from "./ReduxThunkGreatGrandChildComponent.tsx";

export const ReduxThunkGrandChildComponent = () => {

    return (
        <div className={styles.grandChildComponentArea}>
            <h3>孫</h3>
            <ReduxThunkGreatGrandChildComponent/>
        </div>
    )
}

