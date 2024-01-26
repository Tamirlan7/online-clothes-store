package com.tami.online.store.repository;

import com.tami.online.store.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p JOIN p.collection c WHERE c.name = :categoryName")
    List<Product> findAllByCollectionName(@Param("categoryName") String categoryName);

}
