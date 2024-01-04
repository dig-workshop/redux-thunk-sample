import styles from '../styles/GreatGrandChildComponent.module.scss'
import {useSelector} from "react-redux";
import {RootState} from "../redux/store.ts";

export const ReduxThunkGreatGrandChildComponent = ()=> {
    const {name, imageUrl} = useSelector((state:RootState)=> state.pokeReducer)

  return (
    <div className={styles.greatGrandChildComponentArea}>
        <h3>ひ孫</h3>
        <p>名前：{name}</p>
        <img alt='pokeImage' src={imageUrl}/>
    </div>
  )
}

