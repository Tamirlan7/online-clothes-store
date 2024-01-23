package com.tami.online.store.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity
@Table(name = "t_product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @PositiveOrZero(message = "Цена должна быть больше либо равна нулю")
    @Column(nullable = false)
    private double price;

    @ManyToMany
    @JoinTable(
            name = "t_product_product_size",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "product_size_id")
    )
    private List<ProductSize> sizes;

    @ManyToOne
    @JoinColumn(name = "clothing_type_id")
    private ClothingType clothingType;

    @ManyToOne
    @JoinColumn(name = "collection_id")
    private Collection collection;

    @OneToMany(mappedBy = "product", fetch = FetchType.EAGER, cascade = { CascadeType.PERSIST, CascadeType.REMOVE, CascadeType.MERGE })
    private List<ProductMediaFile> productMediaFiles;

    @Column(name = "discount_percentage")
    private double discountPercentage;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updated_at;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
}
