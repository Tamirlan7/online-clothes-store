package com.tami.online.store.jwt.factory;

import com.tami.online.store.jwt.model.AccessToken;
import com.tami.online.store.jwt.model.RefreshToken;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.Instant;
import java.util.List;

@Component
public class AccessTokenFactory {
    private final Duration tokenTtl;

    public AccessTokenFactory(@Value("${jwt.access-token-expiration}") String accessTokenExpiration) {
        int duration = Integer.parseInt(accessTokenExpiration.substring(0, accessTokenExpiration.length() - 1));

        switch (accessTokenExpiration.charAt(accessTokenExpiration.length() - 1)) {
            case 'm':
                this.tokenTtl = Duration.ofMinutes(duration);
                break;
            case 'h':
                this.tokenTtl = Duration.ofHours(duration);
                break;
            case 'd':
                this.tokenTtl = Duration.ofDays(duration);
                break;
            default:
                // if in the application.yml jwt.access-token-expiration is not specified
                this.tokenTtl = Duration.ofMinutes(15);
        }
    }

    public AccessToken generate(RefreshToken refreshToken) {
        Instant now = Instant.now();

        List<String> authorities = refreshToken.authorities()
                .stream()
                .filter(authority -> !authority.startsWith("JWT")).toList();

        return AccessToken.builder()
                .id(refreshToken.id())
                .expiresAt(now.plus(tokenTtl))
                .issuedAt(now)
                .authorities(authorities)
                .userId(refreshToken.userId())
                .build();
    }
}
