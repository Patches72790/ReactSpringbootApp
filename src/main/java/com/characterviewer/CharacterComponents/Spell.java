package com.characterviewer.CharacterComponents;

import com.characterviewer.Extra.Dice;

public class Spell {
    private String title;
    private Dice damage_dice;
    private String school;

    Spell(String title, Dice damage_dice, String school) {
        this.title = title;
        this.damage_dice = damage_dice;
        this.school = school;
    }
    
    @Override
    public String toString() {
        return String.format(
            "Spell[title=%s, dice=%s]",
            this.title, this.damage_dice
        );
    }   
}
