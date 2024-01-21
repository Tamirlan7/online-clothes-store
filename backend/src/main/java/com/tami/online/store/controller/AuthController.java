package com.tami.online.store.controller;

import com.tami.online.store.dto.RefreshDto;
import com.tami.online.store.dto.Tokens;
import com.tami.online.store.model.User;
import com.tami.online.store.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthService authService;
    @PostMapping("/login")
    public ResponseEntity<Tokens> login(@RequestBody User user) {
        return ResponseEntity.ok(authService.login(user));
    }
    @PostMapping("/refresh")
    public ResponseEntity<Tokens> refresh(@RequestBody RefreshDto refreshDto) {
        return ResponseEntity.ok(authService.refresh(refreshDto));
    }
}
