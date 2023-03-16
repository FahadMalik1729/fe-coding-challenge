import styles from './burgerCard.module.css';
import {burgerCardPropsType} from '../types';
import { splitAtCapital } from '../utils/functions';
import { useState } from 'react';

export default function BurgerCard(props: burgerCardPropsType) {
    let name= '';
    name = splitAtCapital(props.burgerName);
    const [size,setSize] = useState<string>('Small');

    return (
      <div className={styles.card}>
        <p className={styles.flexItem}>{name}</p>
        <select name="sizes" id="sizes" aria-label="Burger Sizes" onChange={(e) => setSize(e.target.value)}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
        </select>
        <div className={styles.flexItem}>
            <button className={styles.count} onClick={() => props.eventHandler(name,size,'dec')}>-</button>
        </div>
        <div className={styles.flexItem}>
            <button className={styles.count} onClick={() => props.eventHandler(name,size,'inc')}>+</button>
        </div>
      </div>
    )
  }