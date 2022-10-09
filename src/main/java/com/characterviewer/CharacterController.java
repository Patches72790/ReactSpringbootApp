package com.characterviewer;

import java.util.List;
import java.util.stream.Collectors;

import com.characterviewer.RequestObjects.CharacterRequest;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.*;


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

    @CrossOrigin(exposedHeaders = {"Access-Control-Allow-Origin"})
    @ResponseBody
    @PostMapping("/characters")
    public Character postCharacter(@RequestBody CharacterRequest charRequest) {
        String[] spells = charRequest.getSpells();
        String name = charRequest.getName();
        String charClass = charRequest.getCharacterClass();

        Character newCharacter = new Character(name, charClass, spells);

        System.out.println(newCharacter);
        return repository.save(newCharacter);
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
