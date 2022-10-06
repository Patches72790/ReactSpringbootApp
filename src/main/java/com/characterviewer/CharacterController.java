package com.characterviewer;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import com.characterviewer.RequestObjects.CharacterRequest;
import com.characterviewer.CharacterComponents.Spell;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;


@RepositoryRestController
class CharacterController {
    private final CharacterRepository repository;

    @Autowired
    CharacterController(CharacterRepository repository) {
        this.repository = repository;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/characters")
    @ResponseBody
    @CrossOrigin(exposedHeaders = {"Access-Control-Allow-Origin"})
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

    @RequestMapping(method = RequestMethod.POST, value = "/characters")
    @CrossOrigin(exposedHeaders = {"Access-Control-Allow-Origin"})
    public Character postCharacter(@RequestBody CharacterRequest charRequest) {
        System.out.println(charRequest);
//        String[] dice = charRequest.getDice(); //.toArray(String[]::new);
//        ArrayList<String> spells = charRequest.getSpells();
//        String name = charRequest.getName();
//
//        ArrayList<Spell> charSpells = new ArrayList<Spell>(Arrays.asList(spells
//                .stream()
//                .map(spellString -> new Spell(spellString, dice))
//                .toArray(Spell[]::new)));

//        Character newCharacter = new Character(name, charSpells);

        return repository.save(new Character());
    }

    @GetMapping("/{id}")
    @CrossOrigin(exposedHeaders = {"Access-Control-Allow-Origin"})
    EntityModel<Character> one(@PathVariable Long id) {
        Character character = repository.findById(id)
                .orElseThrow(() -> new CharacterException(id));
        return EntityModel.of(character,
                linkTo(methodOn(CharacterController.class)).withSelfRel(),
                linkTo(methodOn(CharacterController.class)).withRel("characters")
        );
    }

    @DeleteMapping("/{id}")
    @CrossOrigin(exposedHeaders = {"Access-Control-Allow-Origin"})
    void deleteCharacter(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
