import React, {useMemo, useRef, useState} from 'react';
import c from './Select.module.scss'
import {ReactComponent as ArrayDown} from "../../assets/icons/arrow-down.svg";
import {useOutsideClick} from "../../hooks/useOutsideClick";
import Loader from "../Loader/Loader";

function Select({options, value, onChange, loading, disabledClassName, onAddClicked, disabled, rootClassName, addMoreEnabled = false, optionHeight = 42, maxItems = 7}) {
    const [isOptionsVisible, setIsOptionsVisible] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const [addMoreClicked, setAddMoreClicked] = useState(false)
    const ref = useOutsideClick(() => {
        hideOptions()
    })
    const inputRef = useRef(null)
    const [inputValue, setInputValue] = useState('')
    const transformedMaxItems = useMemo(() => {
        if (addMoreClicked) {
            return maxItems + 1
        }

        return maxItems
    }, [maxItems, addMoreClicked])

    /*
    * options: Option[]
    *
    * Option: {
    *  text: string,
    *  value: string,
    * }
    * */

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


    const currentValue = useMemo(() => {
        return transformedOptions.find(option => option?.value === value)?.text
    }, [transformedOptions, value])

    const hideOptions = () => {
        if (isOptionsVisible) {
            setIsOptionsVisible(false)
            setIsFocused(false)
            setAddMoreClicked(false)
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

    const onAddMore = () => {
        if (!addMoreClicked) {
            setAddMoreClicked(true)
            inputRef.current?.focus()
            console.log(inputRef)
            return;
        }

        if (onAddClicked) {
            setAddMoreClicked(false)
            onAddClicked(inputValue)
        }
    }

    const toggleOptionsVisibility = () => {
        if (disabled || loading) {
            return
        }

        setAddMoreClicked(isOptionsVisible)
        setIsOptionsVisible((prev) => !prev)
        setIsFocused((prev) => !prev)
    }

    if (loading) {
        return (
            <div className={c['select-loading']}>
                <Loader rootClassName={c['loader-wrapper']} loaderClassName={c.loader}/>
                <span>Загружаем данные...</span>
            </div>
        )
    }


    return (
        <div ref={ref}
             className={isFocused ? `${c.select} ${c['select-focused']} ${rootClassName}` : `${rootClassName} ${c.select} ${disabled && `${c['select-disabled']} ${disabledClassName}`}`}
             onClick={() => toggleOptionsVisibility()}>
            <div className={c.value}>
                {currentValue}
            </div>

            <div style={{ height: optionHeight * transformedMaxItems }} onClick={(e) => e.stopPropagation()}
                 className={isOptionsVisible ? `${c.options} ${c['options-visible']}` : `${c.options} ${c['options-hidden']}`}>
                {Array.isArray(transformedOptions) && transformedOptions.map((option, idx) => (
                    <div className={c.option} onClick={() => handleOnChange(option?.value)}
                         key={idx}>{option?.text}</div>
                ))}
                {addMoreClicked && (
                    <input ref={inputRef} onChange={(e) => setInputValue(e.target.value)} value={inputValue} type="text" className={`${c.option} ${c.add} ${c.input}`} />
                )}
                {addMoreEnabled && (
                    <div className={`${c.option} ${c.add}`} onClick={onAddMore}>+ Добавить...</div>
                )}
            </div>

            <figure className={c.icon}>
                <ArrayDown/>
            </figure>
        </div>
    );
}

export default Select;