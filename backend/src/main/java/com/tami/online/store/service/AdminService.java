package com.tami.online.store.service;

import com.tami.online.store.dto.AdminResponse;
import com.tami.online.store.dto.RegisterAdminRequest;
import com.tami.online.store.dto.RegisterAdminResponse;
import com.tami.online.store.model.Role;
import com.tami.online.store.model.User;
import com.tami.online.store.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public RegisterAdminResponse registerAdmin(RegisterAdminRequest registerAdminRequest) {
        User user = userRepository.save(
                User.builder()
                        .username(registerAdminRequest.username())
                        .password(passwordEncoder.encode(registerAdminRequest.password()))
                        .role(Role.ROLE_ADMIN)
                        .build()
        );

        return RegisterAdminResponse.builder()
                .message("Admin has been successfully created.")
                .username(user.getUsername())
                .build();
    }

    public List<AdminResponse> getAllAdmins() {
        return userRepository.findAllByRole(Role.ROLE_ADMIN)
                .stream().map((user) -> {
                    return AdminResponse.builder()
                            .username(user.getUsername())
                            .build();
                }).toList();
    }
}
