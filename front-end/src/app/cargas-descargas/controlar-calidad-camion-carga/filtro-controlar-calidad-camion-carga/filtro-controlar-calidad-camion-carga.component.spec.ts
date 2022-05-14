import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltroControlarCalidadCamionCargaComponent } from './filtro-controlar-calidad-camion-carga.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FiltroControlarCalidadCamionCargaComponent', () => {
  let component: FiltroControlarCalidadCamionCargaComponent;
  let fixture: ComponentFixture<FiltroControlarCalidadCamionCargaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroControlarCalidadCamionCargaComponent ],
      imports: [ TestModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroControlarCalidadCamionCargaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
