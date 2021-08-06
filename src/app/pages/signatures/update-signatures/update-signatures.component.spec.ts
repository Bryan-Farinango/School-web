import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSignaturesComponent } from './update-signatures.component';

describe('UpdateSignaturesComponent', () => {
  let component: UpdateSignaturesComponent;
  let fixture: ComponentFixture<UpdateSignaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSignaturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSignaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
