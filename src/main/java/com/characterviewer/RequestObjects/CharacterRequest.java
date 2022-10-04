package com.characterviewer.RequestObjects;

import java.util.ArrayList;

public class CharacterRequest {
    private String name;
    private ArrayList<String> damage_dice;
    private ArrayList<String> spells;
    CharacterRequest(String name, 
            ArrayList<String> damage_dice, 
            ArrayList<String> spells) {
        this.name = name;
        this.damage_dice = damage_dice;
        this.spells = spells;
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
