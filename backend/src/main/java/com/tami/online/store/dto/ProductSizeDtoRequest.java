package com.tami.online.store.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductSizeDtoRequest {

    @NotNull(message = "Укажите название размера (S, M, L, XL)")
    private String size;

    @PositiveOrZero(message = "Количество должно быть больше либо равно нулю, sizes: [ { quantity: number } ]")
    private int quantity = -1;
}
