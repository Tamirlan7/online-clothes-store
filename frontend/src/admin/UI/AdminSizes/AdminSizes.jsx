import React from 'react';
import c from './AdminSizes.module.scss'
import AdminInput from "../AdminInput/AdminInput";

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
            console.log(newValue)
            onChange(size, newValue)
        }
    }

    return (
        <div className={c.sizes}>
            {Array.isArray(sizes) && sizes.map((size, idx) => (
                <div className={c.size} key={idx}>
                    <div className={c['size-name']}>{size.sizeLabel}</div>
                    <div>
                        <AdminInput value={size.value}
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