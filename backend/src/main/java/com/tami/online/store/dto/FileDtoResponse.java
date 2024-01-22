package com.tami.online.store.dto;

import lombok.Builder;
import lombok.Data;

@Builder
public record FileDtoResponse(
        String path,
        String name,
        String type
) {
}
