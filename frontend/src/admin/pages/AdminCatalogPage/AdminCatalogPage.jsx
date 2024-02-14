import React, {useEffect, useMemo, useState} from 'react';
import c from './AdminCatalogPage.module.scss'
import AdminMenu from "../../components/AdminMenu/AdminMenu";
import AdminFilter from "../../components/AdminFilter/AdminFilter";
import ProductsTable from "../../components/ProductsTable/ProductsTable";
import {useDispatch, useSelector} from "react-redux";
import {getProductsThunk} from "../../../thunks/productThunks";
import AdminPagination from "../../components/AdminPagination/AdminPagination";
import ProductCreationProcess from "../../components/ProductCreationProcess/ProductCreationProcess";
import {ADMIN_PRODUCTS_PAGE} from "../../../constants/AppConstants";
import useDebounce from "../../../hooks/useDebounce";

function AdminCatalogPage() {
    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState('')
    const [clothingType, setClothingType] = useState('')
    const apiSearchValue = useDebounce(searchValue, 459)
    const [createModal, setCreateModal] = useState(false)
    const [page, setPage] = useState(JSON.parse(localStorage.getItem(ADMIN_PRODUCTS_PAGE)) ?? 0)
    const {products, loading, deleteLoading} = useSelector(state => state.product)

    const sortedProducts = useMemo(() => {
        if (clothingType === '') {
            return products
        }

        return products.slice().sort((pA, pB) => {
            const typeA = pA.clothingType?.name || '';
            const typeB = pB.clothingType?.name || '';

            if (typeA === clothingType && typeB !== clothingType) {
                return -1;
            } else if (typeA !== clothingType && typeB === clothingType) {
                return 1;
            } else {
                return 0;
            }
        });
    }, [products, clothingType])

    useEffect(() => {
        if (!deleteLoading) {
            dispatch(getProductsThunk({
                page,
                name: apiSearchValue,
            }))
        }

    }, [dispatch, page, deleteLoading, apiSearchValue])

    useEffect(() => {
        if (!products.length && page > 0) {
            onPageChanged(page - 1)
        }
    }, [products, page])

    function onAddProductClicked() {
        setCreateModal(true)
    }

    const onPageChanged = (page) => {
        setPage(page)
        localStorage.setItem(ADMIN_PRODUCTS_PAGE, page)
    }

    const onSearch = (e) => {
        setSearchValue(e.target.value)
    }

    const onSort = (value) => {
        setClothingType(value)
    }

    return (
        <div className={c.page}>
            <AdminMenu/>

            <div className={c.content}>
                <AdminFilter
                    sortValue={clothingType}
                    onSort={onSort}
                    searchValue={searchValue}
                    onSearch={onSearch}
                    onAddProduct={onAddProductClicked}
                />

                <div className={c.table}>
                    <ProductsTable products={sortedProducts}/>
                </div>

                <div className={c.pagination}>
                    {(!loading ?? !deleteLoading) && (
                        <AdminPagination onPageChanged={onPageChanged} currentPage={page}/>
                    )}
                </div>
            </div>

            <ProductCreationProcess
                isActive={createModal}
                setIsActive={setCreateModal}
            />
        </div>
    );
}

export default AdminCatalogPage;