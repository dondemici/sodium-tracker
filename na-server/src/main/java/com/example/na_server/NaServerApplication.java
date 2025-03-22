package com.example.na_server;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.na_server.model.Ingredient;
import com.example.na_server.model.IngredientRepo;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class NaServerApplication {

	public static void main(String[] args) {
		        // Load .env variables
        Dotenv dotenv = Dotenv.load();
        System.setProperty("AUTH0_ISSUER_URI", dotenv.get("AUTH0_ISSUER_URI"));
        System.setProperty("AUTH0_CLIENT_ID", dotenv.get("AUTH0_CLIENT_ID"));
        System.setProperty("AUTH0_CLIENT_SECRET", dotenv.get("AUTH0_CLIENT_SECRET"));
		
		SpringApplication.run(NaServerApplication.class, args);
	}

	@Bean
	ApplicationRunner init(IngredientRepo repository){
		return args -> {
			repository.save(new Ingredient("Soy Sauce",1,"tablespoon",900));
			repository.save(new Ingredient("Fish Sauce",1,"tablespoon",600));
			repository.findAll().forEach(System.out::println);
		};
	}
}
