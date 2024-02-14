import React from 'react';
import c from './AdminFilter.module.scss'
import {Select} from "antd";
import {useSelector} from "react-redux";

function AdminFilter({onAddProduct, onSearch, searchValue, onSort, sortValue, ...props}) {
    const {clothingTypes, loading} = useSelector(state => state.clothingType)

    return (
        <div {...props} className={`${c.component} ${props.className}`}>
            <div className={c.left}>
                <div className={c.list}>
                    <div className={c.item}>Сортировать по:</div>
                    <Select
                        loading={loading}
                        disabled={loading}
                        rootClassName={c.select}
                        onChange={onSort}
                        value={sortValue}
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