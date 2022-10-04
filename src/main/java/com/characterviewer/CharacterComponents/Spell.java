package com.characterviewer.CharacterComponents;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Spell implements Serializable {
    @Id
    @GeneratedValue
    private Long id;
    private String spell;
    private String[] damage_dice;

    public Spell() {
    }

    public Spell(String name) {
        this.spell = name;
    }

    public Spell(String spell, String[] damage_dice) {
        this.spell = spell;
        this.damage_dice = damage_dice;
    }

    @Override
    public String toString() {
        return String.format(
                "Spell[title=%s]",
                this.spell);
    }

    public String[] getDice() {
        return this.damage_dice;
    }
}
