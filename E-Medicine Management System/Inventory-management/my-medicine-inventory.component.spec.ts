import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMedicineInventoryComponent } from './my-medicine-inventory.component';

describe('MyMedicineInventoryComponent', () => {
  let component: MyMedicineInventoryComponent;
  let fixture: ComponentFixture<MyMedicineInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyMedicineInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMedicineInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
