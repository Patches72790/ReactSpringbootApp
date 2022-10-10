package com.characterviewer;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
class Character implements Serializable {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String characterClass;
    private String spells;

    Character() {
        this.name = "";
        this.characterClass = "";
        this.spells = "";
    }

    Character(String name) {
        this.name = name;
    }

    Character(String name, String characterClass, String spells) {
        this.name = name;
        this.characterClass = characterClass;
        this.spells = spells;
    }

    @Override
    public String toString() {
        return String.format(
                "Character[id=%d, name=%s, spells=%s]",
                id, name, spells);
    }

    public Long getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSpells() {
        return spells;
    }   

    public void setSpells(String spells) {
        this.spells = spells;
    }   
    public String getCharacterClass() {
        return this.characterClass;
    }

    public void setCharacterClass(String characterClass) {
        this.characterClass = characterClass;
    }

}
