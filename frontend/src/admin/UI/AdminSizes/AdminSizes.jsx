import React from 'react';
import c from './AdminSizes.module.scss'
import Input from "../../../UI/Input/Input";

function AdminSizes({ sizes, onChange }) {

    /*
    * sizes: Size[]
    *
    * Size: {
    *   sizeLabel: string
    *   value: string
    *   invalid: boolean
    * }
    *  */

    const handleOnChange = (size, newValue) => {
        if (size.value === newValue) {
            return null
        }

        if (onChange) {
            onChange(size, newValue)
        }
    }

    return (
        <div className={c.sizes}>
            {Array.isArray(sizes) && sizes.map((size, idx) => (
                <div className={c.size} key={idx}>
                    <div className={c['size-name']}>{size.sizeLabel}</div>
                    <div>
                        <Input value={size.value}
                               invalid={size.invalid}
                               className={c.input}
                               mode={'numeric'}
                               onChange={(e) => handleOnChange(size, e.target.value)} />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AdminSizes;