package com.tami.online.store.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClothingTypeDtoRequest {

    @NotBlank(message = "Укажите название типа одежды")
    private String clothingType;
}
