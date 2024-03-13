package com.tami.online.store.service;

import com.tami.online.store.dto.RefreshDto;
import com.tami.online.store.dto.Tokens;
import com.tami.online.store.exception.InvalidTokenException;
import com.tami.online.store.exception.UserNotFoundException;
import com.tami.online.store.exception.UsernameAlreadyExistsException;
import com.tami.online.store.exception.WrongPasswordException;
import com.tami.online.store.jwt.deserializer.AccessTokenDeserializer;
import com.tami.online.store.jwt.deserializer.RefreshTokenDeserializer;
import com.tami.online.store.jwt.factory.AccessTokenFactory;
import com.tami.online.store.jwt.factory.RefreshTokenFactory;
import com.tami.online.store.jwt.model.AccessToken;
import com.tami.online.store.jwt.model.RefreshToken;
import com.tami.online.store.jwt.serializer.AccessTokenSerializer;
import com.tami.online.store.jwt.serializer.RefreshTokenSerializer;
import com.tami.online.store.model.Role;
import com.tami.online.store.model.User;
import com.tami.online.store.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AccessTokenFactory accessTokenFactory;
    private final RefreshTokenFactory refreshTokenFactory;
    private final AccessTokenSerializer accessTokenSerializer;
    private final RefreshTokenSerializer refreshTokenSerializer;
    private final RefreshTokenDeserializer refreshTokenDeserializer;
    private final AccessTokenDeserializer accessTokenDeserializer;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public Tokens login(User loginUser) {
        User user = userRepository.findByUsername(loginUser.getUsername())
                .orElseThrow(() -> new UserNotFoundException("User with username " + loginUser.getUsername() + " not found"));

        if (!passwordEncoder.matches(loginUser.getPassword(), user.getPassword())) {
            throw new WrongPasswordException("Wrong password");
        }

        RefreshToken refreshToken = refreshTokenFactory.generate(user);
        AccessToken accessToken = accessTokenFactory.generate(refreshToken);

        return new Tokens(
            accessTokenSerializer.serialize(accessToken),
            refreshTokenSerializer.serialize(refreshToken)
        );
    }

    public Tokens register(User requestUser) {
        if (userRepository.findByUsername(requestUser.getUsername()).isPresent()) {
            throw new UsernameAlreadyExistsException("user with username " + requestUser.getUsername() + " already exists");
        }

        User user = userRepository.save(
            User.builder()
                    .username(requestUser.getUsername())
                    .password(passwordEncoder.encode(requestUser.getPassword()))
                    .role(Role.ROLE_USER)
                    .build()
        );


        RefreshToken refreshToken = refreshTokenFactory.generate(user);
        AccessToken accessToken = accessTokenFactory.generate(refreshToken);

        return new Tokens(
            accessTokenSerializer.serialize(accessToken),
            refreshTokenSerializer.serialize(refreshToken)
        );
    }

    public Tokens refresh(RefreshDto refreshDto) {
        if (accessTokenDeserializer.deserialize(refreshDto.refreshToken()) != null) {
            throw new InvalidTokenException("Invalid refreshToken, you passed the accessToken");
        }

        RefreshToken token = refreshTokenDeserializer.deserialize(refreshDto.refreshToken());

        if (token != null &&
                token.authorities().contains("JWT_REFRESH") &&
                Instant.now().isBefore(token.expiresAt().toInstant())) {

            User user = userRepository.findById(token.userId())
                    .orElseThrow(() -> new UserNotFoundException("user with id " + token.userId() + " not found"));

            RefreshToken refreshToken = refreshTokenFactory.generate(user);
            AccessToken accessToken = accessTokenFactory.generate(refreshToken);

            return new Tokens(
                accessTokenSerializer.serialize(accessToken),
                refreshTokenSerializer.serialize(refreshToken)
            );
        }

        throw new InvalidTokenException("Invalid refreshToken");
    }
}
