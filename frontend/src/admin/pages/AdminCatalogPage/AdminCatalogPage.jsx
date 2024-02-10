import React, {useEffect, useState} from 'react';
import c from './AdminCatalogPage.module.scss'
import AdminMenu from "../../components/AdminMenu/AdminMenu";
import AdminFilter from "../../components/AdminFilter/AdminFilter";
import ProductsTable from "../../components/ProductsTable/ProductsTable";
import ProductCreationModal from "../../modals/ProductCreationModal/ProductCreationModal";
import ProductFileAdditionModal from "../../modals/ProductFileAdditionModal/ProductFileAdditionModal";
import ProductFileDropModal from "../../modals/ProductFileDropModal/ProductFileDropModal";
import ProductDeleteModal from "../../modals/ProductDeleteModal/ProductDeleteModal";
import {useDispatch, useSelector} from "react-redux";
import {getProductsThunk} from "../../../thunks/productThunks";
import AdminPagination from "../../components/AdminPagination/AdminPagination";
import ProductCreationProcess from "../../components/ProductCreationProcess/ProductCreationProcess";

function AdminCatalogPage() {
    const dispatch = useDispatch()
    const [createModal, setCreateModal] = useState(false)
    const [page, setPage] = useState(0)
    const { products } = useSelector(state => state.product)

    useEffect(() => {
        dispatch(getProductsThunk({
            page,
        }))

        window.addEventListener('offline', () => { console.log('offline') })
    }, [dispatch, page])

    const onAddProductClicked = () => {
        setCreateModal(true)
    }

    const onPageChanged = (page) => {
        setPage(page)
    }

    return (
        <div className={c.page}>
            <AdminMenu />

            <div className={c.content}>
                <AdminFilter onAddProduct={onAddProductClicked} />

                <div className={c.table}>
                    <ProductsTable products={products} />
                </div>

                <div className={c.pagination}>
                    <AdminPagination onPageChanged={onPageChanged} currentPage={page} />
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