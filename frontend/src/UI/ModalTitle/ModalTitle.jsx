import React from 'react';
import c from './ModalTitle.module.scss'

function ModalTitle({ children, fontSize }) {
    return (
        <h1 className={c.title} style={fontSize ? {
            fontSize,
        } : {}}>
            {children}
        </h1>
    )
}

export default ModalTitle;