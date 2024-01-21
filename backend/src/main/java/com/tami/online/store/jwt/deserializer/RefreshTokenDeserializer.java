package com.tami.online.store.jwt.deserializer;

import com.tami.online.store.jwt.model.RefreshToken;

public interface RefreshTokenDeserializer {

    public RefreshToken deserialize(String strFormatToken);

}
