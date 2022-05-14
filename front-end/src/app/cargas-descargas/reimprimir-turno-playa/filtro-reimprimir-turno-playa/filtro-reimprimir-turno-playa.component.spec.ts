import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltroReimprimirTurnoPlayaComponent } from './filtro-reimprimir-turno-playa.component';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';
import { FormGroup } from '@angular/forms';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { TipoDocumentoPorteService } from '../../shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';

describe('FiltroReimprimirTurnoPlayaComponent', () => {
  let component: FiltroReimprimirTurnoPlayaComponent;
  let fixture: ComponentFixture<FiltroReimprimirTurnoPlayaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [FiltroReimprimirTurnoPlayaComponent],
      imports: [TestModule],
      providers: [PopupService, TipoDocumentoPorteService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroReimprimirTurnoPlayaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El método onClickBuscar', () => {
    it('Emite evento de búsqueda cuando el formulario es válido', () => {
      // Arrange
      spyOn((component as any).fcService, 'isValidForm').and.returnValue(true);
      spyOn(component.buscarClicked, 'emit');

      // Act
      component.onClickBuscar();

      // Assert
      expect(component.buscarClicked.emit).toHaveBeenCalledTimes(1);
    });

    it('Completa los errores cuando el formulario es inválido', () => {
      // Arrange
      component.form = {} as FormGroup;
      spyOn((component as any).fcService, 'isValidForm').and.returnValue(false);
      spyOn((component as any).fcService, 'validateForm');
      spyOn((component as any).fcService, 'showValidationError');
      spyOn(component, 'setFocus');

      // Act
      component.onClickBuscar();

      // Assert
      expect((component as any).fcService.validateForm).toHaveBeenCalledTimes(1);
    });

    it('Muestra los errores cuando el formulario es inválido', () => {
      // Arrange
      component.form = {} as FormGroup;
      spyOn((component as any).fcService, 'isValidForm').and.returnValue(false);
      spyOn((component as any).fcService, 'validateForm');
      spyOn((component as any).fcService, 'showValidationError');
      spyOn(component, 'setFocus');

      // Act
      component.onClickBuscar();

      // Assert
      expect((component as any).fcService.showValidationError).toHaveBeenCalledTimes(1);
    });
  });
});
