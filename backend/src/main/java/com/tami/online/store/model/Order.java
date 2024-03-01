package com.tami.online.store.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Table(name = "t_order_item")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "phone is required")
    @Column(nullable = false)
    private String phone;

    @NotBlank(message = "email is required")
    @Column(nullable = false)
    private String email;

    @NotBlank(message = "city is required")
    @Column(nullable = false)
    private String city;

    @NotBlank(message = "deliveryService is required")
    @Column(name = "delivery_service", nullable = false)
    private String deliveryService;

    @NotBlank(message = "deliveryPickUpPoint is required")
    @Column(name = "delivery_pick_up_point", nullable = false)
    private String deliveryPickUpPoint;

    @NotBlank(message = "fullName is required")
    @Column(name = "full_name", nullable = false)
    private String fullName;

    private String comment;

    @Column(name = "promo_code")
    private String promoCode;

    @NotBlank(message = "paymentMethod is required")
    @Column(name = "payment_method", nullable = false)
    private String paymentMethod;

    @OneToMany(mappedBy = "order")
    private List<OrderItem> orderItems;
}