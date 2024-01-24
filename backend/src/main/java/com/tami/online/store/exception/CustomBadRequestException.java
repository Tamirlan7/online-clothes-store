package com.tami.online.store.exception;

import java.util.Map;

public class CustomBadRequestException extends RuntimeException {
    public CustomBadRequestException(String message) {
        super(message);
    }

}
