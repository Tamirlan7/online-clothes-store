package com.tami.online.store.controller;

import com.tami.online.store.dto.GetOrdersResponse;
import com.tami.online.store.model.Order;
import com.tami.online.store.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/order")
public class OrderController {

    private final OrderService orderService;

    @GetMapping()
    public ResponseEntity<List<GetOrdersResponse>> getOrders() {
        return ResponseEntity.ok(orderService.getOrders());
    }

    @PostMapping()
    ResponseEntity<?> create() {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(orderService.create());
    }
}
