package com.tami.online.store.repository;

import com.tami.online.store.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT p FROM Product p " +
            "LEFT JOIN p.collection c " +
            "LEFT JOIN p.clothingType ct " +
            "WHERE " +
            "(:categoryName IS NULL OR c.name = :categoryName OR c.id IS NULL) " +
            "AND (:clothingTypeName IS NULL OR ct.name = :clothingTypeName OR ct.id IS NULL) " +
            "AND (:productName IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :productName, '%')) OR p.id IS NULL)")
    Page<Product> findByCollectionAndClothingTypeAndProductName(
            @Param("categoryName") String categoryName,
            @Param("clothingTypeName") String clothingTypeName,
            @Param("productName") String productName,
            Pageable pageable
    );

    @Query("SELECT p FROM Product p JOIN p.collection c WHERE c.name = :categoryName")
    List<Product> findAllByCollectionName(@Param("categoryName") String categoryName);

}
