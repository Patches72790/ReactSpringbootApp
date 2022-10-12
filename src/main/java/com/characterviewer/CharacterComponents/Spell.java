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
    private String name;
    // todo need to setup this entity as a join column
    // with character as a manytomany

    public Spell() {
        this.name = "";
    }

    public Spell(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return String.format(
                "Spell[name=%s]",
                this.name);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
