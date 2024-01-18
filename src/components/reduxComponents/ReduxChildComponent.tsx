import styles from '../styles/ChildComponent.module.scss'
import {ReduxGrandChildComponent} from "./ReduxGrandChildComponent.tsx";

export const ReduxChildComponent = () => {
    console.log('Redux子')
    return (
        <div className={styles.childComponentArea}>
            <h3>Redux子</h3>
            <ReduxGrandChildComponent/>
        </div>
    )
}

