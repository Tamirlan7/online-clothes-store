package com.tami.online.store.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDtoRequest {

    private Long id;

    @NotBlank(message = "Укажите название продукта")
    private String name;

    @NotNull(message = "Укажите цену продукта")
    @PositiveOrZero(message = "Цена должна быть больше либо равна нулю")
    private double price = -1L;

    @NotNull(message = "Укажите размеры продукта")
    private List<ProductSizeDtoRequest> sizes;

    @PositiveOrZero(message = "Скидка должна быть больше нуля")
    private double priceWithDiscount = -1L;

    @NotBlank(message = "Укажите коллекцию продукта")
    private String collectionName;

    @NotBlank(message = "Укажите тип одежды")
    private String clothingType;

    @NotNull(message = "У продукта должно быть минимум одно изображение")
    private List<MultipartFile> mediaFiles;

    private boolean visible;

    private boolean visibleChanged = false;

    private boolean preOrderChanged = false;

    private boolean preOrder;

    private String description;

    private String weight;

    private String dimension;
}
