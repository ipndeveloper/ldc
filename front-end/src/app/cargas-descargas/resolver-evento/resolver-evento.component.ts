import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResolverEventoCommand, ResolverEventoParametro } from '../../shared/data-models/commands/cargas-descargas/resolver-evento-command';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { ResolverEventoTarjetaPatenteNoCoincidenDataView } from '../../shared/data-models/resolver-evento-tarjeta-patente-no-coinciden-data-view';
import { ResolverEventoService } from './resolver-evento.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { NavigationService } from '../../../app/core/services/navigationService/navigation.service';

@Component({
  selector: 'yrd-resolver-evento',
  templateUrl: './resolver-evento.component.html',
  styleUrls: ['./resolver-evento.component.css']
})
export class ResolverEventoComponent implements OnInit {
  form: FormGroup;
  dataView: ResolverEventoTarjetaPatenteNoCoincidenDataView;
  @Output() cerrarPopUp = new EventEmitter();
  @Input() command: ResolverEventoCommand;
  private tarjeta: string;
  private eventoTarjetaMatriculaNoCoinciden = 9;
  private decisionAceptar = 1;
  private decisionNoDescargar = 2;
  fotoChasis: String;
  fotoAcoplado: String;
  constructor(
    private readonly fb: FormBuilder,
    private readonly service: ResolverEventoService,
    private readonly fcService: FormComponentService,
    private readonly popupService: PopupService,
    private readonly navigationService: NavigationService) { }

  ngOnInit() {
    this.createForm();
    this.getInfo();
  }

  private getInfo(): void {
    this.service.get(this.command.pathArchestra)
    .subscribe((datos: ResolverEventoTarjetaPatenteNoCoincidenDataView) => {
      this.llenarCampos(datos);
      this.fotoChasis = datos.fotoChasis;
      this.fotoAcoplado = datos.fotoAcoplado;
      this.fcService.setValue('nuevaMatricula', '', { onlySelf: true });
    });
  }

  private createForm() {
    this.form = this.fb.group({
      planta: { value: '', disabled: true },
      nombreBalanza: { value: '', disabled: true },
      matriculaCapturada: { value: '', disabled: true },
      pesoCapturado: { value: '', disabled: true },
      nuevaMatricula: { value: '' },
      observaciones: {value: ''},
      fotoChasis: {value: ''},
    });
    this.fcService.initialize(this.form);
  }

  aceptarClick(): void {
    const parametros = new Array<ResolverEventoParametro>();
    parametros.push(new ResolverEventoParametro('patente', this.fcService.getValue('nuevaMatricula')));
    this.command.idEvento = this.eventoTarjetaMatriculaNoCoinciden;
    this.command.decision = this.decisionAceptar;
    this.command.parametros = parametros;

    this.service.resolver(this.command).subscribe(() => {
      this.popupService.success('OK');
      this.getInfo();
      this.cerrarPopUp.emit();
    });
  }

  cancelarClick(): void {
    this.fcService.setValue('nuevaMatricula', '', { onlySelf: true });
    this.navigationService.navigateBack();
  }

  noDescargarClick(): void {
    const parametros = new Array<ResolverEventoParametro>();
    parametros.push(new ResolverEventoParametro('patente', this.fcService.getValue('matriculaCapturada')));
    parametros.push(new ResolverEventoParametro('tarjeta', this.tarjeta));

    this.command.idEvento = this.eventoTarjetaMatriculaNoCoinciden;
    this.command.decision = this.decisionNoDescargar;
    this.command.parametros = parametros;
    this.service.resolver(this.command).subscribe(() => {
      this.cerrarPopUp.emit();
    }, () => {
      this.popupService.error('Se ha producido un error');
    });
  }

  private llenarCampos(datos: ResolverEventoTarjetaPatenteNoCoincidenDataView) {
    this.tarjeta = datos.tarjeta;
    this.fcService.setValue('planta', datos.planta, { onlySelf: true });
    this.fcService.setValue('matriculaCapturada', datos.matriculaCapturada, { onlySelf: true });
    this.fcService.setValue('pesoCapturado', datos.pesoCapturado, { onlySelf: true });
    this.fcService.setValue('nombreBalanza', datos.nombreBalanza, { onlySelf: true });
    this.fcService.setValue('observaciones', datos.observaciones, { onlySelf: true });
  }
}
