import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroAdministrarLecturaHumedimetroComponent } from './filtro-administrar-lectura-humedimetro.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FiltroAdministrarLecturaHumedimetroComponent', () => {
  let component: FiltroAdministrarLecturaHumedimetroComponent;
  let fixture: ComponentFixture<FiltroAdministrarLecturaHumedimetroComponent>;

  configureTestSuite((() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroAdministrarLecturaHumedimetroComponent ],
      imports: [
        TestModule
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAdministrarLecturaHumedimetroComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
