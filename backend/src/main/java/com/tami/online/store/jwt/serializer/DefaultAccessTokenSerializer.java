package com.tami.online.store.jwt.serializer;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.tami.online.store.jwt.model.AccessToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Date;

public class DefaultAccessTokenSerializer implements AccessTokenSerializer {

    private static final Logger LOGGER = LoggerFactory.getLogger(DefaultAccessTokenSerializer.class);
    private final JWSSigner jwsSigner;
    private final JWSAlgorithm jwsAlgorithm = JWSAlgorithm.HS256;

    public DefaultAccessTokenSerializer(JWSSigner jwsSigner) {
        this.jwsSigner = jwsSigner;
    }

    @Override
    public String serialize(AccessToken token) {

        JWSHeader jwsHeader = new JWSHeader.Builder(jwsAlgorithm)
                .keyID(token.id().toString())
                .build();

        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .expirationTime(token.expiresAt())
                .issueTime(token.issuedAt())
                .jwtID(token.id().toString())
                .claim("roles", token.authorities())
                .claim("userId", token.userId())
                .build();

        var signedJwt = new SignedJWT(jwsHeader, claimsSet);

        try {
            signedJwt.sign(this.jwsSigner);
            return signedJwt.serialize();
        } catch (JOSEException ex) {
            LOGGER.error(ex.getMessage(), ex);
        }

        return null;
    }
}
