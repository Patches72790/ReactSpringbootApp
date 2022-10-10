package com.characterviewer;

import com.fasterxml.jackson.databind.node.BaseJsonNode;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.characterviewer.RequestObjects.CharacterRequest;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
class CharacterViewerApplicationTests {
    @Mock
    private CharacterRepository characterRepository;

    @InjectMocks
    private CharacterController characterController;

    private JacksonTester<CharacterRequest> jsonCharacter;
    
    private MockMvc mockMvc;

    @BeforeEach
    public void setup() {
        JacksonTester.initFields(this, new ObjectMapper());
        mockMvc = MockMvcBuilders.standaloneSetup(characterController).build();
    }

    @Test
    public void testGetCharacters() throws Exception {
        var response1 = mockMvc.perform(MockMvcRequestBuilders.post("/api/characters")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{'name': 'Mortimer'}, 'spells': 'fireball,lightning-bolt', 'class': 'Sorcerer'")).andReturn();
        System.out.println(response1.getResponse().getContentAsString());

        var response = mockMvc.perform(MockMvcRequestBuilders.get("/api/characters")
            .contentType(MediaType.APPLICATION_JSON)
        ).andReturn().getResponse();

        System.out.println(response.getStatus());
        System.out.println(response.getContentAsString());
    }
}
