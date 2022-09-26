package com.characterviewer;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface CharacterRepository extends CrudRepository<Character, Long> {
    @Override
    Optional<Character> findById(Long id);
}
