import React, {useEffect, useState} from 'react';
import ProductCreationModal from "../../modals/ProductCreationModal/ProductCreationModal";
import ProductFileAdditionModal from "../../modals/ProductFileAdditionModal/ProductFileAdditionModal";
import ProductFileDropModal from "../../modals/ProductFileDropModal/ProductFileDropModal";
import {useDispatch} from "react-redux";
import {createProductThunk} from "../../../thunks/productThunks";

function ProductCreationProcess({isActive, setIsActive}) {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        quantity: 0,
        clothingType: 'Джерси',
        collection: null,
        sizes: {
            'XS': '0',
            'S': '0',
            'M': '0',
            'L': '0',
            'XL': '0',
            'XXL': '0'
        },
        files: [],
    })
    const [addFileModal, setAddFileModal] = useState(false)
    const [dropFileModal, setDropFileModal] = useState(false)

    const nextModal = () => {
        if (isActive) {
            setAddFileModal(true)
            setIsActive(false)
            return null
        }
    }

    const createProduct = () => {
        const data = new FormData()

        const {
            files,
            sizes,
            ...iterable
        } = formData

        for (let key in iterable) {
            const value = iterable[key]
            data.append(key, value)
        }

        files.forEach(file => data.append('mediaFiles', file))

        for (let size in sizes) {
            const quantity = sizes[size]


            data.append('sizes', JSON.stringify({
                quantity,
                size,
            }))
        }

        dispatch(createProductThunk({
            formData: data,
        }))

    }

    const prevModal = () => {
        if (addFileModal) {
            setAddFileModal(false)
            setIsActive(true)
            return null
        }
    }

    const onDragStartHandler = (e) => {
        e.preventDefault()

        if (addFileModal) {
            setAddFileModal(false)
        }

        if (!dropFileModal) {
            setDropFileModal(true)
        }
    }

    const onDropModalDragLeaveHandler = (e) => {
        console.log('leave')
        if (!addFileModal) {
            setAddFileModal(true)
        }

        if (dropFileModal) {
            setDropFileModal(false)
        }
    }

    return (
        <>
            <ProductCreationModal
                onNext={() => nextModal()}
                isActive={isActive}
                setIsActive={setIsActive}
                formData={formData}
                setFormData={setFormData}
            />
            <ProductFileAdditionModal
                isActive={addFileModal}
                setIsActive={setAddFileModal}
                onNext={createProduct}
                formData={formData}
                setFormData={setFormData}
                onCancel={() => prevModal()}
            />
        </>
    );
}

export default ProductCreationProcess;