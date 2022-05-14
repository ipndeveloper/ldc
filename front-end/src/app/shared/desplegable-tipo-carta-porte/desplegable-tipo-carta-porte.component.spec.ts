import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../../core/mocks/test.module';
import { DespegableTipoCartaPorteComponent } from './desplegable-tipo-carta-porte.component';
import { TipoCartaPorteService } from './desplegable-tipo-carta-porte.service';
import { configureTestSuite } from '../../core/mocks/testing';

describe('DespegableTipoComprobanteAFIPComponent', () => {
  let component: DespegableTipoCartaPorteComponent;
  let fixture: ComponentFixture<DespegableTipoCartaPorteComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DespegableTipoCartaPorteComponent],
      imports: [TestModule],
      providers: [TipoCartaPorteService]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DespegableTipoCartaPorteComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
