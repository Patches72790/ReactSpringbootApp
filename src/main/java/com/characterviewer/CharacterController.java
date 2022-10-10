package com.characterviewer;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import com.characterviewer.RequestObjects.CharacterRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
class CharacterController {
    private final CharacterRepository repository;

    @Autowired
    CharacterController(CharacterRepository repository) {
        this.repository = repository;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/characters")
    @CrossOrigin(exposedHeaders = {"Access-Control-Allow-Origin"})
    ResponseEntity<List<Character>> all() {
        return ResponseEntity.ok(repository.findAll());
    }

    @CrossOrigin(exposedHeaders = {"Access-Control-Allow-Origin"})
    @PostMapping("/characters")
    public Character postCharacter(@RequestBody CharacterRequest charRequest) {
        ArrayList<String> spells = charRequest.getSpells();
        String name = charRequest.getName();
        String charClass = charRequest.getCharacterClass();

        String spellString = spells.stream().collect(Collectors.joining(","));

        Character newCharacter = new Character(name, charClass, spellString);

        System.out.println(newCharacter);
        return repository.save(newCharacter);
    }
    @CrossOrigin(exposedHeaders = {"Access-Control-Allow-Origin"})
    @PutMapping("/characters")
    public Character newCharacter(@RequestBody CharacterRequest characterRequest) {

        return new Character();
    }

    @GetMapping("/characters/{id}")
    @CrossOrigin(exposedHeaders = {"Access-Control-Allow-Origin"})
    ResponseEntity<Character> one(@PathVariable Long id) {
        try {
            var character = repository.findById(id);
            return ResponseEntity.ok(character.get());
        } catch (Exception e) {
            throw new CharacterException(id);
        }
    }

    @DeleteMapping("/characters/{id}")
    @CrossOrigin(exposedHeaders = {"Access-Control-Allow-Origin"})
    void deleteCharacter(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
