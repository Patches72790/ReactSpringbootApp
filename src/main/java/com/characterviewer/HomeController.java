package com.characterviewer;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/")
public class HomeController {
    @GetMapping
    public String index() {
        return "index";
    }

    @GetMapping("/thing")
    @ResponseBody
    public String thing() {
        return "thing";
    }
}
