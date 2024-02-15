import React from 'react';
import c from './LineThrough.module.scss'

function LineThrough({children, lineClassName}) {
    return (
        <div className={c.wrapper}>
            <div className={`${lineClassName} ${c.line}`} />
            <div>{children}</div>
        </div>
    );
}

export default LineThrough;