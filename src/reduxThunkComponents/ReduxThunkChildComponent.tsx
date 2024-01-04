import styles from '../styles/ChildComponent.module.scss'
import {ReduxThunkGrandChildComponent} from "./ReduxThunkGrandChildComponent.tsx";

export const ReduxThunkChildComponent = ()=> {

  return (
    <div className={styles.childComponentArea}>
        <h3>子</h3>
        <ReduxThunkGrandChildComponent/>
    </div>
  )
}

