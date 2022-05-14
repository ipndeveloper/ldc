import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaPorteDatosDocumentoComponent } from './carta-porte-datos-documento.component';
import { configureTestSuite } from '../../../../core/mocks/testing';
import { TestModule } from '../../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CartaPorteDatosDocumentoComponent', () => {
  let component: CartaPorteDatosDocumentoComponent;
  let fixture: ComponentFixture<CartaPorteDatosDocumentoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ CartaPorteDatosDocumentoComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartaPorteDatosDocumentoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
