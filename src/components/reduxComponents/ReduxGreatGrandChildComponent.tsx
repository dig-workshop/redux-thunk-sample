import styles from '../styles/GreatGrandChildComponent.module.scss'
import {useSelector} from "react-redux";
import {RootState} from "../../redux/Store.ts";

export const ReduxGreatGrandChildComponent = () => {
    const text = useSelector((state: RootState) => state.textReducer)
    console.log('reduxひ孫コンポーネント')
    return (
        <div className={styles.greatGrandChildComponentArea}>
            <h3>ひ孫</h3>
            <p>受け取った値: {text}</p>
        </div>
    )
}
