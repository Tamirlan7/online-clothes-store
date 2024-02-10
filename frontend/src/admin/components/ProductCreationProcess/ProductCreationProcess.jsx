import React, {useState} from 'react';
import ProductCreationModal from "../../modals/ProductCreationModal/ProductCreationModal";
import ProductFileAdditionModal from "../../modals/ProductFileAdditionModal/ProductFileAdditionModal";
import ProductFileDropModal from "../../modals/ProductFileDropModal/ProductFileDropModal";

function ProductCreationProcess({isActive, setIsActive}) {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        quantity: '',
        clothingType: 'Джерси',
        collection: 'ae',
        sizes: {
            'XS': '0',
            'S': '0',
            'M': '0',
            'L': '0',
            'XL': '0',
            'XXL': '0'
        }
    })
    const [addFileModal, setAddFileModal] = useState(false)
    const [dropFileModal, setDropFileModal] = useState(false)

    const nextModal = () => {
        if (isActive) {
            setAddFileModal(true)
            setIsActive(false)
            return null
        }

        if (addFileModal) {
            setAddFileModal(false)
            setDropFileModal(true)
            return null
        }

        if (dropFileModal) {

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
                onNext={() => nextModal()}
                formData={formData}
                setFormData={setFormData}
            />
            <ProductFileDropModal
                isActive={dropFileModal}
                setIsActive={setDropFileModal}
            />
        </>
    );
}

export default ProductCreationProcess;