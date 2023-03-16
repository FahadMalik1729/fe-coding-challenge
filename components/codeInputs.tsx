import styles from './codeInputs.module.css';
import { useState } from 'react';
import { codeInputPropsType } from '../types';
import { promoCodes, customerCodes } from "../constants";

export default function CodeInput(props: codeInputPropsType) {
    let codeType = props.label.split(' ')[0];
    const [code,setCode] = useState<string>('');

    const onClickHandler = () => {
        if (code){
            if (code.length < 7) {
                alert('Please enter the 7 character code.'); return;
            }
            if (codeType === 'Promotion' && !promoCodes.find(el => el === code)) {
                alert('Invalid promotion code.'); return;
            }
            else if (codeType === 'Customer' && !customerCodes.find(el => el === code)) {
                alert('Invalid customer code.'); return;
            }
            if (codeType === 'Promotion') {
                alert('Promotion activated...Buy 2 Large burgers for the price of 1');
            }
            props.eventHandler(codeType);
        }
        else{
            alert('Please enter the code.');
        }
    }

    return (
        <div>
            <label htmlFor={"input" + codeType}>{props.label}:</label>
            <input className={styles.input} onChange={(e) => setCode(e.target.value)} type="text" name={"input" + codeType} id={"input" + codeType} maxLength={7}/>
            <button onClick={() => onClickHandler()}>Get Discount</button>
        </div>
    )
  }