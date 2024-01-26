import React from 'react';

const CollectionFilterButtons = () => {
    return (
        <div className='drop__buttons'>
            <div className='drop__container'>
                <input
                    className='drop__input'
                    placeholder='SEARCH'
                ></input>
                <div className='drop__buttons-container'>
                    <button className='drop__button'>HOODIE</button>
                    <button className='drop__button'>T-SHIRTS</button>
                    <button className='drop__button'>SCARF</button>
                    <button className='drop__button'>ACCESSORIES</button>
                    <button className='drop__button'>SALE %%%</button>
                </div>
            </div>
        </div>
    );
}

export default CollectionFilterButtons;