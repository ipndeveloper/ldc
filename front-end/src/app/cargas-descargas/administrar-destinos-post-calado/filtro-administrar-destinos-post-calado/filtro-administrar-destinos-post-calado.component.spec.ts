import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroAdministrarDestinosPostCaladoComponent } from './filtro-administrar-destinos-post-calado.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FiltroAdministrarDestinosPostCaladoComponent', () => {
  let component: FiltroAdministrarDestinosPostCaladoComponent;
  let fixture: ComponentFixture<FiltroAdministrarDestinosPostCaladoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroAdministrarDestinosPostCaladoComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAdministrarDestinosPostCaladoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
