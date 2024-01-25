package com.tami.online.store.repository;

import com.tami.online.store.model.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface SizeRepository extends JpaRepository<Size, Long> {
    List<Size> findAllByNameIn(Collection<String> names);
}
