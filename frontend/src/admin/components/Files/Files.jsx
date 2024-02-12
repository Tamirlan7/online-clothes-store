import React, {useMemo} from 'react';
import c from './Files.module.scss'
import {ReactComponent as Trash} from "../../../assets/icons/trash.svg";
import {ReactComponent as Pen} from "../../../assets/icons/uil_pen.svg";

function Files({files, onDeleteFile, onEditFile}) {
    const onDeleteClickHandler = (fileIdx) => {
        if (onDeleteFile) {
            onDeleteFile(fileIdx)
        }
    }

    const onEditClickHandler = (fileIdx) => {
        if (onEditFile) {
            onEditFile(fileIdx)
        }
    }

    return (
        <ul className={c.files}>
            {files.map((file, idx) => (
                <li className={c.file} key={idx}>
                    <img src={URL.createObjectURL(file)} alt={`Preview ${idx}`}/>

                    <div className={c.figures}>
                        <figure onClick={() => onEditClickHandler(idx)}><Pen/></figure>
                        <figure onClick={() => onDeleteClickHandler(idx)}><Trash/></figure>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default Files;