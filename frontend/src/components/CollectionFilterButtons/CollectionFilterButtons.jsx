import React, {useRef} from 'react';
import './CollectionFilterButtons.scss'

const CollectionFilterButtons = ({
    buttonValue,
    onButtonValueChange,
    searchTextValue,
    onSearchTextValueChange
                                 }) => {

    const buttonLastValue = useRef('');

    const buttons = [
        'HOODIE',
        'T-SHIRT',
        'SCARF',
        'ACCESSORIES',
        'SALE %%%',
    ]

    const handleOnBtnClick = (value) => {
        if (buttonLastValue.current === value) {
            value = ''
        }

        buttonLastValue.current = value
        onButtonValueChange(value)
    }

    return (
        <div className='drop__buttons'>
            <div className='drop__container'>
                <input
                    className='drop__input'
                    placeholder='SEARCH'
                    value={searchTextValue}
                    onChange={(e) => onSearchTextValueChange(e.target.value)}
                />

                <div className='drop__buttons-container'>
                    {buttons.map((btn, idx) => (
                        <button onClick={() => handleOnBtnClick(btn)} key={idx} className={buttonValue === btn ? 'drop__button drop__button__selected' : 'drop__button'}>
                            {btn}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CollectionFilterButtons;