import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudRegistroTransporteComponent } from './solicitud-registro-transporte.component';

describe('SolicitudRegistroTransporteComponent', () => {
  let component: SolicitudRegistroTransporteComponent;
  let fixture: ComponentFixture<SolicitudRegistroTransporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudRegistroTransporteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudRegistroTransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
