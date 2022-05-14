import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAdministrarPlataformasComponent } from './detalle-administrar-plataformas.component';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DetalleAdministrarPlataformasComponent', () => {
  let component: DetalleAdministrarPlataformasComponent;
  let fixture: ComponentFixture<DetalleAdministrarPlataformasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAdministrarPlataformasComponent ],
      imports: [TestModule],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAdministrarPlataformasComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
