package com.tami.online.store.service;

import com.tami.online.store.dto.FileDtoResponse;
import com.tami.online.store.model.Product;
import com.tami.online.store.model.ProductMediaFile;
import com.tami.online.store.repository.ProductMediaFileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Files;


import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductMediaFileService {

    private final FileService fileService;
    private final ProductMediaFileRepository productMediaFileRepository;


    @Transactional
    public ProductMediaFile create(MultipartFile file, Product product) {
        FileDtoResponse response = fileService.save(file, "product/" + product.getId());

        var productMediaFile = ProductMediaFile.builder()
                .type(response.type())
                .name(response.name())
                .product(product)
                .path(response.path())
                .build();

        return productMediaFileRepository.save(productMediaFile);
    }

    @Transactional
    public void createMediaFiles(List<MultipartFile> files, Product product) {
        List<ProductMediaFile> productMediaFiles = files.stream()
                .map(file -> create(file, product))
                .collect(Collectors.toList());

        product.setProductMediaFiles(productMediaFiles);
    }

    public void copyMediaFiles(Product pCopyFrom, Product pCopyTo) {

        List<ProductMediaFile> productMediaFiles = pCopyFrom.getProductMediaFiles().stream()
                .map(file -> fileService.copyFile(file, "product/" + pCopyTo.getId().toString()))
                .map(dto -> ProductMediaFile.builder()
                        .name(dto.name())
                        .path(dto.path())
                        .type(dto.type())
                        .product(pCopyTo)
                        .build())
                .collect(Collectors.toList());

        productMediaFileRepository.saveAll(productMediaFiles);
        pCopyTo.setProductMediaFiles(productMediaFiles);
    }

}
