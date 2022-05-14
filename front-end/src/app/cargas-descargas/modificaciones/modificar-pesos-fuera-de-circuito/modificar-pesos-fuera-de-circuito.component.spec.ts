import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarPesosFueraDeCircuitoComponent } from './modificar-pesos-fuera-de-circuito.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HotkeyModule } from 'angular2-hotkeys';
import { TestModule } from '../../../core/mocks/test.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { MovimientoPesajeFueraDeCircuitoService } from './movimiento-pesaje-fuera-de-circuito.service';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { NavigationService } from '../../../core/services/navigationService/navigation.service';
import { Routes } from '@angular/router';
import { PatenteService } from '../../shared/services/patente.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';
import { MovimientoPesaje } from '../../registrar-peso/movimiento-pesaje';
import { Producto } from '../../../shared/data-models/producto';

export const MockRoutes: Routes = [
  {
      path: '',
      component: ModificarPesosFueraDeCircuitoComponent,
      data: {
          title: 'ModificarPesosFueraDeCircuitoComponent'
      },
      pathMatch: 'full'
  }
];

describe('ModificarPesosFueraDeCircuitoComponent', () => {
  let component: ModificarPesosFueraDeCircuitoComponent;
  let fixture: ComponentFixture<ModificarPesosFueraDeCircuitoComponent>;
  let fcService: FormComponentService;
  let movimiento: MovimientoPesaje;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModificarPesosFueraDeCircuitoComponent,
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        HotkeyModule.forRoot(),
        TestModule,
        NgbModule,
        RouterTestingModule.withRoutes(MockRoutes)
      ],
      providers : [
        PatenteService,
        MovimientoPesajeFueraDeCircuitoService,
        FormComponentService,
        NavigationService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarPesosFueraDeCircuitoComponent);
    component = fixture.componentInstance;
    fcService = TestBed.get(FormComponentService);
    createForm();
    movimiento = new MovimientoPesaje(1);
  });

  function createForm() {
    const fb = new FormBuilder();
     component.registrarPesoForm = fb.group({
      busquedaMovimiento: fb.group({
        patenteCamion: [{value: '', disabled: true}],
        numeroVagon: [{value: '', disabled: true}],
        tarjeta: [{value: '', disabled: true}]
      }),
      /*Seccion de Circuito*/
      circuito: fb.group({
        terminal: { value: '', disabled: true },
        tipoMovimiento: { value: '', disabled: true },
        tipoTransporte: { value: '', disabled: true },
        tipoProducto: { value: '', disabled: true }
      }),
      estadoMovimiento: fb.group({
        estado: { value: '', disabled: true }
      }),
      fechaPeriodoStockSan: fb.group({
        fechaStock: [{ value: '', disabled: false }]
      }),
      datosMovimiento: fb.group({
        tipoDocumentoPorte: { value: '', disabled: true },
        nroDocumentoPorte: { value: '', disabled: true },
        producto: { value: '', disabled: true },
        cosecha: { value: '', disabled: true },
        estado: { value: '', disabled: true },
        estadoCupo: { value: '', disabled: true },
        turnoPlaya: { value: '', disabled: true },
        ordenCompra: { value: '', disabled: true },
        ordenCarga: { value: '', disabled: true },
        humedad: { value: '', disabled: true },
        proteina: { value: '', disabled: true },
        grado: { value: '', disabled: true },
        cantidadEstimada: { value: '', disabled: true }
      }),
      datosPesaje: fb.group({
        idMovimiento: { value: '' },
        brutoDocPorte: { value: '', disabled: true },
        taraDocPorte: { value: '', disabled: true },
        netoDocPorte: { value: '', disabled: true },
        kilosBruto: [{ value: '', disabled: false }],
        kilosTara: [{ value: '', disabled: false }],
        netoBalanza: { value: '', disabled: true },
        brutoDiferencia: { value: '', disabled: true },
        taraDiferencia: { value: '', disabled: true },
        netoDiferencia: { value: '', disabled: true },
        brutoEsRepesaje: { value: '', disabled: true },
        taraEsRepesaje: { value: '', disabled: true },
        entradaManualAutomatico: { value: '', disabled: true },
        salidaManualAutomatico: { value: '', disabled: true },
        coeficienteConversionLitros: {value: '', disabled: true },
      }),
      lugarDescargaCarga: {value: '', disabled: true}
    });
    fcService.initialize(component.registrarPesoForm);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El metodo completarExistente', () => {
    beforeEach(() => {
      movimiento.producto = new Producto(1, '00', 'producto', true);
    });

    it('setea el movimiento', () => {
      // Arrange
      // Act
      component['completarExistente'](movimiento);
      // Assert
      expect(component.movimiento).toEqual(movimiento);
    });

    it('Setea la fechaStockSan del movimiento en el control', () => {
      // Arrange
      const fechaStock = component.registrarPesoForm.controls.fechaPeriodoStockSan;
      movimiento.fechaStockSAN = new Date();
      const esperado = movimiento.fechaStockSAN ? new Date(movimiento.fechaStockSAN).toLocalISOString().substring(0, 10) : undefined;
      // Act
      component['completarExistente'](movimiento);
      // Assert
      expect((fechaStock as FormGroup).controls.fechaStock.value).toEqual(esperado);
    });

    it('Setea la patenteCamion del movimiento en el control', () => {
      // Arrange
      const busquedaMovimiento = component.registrarPesoForm.controls.busquedaMovimiento;
      movimiento.patente = 'AAA111';
      // Act
      component['completarExistente'](movimiento);
      // Assert
      expect((busquedaMovimiento as FormGroup).controls.patenteCamion.value).toEqual(movimiento.patente);
    });

    it('Setea el numeroVagon del movimiento en el control', () => {
      // Arrange
      const busquedaMovimiento = component.registrarPesoForm.controls.busquedaMovimiento;
      movimiento.numeroVagon = 1;
      // Act
      component['completarExistente'](movimiento);
      // Assert
      expect((busquedaMovimiento as FormGroup).controls.numeroVagon.value).toEqual(movimiento.numeroVagon);
    });

    it('Setea la tarjeta del movimiento en el control', () => {
      // Arrange
      const busquedaMovimiento = component.registrarPesoForm.controls.busquedaMovimiento;
      movimiento.tarjeta = '1234';
      // Act
      component['completarExistente'](movimiento);
      // Assert
      expect((busquedaMovimiento as FormGroup).controls.tarjeta.value).toEqual(movimiento.tarjeta);
    });

    it('Setea el tipoDocumentoPorte del movimiento en el control', () => {
      // Arrange
      const datosMovimiento = component.registrarPesoForm.controls.datosMovimiento;
      movimiento.tipoDocumentoPorte = 'Remito';
      // Act
      component['completarExistente'](movimiento);
      // Assert
      expect((datosMovimiento as FormGroup).controls.tipoDocumentoPorte.value).toEqual(movimiento.tipoDocumentoPorte);
    });

    it('Setea el tipoDocumentoPorte del movimiento en el control', () => {
      // Arrange
      const datosMovimiento = component.registrarPesoForm.controls.datosMovimiento;
      movimiento.nroDocumentoPorte = '123452';
      // Act
      component['completarExistente'](movimiento);
      // Assert
      expect((datosMovimiento as FormGroup).controls.nroDocumentoPorte.value).toEqual(movimiento.nroDocumentoPorte);
    });

    it('Setea el turno del movimiento en el control', () => {
      // Arrange
      const datosMovimiento = component.registrarPesoForm.controls.datosMovimiento;
      movimiento.turno = '123452';
      // Act
      component['completarExistente'](movimiento);
      // Assert
      expect((datosMovimiento as FormGroup).controls.turnoPlaya.value).toEqual(movimiento.turno);
    });

    it('Setea el estadoCupo del movimiento en el control', () => {
      // Arrange
      const datosMovimiento = component.registrarPesoForm.controls.datosMovimiento;
      movimiento.estadoCupo = 'estado';
      // Act
      component['completarExistente'](movimiento);
      // Assert
      expect((datosMovimiento as FormGroup).controls.estadoCupo.value).toEqual(movimiento.estadoCupo);
    });

    it('Setea el producto del movimiento en el control', () => {
      // Arrange
      const datosMovimiento = component.registrarPesoForm.controls.datosMovimiento;
      movimiento.producto = new Producto(1, '123', '123', true);
      // Act
      component['completarExistente'](movimiento);
      // Assert
      expect((datosMovimiento as FormGroup).controls.producto.value).toEqual(movimiento.producto.descripcion);
    });

    it('Setea el estado del movimiento en el control', () => {
      // Arrange
      const estadoMovimiento = component.registrarPesoForm.controls.estadoMovimiento;
      movimiento.estado = 'estado';
      // Act
      component['completarExistente'](movimiento);
      // Assert
      expect((estadoMovimiento as FormGroup).controls.estado.value).toEqual(movimiento.estado);
    });

    it('Setea la cosecha del movimiento en el control', () => {
      // Arrange
      const datosMovimiento = component.registrarPesoForm.controls.datosMovimiento;
      movimiento.cosecha = 'cosecha';
      // Act
      component['completarExistente'](movimiento);
      // Assert
      expect((datosMovimiento as FormGroup).controls.cosecha.value).toEqual(movimiento.cosecha);
    });

    it('Setea la humedad del movimiento en el control', () => {
      // Arrange
      const datosMovimiento = component.registrarPesoForm.controls.datosMovimiento;
      movimiento.humedad = 14;
      // Act
      component['completarExistente'](movimiento);
      // Assert
      expect((datosMovimiento as FormGroup).controls.humedad.value).toEqual(movimiento.humedad);
    });

    it('Setea la proteina del movimiento en el control', () => {
      // Arrange
      const datosMovimiento = component.registrarPesoForm.controls.datosMovimiento;
      movimiento.proteina = 14;
      // Act
      component['completarExistente'](movimiento);
      // Assert
      expect((datosMovimiento as FormGroup).controls.proteina.value).toEqual(movimiento.proteina);
    });

    it('Setea el gradoDescripcion del movimiento en el control', () => {
      // Arrange
      const datosMovimiento = component.registrarPesoForm.controls.datosMovimiento;
      movimiento.gradoDescripcion = 'grado';
      // Act
      component['completarExistente'](movimiento);
      // Assert
      expect((datosMovimiento as FormGroup).controls.grado.value).toEqual(movimiento.gradoDescripcion);
    });

    it('Setea la cantidadEstimada del movimiento en el control', () => {
      // Arrange
      const datosMovimiento = component.registrarPesoForm.controls.datosMovimiento;
      movimiento.cantidadEstimada = 10000;
      // Act
      component['completarExistente'](movimiento);
      // Assert
      expect((datosMovimiento as FormGroup).controls.cantidadEstimada.value).toEqual(movimiento.cantidadEstimada);
    });

    it('Setea la ordenCompra del movimiento en el control', () => {
      // Arrange
      const datosMovimiento = component.registrarPesoForm.controls.datosMovimiento;
      movimiento.ordenCompra = '10';
      // Act
      component['completarExistente'](movimiento);
      // Assert
      expect((datosMovimiento as FormGroup).controls.ordenCompra.value).toEqual(movimiento.ordenCompra);
    });

    it('Setea la ordenCarga del movimiento en el control', () => {
      // Arrange
      const datosMovimiento = component.registrarPesoForm.controls.datosMovimiento;
      movimiento.ordenCarga = '10';
      // Act
      component['completarExistente'](movimiento);
      // Assert
      expect((datosMovimiento as FormGroup).controls.ordenCarga.value).toEqual(movimiento.ordenCarga);
    });


    it('Setea el brutoDocPorte del movimiento en el control', () => {
      // Arrange
      const datosPesaje = component.registrarPesoForm.controls.datosPesaje;
      movimiento.kgPesoBrutoDocumento = 45000;
      // Act
      component['completarExistente'](movimiento);
      // Assert
      expect((datosPesaje as FormGroup).controls.brutoDocPorte.value).toEqual(movimiento.kgPesoBrutoDocumento);
    });

    it('Setea el kgPesoNetoDocumento del movimiento en el control', () => {
      // Arrange
      const datosPesaje = component.registrarPesoForm.controls.datosPesaje;
      movimiento.kgPesoNetoDocumento = 15000;
      // Act
      component['completarExistente'](movimiento);
      // Assert
      expect((datosPesaje as FormGroup).controls.netoDocPorte.value).toEqual(movimiento.kgPesoNetoDocumento);
    });

    it('Setea el kgPesoTaraDocumento del movimiento en el control', () => {
      // Arrange
      const datosPesaje = component.registrarPesoForm.controls.datosPesaje;
      movimiento.kgPesoTaraDocumento = 30000;
      // Act
      component['completarExistente'](movimiento);
      // Assert
      expect((datosPesaje as FormGroup).controls.taraDocPorte.value).toEqual(movimiento.kgPesoTaraDocumento);
    });

    it('Setea el kgPesoBruto del movimiento en el control', () => {
      // Arrange
      const datosPesaje = component.registrarPesoForm.controls.datosPesaje;
      movimiento.kgPesoBruto = 45000;
      // Act
      component['completarExistente'](movimiento);
      // Assert
      expect((datosPesaje as FormGroup).controls.kilosBruto.value).toEqual(movimiento.kgPesoBruto);
    });

    it('Setea el kilosTara del movimiento en el control', () => {
      // Arrange
      const datosPesaje = component.registrarPesoForm.controls.datosPesaje;
      movimiento.kgPesoTara = 15000;
      // Act
      component['completarExistente'](movimiento);
      // Assert
      expect((datosPesaje as FormGroup).controls.kilosTara.value).toEqual(movimiento.kgPesoTara);
    });

    it('Setea el entradaEsRepesaje del movimiento en el control', () => {
      // Arrange
      const datosPesaje = component.registrarPesoForm.controls.datosPesaje;
      movimiento.entradaEsRepesaje = true;
      // Act
      component['completarExistente'](movimiento);
      // Assert
      expect((datosPesaje as FormGroup).controls.brutoEsRepesaje.value).toEqual(movimiento.entradaEsRepesaje);
    });

    it('Setea el taraEsRepesaje del movimiento en el control', () => {
      // Arrange
      const datosPesaje = component.registrarPesoForm.controls.datosPesaje;
      movimiento.salidaEsRepesaje = true;
      // Act
      component['completarExistente'](movimiento);
      // Assert
      expect((datosPesaje as FormGroup).controls.taraEsRepesaje.value).toEqual(movimiento.salidaEsRepesaje);
    });

    it('Setea el taraEsRepesaje del movimiento en el control', () => {
      // Arrange
      const lugarDescargaCarga = component.registrarPesoForm.controls.lugarDescargaCarga;
      movimiento.lugarDescargaCarga = 'lugar descarga';
      // Act
      component['completarExistente'](movimiento);
      // Assert
      expect(lugarDescargaCarga.value).toEqual(movimiento.lugarDescargaCarga);
    });

  });
});
