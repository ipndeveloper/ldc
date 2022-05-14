import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosMovimientoModificarProductoFueraCircuitoComponent } from './datos-movimiento-modificar-producto-fuera-circuito.component';
import { TextoConEtiquetaComponent } from '../../../../core/controls/texto-con-etiqueta/texto-con-etiqueta.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TestModule } from '../../../../core/mocks/test.module';
import { FocusDirective } from '../../../../core/directives/focus/focus.directive';
import { MovimientoCerealGrano } from '../../../../../app/shared/data-models/movimiento-cereal-grano';
import { Circuito } from '../../../../../app/shared/data-models/circuito/circuito';
import { EstadoMovimiento } from '../../../../../app/shared/data-models/estado-movimiento';
import { FormComponentService } from '../../../../../app/core/services/formComponent/formComponent.service';
import { TipoDocumentoPorte } from '../../../../../app/cargas-descargas/shared/data-models/tipo-documento-porte';
import { Titular } from '../../../../../app/shared/data-models/titular';
import { configureTestSuite } from '../../../../core/mocks/testing';

describe('DatosMovimientoModificarProductoFueraCircuitoComponent', () => {
  let component: DatosMovimientoModificarProductoFueraCircuitoComponent;
  let fixture: ComponentFixture<DatosMovimientoModificarProductoFueraCircuitoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        DatosMovimientoModificarProductoFueraCircuitoComponent,
        TextoConEtiquetaComponent,
        FocusDirective
      ],
      imports: [
        ReactiveFormsModule,
        TestModule
      ],
      providers: [
        FormComponentService
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosMovimientoModificarProductoFueraCircuitoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El metodo loadMovimiento', () => {
    let movimiento: MovimientoCerealGrano;
    let formComponentService: FormComponentService;

    beforeEach(() => {
      formComponentService = fixture.debugElement.injector.get(FormComponentService);
      crearMovimiento();
    });

    function crearMovimiento() {
      movimiento = new MovimientoCerealGrano(new Circuito(), new EstadoMovimiento(1));
      movimiento.tipoDocumentoPorte = new TipoDocumentoPorte(1, '');
      movimiento.nroDocumentoPorte = '123';
      movimiento.patenteCamion = 'abc123';
      movimiento.numeroVagon = 1;
      movimiento.fechaCarga = new Date();
      movimiento.fechaOperacion = new Date().toLocalISOString();
      movimiento.fechaSalida = new Date().toLocalISOString();
      movimiento.kgNeto = 1;
    }

    it('llama al setValue del formComponentService con el tipoDocumentoPorte', () => {
      spyOn(formComponentService, 'setValue');

      component.loadMovimiento(movimiento);

      expect(formComponentService.setValue).toHaveBeenCalledWith('tipoDocumentoPorte',
        movimiento.tipoDocumentoPorte.descripcion,
        { onlySelf: true });
    });

    it('llama al setValue del formComponentService con el nroDocumentoPorte', () => {
      spyOn(formComponentService, 'setValue');

      component.loadMovimiento(movimiento);

      expect(formComponentService.setValue).toHaveBeenCalledWith('nroDocumentoPorte',
        movimiento.nroDocumentoPorte,
        { onlySelf: true });
    });

    it('llama al setValue del formComponentService con la patenteCamion', () => {
      spyOn(formComponentService, 'setValue');

      component.loadMovimiento(movimiento);

      expect(formComponentService.setValue).toHaveBeenCalledWith('patenteCamion',
        movimiento.patenteCamion,
        { onlySelf: true });
    });

    it('llama al setValue del formComponentService con el vagon', () => {
      spyOn(formComponentService, 'setValue');

      component.loadMovimiento(movimiento);

      expect(formComponentService.setValue).toHaveBeenCalledWith('vagon',
        movimiento.numeroVagon,
        { onlySelf: true });
    });

    it('llama al setValue del formComponentService con la descripcion del titular', () => {
      spyOn(formComponentService, 'setValue');
      movimiento.titular = new Titular(1, '', 'titular', 1);

      component.loadMovimiento(movimiento);

      expect(formComponentService.setValue).toHaveBeenCalledWith('titular',
        movimiento.titular.descripcion,
        { onlySelf: true });
    });

    it('llama al setValue del formComponentService con el titular vacio', () => {
      spyOn(formComponentService, 'setValue');

      component.loadMovimiento(movimiento);

      expect(formComponentService.setValue).toHaveBeenCalledWith('titular',
        '',
        { onlySelf: true });
    });

    it('llama al setValue del formComponentService con la fechaEntrada', () => {
      spyOn(formComponentService, 'setValue');

      component.loadMovimiento(movimiento);

      expect(formComponentService.setValue).toHaveBeenCalledWith('fechaEntrada',
        movimiento.fechaEntrada,
        { onlySelf: true });
    });

    it('llama al setValue del formComponentService con la fechaOperacion', () => {
      spyOn(formComponentService, 'setValue');

      component.loadMovimiento(movimiento);

      expect(formComponentService.setValue).toHaveBeenCalledWith('fechaOperacion',
        movimiento.fechaOperacion,
        { onlySelf: true });
    });

    it('llama al setValue del formComponentService con la fechaSalida', () => {
      spyOn(formComponentService, 'setValue');

      component.loadMovimiento(movimiento);

      expect(formComponentService.setValue).toHaveBeenCalledWith('fechaSalida',
        movimiento.fechaSalida,
        { onlySelf: true });
    });

    it('llama al setValue del formComponentService con el netoBalanza', () => {
      spyOn(formComponentService, 'setValue');

      component.loadMovimiento(movimiento);

      expect(formComponentService.setValue).toHaveBeenCalledWith('netoBalanza',
        movimiento.kgNeto,
        { onlySelf: true });
    });

  });
});
