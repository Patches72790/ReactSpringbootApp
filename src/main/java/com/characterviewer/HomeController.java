package com.characterviewer;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class HomeController {
    @GetMapping
    //@CrossOrigin(exposedHeaders = {"Access-Control-Allow-Origin"})
    public String index() {
        return "index";
    }
}
