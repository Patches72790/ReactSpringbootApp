package com.characterviewer;

import java.util.List;
import java.util.stream.Collectors;

import com.characterviewer.RequestObjects.CharacterRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(exposedHeaders = {"Access-Control-Allow-Origin"})
@RequestMapping("/api")
public class CharacterController {
    private final CharacterRepository repository;

    @Autowired
    public CharacterController(CharacterRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/characters")
    public ResponseEntity<List<Character>> all() {
        return ResponseEntity.ok(repository.findAll());
    }

    @GetMapping("/characters/{id}")
    ResponseEntity<Character> one(@PathVariable Long id) {
        var character = repository.findById(id);
        if (character.isEmpty()) {
            throw new CharacterException(id);
        }
        return ResponseEntity.ok(character.get());
    }

    @PostMapping("/characters")
    public ResponseEntity<Character> createNewCharacter(@RequestBody CharacterRequest charRequest) {
        var spells = charRequest.getSpells();
        var name = charRequest.getName();
        var charClass = charRequest.getCharacterClass();

        var spellString = spells.stream().collect(Collectors.joining(","));
        var newCharacter = new Character(name, charClass, spellString);
        var characterResponse = repository.save(newCharacter);

        return ResponseEntity.ok(characterResponse);
    }

    @PutMapping("/characters")
    public ResponseEntity<Character> updateCharacter(@RequestBody CharacterRequest characterRequest) {
        var charId = characterRequest.getId();

        var characterToUpdate= repository.findById(charId);
        if (characterToUpdate.isEmpty()) {
            throw new CharacterException(charId);
        }

        var character = characterToUpdate.get();
        character.setCharacterClass(characterRequest.getCharacterClass());
        character.setName(characterRequest.getName());
        character.setSpells(
            characterRequest.getSpells().stream()
                    .collect(Collectors.joining(","))
        );
        var updatedCharacter = repository.save(character);

        return ResponseEntity.ok(updatedCharacter);
    }

    @DeleteMapping("/characters/{id}")
    void deleteCharacter(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
