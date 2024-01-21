package com.tami.online.store.jwt.deserializer;

import com.tami.online.store.jwt.model.AccessToken;

public interface AccessTokenDeserializer {
    public AccessToken deserialize(String strFormatToken);
}
