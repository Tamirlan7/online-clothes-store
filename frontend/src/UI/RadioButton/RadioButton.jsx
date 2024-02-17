import React, {useRef} from 'react';
import c from './RadioButton.module.scss'

function RadioButton({value, className, checked, onChange, label, ...props}) {

    const inputRef = useRef(null)

    const handleOnChange = () => {
        if (onChange) {
            onChange({
                target: {
                    value,
                    checked,
                    name: inputRef.current.name
                }
            })
        }
    }

    return (
        <div className={c.radio} onClick={() => handleOnChange()}>
            <input {...props}
                   value={value}
                   onChange={onChange}
                   className={`${className}`}
                   checked={checked}
                   ref={inputRef}
                   type={'radio'}
            />
            <label className={c['radio-label']}>{label}</label>
        </div>

    );
}

export default RadioButton;