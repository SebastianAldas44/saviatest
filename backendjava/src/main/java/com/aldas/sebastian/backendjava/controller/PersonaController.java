package com.aldas.sebastian.backendjava.controller;

import com.aldas.sebastian.backendjava.model.Persona;
import com.aldas.sebastian.backendjava.repository.PersonaRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import org.apache.tomcat.util.json.JSONParser;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@CrossOrigin(origins = { "http://localhost:4200", "http://localhost:5000" })
@RestController
@EnableWebMvc
@RequestMapping(path = "/personas")
public class PersonaController {
    @Autowired
    private PersonaRepository repo;
    
    @GetMapping
    public HashMap<String, Object> listPersonas(@RequestParam("persona") Optional<Integer> persona)
    {
        Object p = null;
        if(persona.isPresent())
            p = repo.findById(persona.get());
        else
            p = repo.findAll();
        
        HashMap<String, Object> response = new HashMap<>();
        int code = 500;
        String status = "error";
        String message = "No existen personas registradas";
        if(p != null)
        {
            code = 200;
            status = "success";
            message = "";
        }
        response.put("code", code);
        response.put("status", status);
        response.put("message", message);
        response.put("personas", p);
        return response;
    }
    
    @PostMapping
    public HashMap<String, Object> createPersona(@RequestBody String json) throws JsonProcessingException, UnsupportedEncodingException
    {
        HashMap<String, Object> response = new HashMap<>();
        String[] param = json.split("=");
        String result = java.net.URLDecoder.decode(param[1], StandardCharsets.UTF_8.name());
        Persona p = new ObjectMapper().readValue(result, Persona.class);
        int code = 500;
        String status = "error";
        String message = "No se ha podido registrar a la persona solicitada";
        
        repo.save(p);
        code = 200;
        status = "success";
        message = "La persona ha sido creada de manera exitosa";
        
        response.put("code", code);
        response.put("status", status);
        response.put("message", message);
        return response;
    }
    
    @PutMapping
    public HashMap<String, Object> updatePersona(@RequestBody String json) throws JsonProcessingException, UnsupportedEncodingException
    {
        HashMap<String, Object> response = new HashMap<>();
        String[] param = json.split("=");
        String result = java.net.URLDecoder.decode(param[1], StandardCharsets.UTF_8.name());
        Persona p = new ObjectMapper().readValue(result, Persona.class);
        int code = 500;
        String status = "error";
        String message = "No se ha podido actualizar los datos a la persona solicitada";
        
        repo.save(p);
        code = 200;
        status = "success";
        message = "Los datos se han actualizado de manera exitosa";
        
        response.put("code", code);
        response.put("status", status);
        response.put("message", message);
        return response;
    }
    
    @DeleteMapping
    public HashMap<String, Object> deletePersona(@RequestParam int persona)
    {
        HashMap<String, Object> response = new HashMap<>();
        int code = 500;
        String status = "error";
        String message = "No se ha podido registrar a la persona solicitada";
        
        repo.deleteById(persona);
        
        code = 200;
        status = "success";
        message = "La persona ha sido creada de manera exitosa";
        
        response.put("code", code);
        response.put("status", status);
        response.put("message", message);
        return response;
    }
}
