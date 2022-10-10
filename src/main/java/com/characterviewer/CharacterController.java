package com.characterviewer;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import com.characterviewer.RequestObjects.CharacterRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
public class CharacterController {
    private final CharacterRepository repository;

    @Autowired
    CharacterController(CharacterRepository repository) {
        this.repository = repository;
    }

    @CrossOrigin(exposedHeaders = {"Access-Control-Allow-Origin"})
    @RequestMapping(method = RequestMethod.GET, value = "/characters")
    ResponseEntity<List<Character>> all() {
        return ResponseEntity.ok(repository.findAll());
    }

    @CrossOrigin(exposedHeaders = {"Access-Control-Allow-Origin"})
    @PostMapping("/characters")
    public ResponseEntity<Character> createNewCharacter(@RequestBody CharacterRequest charRequest) {
        ArrayList<String> spells = charRequest.getSpells();
        String name = charRequest.getName();
        String charClass = charRequest.getCharacterClass();

        System.out.println(charRequest.getName());
        String spellString = spells.stream().collect(Collectors.joining(","));

        Character newCharacter = new Character(name, charClass, spellString);

        var characterResponse = repository.save(newCharacter);

        System.out.println(characterResponse);

        return ResponseEntity.ok(characterResponse);
    }

    @CrossOrigin(exposedHeaders = {"Access-Control-Allow-Origin"})
    @PutMapping("/characters")
    public Character updateCharacter(@RequestBody CharacterRequest characterRequest) {

        return new Character();
    }

    @CrossOrigin(exposedHeaders = {"Access-Control-Allow-Origin"})
    @GetMapping("/characters/{id}")
    ResponseEntity<Character> one(@PathVariable Long id) {
        var character = repository.findById(id);
        if (character.isEmpty()) {
            throw new CharacterException(id);
            //return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(character.get());
    }

    @CrossOrigin(exposedHeaders = {"Access-Control-Allow-Origin"})
    @RequestMapping(method = RequestMethod.DELETE, value = "/characters/{id}")
    void deleteCharacter(@PathVariable Long id) {
        System.out.println("in delete route");
        repository.deleteById(id);
    }
}
