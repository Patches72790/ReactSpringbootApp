package com.characterviewer;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Character not found")
class CharacterException extends RuntimeException {
    CharacterException(Long id) {
        super("Could not find character " + id);
    }
}
