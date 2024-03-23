package com.tami.online.store.controller;

import com.tami.online.store.dto.AdminResponse;
import com.tami.online.store.dto.RegisterAdminRequest;
import com.tami.online.store.dto.RegisterAdminResponse;
import com.tami.online.store.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping()
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<List<AdminResponse>> getAllAdmins() {
        return ResponseEntity.ok()
                .body(adminService.getAllAdmins());
    }

    @PreAuthorize("hasAnyRole('ROLE_SUPER_ADMIN')")
    @PostMapping("/register")
    public ResponseEntity<RegisterAdminResponse> registerAdmin(@RequestBody RegisterAdminRequest registerAdminRequest) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(adminService.registerAdmin(registerAdminRequest));
    }

}
