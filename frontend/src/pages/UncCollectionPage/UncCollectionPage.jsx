import React, {useEffect, useState} from 'react';
import c from './UncCollectionPage.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {collections} from "../../data/collections";
import useDebounce from "../../hooks/useDebounce";
import {getProductsThunk} from "../../thunks/productThunks";
import CollectionLanding from "../../components/CollectionLanding/CollectionLanding";
import uncridersBanner from "../../assets/videos/banners/uncriders.MP4";
import logo from "../../assets/images/uncBottomLogo.svg";
import Container from "../../components/Container/Container";
import CollectionFilterButtons from "../../components/CollectionFilterButtons/CollectionFilterButtons";
import Products from "../../components/Products/Products";

function UncCollectionPage() {
    const dispatch = useDispatch()
    const collection = collections.UR;
    const [filterData, setFilterData] = useState({
        selectedClothingType: '',
        searchText: '',
    })
    const apiSearchText = useDebounce(filterData.searchText)

    useEffect(() => {
        dispatch(getProductsThunk({
            collection,
            name: apiSearchText,
            clothingType: filterData.selectedClothingType
        }))
    }, [collection, dispatch, apiSearchText, filterData.selectedClothingType])

    return (
        <section className='drop'>
            <div>
                <CollectionLanding
                    overlayImageSrc={uncridersBanner}
                    logoSrc={logo}
                    overlayText={'Также как постоянный количественный рост и сфера нашей активности не даёт нам иного выбора, кроме определения приоретизации разума над эмоциями. Есть над чем задуматься: представители современных социальных резервов набирают популярность среди определенных слоев населения, а значит, должны быть своевременно верифицированы.'}
                />
            </div>

            <div className={'drop__separator'} />

            <Container style={{ padding: 0 }}>
                <div className={'drop__content'}>

                    <div className={`drop__inner__content`}>
                        <div>
                            <CollectionFilterButtons
                                clothingType={filterData.selectedClothingType}
                                searchTextValue={filterData.searchText}
                                onClothingTypeChanged={(value) => setFilterData((prev) => ({
                                    ...prev,
                                    selectedClothingType: value
                                }))}
                                onSearchTextValueChange={(value) => setFilterData((prev) => ({
                                    ...prev,
                                    searchText: value
                                }))}
                            />
                        </div>

                        <Products />
                    </div>
                </div>
            </Container>
        </section>
    );
}

export default UncCollectionPage;