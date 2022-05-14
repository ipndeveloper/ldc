import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroAdministrarRolesComponent } from './filtro-administrar-roles.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FiltroAdministrarRolesComponent', () => {
  let component: FiltroAdministrarRolesComponent;
  let fixture: ComponentFixture<FiltroAdministrarRolesComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroAdministrarRolesComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAdministrarRolesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
