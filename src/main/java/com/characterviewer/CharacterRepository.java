package com.characterviewer;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "characters", path = "characters")
public interface CharacterRepository extends CrudRepository<Character, Long> {
    @Override
    Optional<Character> findById(Long id);
}
