package com.tami.online.store.service;

import com.tami.online.store.dto.CollectionDtoRequest;
import com.tami.online.store.dto.ProductSizeDtoRequest;
import com.tami.online.store.exception.NotFoundException;
import com.tami.online.store.model.Collection;
import com.tami.online.store.model.ProductSize;
import com.tami.online.store.repository.ProductSizeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductSizeService {

    private final ProductSizeRepository productSizeRepository;

    public List<ProductSize> getAllSizes() {
        return productSizeRepository.findAll();
    }

    public ProductSize createSize(ProductSizeDtoRequest productSizeDtoRequest) {
        ProductSize size = ProductSize.builder()
                .name(productSizeDtoRequest.getSizeName())
                .build();

        return productSizeRepository.save(size);
    }

    public ProductSize updateSize(ProductSizeDtoRequest productSizeDtoRequest, Long id) {
        ProductSize sizeFromDb = productSizeRepository
                .findById(id)
                .orElseThrow(() -> new NotFoundException("Размер продукта с id " + id + " не существует"));

        if (productSizeDtoRequest.getSizeName() != null) {
            sizeFromDb.setName(productSizeDtoRequest.getSizeName());
            productSizeRepository.save(sizeFromDb);
        }

        return sizeFromDb;
    }

    public void deleteSize(Long id) {
        productSizeRepository.deleteById(id);
    }

}
