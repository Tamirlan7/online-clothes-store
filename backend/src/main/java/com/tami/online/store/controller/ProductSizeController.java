package com.tami.online.store.controller;

import com.tami.online.store.dto.ProductSizeDtoRequest;
import com.tami.online.store.model.ProductSize;
import com.tami.online.store.service.ProductSizeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/product/size")
public class ProductSizeController {

    private final ProductSizeService productSizeService;

    @GetMapping
    public ResponseEntity<List<ProductSize>> getAllSizes() {
        return ResponseEntity.ok(productSizeService.getAllSizes());
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<ProductSize> createSize(@RequestBody @Valid ProductSizeDtoRequest productSizeDtoRequest) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(productSizeService.createSize(productSizeDtoRequest));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<ProductSize> updateSize(
            @RequestBody ProductSizeDtoRequest productSizeDtoRequest,
            @PathVariable("id") Long id
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(productSizeService.updateSize(productSizeDtoRequest, id));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAnyRole('ADMIN')")
    public void deleteSize(@PathVariable("id") Long id) {
        productSizeService.deleteSize(id);
    }

}
