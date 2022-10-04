package com.characterviewer;

import java.util.ArrayList;
import java.util.Arrays;

import com.characterviewer.RequestObjects.CharacterRequest;
import com.characterviewer.CharacterComponents.Spell;
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
    Character newCharacter(@RequestBody CharacterRequest charRequest) {
        String dice = String.join(",", charRequest.getDamageDice());
        ArrayList<String> spells = charRequest.getSpells();
        String name = charRequest.getName();

        ArrayList<Spell> charSpells = new ArrayList<Spell>(Arrays.asList(spells
            .stream()
            .map(spellString -> new Spell(spellString, dice))
            .toArray(Spell[]::new)));

        Character newCharacter = new Character(name, charSpells);

        return repository.save(newCharacter);
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
