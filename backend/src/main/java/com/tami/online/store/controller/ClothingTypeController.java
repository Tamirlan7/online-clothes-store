package com.tami.online.store.controller;

import com.tami.online.store.dto.ClothingTypeDtoRequest;
import com.tami.online.store.model.ClothingType;
import com.tami.online.store.service.ClothingTypeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/product/clothing-type")
public class ClothingTypeController {

    private final ClothingTypeService clothingTypeService;

    @GetMapping
    public ResponseEntity<List<ClothingType>> getAll() {
        return ResponseEntity.ok(clothingTypeService.getAllClothingTypes());
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<ClothingType> create(@RequestBody @Valid ClothingTypeDtoRequest productSizeDtoRequest) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(clothingTypeService.createClothingType(productSizeDtoRequest));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<ClothingType> update(
            @RequestBody ClothingTypeDtoRequest productSizeDtoRequest,
            @PathVariable("id") Long id
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(clothingTypeService.updateClothingType(productSizeDtoRequest, id));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAnyRole('ADMIN')")
    public void delete(@PathVariable("id") Long id) {
        clothingTypeService.deleteClothingType(id);
    }


}
