import styles from '../styles/ChildComponent.module.scss'
import {ReduxGrandChildComponent} from "./ReduxGrandChildComponent.tsx";

export const ReduxChildComponent = () => {

    return (
        <div className={styles.childComponentArea}>
            <h3>子</h3>
            <ReduxGrandChildComponent/>
        </div>
    )
}

