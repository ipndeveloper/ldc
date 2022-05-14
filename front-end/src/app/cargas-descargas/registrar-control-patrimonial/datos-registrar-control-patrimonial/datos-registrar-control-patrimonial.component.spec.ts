import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosRegistrarControlPatrimonialComponent } from './datos-registrar-control-patrimonial.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { ChecklistControlPatrimonialDataView } from '../../../shared/data-models/checklist-control-patrimonial-data-view';
import { FormBuilder } from '@angular/forms';
import { PopupModule } from '../../../core/services/popupService/popup.module';
import { EntityWithCode } from '../../../core/models/entity-with-code';

describe('DatosRegistrarControlPatrimonialComponent', () => {
  let component: DatosRegistrarControlPatrimonialComponent;
  let fixture: ComponentFixture<DatosRegistrarControlPatrimonialComponent>;
  let movimiento: ChecklistControlPatrimonialDataView;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DatosRegistrarControlPatrimonialComponent],
      imports: [PopupModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosRegistrarControlPatrimonialComponent);
    component = fixture.componentInstance;
    const fb = new FormBuilder();
    component.form = fb.group({
      id: { value: '', disabled: true },
      tipoDocumentoPorte: { value: '', disabled: true },
      nroDocumentoPorte: { value: '', disabled: true },
      producto: { value: '', disabled: true },
      estado: { value: '', disabled: true },
      ordenCarga: { value: '', disabled: true },
      nroViaje: { value: '', disabled: true },
      titularCP: { value: '', disabled: true },
      vendedor: { value: '', disabled: true },
      patente: { value: '', disabled: true }
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El método ngOnInit', () => {
    it('Inicializa el form del fcService', () => {
      // Arrange
      (component as any).fcService = new FormComponentService(TestBed.get(PopupService));
      spyOn((component as any).fcService, 'initialize');

      // Act
      component.ngOnInit();

      // Assert
      expect((component as any).fcService.initialize).toHaveBeenCalledTimes(1);
      expect((component as any).fcService.initialize).toHaveBeenCalledWith(component.form);
    });
  });

  describe('El método completaDatoMovimiento', () => {
    beforeEach(() => {
      movimiento = {
        id: 1,
        tipoDocumentoPorte: '123',
        numeroDocumentoPorte: '123',
        producto: new EntityWithCode(123, 'cod', 'desc'),
        estado: '123',
        ordenCarga: '123',
        nroViaje: '123',
        titularCP: '123',
        vendedor: '123',
        patente: '123'
      } as ChecklistControlPatrimonialDataView;
      (component as any).fcService = new FormComponentService(TestBed.get(PopupService));
      (component as any).fcService.initialize(component.form);
    });

    it('Mapea todos los campos', () => {
      // Arrange
      spyOn((component as any).fcService, 'setValue');

      // Act
      component.completaDatoMovimiento(movimiento);

      // Assert
      expect((component as any).fcService.setValue).toHaveBeenCalledTimes(10);
    });

    it('Mapea el campo ID', () => {
      // Arrange

      // Act
      component.completaDatoMovimiento(movimiento);

      // Assert
      expect(component.form.controls.id.value).toEqual(movimiento.id);
    });

    it('Mapea el campo tipoDocumentoPorte', () => {
      // Arrange

      // Act
      component.completaDatoMovimiento(movimiento);

      // Assert
      expect(component.form.controls.tipoDocumentoPorte.value).toEqual(movimiento.tipoDocumentoPorte);
    });

    it('Mapea el campo numeroDocumentoPorte', () => {
      // Arrange

      // Act
      component.completaDatoMovimiento(movimiento);

      // Assert
      expect(component.form.controls.nroDocumentoPorte.value).toEqual(movimiento.numeroDocumentoPorte);
    });

    it('Mapea el campo producto', () => {
      // Arrange

      // Act
      component.completaDatoMovimiento(movimiento);

      // Assert
      expect(component.form.controls.producto.value).toEqual(movimiento.producto);
    });

    it('Mapea el campo estado', () => {
      // Arrange

      // Act
      component.completaDatoMovimiento(movimiento);

      // Assert
      expect(component.form.controls.estado.value).toEqual(movimiento.estado);
    });

    it('Mapea el campo ordenCarga', () => {
      // Arrange

      // Act
      component.completaDatoMovimiento(movimiento);

      // Assert
      expect(component.form.controls.ordenCarga.value).toEqual(movimiento.ordenCarga);
    });

    it('Mapea el campo nroViaje', () => {
      // Arrange

      // Act
      component.completaDatoMovimiento(movimiento);

      // Assert
      expect(component.form.controls.nroViaje.value).toEqual(movimiento.nroViaje);
    });

    it('Mapea el campo titularCP', () => {
      // Arrange

      // Act
      component.completaDatoMovimiento(movimiento);

      // Assert
      expect(component.form.controls.titularCP.value).toEqual(movimiento.titularCP);
    });

    it('Mapea el campo vendedor', () => {
      // Arrange

      // Act
      component.completaDatoMovimiento(movimiento);

      // Assert
      expect(component.form.controls.vendedor.value).toEqual(movimiento.vendedor);
    });

    it('Mapea el campo patente', () => {
      // Arrange

      // Act
      component.completaDatoMovimiento(movimiento);

      // Assert
      expect(component.form.controls.patente.value).toEqual(movimiento.patente);
    });
  });
});
