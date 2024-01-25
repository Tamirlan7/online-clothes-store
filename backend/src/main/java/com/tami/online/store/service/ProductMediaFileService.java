package com.tami.online.store.service;

import com.tami.online.store.dto.FileDtoResponse;
import com.tami.online.store.model.Product;
import com.tami.online.store.model.ProductMediaFile;
import com.tami.online.store.repository.ProductMediaFileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
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
    public void createMediaFiles(MultipartFile[] files, Product product) {
        List<ProductMediaFile> productMediaFiles = Arrays.stream(files)
                .map(file -> create(file, product))
                .collect(Collectors.toList());

        product.setProductMediaFiles(productMediaFiles);
    }

}
