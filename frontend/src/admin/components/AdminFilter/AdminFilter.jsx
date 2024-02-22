import React from 'react';
import c from './AdminFilter.module.scss'
import {Select} from "antd";
import {useSelector} from "react-redux";
import {collections} from "../../../data/collections";

function AdminFilter({onAddProduct, onSearch, searchValue, onClothingTypeChanged, clothingType, collection, onCollectionChanged, ...props}) {
    const {clothingTypes, loading, error} = useSelector(state => state.clothingType)
    const {collections, loading: collectionsLoading, error: collectionsError} = useSelector(state => state.collection)

    return (
        <div {...props} className={`${c.component} ${props.className}`}>
            <div className={c.left}>
                <div className={c.list}>
                    <div className={c.item}>Сортировать по:</div>
                    <Select
                        loading={loading}
                        disabled={loading || error}
                        rootClassName={c.select}
                        onChange={onClothingTypeChanged}
                        value={clothingType ?? ''}
                        options={[
                            {
                                label: 'Все',
                                value: '',
                            },
                            ...clothingTypes.map(c => ({label: c?.name, value: c?.name}))
                        ]}
                    />
                    <Select
                        style={{ marginLeft: 15 }}
                        loading={collectionsLoading}
                        disabled={collectionsLoading || collectionsError}
                        rootClassName={c.select}
                        onChange={onCollectionChanged}
                        value={collection ?? ''}
                        options={[
                            {
                                label: 'Все',
                                value: '',
                            },
                            ...collections.map(c => ({label: c?.name, value: c?.name}))
                        ]}
                    />
                </div>
            </div>
            <div className={c.right}>
                <div className={c.btns}>
                    <input onChange={onSearch} value={searchValue} className={c.input} type="text"
                           placeholder={'Поиск'}/>
                    <button className={c.btn} onClick={onAddProduct}>Добавить товар</button>
                </div>
            </div>
        </div>
    );
}

export default AdminFilter;