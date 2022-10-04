package com.characterviewer.RequestObjects;

import java.util.ArrayList;
import java.util.Arrays;
import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CharacterRequest implements Serializable {
    @JsonProperty("name")
    private String name;

    @JsonProperty("dice")
    private String[] dice;

    @JsonProperty("spells")
    private String[] spells;

    @JsonProperty("hp")
    private int hp;

    @JsonProperty("ac")
    private int ac;

    CharacterRequest(String name, 
            String[] dice, 
            String[] spells) {
        this.name = name;
        this.dice = dice;
        this.spells = spells;
    }

    public String getName() {
        return this.name;
    }

    public ArrayList<String> getDice() {
        return new ArrayList<String>(Arrays.asList(dice));
    }

    public ArrayList<String> getSpells() {
        return new ArrayList<String>(Arrays.asList(this.spells));
    }
}
