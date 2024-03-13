package com.tami.online.store.jwt.model;

import lombok.Builder;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Builder
public record RefreshToken (
        UUID id,
        Date expiresAt,
        Date issuedAt,
        Long userId,
        List<String> authorities
) {

}
