package com.tami.online.store.repository;

import com.tami.online.store.model.ClothingType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClothingTypeRepository extends JpaRepository<ClothingType, Long> {

    Optional<ClothingType> findByName(String name);

}
