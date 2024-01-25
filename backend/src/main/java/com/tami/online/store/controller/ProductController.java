package com.tami.online.store.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tami.online.store.dto.ProductDtoRequest;
import com.tami.online.store.dto.ProductSizeDtoRequest;
import com.tami.online.store.exception.CustomBadRequestException;
import com.tami.online.store.model.Product;
import com.tami.online.store.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/product")
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity
                .ok(productService.getAllProducts());
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Product> createProduct(
            @RequestParam String name,
            @RequestParam List<String> sizes,
            @RequestParam double price,
            @RequestParam(required = false, defaultValue = "0") double discountPercentage,
            @RequestParam String collectionName,
            @RequestParam String clothingType,
            @RequestParam MultipartFile[] mediaFiles
    ) {
        ObjectMapper mapper = new ObjectMapper();
        List<ProductSizeDtoRequest> productSizes = new ArrayList<>();
        sizes.forEach((size) -> {
            try {
                productSizes.add(mapper.readValue(size, ProductSizeDtoRequest.class));
            } catch (JsonProcessingException e) {
                throw new CustomBadRequestException("Ошибка при конвертации в ProductSizeDtoRequest, поле sizes должно быть массивом объектов { sizeName: string, quantity: int } ошибка: " + e.getMessage());
            }
        });

        ProductDtoRequest product = ProductDtoRequest.builder()
                .name(name)
                .sizes(productSizes)
                .price(price)
                .discountPercentage(discountPercentage)
                .collectionName(collectionName)
                .clothingType(clothingType)
                .mediaFiles(mediaFiles)
                .build();

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(productService.createProduct(product));
    }
}
