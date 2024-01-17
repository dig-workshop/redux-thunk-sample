import styles from '../styles/GreatGrandChildComponent.module.scss'
import {useSelector} from "react-redux";
import {RootState} from "../../redux/Store.ts";

export const ReduxThunkGreatGrandChildComponent = () => {
    const {status, name, imageUrl} = useSelector((state: RootState) => state.pokeReducer)

    return (
        <div className={styles.greatGrandChildComponentArea}>
            <h3>ひ孫</h3>
            {status === 'pending' && <div className={styles.loading}>Loading...</div>}
            {(status === 'fulfilled' || status === 'rejected') && <div>
                <p>名前：{name}</p>
                <img alt='pokeImage' src={imageUrl}/>
            </div>}
        </div>
    )
}

