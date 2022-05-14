import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableProductoComponent } from './desplegable-producto.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DesplegableProductoService } from './desplegable-producto.service';

describe('DesplegableProductoComponent', () => {
  let component: DesplegableProductoComponent;
  let fixture: ComponentFixture<DesplegableProductoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DesplegableProductoComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [DesplegableProductoService]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableProductoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
