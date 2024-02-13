import React from 'react';
import c from './Modal.module.scss';

const Modal = ({children, className, isActive, setIsActive, onClose, ...props}) => {

    return (
        <div
            className={isActive ? `${c['modal-window']} ${c['modal-active']}` : `${c['modal-window']}`}
            {...props}
            onClick={() => {
                setIsActive(false)
                if (onClose) {
                    onClose()
                }
            }}
        >
            <div
                className={
                    className && isActive
                        ? `${c['modal-window-content']} ${className} ${c['modal-content-active']}`
                        : isActive ? `${c['modal-window-content']} ${c['modal-content-active']}`
                            : className ? `${className} ${c['modal-window-content']}`
                                : `${c['modal-window-content']}`
                }
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}

export default Modal;