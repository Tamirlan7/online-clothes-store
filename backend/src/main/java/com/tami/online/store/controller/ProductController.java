package com.tami.online.store.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tami.online.store.dto.GetProductsArgs;
import com.tami.online.store.dto.ProductDtoRequest;
import com.tami.online.store.dto.ProductSizeDtoRequest;
import com.tami.online.store.exception.CustomBadRequestException;
import com.tami.online.store.model.Product;
import com.tami.online.store.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
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

    @GetMapping(value = "{productId}/file/{fileName}", produces = { MediaType.APPLICATION_OCTET_STREAM_VALUE })
    public ResponseEntity<Resource> getProductFileByFileName(
            @PathVariable("productId") Long productId,
            @PathVariable("fileName") String fileName
    ) {
        return ResponseEntity.ok(productService.getProductFileByFileName(productId, fileName));
    }

    @GetMapping("{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable("productId") Long productId) {
        return ResponseEntity.ok(productService.getProductById(productId));
    }

    @GetMapping
    public ResponseEntity<Page<Product>> getAllProducts(
            @RequestParam(name = "name", required = false, defaultValue = "") String name,
            @RequestParam(name = "collection", required = false) String collection,
            @RequestParam(name = "clothingType", required = false) String clothingType,
            @RequestParam(name = "page", required = false, defaultValue = "0") int page,
            @RequestParam(name = "size", required = false, defaultValue = "10") int size
    ) {
        return ResponseEntity
                .ok(productService.getAllProducts(
                        GetProductsArgs.builder()
                                .collection(collection)
                                .clothingType(clothingType)
                                .name(name)
                                .page(page)
                                .size(size)
                                .build()
                ));
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
                throw new CustomBadRequestException("Ошибка при конвертации в ProductSizeDtoRequest, поле sizes должно быть массивом объектов { size: string, quantity: int, additionalInfo: string } ошибка: " + e.getMessage());
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

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(
            @RequestBody ProductDtoRequest productDtoRequest,
            @PathVariable("id") Long id
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(productService.updateProduct(productDtoRequest, id));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteProduct(@PathVariable("id") Long id) {
        productService.deleteProduct(id);
    }
}
