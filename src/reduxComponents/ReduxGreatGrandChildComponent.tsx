import styles from '../styles/GreatGrandChildComponent.module.scss'
import {useSelector} from "react-redux";
import {RootState} from "../redux/store.ts";

export const ReduxGreatGrandChildComponent = ()=> {
    const text = useSelector((state:RootState)=> state.textReducer)

  return (
    <div className={styles.greatGrandChildComponentArea}>
        <h3>ひ孫</h3>
        <p>{text}</p>
    </div>
  )
}

