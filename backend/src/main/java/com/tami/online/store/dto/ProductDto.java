package com.tami.online.store.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    @NotBlank(message = "Укажите название продукта")
    private String name;

    @NotNull(message = "Укажите цену продукта")
    @PositiveOrZero(message = "Цена должна быть больше либо равна нулю")
    private double price;

    @NotBlank(message = "Укажите размер продукта")
    private String size;

    @Positive(message = "Скидка должна быть больше нуля")
    private double discountPercentage;

    @NotBlank(message = "Укажите коллекцию продукта")
    private String collectionName;

    @NotBlank(message = "Укажите тип одежды")
    private String clothingType;

    @NotNull(message = "У продукта должно быть минимум одно изображение")
    private MultipartFile[] mediaFiles;
}
