import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCreateUpdateComponent } from './customer-create-update.component';

describe('CustomerCreateUpdateComponent', () => {
  let component: CustomerCreateUpdateComponent;
  let fixture: ComponentFixture<CustomerCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
