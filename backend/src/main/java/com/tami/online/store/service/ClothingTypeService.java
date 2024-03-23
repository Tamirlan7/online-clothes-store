package com.tami.online.store.service;

import com.tami.online.store.dto.ClothingTypeDtoRequest;
import com.tami.online.store.exception.CustomBadRequestException;
import com.tami.online.store.exception.NotFoundException;
import com.tami.online.store.model.ClothingType;
import com.tami.online.store.repository.ClothingTypeRepository;
import jakarta.persistence.EntityExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClothingTypeService {

    private final ClothingTypeRepository clothingTypeRepository;

    public List<ClothingType> getAllClothingTypes() {
        return clothingTypeRepository.findAll();
    }

    public ClothingType createClothingType(ClothingTypeDtoRequest clothingTypeDtoRequest) {
        if (clothingTypeRepository.findByName(clothingTypeDtoRequest.getClothingType()).isPresent()) {
            throw new EntityExistsException("clothingType with name " + clothingTypeDtoRequest.getClothingType() + " already exists");
        }

        ClothingType clothingType = ClothingType.builder()
                .name(clothingTypeDtoRequest.getClothingType())
                .build();

        return clothingTypeRepository.save(clothingType);
    }

    public ClothingType updateClothingType(ClothingTypeDtoRequest clothingTypeDtoRequest, Long id) {
        ClothingType clothingTypeFromDb = clothingTypeRepository
                .findById(id)
                .orElseThrow(() -> new NotFoundException("Тип одежды с id " + id + " не существует"));

        if (clothingTypeDtoRequest.getClothingType() != null) {
            clothingTypeFromDb.setName(clothingTypeDtoRequest.getClothingType());
            clothingTypeRepository.save(clothingTypeFromDb);
        }

        return clothingTypeFromDb;
    }

    public void deleteClothingType(Long id) {
        clothingTypeRepository.findById(id).ifPresent(c -> {
            if (!c.getProducts().isEmpty()) {
                throw new CustomBadRequestException("Перед тем как удалить тип одежды, нужно удалить продукты имеющий данный тип одежды");
            }

            clothingTypeRepository.deleteById(id);
        });
    }

}
