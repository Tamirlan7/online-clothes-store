package com.tami.online.store.jwt.deserializer;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWEDecrypter;
import com.nimbusds.jwt.EncryptedJWT;
import com.tami.online.store.jwt.model.RefreshToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Date;
import java.text.ParseException;
import java.util.UUID;

public class DefaultRefreshTokenDeserializer implements RefreshTokenDeserializer {

    private static final Logger LOGGER = LoggerFactory.getLogger(DefaultRefreshTokenDeserializer.class);

    private final JWEDecrypter jweDecrypter;
    public DefaultRefreshTokenDeserializer(JWEDecrypter jweDecrypter) {
        this.jweDecrypter = jweDecrypter;
    }

    @Override
    public RefreshToken deserialize(String strFormatToken) {
        try {
            var encryptedJWT = EncryptedJWT.parse(strFormatToken);
            encryptedJWT.decrypt(this.jweDecrypter);
            var claimsSet = encryptedJWT.getJWTClaimsSet();
            return RefreshToken.builder()
                    .id(UUID.fromString(claimsSet.getJWTID()))
                    .expiresAt(Date.from(claimsSet.getExpirationTime().toInstant()))
                    .issuedAt(Date.from(claimsSet.getIssueTime().toInstant()))
                    .authorities(claimsSet.getStringListClaim("roles"))
                    .userId((Long) claimsSet.getClaim("userId"))
                    .build();
        } catch (ParseException | JOSEException exception) {
            LOGGER.error(exception.getMessage(), exception);
        }

        return null;
    }
}
