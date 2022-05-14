import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroAdministrarDispositivosComponent } from './filtro-administrar-dispositivos.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FiltroAdministrarDispositivosComponent', () => {
  let component: FiltroAdministrarDispositivosComponent;
  let fixture: ComponentFixture<FiltroAdministrarDispositivosComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroAdministrarDispositivosComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAdministrarDispositivosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
