package com.tami.online.store.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Builder;
import org.springframework.web.multipart.MultipartFile;

@Builder
public record ProductDto(
    @NotBlank(message = "Укажите название продукта")
    String name,

    @NotNull(message = "Укажите цену продукта")
    @PositiveOrZero(message = "Цена должна быть больше либо равна нулю")
    double price,

    @NotBlank(message = "Укажите размер продукта")
    String size,

    @Positive(message = "Скидка должна быть больше нуля")
    double discountPercentage,

    @NotBlank(message = "Укажите коллекцию продукта")
    String collectionName,

    @NotBlank(message = "Укажите тип одежды")
    String clothingType,

    @NotNull(message = "У продукта должно быть минимум одно изображение")
    MultipartFile[] mediaFiles
) {
}
