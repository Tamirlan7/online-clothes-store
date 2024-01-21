package com.tami.online.store.jwt.serializer;

import com.tami.online.store.jwt.model.RefreshToken;

public interface RefreshTokenSerializer {

    public String serialize(RefreshToken token);

}
