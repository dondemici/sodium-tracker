package com.example.na_server.controller;

import java.util.ArrayList;
import java.util.List;

import org.aspectj.apache.bcel.generic.RET;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.na_server.model.Ingredient;
import com.example.na_server.model.IngredientRepo;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class IngredientController {
    
    @Autowired
    IngredientRepo ingredientRepo;

    @GetMapping("/ingredients")
    public ResponseEntity<List<Ingredient>> getAllIIngredients(){
        try{
            List<Ingredient> ingredients = new ArrayList<Ingredient>();
            ingredientRepo.findAll().forEach(ingredients::add);

            if(ingredients.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(ingredients, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
