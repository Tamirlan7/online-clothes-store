package com.tami.online.store.dto;

import jakarta.validation.constraints.NotBlank;

public record RefreshDto(
        @NotBlank(message = "refreshToken is required")
        String refreshToken
) {

}

