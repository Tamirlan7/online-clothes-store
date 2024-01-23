package com.tami.online.store.service;

import com.tami.online.store.dto.ProductDtoRequest;
import com.tami.online.store.exception.NotFoundException;
import com.tami.online.store.model.ClothingType;
import com.tami.online.store.model.Collection;
import com.tami.online.store.model.Product;
import com.tami.online.store.model.ProductSize;
import com.tami.online.store.repository.ClothingTypeRepository;
import com.tami.online.store.repository.CollectionRepository;
import com.tami.online.store.repository.ProductRepository;
import com.tami.online.store.repository.ProductSizeRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Service
@Validated
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductMediaFileService productMediaFileService;
    private final ClothingTypeRepository clothingTypeRepository;
    private final ProductSizeRepository productSizeRepository;
    private final CollectionRepository collectionRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product createProduct(@Valid ProductDtoRequest productDtoRequest) {
        ClothingType clothingType = clothingTypeRepository.findByName(productDtoRequest.getClothingType())
                .orElseThrow(() -> new NotFoundException("Тип одежды под под названием " + productDtoRequest.getClothingType() + " не найден (поле clothingType)"));
        List<ProductSize> productSizes = productSizeRepository.findAllByNameIn(productDtoRequest.getSizes());
        Collection collection = collectionRepository.findByName(productDtoRequest.getCollectionName())
                .orElseThrow(() -> new NotFoundException("Коллекция под под названием " + productDtoRequest.getCollectionName() + " не найден (поле collectionName)"));

        Product product = Product.builder()
                .name(productDtoRequest.getName())
                .price(productDtoRequest.getPrice())
                .clothingType(clothingType)
                .sizes(productSizes)
                .collection(collection)
                .discountPercentage(productDtoRequest.getDiscountPercentage())
                .build();

        product = productRepository.save(product);
        productMediaFileService.createMediaFiles(productDtoRequest.getMediaFiles(), product);
        return product;
    }
}
