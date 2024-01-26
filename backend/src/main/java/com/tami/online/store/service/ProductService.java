package com.tami.online.store.service;

import com.tami.online.store.dto.FileDtoRequest;
import com.tami.online.store.dto.ProductDtoRequest;
import com.tami.online.store.dto.ProductSizeDtoRequest;
import com.tami.online.store.exception.NotFoundException;
import com.tami.online.store.model.*;
import com.tami.online.store.repository.ClothingTypeRepository;
import com.tami.online.store.repository.CollectionRepository;
import com.tami.online.store.repository.ProductRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Validated
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductMediaFileService productMediaFileService;
    private final ClothingTypeRepository clothingTypeRepository;
    private final CollectionRepository collectionRepository;
    private final FileService fileService;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product updateProduct(ProductDtoRequest productDtoRequest, Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Продукт с id " + id + " не существует"));

        if (productDtoRequest.getClothingType() != null) {
            ClothingType clothingType = clothingTypeRepository
                    .findByName(productDtoRequest.getClothingType())
                    .orElseThrow(() -> new NotFoundException("Тип одежды под названием " + productDtoRequest.getClothingType() + " не найден (поле clothingType)"));

            product.setClothingType(clothingType);
        }

        if (productDtoRequest.getCollectionName() != null) {
            Collection collection = collectionRepository
                    .findByName(productDtoRequest.getCollectionName())
                    .orElseThrow(() -> new NotFoundException("Коллекция под названием " + productDtoRequest.getCollectionName() + " не найдена (поле collectionName)"));

            product.setCollection(collection);
        }

        if (productDtoRequest.getPrice() > -1) {
            product.setPrice(productDtoRequest.getPrice());
        }

        if (productDtoRequest.getDiscountPercentage() > -1) {
            product.setPrice(productDtoRequest.getDiscountPercentage());
        }

        if (productDtoRequest.getName() != null) {
            product.setName(productDtoRequest.getName());
        }

        if (productDtoRequest.getSizes() != null && !productDtoRequest.getSizes().isEmpty()) {
            List<ProductSize> productSizes = product.getProductSizes();

            productDtoRequest.getSizes().forEach(productDtoSize -> {
                boolean isProductSizeExists = false;

                for (ProductSize productSize : productSizes) {
                    if (Objects.equals(productSize.getSize(), productDtoSize.getSize())) {
                        productSize.setQuantity(productDtoSize.getQuantity());
                        isProductSizeExists = true;
                        break;
                    }
                }

                if (!isProductSizeExists) {
                    productSizes.add(
                        ProductSize.builder()
                            .size(productDtoSize.getSize())
                            .quantity(productDtoSize.getQuantity())
                            .product(product)
                            .build()
                    );
                }
            });

            product.setProductSizes(productSizes);
        }

        productRepository.save(product);
        return product;
    }

    @Transactional
    public Product createProduct(@Valid ProductDtoRequest productDtoRequest) {
        ClothingType clothingType = clothingTypeRepository
                .findByName(productDtoRequest.getClothingType())
                .orElseThrow(() -> new NotFoundException("Тип одежды под названием " + productDtoRequest.getClothingType() + " не найден (поле clothingType)"));

        List<ProductSize> productSizes = productDtoRequest.getSizes().stream().map((productSizeDto) -> ProductSize.builder()
                .size(productSizeDto.getSize())
                .quantity(productSizeDto.getQuantity())
                .build()).toList();

        Collection collection = collectionRepository
                .findByName(productDtoRequest.getCollectionName())
                .orElseThrow(() -> new NotFoundException("Коллекция под названием " + productDtoRequest.getCollectionName() + " не найдена (поле collectionName)"));

        Product product = Product.builder()
                .name(productDtoRequest.getName())
                .price(productDtoRequest.getPrice())
                .clothingType(clothingType)
                .productSizes(productSizes)
                .collection(collection)
                .discountPercentage(productDtoRequest.getDiscountPercentage())
                .build();

        product = productRepository.save(product);

        productMediaFileService.createMediaFiles(productDtoRequest.getMediaFiles(), product);

        for (ProductSize productSize : productSizes) {
            productSize.setProduct(product);
        }

        return product;
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public Resource getProductFiles(FileDtoRequest fileDtoRequest) {
        return fileService.load(fileDtoRequest.getFilePath());
    }

    public List<Product> getProductsByCollection(String collection) {
        return productRepository.findAllByCollectionName(collection);
    }

    public Resource getProductFileByFileName(Long productId, String fileName) {
        return fileService.load("files/product/" + productId + "/" + fileName);
    }
}
