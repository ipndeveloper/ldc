import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableProductoPorGrupoComponent } from './desplegable-producto-por-grupo.component';
import { TestModule } from '../../core/mocks/test.module';
import { ProductoService } from '../buscador-producto/producto.service';
import { configureTestSuite } from '../../core/mocks/testing';

describe('DesplegableProductoPorGrupoComponent', () => {
  let component: DesplegableProductoPorGrupoComponent;
  let fixture: ComponentFixture<DesplegableProductoPorGrupoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DesplegableProductoPorGrupoComponent ],
      imports: [TestModule],
      providers: [ProductoService]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableProductoPorGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
