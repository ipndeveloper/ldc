import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorMercadoTerminoComponent } from './buscador-mercado-termino.component';
import { MercadoTerminoService } from './mercado-termino.service';
import { TestModule } from '../../core/mocks/test.module';
import { configureTestSuite } from '../../core/mocks/testing';

describe('BuscadorMercadoTerminoComponent', () => {
  let component: BuscadorMercadoTerminoComponent;
  let fixture: ComponentFixture<BuscadorMercadoTerminoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [BuscadorMercadoTerminoComponent],
      imports: [TestModule],
      providers: [
        MercadoTerminoService]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorMercadoTerminoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
