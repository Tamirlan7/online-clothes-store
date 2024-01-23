package com.tami.online.store.repository;

import com.tami.online.store.model.ClothingType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClothingTypeRepository extends JpaRepository<ClothingType, Long> {
}
