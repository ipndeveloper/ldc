import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableTipoMovimientoComponent } from './desplegable-tipo-movimiento.component';
import { TipoMovimientoService } from './tipo-movimiento.service';
import { TestModule } from '../../core/mocks/test.module';
import { configureTestSuite } from '../../core/mocks/testing';
import { DropdownNotificationService } from '../../core/shared/super/dropdown-notification.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TipoMovimiento } from '../data-models/tipo-movimiento';
import { EntityService } from '../../core/shared/super/entity.service';
import { of } from 'rxjs';

describe('DesplegableTipoMovimientoComponent', () => {
  let component: DesplegableTipoMovimientoComponent;
  let fixture: ComponentFixture<DesplegableTipoMovimientoComponent>;
  let service: EntityService<TipoMovimiento>;
  let dropDownService: DropdownNotificationService<TipoMovimiento>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DesplegableTipoMovimientoComponent ],
      imports: [
        TestModule
      ],
      providers: [
        TipoMovimientoService, DropdownNotificationService],
        schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableTipoMovimientoComponent);
    component = fixture.componentInstance;

    dropDownService = TestBed.get(DropdownNotificationService);
    service = TestBed.get(TipoMovimientoService);
    spyOn(dropDownService, 'allItemsWereSelected').and.returnValue(of(''));
    spyOn(service, 'getAll').and.returnValue(of(''));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El metodo getData', () => {
    it('Invoca al metodo getAll del entityService', () => {
      // Arrange
      component.opcionTodos = true;
      // Act
      component['getData']();
      // Assert
      expect(service.getAll).toHaveBeenCalledTimes(1);
    });
  });

});
