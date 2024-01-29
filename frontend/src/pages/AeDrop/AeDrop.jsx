import React, {useEffect, useMemo, useState} from "react";
import Footer from "../../components/Footer/Footer";
import "./AeDrop.scss";
import logo from "../../assets/images/bottomlogo2.svg";
import Products from "../../components/Products/Products";
import {useDispatch, useSelector} from "react-redux";
import {collections} from "../../data/collections";
import {getProductsByCollectionThunk, getProductsThunk} from "../../thunks/productThunks";
import CollectionLanding from "../../components/CollectionLanding/CollectionLanding";
import CollectionFilterButtons from "../../components/CollectionFilterButtons/CollectionFilterButtons";
import Container from "../../components/Container/Container";

export default function AeDrop() {
    const dispatch = useDispatch()
    const collection = collections.AE;
    const products = useSelector(state => state.product.products[collection])
    const [filterData, setFilterData] = useState({
        selectedClothingType: '',
        searchText: '',
    })

    const filteredProducts = useMemo(() => {
        let prods = products

        if (filterData.selectedClothingType.trim() !== '') {
            prods = prods.filter(p => p.clothingType.name === filterData.selectedClothingType)
        }

        prods = prods.filter((p) => p.name.trim().toLowerCase().includes(filterData.searchText.trim().toLowerCase()))

        return prods
    }, [products, filterData.searchText, filterData.selectedClothingType])

    useEffect(() => {
        dispatch(getProductsThunk({
            collection
        }))
    }, [collection, dispatch])

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
                        buttonValue={filterData.selectedClothingType}
                        searchTextValue={filterData.searchText}
                        onButtonValueChange={(value) => setFilterData((prev) => ({...prev, selectedClothingType: value}))}
                        onSearchTextValueChange={(value) => setFilterData((prev) => ({...prev, searchText: value}))}
                    />
                </div>

                <div>
                    <Products products={filteredProducts}/>
                </div>
            </Container>
        </section>
    );
}
