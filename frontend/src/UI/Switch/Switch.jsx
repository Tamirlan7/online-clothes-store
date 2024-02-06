import React from 'react';
import c from './Switch.module.scss'


function Switch({ switched, onSwitch }) {

    return (
        <div className={c.wrapper} onClick={() => onSwitch(!switched)}>
            <div className={c.bg}></div>
            <div className={switched ? `${c.circle} ${c['selected-circle']}` : `${c.circle} ${c['unselected-circle']}`}></div>
        </div>
    );
}

export default Switch;