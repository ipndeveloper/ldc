import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { BuscadorProductoComponent } from './buscador-producto.component';
import { ProductoService } from './producto.service';
import { HotkeyModule, HotkeysService } from 'angular2-hotkeys';
import { TestModule } from '../../core/mocks/test.module';
import { configureTestSuite } from '../../core/mocks/testing';
import { FormBuilder } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PopupService } from '../../core/services/popupService/popup.service';

describe('BuscadorProductoComponent', () => {
  let component: BuscadorProductoComponent;
  let fixture: ComponentFixture<BuscadorProductoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [BuscadorProductoComponent],
      imports: [HotkeyModule.forRoot(), TestModule],
      providers: [ProductoService,
        HotkeysService,
        PopupService,
        FormBuilder
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorProductoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El metodo limpiarCodigo', () => {
    it('setea el codigo con un string vacio', () => {
      // Arrange

      // Act
      component['limpiarCodigo']();

      // Assert
      expect(component.codigo).toEqual('');
    });

    it('setea el value del nativeElement con un string vacio', () => {
      // Arrange

      // Act
      component['limpiarCodigo']();

      // Assert
      expect(component.productoElement.nativeElement.value).toEqual('');
    });
  });

  describe('El metodo callServiceByCode', () => {
    let service: ProductoService;

    beforeEach(() => {
      service = TestBed.get(ProductoService);
    });

    it('invoca al getSinTipo del service cuando no posee tipoProducto', () => {
      // Arrange
      spyOn(service, 'getSinTipo');

      // Act
      component['callServiceByCode']('11');

      // Assert
      expect(service.getSinTipo).toHaveBeenCalledTimes(1);
      expect(service.getSinTipo).toHaveBeenCalledWith('011', false);
    });

    it('invoca al getSinTipo del getPorCodigoPorTipoProducto cuando posee tipoProducto', () => {
      // Arrange
      component.tipoProducto = {id: 1};
      spyOn(service, 'getPorCodigoPorTipoProducto');

      // Act
      component['callServiceByCode']('11');

      // Assert
      expect(service.getPorCodigoPorTipoProducto).toHaveBeenCalledTimes(1);
      expect(service.getPorCodigoPorTipoProducto).toHaveBeenCalledWith('011', 1);
    });
  });
});
