package com.tami.online.store.service;

import com.tami.online.store.dto.ProductDto;
import com.tami.online.store.model.Product;
import com.tami.online.store.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMediaFileService productMediaFileService;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public void createProduct(ProductDto productDto) {
        if (productDto.getName() == null) {
//            throw new ProductException("Укажите название продукта (поле name)");
        }

        if (productDto.getPrice() < 0) {
//            throw new ProductException("Цена должна быть больше либо равна нулю (поле price)");
        }

        if (productDto.getSize() == null) {
//            throw new ProductException("Укажите размер продукта (поле size)");
        }

//        if (productDto.getDiscountPercentage() > 0) {
//            throw new ProductException("Цена должна быть больше либо равна нулю (поле price)");
//        }

        if (productDto.getClothingType() == null) {
//            throw new ProductException("Укажите тип одежды (поле clothingType)");
        }

        if (productDto.getCollectionName() == null) {
//            throw new ProductException("Укажите коллекцию продукта (поле collectionName)");
        }

        var product = Product.builder()
                .name(productDto.getName())
                .clothingType(productDto.getClothingType())
                .price(productDto.getPrice())
                .size(productDto.getSize())
                .build();

        productRepository.save(product);

        productMediaFileService.createMediaFiles(productDto.getMediaFiles(), product);
    }
}
