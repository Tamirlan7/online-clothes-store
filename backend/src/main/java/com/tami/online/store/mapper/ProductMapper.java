package com.tami.online.store.mapper;

import com.tami.online.store.model.Product;
import com.tami.online.store.model.ProductMediaFile;
import com.tami.online.store.model.ProductSize;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProductMapper {

    public Product cloneProduct(Product p) {
        Product product = Product.builder()
                .name(p.getName())
                .clothingType(p.getClothingType())
                .collection(p.getCollection())
                .price(p.getPrice())
                .priceWithDiscount(p.getPriceWithDiscount())
                .description(p.getDescription())
                .dimension(p.getDimension())
                .weight(p.getWeight())
                .visible(p.isVisible())
                .preOrder(p.isPreOrder())
                .build();

        product.setProductSizes(p.getProductSizes().stream()
                .map(size -> ProductSize.builder()
                        .product(product)
                        .size(size.getSize())
                        .additionalInfo(size.getAdditionalInfo())
                        .quantity(size.getQuantity())
                        .build()).toList());

        return product;
    }

}
