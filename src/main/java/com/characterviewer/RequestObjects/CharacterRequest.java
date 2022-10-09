package com.characterviewer.RequestObjects;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.beans.factory.annotation.Autowired;

public class CharacterRequest implements Serializable {
    @JsonProperty("name")
    private String name;

    @JsonProperty("characterClass")
    private String characterClass;

    @JsonProperty("spells")
    private String[] spells;

    //@Autowired
    CharacterRequest(String name,
            String characterClass,
            String[] spells) {
        this.name = name;
        this.characterClass = characterClass;
        this.spells = spells;

        System.out.println("\n\n the name and character class ");
        System.out.printf("%s, %s", name, characterClass);
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCharacterClass() {
        return this.characterClass;
    }

    public void setCharacterClass(String characterClass) {
        this.characterClass = characterClass;
    }

    public String[] getSpells() {
        return spells;
    }

    public void setSpells(String[] spells) {
        this.spells = spells;
    }
}
