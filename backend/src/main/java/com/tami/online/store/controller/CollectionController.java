package com.tami.online.store.controller;

import com.tami.online.store.dto.CollectionDtoRequest;
import com.tami.online.store.model.Collection;
import com.tami.online.store.service.CollectionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/collection")
public class CollectionController {

    private final CollectionService collectionService;

    @GetMapping
    public ResponseEntity<List<Collection>> getAll() {
        return ResponseEntity.ok(collectionService.getAllCollections());
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Collection> create(@RequestBody @Valid CollectionDtoRequest collectionDtoRequest) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(collectionService.createCollection(collectionDtoRequest));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Collection> update(
        @RequestBody CollectionDtoRequest collectionDtoRequest,
        @PathVariable("id") Long id
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(collectionService.updateCollection(collectionDtoRequest, id));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAnyRole('ADMIN')")
    public void delete(@PathVariable("id") Long id) {
        collectionService.deleteCollection(id);
    }
}
