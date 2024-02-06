import React, {useState} from 'react';
import c from './AdminCatalogPage.module.scss'
import AdminMenu from "../../components/AdminMenu/AdminMenu";
import AdminFilter from "../../components/AdminFilter/AdminFilter";
import ProductsTable from "../../components/ProductsTable/ProductsTable";
import ProductCreationModal from "../../modals/ProductCreationModal/ProductCreationModal";
import ProductFileAdditionModal from "../../modals/ProductFileAdditionModal/ProductFileAdditionModal";
import ProductFileDropModal from "../../modals/ProductFileDropModal/ProductFileDropModal";
import ProductDeleteModal from "../../modals/ProductDeleteModal/ProductDeleteModal";

function AdminCatalogPage() {
    const [createModal, setCreateModal] = useState(false)
    const [addFileModal, setAddFileModal] = useState(false)
    const [dropFileModal, setDropFileModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)

    const onAddProductClicked = () => {
        setCreateModal(true)
    }

    return (
        <div className={c.page}>
            <AdminMenu />

            <div className={c.content}>
                <AdminFilter onAddProduct={onAddProductClicked} />

                <div className={c.table}>
                    <ProductsTable />
                </div>
            </div>

            <ProductCreationModal
                isActive={createModal}
                setIsActive={setCreateModal}
            />
            <ProductFileAdditionModal
                isActive={addFileModal}
                setIsActive={setAddFileModal}
            />
            <ProductFileDropModal
                isActive={dropFileModal}
                setIsActive={setDropFileModal}
            />
            <ProductDeleteModal
                isActive={deleteModal}
                setIsActive={setDeleteModal}
            />
        </div>
    );
}

export default AdminCatalogPage;