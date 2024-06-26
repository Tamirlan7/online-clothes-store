import React, {useEffect} from 'react';
import './CollectionFilterButtons.scss'
import {useSelector} from "react-redux";
import Select from "../../UI/Select/Select";

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
                    disabledClassName={'drop__select__disabled'}
                    maxItems={clothingTypes.length >= 5 ? 5 : clothingTypes.length <= 0 ? 0 : clothingTypes.length + 1}
                    rootClassName={'drop__select'}
                    loading={loading}
                    disabled={loading || error || !clothingTypes.length}
                    onChange={handleOnChange}
                    value={clothingType}
                    options={[
                        {
                            text: 'Все',
                            value: '',
                        },
                        ...clothingTypes.map(c => ({text: c?.name, value: c?.name}))
                    ]}
                />
            </div>
        </div>
    );
}

export default CollectionFilterButtons;