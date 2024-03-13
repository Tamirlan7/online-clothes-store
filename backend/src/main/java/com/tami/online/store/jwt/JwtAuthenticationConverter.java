package com.tami.online.store.jwt;

import com.tami.online.store.exception.InvalidTokenException;
import com.tami.online.store.jwt.deserializer.AccessTokenDeserializer;
import com.tami.online.store.jwt.model.AccessToken;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.authentication.AuthenticationConverter;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;

import java.time.Instant;

@RequiredArgsConstructor
public class JwtAuthenticationConverter implements AuthenticationConverter {

    private final AccessTokenDeserializer accessTokenDeserializer;

    @Override
    public Authentication convert(HttpServletRequest request) {
        String header = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (header != null && header.startsWith("Bearer ")) {
            String strFormatToken = header.substring(7);
            AccessToken token = accessTokenDeserializer.deserialize(strFormatToken);

            if (token != null && Instant.now().isBefore(token.expiresAt().toInstant())) {
                return new PreAuthenticatedAuthenticationToken(
                        token,
                        strFormatToken,
                        token.authorities().stream().map(SimpleGrantedAuthority::new).toList()
                );
            }
        }

        return null;
    }
}
