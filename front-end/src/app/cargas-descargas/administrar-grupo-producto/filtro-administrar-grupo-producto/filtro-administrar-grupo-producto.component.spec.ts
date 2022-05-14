import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroAdministrarGrupoProductoComponent } from './filtro-administrar-grupo-producto.component';
import { TestModule } from '../../../core/mocks/test.module';
import { configureTestSuite } from '../../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FiltroAdministrarGrupoProductoComponent', () => {
  let component: FiltroAdministrarGrupoProductoComponent;
  let fixture: ComponentFixture<FiltroAdministrarGrupoProductoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroAdministrarGrupoProductoComponent ],
      imports: [
        TestModule
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAdministrarGrupoProductoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
