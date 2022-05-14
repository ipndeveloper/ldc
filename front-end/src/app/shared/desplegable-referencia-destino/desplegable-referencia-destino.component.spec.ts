import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableReferenciaDestinoComponent } from './desplegable-referencia-destino.component';
import { TestModule } from '../../core/mocks/test.module';
import { ReferenciaDestinoService } from './referencia-destino.service';
import { configureTestSuite } from '../../core/mocks/testing';

describe('DesplegableReferenciaDestinoComponent', () => {
  let component: DesplegableReferenciaDestinoComponent;
  let fixture: ComponentFixture<DesplegableReferenciaDestinoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DesplegableReferenciaDestinoComponent],
      imports: [TestModule],
      providers: [ReferenciaDestinoService]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableReferenciaDestinoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
