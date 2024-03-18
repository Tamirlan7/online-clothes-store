import React, {useMemo} from 'react';
import c from './AdminPagination.module.scss'
import {ReactComponent as ArrowLeft} from "../../../assets/icons/arrow-left.svg";
import {useSelector} from "react-redux";

function AdminPagination({onPageChanged, currentPage}) {
    // first 3 and last 3 divided by {...} <= item
    const maxUIPageItems = 6;
    const {totalPages, products} = useSelector(state => state.product)

    const totalPagesArr = useMemo(() => {
        return Array.from({length: totalPages}, (_, idx) => idx)
    }, [totalPages])

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

    if (!totalPages || !products.length) {
        return <></>
    }

    return (
        <div className={c.block}>
            <div className={c.inner}>
                <div className={c.item} onClick={goBack}>
                    <figure><ArrowLeft/></figure>
                    <p>Назад</p>
                </div>

                <ul data-total-pages={totalPages} data-current-page={currentPage}
                    data-total-pages-arr-length={totalPagesArr.length} className={c.pages}>
                    <Pages totalPages={totalPages} currentPage={currentPage} handleOnPageChange={handleOnPageChange}/>
                </ul>

                <div className={c.item} onClick={goNext}>
                    <p>Вперед</p>
                    <figure style={{transform: 'rotate(180deg)'}}><ArrowLeft/></figure>
                </div>
            </div>
        </div>
    );
}

function Pages({totalPages, currentPage, handleOnPageChange}) {
    // max visible pages in UI excluding the dots
    const maxVisiblePagesInUI = 6;

    /* tp = totalPages */
    const tpArr = useMemo(() => {
        return Array.from({length: totalPages}, (_, idx) => idx);
    }, [totalPages])

    if (totalPages < maxVisiblePagesInUI) {
        /* case if totalPages are less than 6 elements (maxVisiblePagesInUI) */
        return tpArr.map(p => (
            <Page
                key={p}
                handleOnPageChange={handleOnPageChange}
                currentPage={currentPage}
                page={p}
            />
        ))
    }

    if (currentPage > totalPages - maxVisiblePagesInUI) {
        /* case if currentPage is at the last 6 elements (maxVisiblePagesInUI) */
        return tpArr.slice(tpArr.length - maxVisiblePagesInUI).map(p => (
            <Page
                key={p}
                handleOnPageChange={handleOnPageChange}
                currentPage={currentPage}
                page={p}
            />
        ))
    }

    console.log('default')
    /* default case, first 3 and last 3, the dots in the middle */
    return (
        <>
            {/* p = page */}
            {/* first three elements */}
            {tpArr.slice(currentPage, currentPage + 3).map((p) => (
                <Page
                    key={p}
                    handleOnPageChange={handleOnPageChange}
                    currentPage={currentPage}
                    page={p}
                />
            ))}

            {/*    dots*/}
            <li className={`${c.page} ${c.dots}`} key={'dots'}>...</li>

            {/*    last three elements*/}
            {tpArr.slice(tpArr.length - 3).map(p => (
                <Page
                    key={p}
                    handleOnPageChange={handleOnPageChange}
                    currentPage={currentPage}
                    page={p}
                />
            ))}
        </>
    )

}

function Page ({ handleOnPageChange, currentPage, page: p }) {

    return (
        <li onClick={() => handleOnPageChange(p)}
            className={currentPage === p ? `${c.page} ${c['page-current']}` : `${c.page}`}>
            {p + 1}
        </li>
    )
}

export default AdminPagination;