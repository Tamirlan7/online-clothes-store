package com.tami.online.store.dto;

public record Tokens(
    String accessToken,
    String refreshToken
) {
}
