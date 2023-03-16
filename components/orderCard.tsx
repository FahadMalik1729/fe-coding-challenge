import styles from './orderCard.module.css';
import { orderCardPropsType } from '../types';
import { promoCodes, customerCodes } from "../constants";

export default function OrderCard(props: orderCardPropsType) {

    return (
        <div className={styles.card}>
            <p className={styles.flexItem}>{props.burger}</p>
            <p className={styles.flexItem}>{props.size}</p>
            <p className={styles.flexItem}>{props.quantity}</p>
            <p className={styles.flexItem}>$ {props.price}</p>
        </div>
    )
  }