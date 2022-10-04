package com.characterviewer;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import com.characterviewer.RequestObjects.CharacterRequest;
import com.characterviewer.CharacterComponents.Spell;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import org.springframework.web.bind.annotation.RestController;

@RestController
class CharacterController {
    private final CharacterRepository repository;

    CharacterController(CharacterRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/characters")
    CollectionModel<EntityModel<Character>> all() {
        List<EntityModel<Character>> characters = repository.findAll().stream()
            .map(character -> EntityModel.of(character,
                linkTo(methodOn(CharacterController.class).all()).withSelfRel(),
                linkTo(methodOn(CharacterController.class).all()).withRel("characters")
            ))
            .collect(Collectors.toList());

        return CollectionModel.of(characters,
            linkTo(methodOn(CharacterController.class).all()).withSelfRel());
    }

    @PostMapping(
        name = "/characters", 
        consumes = { MediaType.APPLICATION_JSON_VALUE }, 
        produces = { MediaType.APPLICATION_JSON_VALUE }
    )
    @ResponseBody
    Character newCharacter(@RequestBody CharacterRequest charRequest) {
        String[] dice = charRequest.getDice().toArray(String[]::new);
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
    EntityModel<Character> one(@PathVariable Long id) {
        Character character = repository.findById(id)
                .orElseThrow(() -> new CharacterException(id));
        return EntityModel.of(character,
                linkTo(methodOn(CharacterController.class)).withSelfRel(),
                linkTo(methodOn(CharacterController.class)).withRel("characters")
        );
    }

    @DeleteMapping("/characters/{id}")
    void deleteCharacter(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
