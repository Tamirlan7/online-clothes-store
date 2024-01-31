import React from 'react';
import c from './ProductsTableRow.module.scss'
import cTable from '../ProductsTable/ProductsTable.module.scss'
import { ReactComponent as TableDots } from "../../../assets/icons/table-dots.svg";
import { ReactComponent as Copy } from "../../../assets/icons/copy.svg";
import { ReactComponent as Trash } from "../../../assets/icons/trash.svg";
import pImage from '../../../assets/temp/Rectangle 21.png'


function ProductsTableRow({
    name,
    productMediaFiles,
    productSizes,
    price,
                          }) {
    return (
        <div className={c.row}>
            <div className={`${c.cell} ${cTable['checkbox-cell']}`}>
                <figure><TableDots/></figure>
            </div>
            <div className={`${c.cell} ${cTable['image-cell']}`}>
                <img src={pImage} alt="product"/>
            </div>
            <div className={`${c.cell} ${cTable['name-cell']}`}>
                <div className={c['name-inner-cell']}>
                    <span className={c.name}>Jersey CAMO</span>
                    <div className={c.options}>
                        <div>4 варианта</div>
                        <span>+</span>
                    </div>
                </div>
            </div>
            <div className={`${c.cell} ${cTable['description-cell']}`}>
                <button className={c['description-btn']}>Открыть описание</button>
            </div>
            <div className={`${c.cell} ${cTable['collection-cell']}`}>
                <div className={c.dropdown}>
                    Advanced Gear
                </div>
            </div>
            <div className={`${c.cell} ${cTable['price-cell']}`}>
                <div>2 500</div>
            </div>
            <div className={`${c.cell} ${cTable['discount-cell']}`}>
                <div>2 300</div>
            </div>
            <div className={`${c.cell} ${cTable['count-cell']}`}>
                <div>33</div>
            </div>
            <div className={`${c.cell} ${cTable['copy-cell']}`}>
                <figure><Copy /></figure>
            </div>
            <div className={`${c.cell} ${cTable['visible-cell']}`}>
                switch
            </div>
            <div className={`${c.cell} ${cTable['delete-cell']}`}>
                <figure><Trash /></figure>
            </div>
        </div>
    );
}

export default ProductsTableRow;