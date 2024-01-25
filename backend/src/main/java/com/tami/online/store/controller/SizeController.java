package com.tami.online.store.controller;

import com.tami.online.store.dto.SizeDtoRequest;
import com.tami.online.store.model.Size;
import com.tami.online.store.service.SizeService;
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
public class SizeController {

    private final SizeService sizeService;

    @GetMapping
    public ResponseEntity<List<Size>> getAll() {
        return ResponseEntity.ok(sizeService.getAllSizes());
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Size> create(@RequestBody @Valid SizeDtoRequest sizeDtoRequest) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(sizeService.createSize(sizeDtoRequest));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Size> update(
            @RequestBody SizeDtoRequest sizeDtoRequest,
            @PathVariable("id") Long id
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(sizeService.updateSize(sizeDtoRequest, id));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAnyRole('ADMIN')")
    public void delete(@PathVariable("id") Long id) {
        sizeService.deleteSize(id);
    }

}
