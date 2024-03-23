package com.tami.online.store.repository;

import com.tami.online.store.model.Role;
import com.tami.online.store.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findAllByRole(Role role);
    Optional<User> findByUsername(String username);
}
