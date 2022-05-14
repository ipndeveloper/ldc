import { Component, EventEmitter, Input, OnInit, Output, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BABalanzasDisponiblesDataView } from '../../shared/data-models/ba-balanzas-disponibles-data-view';
import { Resources } from '../../../locale/artifacts/resources';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { BASeleccionarBalanzaSalidaCommand } from '../../shared/data-models/commands/cargas-descargas/seleccionar-balanza-salida-command';
import { DatosBalanzaSeleccionarBalanzaSalidaComponent } from './datos-balanza-seleccionar-balanza-salida/datos-balanza-seleccionar-balanza-salida.component';
import { SeleccionarBalanzaSalidaService } from './seleccionar-balanza-salida.service';

@Component({
  selector: 'yrd-seleccionar-balanza-salida',
  templateUrl: './seleccionar-balanza-salida.component.html',
  styleUrls: ['./seleccionar-balanza-salida.component.css']
})
export class SeleccionarBalanzaSalidaComponent implements OnInit, OnDestroy {

  @Input() command: BASeleccionarBalanzaSalidaCommand;
  @ViewChild('detallePlataformaRequerida') DetallePlataformaRequerida: DatosBalanzaSeleccionarBalanzaSalidaComponent;
  @Output() cerrarPopUp = new EventEmitter();
  disableButtons = true;
  form: FormGroup;
  balanzasDisponibles: BABalanzasDisponiblesDataView[];
  private readonly onDestroy = new Subject();

  constructor(private readonly fcService: FormComponentService,
    private readonly fb: FormBuilder,
    public readonly popupService: PopupService,
    private readonly seleccionarBalanzaSalidaService: SeleccionarBalanzaSalidaService) { }


  ngOnInit(): void {
    this.createForm();
    this.getDatosBalanza();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  private createForm(): void {
    this.form = this.fb.group({
      datosBalanza: this.fb.group({
        idTerminal: [{ value: '', disabled: true }],
        nombrePlanta: [{ value: '', disabled: true }],
        nombreBalanza: [{ value: '', disabled: true }],
        pesoCapturado: [{ value: '', disabled: true }],
        pathArchestra: [{ value: '', disabled: true }],
      }),
      detalle: this.fb.group({
        seleccionBalanza: [{value: null}, Validators.required]
      })
    });
    this.fcService.initialize(this.form);
  }

  private getDatosBalanza(): void {
    this.seleccionarBalanzaSalidaService
      .getDatosBalanza(this.command.pathArchestra)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(datos => {
        this.fcService.setValue('datosBalanza.idTerminal', datos.idTerminal, {onlySelf: true});
        this.fcService.setValue('datosBalanza.nombrePlanta', datos.nombrePlanta, {onlySelf: true});
        this.fcService.setValue('datosBalanza.nombreBalanza', datos.nombreBalanza, {onlySelf: true});
        this.fcService.setValue('datosBalanza.pesoCapturado', datos.pesoCapturado, {onlySelf: true});
        this.fcService.setValue('datosBalanza.pathArchestra', this.command.pathArchestra, {onlySelf: true});

        this.getBalanzasDisponibles();
      });
  }

  private getBalanzasDisponibles(): void {
    const idTerminal = this.fcService.getValue('datosBalanza.idTerminal');

    this.seleccionarBalanzaSalidaService
      .getBalanzasDisponibles(idTerminal)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(datos => {
        this.balanzasDisponibles = datos;
        this.disableButtons = false;
      });
  }

  public onClickAceptar() {
    const decisionCommand = this.mapControlsToCommand();
    if (decisionCommand.idBalanzaSalida !== 0) {
      this.seleccionarBalanzaSalidaService.enviarDecision(decisionCommand)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.popupService.success(Resources.Messages.DecisionRegistrada, Resources.Labels.Aceptar);
        this.cerrarPopUp.emit();
      });
    } else {
      this.popupService.error('Seleccione una Balanza');
    }
  }

  mapControlsToCommand(): BASeleccionarBalanzaSalidaCommand {
    this.command.tarjeta = this.fcService.getValue('datosBalanza.tarjeta');
    this.command.patente = this.fcService.getValue('datosBalanza.patente');
    if (parseInt(this.fcService.getValue('detalle.seleccionBalanza'), 10)) {
      this.command.idBalanzaSalida = parseInt(this.fcService.getValue('detalle.seleccionBalanza'), 10);
    } else {
      this.command.idBalanzaSalida = 0;
    }
    return this.command;
  }
}
