import React, {useEffect, useState} from "react";
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

export default function AeCollectionPage() {
    const dispatch = useDispatch()
    const collection = collections.AE;
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

                        <Products/>
                    </div>
                </div>
            </Container>
        </section>
    );
}
