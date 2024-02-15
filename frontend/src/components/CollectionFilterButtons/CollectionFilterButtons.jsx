import React from 'react';
import './CollectionFilterButtons.scss'
import {Select} from "antd";
import {useSelector} from "react-redux";

const CollectionFilterButtons = ({
    clothingType,
    onClothingTypeChanged,
    searchTextValue,
    onSearchTextValueChange
                                 }) => {

    const {clothingTypes, loading, error} = useSelector(state => state.clothingType)

    const handleOnChange = (value) => {
        if (onClothingTypeChanged) {
            onClothingTypeChanged(value)
        }
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

                <Select
                    loading={loading}
                    disabled={loading || error}
                    className={'drop__select'}
                    onChange={handleOnChange}
                    value={clothingType}
                    options={[
                        {
                            label: 'Все',
                            value: '',
                        },
                        ...clothingTypes.map(c => ({label: c?.name, value: c?.name}))
                    ]}
                />
            </div>
        </div>
    );
}

export default CollectionFilterButtons;