import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroAdministrarAutorizacionesBalanzaComponent } from './filtro-administrar-autorizaciones-balanza.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestModule } from '../../../core/mocks/test.module';

describe('FiltroAdministrarAutorizacionesBalanzaComponent', () => {
  let component: FiltroAdministrarAutorizacionesBalanzaComponent;
  let fixture: ComponentFixture<FiltroAdministrarAutorizacionesBalanzaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroAdministrarAutorizacionesBalanzaComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAdministrarAutorizacionesBalanzaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
