package com.characterviewer.RequestObjects;

import java.io.Serializable;
import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CharacterRequest implements Serializable {
    @JsonProperty("id")
    private Long id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("characterClass")
    private String characterClass;

    @JsonProperty("spells")
    private ArrayList<String> spells;

    public CharacterRequest() {
        this.name = "";
        this.characterClass = "";
        this.spells = new ArrayList<>();
        this.id = 0L;
    }

    public CharacterRequest(String name,
            String characterClass,
            ArrayList<String> spells,
            Long id) {
        this.name = name;
        this.characterClass = characterClass;
        this.spells = spells;
        this.id = id;
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

    public ArrayList<String> getSpells() {
        return spells;
    }

    public void setSpells(ArrayList<String> spells) {
        this.spells = spells;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
