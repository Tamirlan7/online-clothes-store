import React from 'react';
import c from './AdminPagination.module.scss'
import {ReactComponent as ArrowLeft} from "../../../assets/icons/arrow-left.svg";
import {useSelector} from "react-redux";

function AdminPagination({ onPageChanged, currentPage }) {
    // first 3 and last 3 divided by {...} <= item
    const maxUIPageItems = 6;
    const { totalPages } = useSelector(state => state.product)

    const handleOnPageChange = (page) => {
        if (currentPage === page) {
            return null
        }

        if (onPageChanged) {
            onPageChanged(page)
        }
    }

    const goBack = () => {
        if (onPageChanged) {
            if (currentPage - 1 >= 0) {
                onPageChanged(currentPage - 1)
            }
        }
    }

    const goNext = () => {
        if (onPageChanged) {
            if (currentPage + 1 < totalPages) {
                onPageChanged(currentPage + 1)
            }
        }
    }

    return (
        <div className={c.block}>
            <div className={c.inner}>
                <div className={c.item} onClick={goBack}>
                    <figure><ArrowLeft/></figure>
                    <p>Назад</p>
                </div>

                <ul className={c.pages}>
                    {totalPages > maxUIPageItems ? (
                        <>
                            {Array.from({length: currentPage + 3}, (_, idx) => idx).slice(-3).map((page) => (
                                <li onClick={() => handleOnPageChange(page)}
                                    className={currentPage === page ? `${c.page} ${c['page-current']}` : `${c.page}`}
                                    key={page}>{page + 1}</li>
                            ))}

                            {Array.from({length: totalPages}, (_, idx) => idx).slice(-3).map((page, idx) => {
                                return (
                                    <>
                                        {idx === 0 && (
                                            <li className={`${c.page} ${c.dots}`}
                                                key={'dots'}>...</li>
                                        )}
                                        <li onClick={() => handleOnPageChange(page)}
                                            className={currentPage === page ? `${c.page} ${c['page-current']}` : `${c.page}`}
                                            key={page}>{page + 1}</li>
                                    </>
                                )
                            })}
                        </>
                    ) : (
                        <>{Array.from({length: totalPages}, (_, idx) => idx).map((page) => (
                            <li onClick={() => handleOnPageChange(page)}
                                className={currentPage === page ? `${c.page} ${c['page-current']}` : `${c.page}`}
                                key={page}>{page + 1}</li>
                        ))}</>
                    )}
                </ul>

                <div className={c.item} onClick={goNext}>
                    <p>Вперед</p>
                    <figure style={{transform: 'rotate(180deg)'}}><ArrowLeft/></figure>
                </div>
            </div>
        </div>
    );
}

export default AdminPagination;