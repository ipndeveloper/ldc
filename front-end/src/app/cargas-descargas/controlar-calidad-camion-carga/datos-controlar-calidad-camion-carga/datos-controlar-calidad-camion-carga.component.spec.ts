import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosControlarCalidadCamionCargaComponent } from './datos-controlar-calidad-camion-carga.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';

describe('DatosControlarCalidadCamionCargaComponent', () => {
  let component: DatosControlarCalidadCamionCargaComponent;
  let fixture: ComponentFixture<DatosControlarCalidadCamionCargaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosControlarCalidadCamionCargaComponent ],
      imports: [ TestModule ],
      providers: [ FormComponentService ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosControlarCalidadCamionCargaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
