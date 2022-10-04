package com.characterviewer.CharacterComponents;

import java.util.ArrayList;
import java.util.Arrays;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


@Entity
public class Spell {
    @Id
    @GeneratedValue
    private String title;
    private ArrayList<String> damage_dice;

    public Spell(String title, String[] damage_dice) {
        this.title = title;
        this.damage_dice = new ArrayList<String>(Arrays.asList(damage_dice));
    }
    
    @Override
    public String toString() {
        return String.format(
            "Spell[title=%s, dice=%s]",
            this.title, this.damage_dice
        );
    }   
}
