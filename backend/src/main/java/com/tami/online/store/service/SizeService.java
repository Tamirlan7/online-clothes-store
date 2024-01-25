package com.tami.online.store.service;

import com.tami.online.store.dto.SizeDtoRequest;
import com.tami.online.store.exception.NotFoundException;
import com.tami.online.store.model.Size;
import com.tami.online.store.repository.SizeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SizeService {

    private final SizeRepository sizeRepository;

    public List<Size> getAllSizes() {
        return sizeRepository.findAll();
    }

    public Size createSize(SizeDtoRequest sizeDtoRequest) {
        Size size = Size.builder()
                .name(sizeDtoRequest.getSizeName())
                .build();

        return sizeRepository.save(size);
    }

    public Size updateSize(SizeDtoRequest sizeDtoRequest, Long id) {
        Size sizeFromDb = sizeRepository
                .findById(id)
                .orElseThrow(() -> new NotFoundException("Размер продукта с id " + id + " не существует"));

        if (sizeDtoRequest.getSizeName() != null) {
            sizeFromDb.setName(sizeDtoRequest.getSizeName());
            sizeRepository.save(sizeFromDb);
        }

        return sizeFromDb;
    }

    public void deleteSize(Long id) {
        sizeRepository.deleteById(id);
    }

}
