import React from 'react';
import c from './UnderlineText.module.scss'

function UnderlineText({children, underlineColor}) {
    return (
        <div className={c.wrapper}>
            <div className={c.text}>{children}</div>
            <div className={c.underline} style={{ backgroundColor: underlineColor }} />
        </div>
    );
}

export default UnderlineText;