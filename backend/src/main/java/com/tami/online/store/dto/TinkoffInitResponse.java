package com.tami.online.store.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class TinkoffInitResponse {

    @JsonProperty("Success")
    private String success;

    @JsonProperty("ErrorCode")
    private int errorCode;

    @JsonProperty("TerminalKey")
    private String terminalKey;

    @JsonProperty("Status")
    private String status;

    @JsonProperty("PaymentId")
    private Long paymentId;

    @JsonProperty("OrderId")
    private String orderId;

    @JsonProperty("Amount")
    private Long amount;

    @JsonProperty("PaymentURL")
    private String paymentURL;
}
