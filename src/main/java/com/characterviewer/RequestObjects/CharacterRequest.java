package com.characterviewer.RequestObjects;

import java.util.ArrayList;
import java.util.Arrays;

public class CharacterRequest {
    private String name;
    private ArrayList<String> damage_dice;
    private ArrayList<String> spells;

    CharacterRequest(String name, 
            String[] damage_dice, 
            String[] spells) {
        this.name = name;
        this.damage_dice = new ArrayList<String>(Arrays.asList(damage_dice));
        this.spells = new ArrayList<String>(Arrays.asList(spells));
    }

    public String getName() {
        return this.name;
    }

    public ArrayList<String> getDamageDice() {
        return this.damage_dice;
    }

    public ArrayList<String> getSpells() {
        return this.spells;
    }
}
