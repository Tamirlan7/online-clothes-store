package com.tami.online.store.service;

import com.tami.online.store.dto.ProductDtoRequest;
import com.tami.online.store.model.Product;
import com.tami.online.store.repository.ProductRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Service
@Validated
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMediaFileService productMediaFileService;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product createProduct(@Valid ProductDtoRequest productDtoRequest) {
        return null;
    }
}
