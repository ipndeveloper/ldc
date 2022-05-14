import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltroBusquedaReversarSalidaComponent } from './filtro-busqueda-reversar-salida.component';
import { ReactiveFormsModule, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CoreSharedModule } from '../../../core/core-shared.module';
import { DesplegableTipoTransporteComponent } from '../../../shared/desplegable-tipo-transporte/desplegable-tipo-transporte.component';
import { TipoTransporteService } from '../../../shared/desplegable-tipo-transporte/desplegable-tipo-transporte.service';
import { DesplegableTipoMovimientoComponent } from '../../../shared/desplegable-tipo-movimiento/desplegable-tipo-movimiento.component';
import { TipoMovimientoService } from '../../../shared/desplegable-tipo-movimiento/tipo-movimiento.service';
import { DesplegableEstadoMovimientoComponent } from '../../../shared/desplegable-estado-movimiento/desplegable-estado-movimiento.component';
import { EstadoMovimientoService } from '../../../shared/desplegable-estado-movimiento/estado-movimiento.service';
import { AutocompletePatenteComponent } from '../../../shared/autocomplete-patente/autocomplete-patente.component';
import { PatenteService } from '../../shared/services/patente.service';
import { BuscadorProductoComponent } from '../../../shared/buscador-producto/buscador-producto.component';
import { ProductoService } from '../../../shared/buscador-producto/producto.service';
import { HotkeyModule } from 'angular2-hotkeys';
import { TipoDocumentoPorteService } from '../../shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';
import { DesplegableTipoDocumentoPorteComponent } from '../../shared/desplegable-tipo-documento-porte/desplegable-tipo-documento-porte.component';
import { ApiService } from '../../../core/services/restClient/api.service';
import { of } from 'rxjs';
import { TiposTransporte } from '../../../shared/enums/enums';
import { configureTestSuite } from '../../../core/mocks/testing';
import { AutocompleteProductoComponent } from '../../../shared/autocomplete-producto/autocomplete-producto.component';
import { AutocompleteVagonComponent } from '../../../shared/autocomplete-vagon/autocomplete-vagon.component';

describe('FiltroBusquedaReversarSalidaComponent', () => {
  let component: FiltroBusquedaReversarSalidaComponent;
  let fixture: ComponentFixture<FiltroBusquedaReversarSalidaComponent>;

  let tipoTransporteControl: FormControl;
  let patenteControl: FormControl;
  let numeroVagonControl: FormControl;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        FiltroBusquedaReversarSalidaComponent,
        DesplegableTipoTransporteComponent,
        DesplegableTipoMovimientoComponent,
        DesplegableEstadoMovimientoComponent,
        AutocompletePatenteComponent,
        AutocompleteVagonComponent,
        AutocompleteProductoComponent,
        BuscadorProductoComponent,
        DesplegableTipoDocumentoPorteComponent,
      ],
      imports: [
        CoreSharedModule,
        ReactiveFormsModule,
        TestModule,
        HotkeyModule.forRoot()
      ],
      providers: [
        TipoTransporteService,
        TipoMovimientoService,
        EstadoMovimientoService,
        PatenteService,
        ProductoService,
        TipoDocumentoPorteService,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroBusquedaReversarSalidaComponent);
    component = fixture.componentInstance;

    const apiService = TestBed.get(ApiService);
    spyOn(apiService, 'get').and.returnValue(of([]));
    spyOn(apiService, 'post').and.returnValue(of([]));

    component.filtrosForm = new FormGroup({});

    const mockearEnableDisableSetValue = (control: AbstractControl) => {
      spyOn(control, 'enable');
      spyOn(control, 'disable');
      spyOn(control, 'setValue');
    };
    tipoTransporteControl = new FormControl('');
    patenteControl = new FormControl('');
    numeroVagonControl = new FormControl('');
    mockearEnableDisableSetValue(patenteControl);
    mockearEnableDisableSetValue(numeroVagonControl);

    spyOn(component.filtrosForm, 'get').and.callFake((token: string | [string]) => {
      if (token === 'tipoTransporte' || token[0] === 'tipoTransporte') {
        return tipoTransporteControl;
      } else if (token === 'patente' || token[0] === 'patente') {
        return patenteControl;
      } else if (token === 'numeroVagon' || token[0] === 'numeroVagon') {
        return numeroVagonControl;
      } else {
        return new FormControl();
      }
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El metodo ngOnInit', () => {

    it('habilita la patente cuando no se selecciona nada', () => {
      // Arrange

      // Act
      tipoTransporteControl.setValue(null);

      // Assert
      expect(patenteControl.enable).toHaveBeenCalledTimes(1);
    });

    it('habilita el numeroVagon cuando no se selecciona nada', () => {
      // Arrange

      // Act
      tipoTransporteControl.setValue(null);

      // Assert
      expect(numeroVagonControl.enable).toHaveBeenCalledTimes(1);
    });

    it('invoca al enable de la patente cuando cuando se selecciona el medio de transporte camion', () => {
      // Arrange

      // Act
      tipoTransporteControl.setValue({id: TiposTransporte.Camion});

      // Assert
      expect(patenteControl.enable).toHaveBeenCalledTimes(1);
    });

    it('invoca al disable del numeroVagon cuando cuando se selecciona el medio de transporte camion', () => {
      // Arrange

      // Act
      tipoTransporteControl.setValue({id: TiposTransporte.Camion});

      // Assert
      expect(numeroVagonControl.disable).toHaveBeenCalledTimes(1);
    });

    it('invoca al setValue del numeroVagon cuando cuando se selecciona el medio de transporte camion', () => {
      // Arrange

      // Act
      tipoTransporteControl.setValue({id: TiposTransporte.Camion});

      // Assert
      expect(numeroVagonControl.setValue).toHaveBeenCalledTimes(1);
      expect(numeroVagonControl.setValue).toHaveBeenCalledWith('');
    });

    it('invoca al enable del numeroVagon cuando cuando se selecciona el medio de transporte tren', () => {
      // Arrange

      // Act
      tipoTransporteControl.setValue({id: TiposTransporte.Tren});

      // Assert
      expect(numeroVagonControl.enable).toHaveBeenCalledTimes(1);
    });

    it('invoca al enable de la patente cuando cuando se selecciona el medio de transporte tren', () => {
      // Arrange

      // Act
      tipoTransporteControl.setValue({id: TiposTransporte.Tren});

      // Assert
      expect(patenteControl.disable).toHaveBeenCalledTimes(1);
    });

    it('invoca al setValue de la patente cuando cuando se selecciona el medio de transporte tren', () => {
      // Arrange

      // Act
      tipoTransporteControl.setValue({id: TiposTransporte.Tren});

      // Assert
      expect(patenteControl.setValue).toHaveBeenCalledTimes(1);
      expect(patenteControl.setValue).toHaveBeenCalledWith('');
    });
  });
});
