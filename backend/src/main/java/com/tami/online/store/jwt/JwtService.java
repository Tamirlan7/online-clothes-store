package com.tami.online.store.jwt;

import com.tami.online.store.jwt.serializer.AccessTokenSerializer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JwtService {
    private final AccessTokenSerializer tokenSerializer;
    public String generateAccessToken() {
        return null;
    }
    public String generateRefreshToken() {
        return null;
    }
}
