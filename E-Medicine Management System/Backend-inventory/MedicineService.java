package com.example.inventory.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.inventory.model.Medicine;
import com.example.inventory.repository.MedicineRepository;

@Service//hold the  logic
public class MedicineService {
    @Autowired
    private MedicineRepository medicineRepository;

    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }

    public Medicine saveMedicine(Medicine medicine) {
        return medicineRepository.save(medicine);
    }

    public void deleteMedicine(Long id) {
        medicineRepository.deleteById(id);
    }
    
    //updated medicines name!!
    public Medicine updateMedicine(Long id, Medicine updatedMedicine) {
        try {
            return medicineRepository.findById(id).map(medicine -> {
                medicine.setName(updatedMedicine.getName());
                medicine.setPrice(updatedMedicine.getPrice());
                medicine.setQuantity(updatedMedicine.getQuantity());
                return medicineRepository.save(medicine); // Save the updated medicine
            }).orElseThrow(() -> new RuntimeException("Medicine not found with id: " + id));
        } catch (Exception e) {
            throw new RuntimeException("Error updating medicine: " + e.getMessage());
        }
    }
 // Update only the batch number for a specific medicine by id
    public Medicine updateMedicineBatch(Long id, String newBatch) {
        Optional<Medicine> medicine = medicineRepository.findById(id);
        if (medicine.isPresent()) {
            Medicine updatedMedicine = medicine.get();
            updatedMedicine.setBatch(newBatch); // Set the new batch number
            return medicineRepository.save(updatedMedicine); // Save and return the updated medicine
        } else {
            throw new RuntimeException("Medicine not found with id " + id); // Handle error if not found
        }
    }


}