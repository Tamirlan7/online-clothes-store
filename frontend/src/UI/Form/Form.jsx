import React from 'react';

function Form({children, onSubmit, ...props}) {
    return (
        <form {...props} onSubmit={(e) => {
            e.preventDefault()

            if (onSubmit) {
                onSubmit(e)
            }
        }}>{children}</form>
    );
}

export default Form;