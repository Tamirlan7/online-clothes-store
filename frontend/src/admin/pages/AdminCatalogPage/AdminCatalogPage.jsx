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
import {changeAdminProductsPage} from "../../../slices/productSlice";

function AdminCatalogPage() {
    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState('')
    const [clothingType, setClothingType] = useState('')
    const [collection, setCollection] = useState('')
    const apiSearchValue = useDebounce(searchValue, 459)
    const [createModal, setCreateModal] = useState(false)
    const {products, loading, deleteLoading, adminProductsPage: page} = useSelector(state => state.product)

    useEffect(() => {
        const p = JSON.parse(localStorage.getItem(ADMIN_PRODUCTS_PAGE)) ?? 0

        if (p || p === 0) {
            dispatch(changeAdminProductsPage(Number(p)))
        }
    }, [dispatch]);

    useEffect(() => {
    }, []);

    useEffect(() => {
        if (!deleteLoading && page != null) {
            dispatch(getProductsThunk({
                page,
                name: apiSearchValue,
                collection,
                clothingType
            }))
        }

        return () => {
            localStorage.setItem(ADMIN_PRODUCTS_PAGE, 0)
        }
    }, [dispatch, page, deleteLoading, apiSearchValue, clothingType, collection])

    function onAddProductClicked() {
        setCreateModal(true)
    }

    const onPageChanged = (page) => {
        dispatch(changeAdminProductsPage(Number(page)))
        localStorage.setItem(ADMIN_PRODUCTS_PAGE, page)
    }

    const onSearch = (e) => {
        setSearchValue(e.target.value)
    }


    return (
        <div className={c.page}>
            <AdminMenu/>

            <div className={c.content}>
                <AdminFilter
                    collection={collection}
                    onCollectionChanged={(val) => setCollection(val)}
                    clothingType={clothingType}
                    onClothingTypeChanged={(val) => setClothingType(val)}
                    searchValue={searchValue}
                    onSearch={onSearch}
                    onAddProduct={onAddProductClicked}
                />

                <div className={c.table}>
                    <ProductsTable products={products}/>
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