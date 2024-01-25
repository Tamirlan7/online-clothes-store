package com.tami.online.store.service;

import com.tami.online.store.dto.ProductDtoRequest;
import com.tami.online.store.dto.ProductSizeDtoRequest;
import com.tami.online.store.exception.NotFoundException;
import com.tami.online.store.model.*;
import com.tami.online.store.repository.ClothingTypeRepository;
import com.tami.online.store.repository.CollectionRepository;
import com.tami.online.store.repository.ProductRepository;
import com.tami.online.store.repository.SizeRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.ArrayList;
import java.util.List;

@Service
@Validated
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductMediaFileService productMediaFileService;
    private final ClothingTypeRepository clothingTypeRepository;
    private final SizeRepository sizeRepository;
    private final CollectionRepository collectionRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product createProduct(@Valid ProductDtoRequest productDtoRequest) {
        ClothingType clothingType = clothingTypeRepository.findByName(productDtoRequest.getClothingType())
                .orElseThrow(() -> new NotFoundException("Тип одежды под под названием " + productDtoRequest.getClothingType() + " не найден (поле clothingType)"));

        List<String> sizesName = productDtoRequest.getSizes().stream().map(ProductSizeDtoRequest::getSizeName).toList();
        List<Size> sizes = sizeRepository.findAllByNameIn(sizesName);

        List<ProductSize> productSizes = new ArrayList<>();
        sizes.forEach(size -> {

            for (ProductSizeDtoRequest pdr : productDtoRequest.getSizes()) {
                if (size.getName().equals(pdr.getSizeName())) {
                    productSizes.add(
                            ProductSize.builder()
                                    .size(size)
                                    .quantity(pdr.getQuantity())
                                    .build()
                    );
                    break;
                }
            }
        });

        Collection collection = collectionRepository.findByName(productDtoRequest.getCollectionName())
                .orElseThrow(() -> new NotFoundException("Коллекция под под названием " + productDtoRequest.getCollectionName() + " не найден (поле collectionName)"));

        Product product = Product.builder()
                .name(productDtoRequest.getName())
                .price(productDtoRequest.getPrice())
                .clothingType(clothingType)
                .productSizes(productSizes)
                .collection(collection)
                .discountPercentage(productDtoRequest.getDiscountPercentage())
                .build();

        product = productRepository.save(product);
        for (ProductSize productSize : productSizes) {
            productSize.setProduct(product);
        }
        productMediaFileService.createMediaFiles(productDtoRequest.getMediaFiles(), product);

        return product;
    }
}
