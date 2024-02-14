package com.tami.online.store.service;

import com.tami.online.store.dto.GetProductsArgs;
import com.tami.online.store.dto.ProductDtoRequest;
import com.tami.online.store.exception.NotFoundException;
import com.tami.online.store.model.ClothingType;
import com.tami.online.store.model.Collection;
import com.tami.online.store.model.Product;
import com.tami.online.store.model.ProductSize;
import com.tami.online.store.repository.ClothingTypeRepository;
import com.tami.online.store.repository.CollectionRepository;
import com.tami.online.store.repository.ProductRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.Objects;

@Service
@Validated
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductMediaFileService productMediaFileService;
    private final ClothingTypeRepository clothingTypeRepository;
    private final CollectionRepository collectionRepository;
    private final FileService fileService;
    private static final Logger LOGGER = LoggerFactory.getLogger(ProductService.class);

    public Page<Product> getAllProducts(GetProductsArgs args) {
        return productRepository.findByCollectionAndClothingTypeAndProductName(
                args.getCollection(),
                args.getClothingType(),
                args.getName(),
                PageRequest.of(args.getPage(), args.getSize(), Sort.by("id"))
        );
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

        if (productDtoRequest.getPriceWithDiscount() > -1) {
            product.setPrice(productDtoRequest.getPriceWithDiscount());
        }

        if (productDtoRequest.getName() != null) {
            product.setName(productDtoRequest.getName());
        }

        if (productDtoRequest.isVisibleChanged() && productDtoRequest.isVisible() != product.isVisible()) {
            product.setVisible(productDtoRequest.isVisible());
        }

        if (productDtoRequest.isPreOrderChanged() && productDtoRequest.isPreOrder() != product.isPreOrder()) {
            product.setPreOrder(productDtoRequest.isPreOrder());
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

        return productRepository.save(product);
    }

    @Transactional
    public Product createProduct(@Valid ProductDtoRequest productDtoRequest) {
        ClothingType clothingType = clothingTypeRepository
                .findByName(productDtoRequest.getClothingType())
                .orElseThrow(() -> new NotFoundException("Тип одежды под названием " + productDtoRequest.getClothingType() + " не найден (поле clothingType)"));

        List<ProductSize> productSizes = productDtoRequest.getSizes().stream().map((productSizeDto) -> ProductSize.builder()
                .size(productSizeDto.getSize())
                .quantity(productSizeDto.getQuantity())
                .additionalInfo(productSizeDto.getAdditionalInfo())
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
                .visible(productDtoRequest.isVisible())
                .preOrder(productDtoRequest.isPreOrder())
                .priceWithDiscount(productDtoRequest.getPriceWithDiscount())
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

    public Resource getProductFileByFileName(Long productId, String fileName) {
        return fileService.load("files/product/" + productId + "/" + fileName);
    }

    public Product getProductById(Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException("Продукт с id " + productId + " не найден"));
    }

    public List<Product> updateProducts(List<ProductDtoRequest> productsDto) {
        return productsDto.stream()
                .map(p -> updateProduct(p, p.getId()))
                .toList();
    }
}
