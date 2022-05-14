import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorChoferComponent } from './buscador-chofer.component';
import { BuscadorChoferAvanzadoComponent } from './buscador-chofer-avanzado/buscador-chofer-avanzado.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HotkeyModule } from 'angular2-hotkeys';
import { ChoferService } from './chofer.service';
import { ModalComponent } from '../../core/components/modal/modal.component';
import { TestModule } from '../../core/mocks/test.module';
import { configureTestSuite } from '../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';

describe('BuscadorChoferComponent', () => {
  let component: BuscadorChoferComponent;
  let fixture: ComponentFixture<BuscadorChoferComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        BuscadorChoferComponent,
        ModalComponent,
        BuscadorChoferAvanzadoComponent
      ],
      imports: [
        TestModule,
        HotkeyModule.forRoot(),
        NgbModule
      ],
      providers: [
        ChoferService,
        FormBuilder
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorChoferComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El metodo createForm', () => {

    it('crea el form', () => {
      // Arrange

      // Act
      component['createForm']();

      // Assert
      expect(component.advancedSearchForm).toBeDefined();
    });
  });

  describe('El metodo setGridColums', () => {

    it('Crea los filtros', () => {
      // Arrange

      // Act
      component['setGridColums']();

      // Assert
      expect(component.filters).toBeDefined();
    });
  });

  describe('El metodo ngOnInit', () => {

    it('Invoca al metodo createForm', () => {
      // Arrange
      spyOn<any>(component, 'createForm');
      spyOn<any>(component, 'subscribeToAdvancedSearchFormChanges');
      // Act
      component.ngOnInit();
      // Assert
      expect(component['createForm']).toHaveBeenCalledTimes(1);
    });

    it('Invoca al metodo setGridColums', () => {
      // Arrange
      spyOn<any>(component, 'setGridColums');
      // Act
      component.ngOnInit();
      // Assert
      expect(component['setGridColums']).toHaveBeenCalledTimes(1);
    });

    it('Invoca al metodo subscribeToAdvancedSearchFormChanges', () => {
      // Arrange
      spyOn<any>(component, 'subscribeToAdvancedSearchFormChanges');
      // Act
      component.ngOnInit();
      // Assert
      expect(component['subscribeToAdvancedSearchFormChanges']).toHaveBeenCalledTimes(2);
    });
  });
});
