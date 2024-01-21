package com.tami.online.store.repository;

import com.tami.online.store.model.ProductMediaFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductMediaFileRepository extends JpaRepository<ProductMediaFile, Long> {
}
