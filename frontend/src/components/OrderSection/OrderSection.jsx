import React from 'react';
import c from './OrderSection.module.scss'

function OrderSection({children, dividerClassName, titleText}) {
    return (
        <div className={c.block}>
            <h2 className={c.title}>{titleText}</h2>
            <div className={`${dividerClassName} ${c.divider}`}/>

            <div className={c.controls}>
                {children}
            </div>
        </div>
    );
}

export default OrderSection;