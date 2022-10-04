package com.characterviewer;

import com.characterviewer.CharacterComponents.Spell;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
class Character {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private int hp;
    private int ac;
    private Spell[] spells;

    // armor
    // weapons

    Character() {
    }

    Character (String name) {
        this.name = name;
        this.hp = 10;
        this.ac = 10;
    }

    Character(String name, Spell[] spells) {
        Character newChar = new Character(name);
        newChar.spells = spells;
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

    public int getHp() {
        return this.hp;
    }

    public void setHp(int hp) {
        this.hp = hp;
    }

    public int getAc() {
        return this.ac;
    }

    public void setAc(int ac) {
        this.ac = ac;
    }
}
