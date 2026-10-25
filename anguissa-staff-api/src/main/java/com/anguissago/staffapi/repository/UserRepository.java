package com.anguissago.staffapi.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anguissago.staffapi.models.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByUsername(String username);
}
