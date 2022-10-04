package com.characterviewer;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;

@RestController
class CharacterController {
    private final CharacterRepository repository;

    CharacterController(CharacterRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/characters")
    Iterable<Character> all() {
        return repository.findAll();
    }

    @PostMapping(
      value = "/characters", 
      consumes = { MediaType.APPLICATION_JSON_VALUE }, 
      produces = { MediaType.APPLICATION_JSON_VALUE }
    )
    Character newCharacter(@RequestBody Character character) {
        return repository.save(character);
    }

    @PostMapping("/characters-debugger")
    String debugPostCharacter(@RequestBody String body) {
        return "Character body" + body;
    }

    @GetMapping("/characters/{id}")
    Character one(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new CharacterException(id));
    }

    @DeleteMapping("/characters/{id}")
    void deleteCharacter(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
