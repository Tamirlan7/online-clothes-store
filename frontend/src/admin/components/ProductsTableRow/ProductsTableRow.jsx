import React, {useState} from 'react';
import c from './ProductsTableRow.module.scss'
import cTable from '../ProductsTable/ProductsTable.module.scss'
import { ReactComponent as TableDots } from "../../../assets/icons/table-dots.svg";
import { ReactComponent as Copy } from "../../../assets/icons/copy.svg";
import { ReactComponent as Trash } from "../../../assets/icons/trash.svg";
import pImage from '../../../assets/temp/Rectangle 21.png'
import Switch from "../../../UI/Switch/Switch";


function ProductsTableRow({
    name,
    productMediaFiles,
    productSizes,
    price,
                          }) {

    const [isSwitched, setIsSwitched] = useState()

    return (
        <tr className={c.row}>
            <td className={`${c.cell} ${cTable['limited-cell-100']}`}>
                <figure><TableDots/></figure>
            </td>
            <td className={`${c.cell} ${cTable['limited-cell-121']}`}>
                <img src={pImage} alt="product"/>
            </td>
            <td className={`${c.cell} ${cTable['priority-cell']}`}>
                <div className={c['name-inner-cell']}>
                    <span className={c.name}>Jersey CAMO</span>
                    <div className={c.options}>
                        <div>4 варианта</div>
                        <span>+</span>
                    </div>
                </div>
            </td>
            <td className={`${c.cell} ${cTable['priority-cell']}`}>
                <button className={c['description-btn']}>Открыть описание</button>
            </td>
            <td className={c.cell}>
                <div className={c.dropdown}>
                    Advanced Gear
                </div>
            </td>
            <td className={c.cell}>
                <div>2 500</div>
            </td>
            <td className={c.cell}>
                <div>2 300</div>
            </td>
            <td className={c.cell}>
                <div>33</div>
            </td>
            <td className={`${c.cell} ${cTable['limited-cell-83']}`}>
                <figure><Copy /></figure>
            </td>
            <td className={`${c.cell} ${cTable['limited-cell-83']}`}>
                <Switch switched={isSwitched} onSwitch={(v) => setIsSwitched(v)} />
            </td>
            <td className={`${c.cell} ${cTable['limited-cell-83']}`}>
                <figure><Trash /></figure>
            </td>
        </tr>
    );
}

export default ProductsTableRow;