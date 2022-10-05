package com.characterviewer.RequestObjects;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;
import java.io.Serializable;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class CharacterRequest implements Serializable {
    @JsonProperty("name")
    private String name;

    @JsonProperty("dice")
    private ArrayList<String> dice;

    @JsonProperty("spells")
    private ArrayList<String> spells;

    @JsonProperty("hp")
    private int hp;

    @JsonProperty("ac")
    private int ac;

    @Autowired
    CharacterRequest(String name,
            String dice,
            String spells,
            ObjectMapper objectMapper) {
        this.name = name;

        try {
            String [] diceList = objectMapper.readValue(dice, String[].class);
            this.dice = new ArrayList<>(Arrays.asList(diceList));
            String[] spellList = objectMapper.readValue(spells, String[].class);
            this.spells = new ArrayList<>(Arrays.asList(spellList));
        } catch (Exception e) {

        }
    }

    public String getName() {
        return this.name;
    }

    public ArrayList<String> getDice() {
        return dice;
    }

    public ArrayList<String> getSpells() {
        return spells;
    }
}
