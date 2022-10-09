package com.characterviewer;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CharacterRepository extends JpaRepository<Character, Long> {
    @Override
    Optional<Character> findById(Long id);
}
