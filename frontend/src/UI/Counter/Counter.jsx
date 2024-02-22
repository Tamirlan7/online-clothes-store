import React from 'react';
import c from './Counter.module.scss'
import Input from "../Input/Input";

function Counter({rootClassName, inputClassName, value, onChange, min = 1}) {

    const increment = () => handleOnChange(Number(value) + 1)
    const decrement = () => handleOnChange(Number(value) <= 0 ? 0 : Number(value - 1))

    const handleOnChange = (updatedValue) => {
        if (updatedValue === value) {
            return
        }

        if (typeof updatedValue === 'string' && updatedValue.trim() === '') {
            updatedValue = 1
        }

        if (updatedValue < min) {
            updatedValue = min;
        }

        if (onChange) {
            onChange(updatedValue)
        }
    }

    return (
        <div className={`${rootClassName} ${c.block}`}>
            <button className={`${c.btn} ${c.decrement}`} onClick={decrement}>-</button>
            <div className={c.value}>
                <Input
                    focusable={false}
                    hoverable={false}
                    value={value}
                    onChange={(e) => handleOnChange(e.target.value)}
                    mode={'numeric'}
                    className={`${inputClassName} ${c.input}`}
                />
            </div>
            <button className={`${c.btn} ${c.inrement}`} onClick={increment}>+</button>
        </div>
    );
}

export default Counter;