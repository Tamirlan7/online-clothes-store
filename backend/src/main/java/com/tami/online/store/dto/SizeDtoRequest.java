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
public class SizeDtoRequest {

    @NotBlank(message = "Укажите название размера (S, M, L, XL)")
    private String sizeName;

}
