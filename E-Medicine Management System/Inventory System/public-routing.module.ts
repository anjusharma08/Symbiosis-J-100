import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AnjuComponent } from './components/anju/anju.component';
import { MyMedicineInventoryComponent } from './components/my-medicine-inventory/my-medicine-inventory.component';
import { AuthGuard } from '../auth-guard/auth.guard';
import { MySupplierComponent } from './components/my-supplier/my-supplier.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { MyCartComponent } from './components/my-cart/my-cart.component';
import { SalesManagementComponent } from './components/sales-management/sales-management.component';

// Routes for child Module (publicModule). Since public module is lazy loaded in in the 
// app-routing.module the full path is `/public/login` or `/public/regiser`
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'anju',
    component: AnjuComponent
  },
  { 
    path: 'my-medicine-inventory', 
    component: MyMedicineInventoryComponent,
    canActivate: [AuthGuard] // Ensure this is only here if necessary
  },
  {
    path: 'my-supplier',
    component: MySupplierComponent,
    canActivate: [AuthGuard], // Optional: Protect this route if necessary
  },
  {
    path: 'purchase',
    component: PurchaseComponent, // Add the route for PurchaseComponent
    canActivate: [AuthGuard] // Optional: Protect this route if necessary
  },
  {
  path: 'my-cart', // Route for the CartComponent
  component: MyCartComponent,
  canActivate: [AuthGuard] // Optional: Protect this route if necessary
  },
  {
  path: 'sales-management', // Route for SalesManagementComponent
  component: SalesManagementComponent,
  // canActivate: [AuthGuard] // Optional: Protect this route if necessary
},
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
