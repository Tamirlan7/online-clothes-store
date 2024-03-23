import React from 'react';
import c from './CardSectionTitle.module.scss'

function CardSectionTitle({children, ...props}) {
    return (
        <h3 {...props} className={`${c.title} ${props?.className}`}>{children}</h3>
    );
}

export default CardSectionTitle;