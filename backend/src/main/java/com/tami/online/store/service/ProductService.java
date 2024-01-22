package com.tami.online.store.service;

import com.tami.online.store.dto.ProductDto;
import com.tami.online.store.model.Product;
import com.tami.online.store.model.ProductMediaFile;
import com.tami.online.store.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMediaFileService productMediaFileService;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public void createProduct(ProductDto productDto) {
        var product = Product.builder()
                .name(productDto.name())
                .clothingType(productDto.clothingType())
                .price(productDto.price())
                .size(productDto.size())
                .build();

        List<ProductMediaFile> productMediaFiles = productMediaFileService.createMediaFiles(productDto.mediaFiles(), product);
        product.setProductMediaFiles(productMediaFiles);
        productRepository.save(product);
    }
}
