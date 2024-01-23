package com.tami.online.store.mapper;

import com.tami.online.store.dto.ProductDto;
import com.tami.online.store.model.Product;
import com.tami.online.store.model.ProductMediaFile;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Set;

public class ProductMapper {

    public static Product toProduct(ProductDto productDto) {
        var product = Product.builder()
                .name(productDto.getName())
                .clothingType(productDto.getClothingType())
                .price(productDto.getPrice())
                .size(productDto.getSize())
                .build();

        return product;
    }

}
