package com.characterviewer;

class CharacterException extends RuntimeException {
    CharacterException(Long id) {
        super("Could not find character " + id);
    }
}
