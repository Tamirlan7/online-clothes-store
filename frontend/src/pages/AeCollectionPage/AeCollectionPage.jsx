import React, {useEffect, useRef, useState} from "react";
import "./AeCollectionPage.scss";
import logo from "../../assets/images/bottomAeLogo.svg";
import Products from "../../components/Products/Products";
import {useDispatch} from "react-redux";
import {collections} from "../../data/collections";
import {getProductsThunk} from "../../thunks/productThunks";
import CollectionLanding from "../../components/CollectionLanding/CollectionLanding";
import CollectionFilterButtons from "../../components/CollectionFilterButtons/CollectionFilterButtons";
import Container from "../../components/Container/Container";
import useDebounce from "../../hooks/useDebounce";
import alternativeEdge from '../../assets/videos/banners/alternative-edge.MP4'
import {resetProducts} from "../../slices/productSlice";

export default function AeCollectionPage() {
    const dispatch = useDispatch()
    const collection = collections.AE;
    const [filterData, setFilterData] = useState({
        selectedClothingType: '',
        searchText: '',
    })
    const [currentPage, setCurrentPage] = useState(0)
    const apiSearchText = useDebounce(filterData.searchText)
    const hasInitialized = useRef(false)
    const [filtersChanged, setFiltersChanged] = useState(false)

    useEffect(() => {
        if (!hasInitialized.current) {
            return
        }
        dispatch(resetProducts())
        setCurrentPage(0)
        setFiltersChanged(prev => !prev)
    }, [dispatch, filterData.clothingType, apiSearchText]);

    useEffect(() => {
        if (!hasInitialized.current) {
            return
        }

        dispatch(getProductsThunk({
            collection,
            name: apiSearchText,
            clothingType: filterData.selectedClothingType,
            page: currentPage,
            includeOldProducts: true,
            resetProducts: false,
        }))
    }, [currentPage, dispatch, filtersChanged])

    useEffect(() => {
        dispatch(getProductsThunk({
            collection,
            name: apiSearchText,
            clothingType: filterData.selectedClothingType,
            page: currentPage,
            includeOldProducts: false,
            resetProducts: false,
        }))

        if (!hasInitialized.current) {
            hasInitialized.current = true
        }
    }, [dispatch])

    return (
        <section className='drop'>
            <div>
                <CollectionLanding
                    overlayImageSrc={alternativeEdge}
                    logoSrc={logo}
                    overlayText={'Также как постоянный количественный рост и сфера нашей активности не даёт нам иного выбора, кроме определения приоретизации разума над эмоциями. Есть над чем задуматься: представители современных социальных резервов набирают популярность среди определенных слоев населения, а значит, должны быть своевременно верифицированы.'}
                />
            </div>

            <div className={'drop__separator'}/>

            <Container style={{padding: 0}}>
                <div className={'drop__content'}>

                    <div className={`drop__inner__content`}>
                        <div>
                            <CollectionFilterButtons
                                clothingType={filterData.selectedClothingType}
                                searchTextValue={filterData.searchText}
                                onClothingTypeChanged={(value) => {
                                    setFilterData((prev) => ({
                                        ...prev,
                                        selectedClothingType: value
                                    }))
                                }}
                                onSearchTextValueChange={(value) => {
                                    setFilterData((prev) => ({
                                        ...prev,
                                        searchText: value
                                    }))
                                }}
                            />
                        </div>

                        <Products
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                </div>\
            </Container>
        </section>
    );
}
