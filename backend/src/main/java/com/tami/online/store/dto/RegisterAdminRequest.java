package com.tami.online.store.dto;

import jakarta.validation.constraints.NotBlank;

public record RegisterAdminRequest(
        @NotBlank(message = "username is required")
        String username,
        @NotBlank(message = "password is required")
        String password
) {
}
