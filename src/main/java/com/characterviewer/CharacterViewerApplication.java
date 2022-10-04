package com.characterviewer;

import java.util.ArrayList;
import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.characterviewer.CharacterComponents.Spell;

@SpringBootApplication
public class CharacterViewerApplication {
    private static final Logger log = LoggerFactory.getLogger(CharacterViewerApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(CharacterViewerApplication.class, args);
    }

    @Bean
    public CommandLineRunner go(CharacterRepository repo) {
        return (args) -> {
            repo.save(new Character("Alphonse"));
            repo.save(new Character("Stradivarius"));
            
            log.info("All characters found:");
            log.info("---------------------");
            for (Character character : repo.findAll()) {
                log.info(character.toString());
            }
        };
    }

}
