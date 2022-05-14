import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../../core/mocks/test.module';
import { DesplegableTipoTransporteComponent } from './desplegable-tipo-transporte.component';
import { TipoTransporteService } from './desplegable-tipo-transporte.service';
import { FocusDirective } from '../../core/directives/focus/focus.directive';
import { EntityService } from '../../core/shared/super/entity.service';
import { TipoTransporte } from '../data-models/tipo-transporte';
import { of } from 'rxjs';
import { configureTestSuite } from '../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DropdownNotificationService } from '../../core/shared/super/dropdown-notification.service';

describe('DespegableTipoTransporteComponent', () => {
  let component: DesplegableTipoTransporteComponent;
  let fixture: ComponentFixture<DesplegableTipoTransporteComponent>;
  let service: EntityService<TipoTransporte>;
  let dropDownService: DropdownNotificationService<TipoTransporte>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DesplegableTipoTransporteComponent, FocusDirective],
      imports: [TestModule],
      providers: [TipoTransporteService, DropdownNotificationService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableTipoTransporteComponent);
    component = fixture.componentInstance;

    dropDownService = TestBed.get(DropdownNotificationService);
    service = TestBed.get(TipoTransporteService);
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
