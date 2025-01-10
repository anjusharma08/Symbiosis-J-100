package com.example.inventory;

import java.util.Collections;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication //The main annotation for Spring Boot applications.
public class EmedicineApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmedicineApplication.class, args);
        System.out.println("E-Medicine Application is running...");
       
	}

}