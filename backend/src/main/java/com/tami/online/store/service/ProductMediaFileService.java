package com.tami.online.store.service;

import com.tami.online.store.dto.FileDtoResponse;
import com.tami.online.store.model.Product;
import com.tami.online.store.model.ProductMediaFile;
import com.tami.online.store.repository.ProductMediaFileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductMediaFileService {

    private final FileService fileService;
    private final ProductMediaFileRepository productMediaFileRepository;

    public ProductMediaFile create(MultipartFile file, Product product) {
        FileDtoResponse response = fileService.save(file, "product/" + product.getId());

        var productMediaFile = ProductMediaFile.builder()
                .type(response.type())
                .name(response.name())
                .product(product)
                .path(response.path())
                .build();

        productMediaFileRepository.save(productMediaFile);
        return productMediaFile;
    }

    public List<ProductMediaFile> createMediaFiles(MultipartFile[] files, Product product) {
        List<ProductMediaFile> productMediaFiles = new ArrayList<>();

        for (MultipartFile file : files) {
            productMediaFiles.add(this.create(file, product));
        }

        return productMediaFiles;
    }

}
