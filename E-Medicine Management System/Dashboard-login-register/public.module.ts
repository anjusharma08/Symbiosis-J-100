import { PublicRoutingModule } from './public-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MyMedicineInventoryComponent } from './components/my-medicine-inventory/my-medicine-inventory.component';
import { MySupplierComponent } from './components/my-supplier/my-supplier.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { MyCartComponent } from './components/my-cart/my-cart.component';
import { SalesManagementComponent } from './components/sales-management/sales-management.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    // Own Components
    LoginComponent,
    RegisterComponent,
    MyMedicineInventoryComponent,
    MySupplierComponent,
    SalesManagementComponent,
    PurchaseComponent,
    MyCartComponent
  ],
  imports: [
    CommonModule,
    // Import our Routes for this module
    PublicRoutingModule,
    // Angular Forms Imports
    ReactiveFormsModule,
    FormsModule,
    // Angular Material Imports
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
    
  ]
})
export class PublicModule { }
