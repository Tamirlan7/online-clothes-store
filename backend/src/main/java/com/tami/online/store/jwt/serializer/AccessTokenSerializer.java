package com.tami.online.store.jwt.serializer;

import com.tami.online.store.jwt.model.AccessToken;

public interface AccessTokenSerializer {
    public String serialize(AccessToken token);
}
