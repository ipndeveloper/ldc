import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableTipoDispositivoComponent } from './desplegable-tipo-dispositivo.component';
import { TiposDispositivoService } from './desplegable-tipo-dispositivo.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('DesplegableTipoDispositivoService', () => {
  let component: DesplegableTipoDispositivoComponent;
  let fixture: ComponentFixture<DesplegableTipoDispositivoComponent>;
  let service: TiposDispositivoService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DesplegableTipoDispositivoComponent],
      imports: [TestModule],
      providers: [TiposDispositivoService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableTipoDispositivoComponent);
    component = fixture.componentInstance;

    service = fixture.debugElement.injector.get(TiposDispositivoService);
    spyOn(service, 'getAll').and.returnValue(of([{}]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El metodo dataBind', () => {
    it('invoca al metodo getAll del service', () => {
      // Arrange

      // Act
      component['databind']();

      // Assert
      expect(service.getAll).toHaveBeenCalledTimes(1);
    });

    it('setea las entities del componente lo que devuelve el service', () => {
      // Arrange

      // Act
      component['databind']();

      // Assert
      expect(component.entities).toEqual([{} as any]);
    });
  });
});
