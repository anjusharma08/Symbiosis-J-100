import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Define the Medicine interface to represent a medicine object
interface Medicine {
  id?: number;
  name: string;
  category: string;
  batch: string;
  expiryDate: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-my-medicine-inventory',
  templateUrl: './my-medicine-inventory.component.html',
  styleUrls: ['./my-medicine-inventory.component.css']
})
export class MyMedicineInventoryComponent {
  // List of all medicines fetched from the backend
  medicines: Medicine[] = [];
  displayedMedicines: Medicine[] = [];
  lowStockMedicines: Medicine[] = [];
  expiringMedicines: Medicine[] = [];

  // UI control properties
  searchTerm = '';
  filter = 'all';
  showAddForm = false;
  editMode = false;
  currentMedicine: Medicine = {
    name: '',
    category: '',
    batch: '',
    expiryDate: '',
    price: 0,
    quantity: 0
  };

  // Backend API URL
  private baseUrl = 'http://localhost:8105/api/medicines';


  // Constructor to inject the HttpClient for making API calls
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadMedicines();
    this.checkLowStock();
    this.checkExpiringMedicines();
  }

  // Load all medicines from backend
  loadMedicines(): void {
    this.http.get<Medicine[]>(this.baseUrl).subscribe({
      next: (data) => {
        this.medicines = data;//store the medicines
        this.displayedMedicines = [...this.medicines];
        this.checkLowStock();
        this.checkExpiringMedicines();
      },
      error: (error) => console.error('Error loading medicines:', error)
    });
  }

  // Save medicine (create or update)
  saveMedicine(): void {
    // Check if any field is empty
    if (
      !this.currentMedicine.name ||
      !this.currentMedicine.category ||
      !this.currentMedicine.batch ||
      !this.currentMedicine.expiryDate ||
      this.currentMedicine.price <= 0 ||
      this.currentMedicine.quantity <= 0
    ) {
      alert('Please fill in all fields before saving the medicine.');
      return; // Stop execution if validation fails
    }

    /*
    // Check if the medicine already exists/// Check for duplicate before saving
  const duplicateMedicine = this.medicines.find(
    (medicine) =>
      medicine.name.toLowerCase() === this.currentMedicine.name.toLowerCase() &&
      medicine.batch.toLowerCase() === this.currentMedicine.batch.toLowerCase() &&
      medicine.category.toLowerCase() === this.currentMedicine.category.toLowerCase()
  );

  if (duplicateMedicine) {
    alert('"Medicine already exists. Please update the existing record.');
    return; // Stop execution if a duplicate is found
  }
    */
    if (this.editMode && this.currentMedicine.id) {
      // Update existing medicine
      this.http.put<Medicine>(`${this.baseUrl}/${this.currentMedicine.id}`, this.currentMedicine)
        .subscribe({
          next: (updatedMedicine) => {
            alert('Medicine updated successfully!');
            this.loadMedicines();// Reload the list of medicines
            this.closeAddMedicineForm(); // Close the form after saving
          },
         error: (error) => {
          console.error('Error updating medicine:', error);
          alert('Failed to update the medicine. Please try again.');
         }
        });
    } else {
     
      // Create new medicine
      this.http.post<Medicine>(this.baseUrl, this.currentMedicine)
        .subscribe({
          next: () => {
            alert('Medicine saved successfully!'); // Show success alert
            this.loadMedicines();
            this.closeAddMedicineForm();
          },
          error: (error) => {
            console.error('Error adding medicine:', error);
            alert('Failed to add the medicine. Please try again.');}
        });
    }
  }

  // Delete medicine
  deleteMedicine(medicine: Medicine): void {
    if (medicine.id && confirm('Are you sure you want to delete this medicine?')) {
      this.http.delete(`${this.baseUrl}/${medicine.id}`)
        .subscribe({
          next: () => this.loadMedicines(),
          error: (error) => console.error('Error deleting medicine:', error)
        });
    }
  }

  // Filter medicines based on search term and filter option
  applyFilter(): void {
    this.displayedMedicines = this.medicines.filter(medicine => {
      const matchesSearch = medicine.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                          medicine.batch.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      switch (this.filter) {
        case 'lowStock':
          return matchesSearch && medicine.quantity < 10;
        case 'expiringSoon':
          return matchesSearch && this.isExpiringSoon(medicine.expiryDate);
        default:
          return matchesSearch;
      }
    });
  }

// Identify medicines with low stock (less than 10)
  checkLowStock(): void {
    this.lowStockMedicines = this.medicines.filter(medicine => medicine.quantity < 10);
  }

  // Check for medicines expiring 30days
  checkExpiringMedicines(): void {
    this.expiringMedicines = this.medicines.filter(medicine => 
      this.isExpiringSoon(medicine.expiryDate)
    );
  }

  // Check if medicine is expiring within 30 days
  isExpiringSoon(expiryDate: string): boolean {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diff = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff <= 30;
  }

  // Open form to add new medicine
  openAddMedicineForm(): void {
    this.showAddForm = true;
    this.editMode = false;
    this.currentMedicine = {
      name: '',
      category: '',
      batch: '',
      expiryDate: '',
      price: 0,
      quantity: 0
    };
  }

  // Open form to edit existing medicine
  editMedicine(medicine: Medicine): void {
    console.log('Editing medicine:', medicine); // Check the medicine being edited
    this.showAddForm = true;
    this.editMode = true;
    this.currentMedicine = { ...medicine };// Pre-fill the form with existing data
  }

  // Close the medicine form
  closeAddMedicineForm(): void {
    this.showAddForm = false;
    this.editMode = false;
    this.currentMedicine = {
      name: '',
      category: '',
      batch: '',
      expiryDate: '',
      price: 0,
      quantity: 0
    };
  }
  updateMedicine(): void {
    if (this.editMode && this.currentMedicine.id) {
      // Update the existing medicine
      this.http.put<Medicine>(`${this.baseUrl}/medicines/${this.currentMedicine.id}`, this.currentMedicine)
        .subscribe({
          next: () => {
            alert('Medicine updated successfully!'); // Show alert on successful update
            this.loadMedicines(); // Reload the medicines to reflect changes
            this.closeAddMedicineForm(); // Close the form
          },
          error: (error) => {
            console.error('Error updating medicine:', error);
            alert('Failed to update the medicine. Please try again.');
          }
        });
    } else {
      alert('Edit mode is not enabled or medicine ID is missing.');
    }
  }
}