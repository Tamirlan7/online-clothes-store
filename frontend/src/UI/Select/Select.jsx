import React, {useMemo, useState} from 'react';
import c from './Select.module.scss'
import { ReactComponent as ArrayDown } from "../../assets/icons/arrow-down.svg";
import {useOutsideClick} from "../../hooks/useOutsideClick";

function Select({ options, value, onChange }) {
    const [isOptionsVisible, setIsOptionsVisible] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const ref = useOutsideClick(() => {
        hideOptions()
    })
    const transformedOptions = useMemo(() => {
        let selectedOption = null

        let newOptions = [...options].filter(option => {
            if (option.value !== value) {
                return true
            }

            selectedOption = option
            return false
        })

        if (selectedOption == null) {
            return options
        }

        newOptions = [selectedOption, ...newOptions]
        return newOptions
    }, [options, value])


    /*
    * options: Option[]
    *
    * Option: {
    *  text: string,
    *  value: string,
    * }
    * */

    const hideOptions = () => {
        if (isOptionsVisible) {
            setIsOptionsVisible(false)
            setIsFocused(false)
        }
    }

    const handleOnChange = (newValue) => {
        if (value !== newValue) {
            if (onChange) {
                onChange(newValue)
            }

            toggleOptionsVisibility()
        }
    }

    const toggleOptionsVisibility = () => {
        setIsOptionsVisible((prev) => !prev)
        setIsFocused((prev) => !prev)
    }

    return (
        <div ref={ref} className={isFocused ? `${c.select} ${c['select-focused']}` : `${c.select}`} onClick={() => toggleOptionsVisibility()}>
            <div className={c.value}>
                {transformedOptions.find(option => option.value === value).text}
            </div>

            <div onClick={(e) => e.stopPropagation()} className={isOptionsVisible ? `${c.options} ${c['options-visible']}` : `${c.options} ${c['options-hidden']}`}>
                {Array.isArray(transformedOptions) && transformedOptions.map((option, idx) => (
                    <div className={c.option} onClick={() => handleOnChange(option.value)} key={idx}>{option.text}</div>
                ))}
            </div>

            <figure className={c.icon}>
                <ArrayDown />
            </figure>
        </div>
    );
}

export default Select;