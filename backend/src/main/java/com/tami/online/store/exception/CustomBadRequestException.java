package com.tami.online.store.exception;

import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

@Getter
public class CustomBadRequestException extends RuntimeException {
    private Map<String, String> errors = new HashMap<>();

    public CustomBadRequestException(String message) {
        super(message);
        this.errors.put("message", message);
    }

    public CustomBadRequestException(String message, Map<String, String> errors) {
        super(message);
        this.errors = errors;
        this.errors.put("message", message);
    }

}
