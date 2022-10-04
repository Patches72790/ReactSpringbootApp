package com.characterviewer;

import java.util.ArrayList;

import com.characterviewer.CharacterComponents.Spell;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;

@Entity
class Character {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private int hp;
    private int ac;

    @JoinColumn(name="spells_id")
    private ArrayList<Spell> spells;

    Character() {
    }

    Character(String name) {
        this.name = name;
        this.hp = 10;
        this.ac = 10;
    }

    Character(String name, ArrayList<Spell> spells) {
        this.name = name;
        this.hp = 10;
        this.ac = 10;
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

    @JoinColumn(name="spells_id")
    public ArrayList<Spell> getSpells() {
        return spells;
    }   
}
