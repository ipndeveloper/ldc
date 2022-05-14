import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TipoProducto } from '../../../shared/data-models/tipo-producto';
import { Movimiento } from '../../../shared/data-models/movimiento';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { patenteCamionDistintaPatenteAcopladoValidator } from '../../shared/validators/patente.validator';
import { DescargaEventsNotifierService } from '../../shared/services/descarga-events-notifier.service';
import { DatosDocumentoBaseComponent } from '../../shared/datos-documento-base/datos-documento-base.component';
import { Resources } from '../../../../locale/artifacts/resources';
import { ParametrosTerminalService } from '../../shared/services/parametros-terminal.service';
import { searchValidator } from '../../../core/shared/super/search.validator';
import { kgsBrutosGreaterThanKgsTara, validateFechaVtoLote } from './controlar-descarga-camion-transportes-varios.validator';

@Component({
  selector: 'yrd-datos-documento-transportes-varios',
  templateUrl: './datos-documento-transportes-varios.component.html',
  styleUrls: ['./datos-documento-transportes-varios.component.css'],
  providers: [FormComponentService]
})

export class DatosDocumentoTransportesVariosComponent
                extends DatosDocumentoBaseComponent
                implements OnInit, AfterViewInit {

  @Input() tipoProducto: TipoProducto;
  @Input() esModificacionFueraPuesto: boolean;
  @Input() esFueraCircuito: boolean;
  @Input() esConsulta = false;
  @Input() mostrarEncabezado = true;
  movimiento: Movimiento;

  datosDocumentoForm: FormGroup;

  validationMessagesKilosBrutos = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.KilosBruto),
    min: Resources.Messages.ElCampoXDebeSerMayorAY.format(Resources.Labels.KilosBruto, '0'),
    pattern: Resources.Messages.SeDebenIngresarNumerosEnteros,
    kgBrutoGreaterThanKgTara: Resources.Messages.ElCampoXDebeSerMayorAY.format(Resources.Labels.KilosBruto, Resources.Labels.KilosTara),
    max: 'El Campo Kilos Bruto debe ser menor a 2,147,483,647'
  };

  validationMessagesKilosTara = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.KilosTara),
    min: Resources.Messages.ElCampoXDebeSerMayorAY.format(Resources.Labels.KilosTara, '0'),
    kgBrutoGreaterThanKgTara: Resources.Messages.ElCampoXDebeSerMenorAY.format(Resources.Labels.KilosTara, Resources.Labels.KilosBruto),
    pattern: Resources.Messages.SeDebenIngresarNumerosEnteros,
    max: 'El Campo Kilos Tara debe ser menor a 2,147,483,647'
  };

  validationMessagesTarjeta = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Tarjeta),
    min: Resources.Messages.ElCampoXDebeSerMayorAY.format(Resources.Labels.Tarjeta, '0')
  };

  validationMessagesObservaciones = {
    maxlength: 'Debe ingresar menos de 100 caracteres'
  };

  validationMessagesVendedor = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Vendedor),
    searchValueNotValid: Resources.Messages.ElCuitIngresadoNoEsValido
  };

  validationMessagesProducto = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Producto),
    searchValueNotValid: Resources.Messages.ElProductoNoExisteONoCorrespondeAlCircuito
  };

  constructor(private readonly fcService: FormComponentService,
              private readonly fb: FormBuilder,
              eventsNotifierService: DescargaEventsNotifierService,
              parametrosTerminalService: ParametrosTerminalService) {

    super(eventsNotifierService,
          parametrosTerminalService,
          fcService);

    this.tipoProducto = new TipoProducto(4, '');
  }

  ngOnInit() {
    this.createForm();
    super.subscribeFormInteraction();
  }

  ngAfterViewInit() {
    this.fcService.initialize(this.datosDocumentoForm);
    this.subscribeKilosTara();
    this.subscribeKilosBruto();
    this.setearDestinatarioPorDefecto(this.esConsulta, this.esFueraCircuito);
    this.setearKgsEstimadosPorDefecto();
  }

  private subscribeKilosTara(): void {
    const kilosTara = this.datosDocumentoForm.get('kilosBrutosTaraGroup.kilosTara');
    if (kilosTara) {
      kilosTara.valueChanges.subscribe(value => this.determinarKilosNeto(value));
    }
  }

  private subscribeKilosBruto(): void {
    const kilosBruto = this.datosDocumentoForm.get('kilosBrutosTaraGroup.kilosBruto');
    if (kilosBruto) {
      kilosBruto.valueChanges.subscribe(value => this.determinarKilosNeto(value));
    }
  }

  private determinarKilosNeto(value: number) {
    if (value != null && value !== undefined) {
      this.calcularkilosNeto();
    }
  }

  private calcularkilosNeto(): void {
    const kilosTara = this.datosDocumentoForm.get('kilosBrutosTaraGroup.kilosTara');
    const kilosBruto = this.datosDocumentoForm.get('kilosBrutosTaraGroup.kilosBruto');
    if (kilosTara && kilosBruto &&
        kilosTara.value != null && kilosTara.value !== undefined &&
        kilosBruto.value != null && kilosBruto.value !== undefined) {
        this.datosDocumentoForm.patchValue({kilosNeto: +kilosBruto.value - +kilosTara.value});
    }
  }

  resetForm(): void {
    this.fcService.resetForm({emitEvent: true});
    this.createForm();
    this.setearDestinatarioPorDefecto(this.esConsulta, this.esFueraCircuito);
    this.setearKgsEstimadosPorDefecto();
  }

  protected createForm() {
    this.datosDocumentoForm = this.fb.group({
      producto: [{ value: undefined, disabled: false }, [Validators.required, searchValidator()]],
      estado: { value: '', disabled: true },
      tarjeta: { value: '', disabled: false },
      patentes: this.fb.group({
        patenteCamion: [{ value: null, disabled: false },
        Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(8)])],
        patenteAcoplado: [{ value: null, disabled: false }, Validators.minLength(6)],
      }, { validator: patenteCamionDistintaPatenteAcopladoValidator() }),
      kilosBrutosTaraGroup: this.fb.group({
        kilosBruto: [{ value: null, disabled: false },
          Validators.compose([
            Validators.required,
            Validators.min(1),
            Validators.pattern(/^-?\d+$/),
            Validators.max(2147483647)
          ] // VAL034
        )],
        kilosTara: new FormControl({ value: '', disabled: false },
          [
            Validators.required,
            Validators.min(1),
            Validators.pattern(/^-?\d+$/),
            Validators.max(2147483647)
          ]),
      }, { validator: kgsBrutosGreaterThanKgsTara }),
      kilosNeto: { value: '', disabled: true },
      fechaVtoLote: new FormControl({
        value: '',
        disabled: true
      }, [
          Validators.required,
          validateFechaVtoLote
        ]),
      vendedor: [{ value: undefined, disabled: false }, [Validators.required, searchValidator()]],
      observaciones: [{ value: undefined, disabled: false }, Validators.maxLength(100)]
    });
    this.eventsNotifierService.onChildFormIntanceReady(this.datosDocumentoForm, 'datosDocumentoForm');
  }

    loadMovimiento(movimiento: Movimiento) {
      this.movimiento = movimiento;

      this.fcService.setValue(`patentes.patenteAcoplado`, movimiento.patenteAcoplado, {onlySelf: true}, this.esConsulta);
      this.fcService.setValue(`patentes.patenteCamion`, movimiento.patenteCamion, {onlySelf: true}, this.esConsulta);
      this.fcService.setValue(`tarjeta`, movimiento.nroTarjeta, {onlySelf: true}, true);
      this.fcService.setValue(`producto`, movimiento.producto, {onlySelf: false}, this.esConsulta || this.esFueraCircuito);
      this.fcService.setValue(`kilosBrutosTaraGroup.kilosBruto`, movimiento.kgBruto, {onlySelf: true}, this.esConsulta);
      this.fcService.setValue(`kilosBrutosTaraGroup.kilosTara`, movimiento.kgTara, {onlySelf: true}, this.esConsulta);
      this.fcService.setValue(`kilosNeto`, movimiento.kgNeto, {onlySelf: true}, true);
      this.fcService.setValue(`vendedor`, movimiento.vendedor, {onlySelf: true}, this.esConsulta);
      this.fcService.setValue(`observaciones`, movimiento.observaciones, {onlySelf: true}, this.esConsulta);
    }

  private setearKgsEstimadosPorDefecto(): void {
    if (!this.kgsBrutosEstimados && !this.kgsTaraEstimados) {
      this.obtenerKgsEstimadosPorDefecto(this.esAlta);
    }
    this.fcService.setValue('kilosBrutosTaraGroup.kilosBruto', this.kgsBrutosEstimados, { onlySelf: true });
    this.fcService.setValue('kilosBrutosTaraGroup.kilosTara', this.kgsTaraEstimados, { onlySelf: true });
  }
}
