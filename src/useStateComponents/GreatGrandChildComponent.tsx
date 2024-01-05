import styles from '../styles/GreatGrandChildComponent.module.scss'

type Props = {
  text: string
}

export const GreatGrandChildComponent = (props:Props)=> {

  return (
    <div className={styles.greatGrandChildComponentArea}>
      <h3>ひ孫</h3>
      <p>{props.text}</p>
    </div>
  )
}
