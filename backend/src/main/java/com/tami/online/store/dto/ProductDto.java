package com.tami.online.store.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Builder;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Builder
public record ProductDto(
    @NotBlank(message = "name is required.")
    @RequestParam
    String name,
    @NotNull(message = "price is required.")
    @PositiveOrZero(message = "Цена должна быть больше либо равна нулю")
    @RequestParam
    Integer price,
    @NotBlank(message = "size is required.")
    @RequestParam
    String size,
    @NotBlank(message = "clothingType is required.")
    @RequestParam
    String clothingType,
    @NotNull(message = "mediaFiles is required.")
    @RequestParam
    MultipartFile[] mediaFiles
) {
}
