import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableTipoTarjetaComponent } from './desplegable-tipo-tarjeta.component';
import { TestModule } from '../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TipoTarjetaService } from './tipo-tarjeta.service';

describe('DesplegableTipoTarjetaComponent', () => {
  let component: DesplegableTipoTarjetaComponent;
  let fixture: ComponentFixture<DesplegableTipoTarjetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesplegableTipoTarjetaComponent ],
      imports: [TestModule],
      providers: [TipoTarjetaService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableTipoTarjetaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
