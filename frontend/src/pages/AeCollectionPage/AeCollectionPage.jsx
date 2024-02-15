import React, {useEffect, useState} from "react";
import "./AeCollectionPage.scss";
import logo from "../../assets/images/bottomlogo2.svg";
import Products from "../../components/Products/Products";
import {useDispatch, useSelector} from "react-redux";
import {collections} from "../../data/collections";
import {getProductsByCollectionThunk, getProductsThunk} from "../../thunks/productThunks";
import CollectionLanding from "../../components/CollectionLanding/CollectionLanding";
import CollectionFilterButtons from "../../components/CollectionFilterButtons/CollectionFilterButtons";
import Container from "../../components/Container/Container";
import useDebounce from "../../hooks/useDebounce";

export default function AeCollectionPage() {
    const dispatch = useDispatch()
    const collection = collections.AE;
    const { products } = useSelector(state => state.product)
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
                    overlayImageSrc={'https://s3-alpha-sig.figma.com/img/6ef0/78e0/eca3722c7f99fba7ea171f132f191744?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cCfDL~ywAKy~-OtM7~Zy~~ZyYmSlKpsOo7v7OSOF6DORbTKebV9Fh8rGGuUPpgMMvcEhzqZem1Kz53oDSDM1cMw7tfYKJx0AfQQbuQ3KK6bG7wan2ijmWTg~3mWMipD~SHsM0MThNjJg1CxetHJxbNn6-u6h33lBmvqChfoLBi-cj-tDSiB7N94hqiOXSrR~iJb2aSvKvr0j8uBfRsJQ3yBtXVERZcdrpMGtkA7l-jaqro7n2uqZdccQr95YdIEsWrw8evYKF6ErQ7WnVJ77uhD7OoFkVGDfb47QbnsvgstmRPoZ2dXyMLJutFvvFD8~MdjZ2rUlesY7WJRwQvK8qw__'}
                    logoSrc={logo}
                    overlayText={'Также как постоянный количественный рост и сфера нашей активности не даёт нам иного выбора, кроме определения приоретизации разума над эмоциями. Есть над чем задуматься: представители современных социальных резервов набирают популярность среди определенных слоев населения, а значит, должны быть своевременно верифицированы.'}
                />
            </div>

            <div className={'drop__separator'} />

            <Container>
                <div>
                    <CollectionFilterButtons
                        clothingType={filterData.selectedClothingType}
                        searchTextValue={filterData.searchText}
                        onClothingTypeChanged={(value) => setFilterData((prev) => ({...prev, selectedClothingType: value}))}
                        onSearchTextValueChange={(value) => setFilterData((prev) => ({...prev, searchText: value}))}
                    />
                </div>

                <div>
                    <Products products={products}/>
                </div>
            </Container>
        </section>
    );
}
