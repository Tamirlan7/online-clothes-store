import React from 'react';
import c from './Message.module.scss'

function Message({children}) {
    return (
        <div className={c.message}>
            {children}
        </div>
    );
}

export default Message;