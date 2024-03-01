package com.tami.online.store.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class TinkoffInitRequest {

    @JsonProperty("TerminalKey")
    private String terminalKey;

    @JsonProperty("Amount")
    private Long amount;

    @JsonProperty("OrderId")
    private String orderId;

    @JsonProperty("Description")
    private String description;

    @JsonProperty("Token")
    private String token;

    @JsonProperty("DATA")
    private Map<String, String> data;

    @JsonProperty("Receipt")
    private Map<String, String> receipt;
}
