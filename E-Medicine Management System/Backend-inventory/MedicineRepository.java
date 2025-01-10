package com.example.inventory.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.inventory.model.Medicine;

public interface MedicineRepository extends JpaRepository<Medicine, Long> {
	
}


//to CRUD operation