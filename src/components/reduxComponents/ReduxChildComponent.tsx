import styles from '../styles/ChildComponent.module.scss'
import {ReduxGrandChildComponent} from "./ReduxGrandChildComponent.tsx";

export const ReduxChildComponent = () => {
    console.log('redux子コンポーネント')
    return (
        <div className={styles.childComponentArea}>
            <h3>子</h3>
            <ReduxGrandChildComponent/>
        </div>
    )
}

