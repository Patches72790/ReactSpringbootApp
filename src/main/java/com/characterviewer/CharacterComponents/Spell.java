package com.characterviewer.CharacterComponents;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


@Entity
public class Spell {
    @Id
    @GeneratedValue
    private String spell;
    private ArrayList<String> damage_dice;

    public Spell(String spell, ArrayList<String> damage_dice) {
        this.spell = spell;
        this.damage_dice = damage_dice;
    }
    
    @Override
    public String toString() {
        return String.format(
            "Spell[title=%s, dice=%s]",
            this.spell, this.damage_dice
        );
    }   
}
