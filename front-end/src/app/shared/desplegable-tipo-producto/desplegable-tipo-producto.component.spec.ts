import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../../core/mocks/test.module';
import { DespegableTipoProductoComponent } from './desplegable-tipo-producto.component';
import { TipoProductoService } from './tipo-producto.service';
import { configureTestSuite } from '../../core/mocks/testing';

describe('DespegableTipoProductoComponent', () => {
  let component: DespegableTipoProductoComponent;
  let fixture: ComponentFixture<DespegableTipoProductoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DespegableTipoProductoComponent],
      imports: [TestModule],
      providers: [TipoProductoService]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DespegableTipoProductoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
