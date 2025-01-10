package com.example.inventory.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.inventory.model.Medicine;
import com.example.inventory.service.MedicineService;

import java.util.List;

@RestController//handles http request
@RequestMapping("/api/medicines")
@CrossOrigin(origins = "http://localhost:4200") // Angular frontend// Update the origin based on your Angular app's URL
public class MedicineController {
    @Autowired
    private MedicineService medicineService;

    @GetMapping
    public List<Medicine> getAllMedicines() {
        System.out.println("GET /api/medicines called");
        return medicineService.getAllMedicines();
        
    }

    @PostMapping
    public Medicine addMedicine(@RequestBody Medicine medicine) {
        System.out.println("POST /api/medicines called");
        return medicineService.saveMedicine(medicine);
    }

    @DeleteMapping("/{id}")
    public void deleteMedicine(@PathVariable Long id) {
        medicineService.deleteMedicine(id);
    }
    
    //through the id chnages medicines name:-
    @PutMapping("/{id}")
    public Medicine updateMedicine(@PathVariable Long id, @RequestBody Medicine updatedMedicine) {
        System.out.println("PUT /api/medicines/{id} called");
        return medicineService.updateMedicine(id, updatedMedicine);
    }
 // PUT endpoint to update batch number by ID
    @PutMapping("/{id}/batch")
    public Medicine updateMedicineBatch(@PathVariable Long id, @RequestParam String batch) {
        System.out.println("PUT /api/medicines/{id}/batch called with batch: " + batch);
        return medicineService.updateMedicineBatch(id, batch);
    }
}

