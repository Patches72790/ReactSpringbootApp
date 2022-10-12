package com.characterviewer;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code =HttpStatus.NOT_FOUND, reason = "Character not found")
class CharacterException extends RuntimeException {
    public CharacterException(Long id) {
        super("Could not find character " + id);
    }
}
