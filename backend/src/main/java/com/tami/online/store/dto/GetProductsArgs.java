package com.tami.online.store.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class GetProductsArgs {
    private String collection;
    private String clothingType;
    private String name;
    private int page;
    private int size;
    private String sortBy;
}
