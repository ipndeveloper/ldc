import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { BuscadorTitularComponent } from '../../shared/buscador-titular/buscador-titular.component';
import { NumeroConEtiquetaComponent } from '../../core/controls/numero-con-etiqueta/numero-con-etiqueta.component';
import { AdministrarParametrosPorSociedadService } from './administrar-parametros-por-sociedad.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Resources } from '../../../locale/artifacts/resources';
import { Collection } from '../../core/models/collection';
import { ParametrosSociedad } from '../../shared/data-models/parametros-sociedad';
import { ModificarParametrosPorSociedadCommand } from '../../shared/data-models/commands/cargas-descargas/modificar-parametros-por-sociedad-command';

@Component({
  selector: 'yrd-administrar-parametros-por-sociedad',
  templateUrl: './administrar-parametros-por-sociedad.component.html',
  styleUrls: ['./administrar-parametros-por-sociedad.component.css']
})
export class AdministrarParametrosPorSociedadComponent implements OnInit {

  form: FormGroup;
  disableFiltros = true;

  validationMessagesSociedad = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Sociedad)
  };

  private readonly fcFiltros: FormComponentService;
  private readonly fcDetalle: FormComponentService;

  get formFiltros(): FormGroup {
    return this.form.controls.filtros as FormGroup;
  }
  get formDetalle(): FormGroup {
    return this.form.controls.detalle as FormGroup;
  }

  @ViewChild('sociedad') sociedad: BuscadorTitularComponent;
  @ViewChild('sucursalDeEnvioACamara') sucursalDeEnvioACamara: NumeroConEtiquetaComponent;

  constructor(private readonly service: AdministrarParametrosPorSociedadService,
              private readonly fb: FormBuilder,
              private readonly popupService: PopupService) {
    this.fcDetalle = new FormComponentService(this.popupService);
    this.fcFiltros = new FormComponentService(this.popupService);
  }

  ngOnInit() {
    this.createForm();
    this.toggleFiltrosDetalle();
    this.setFocusFiltro();
  }

  private setFocusFiltro(): void {
    setTimeout(() => {
      this.sociedad.setFocus();
    }, 0);
  }

  private setFocusDetalle(): void {
    setTimeout(() => {
      this.sucursalDeEnvioACamara.setFocus();
    }, 0);
  }

  private createForm(): void {
    this.form = this.fb.group({
      filtros: this.fb.group({
        sociedad: [{value: '', disabled: false}, Validators.required]
      }),
      detalle: this.fb.group({
        codigoSucursalEnvioCamara: '',
        esFerrocarril: '',
        debeEnviarCodigoACamara: ''
      })
    });

    this.fcFiltros.initialize(this.form.controls.filtros as FormGroup);
    this.fcDetalle.initialize(this.form.controls.detalle as FormGroup);
  }

  private disableGroup(accessor: string, disable: boolean) {
    const group = this.form.get(accessor);
    if (group) {
      if (disable) {
        group.disable();
      } else {
        group.enable();
      }
    }
  }

  private toggleFiltrosDetalle() {
    this.disableFiltros = !this.disableFiltros;
    this.disableGroup('filtros', this.disableFiltros);
    this.disableGroup('detalle', !this.disableFiltros);
  }

  onBuscar(): void {
    if (this.fcFiltros.isValidForm()) {
      this.service.buscarParametros(+this.fcFiltros.getValue('sociedad'))
        .subscribe((parametros: ParametrosSociedad) => {
          this.toggleFiltrosDetalle();
          this.fillControls(parametros);
          this.setFocusDetalle();
        });
    } else {
      const errors = new Collection<string>();
      this.fcFiltros.validateForm(this.formFiltros.controls, errors, '');
      this.fcFiltros.showValidationError(errors);
    }
  }

  private fillControls(parametros: ParametrosSociedad) {
    this.fcDetalle.setValue('codigoSucursalEnvioCamara', parametros.codigoSucursalEnvioCamara, { onlySelf: true });
    this.fcDetalle.setValue('esFerrocarril', parametros.esFerrocarril, { onlySelf: true });
    this.fcDetalle.setValue('debeEnviarCodigoACamara', parametros.debeEnviarCodigoACamara, { onlySelf: true });
  }

  onCancelar(): void {
    this.form.reset();
    this.toggleFiltrosDetalle();
    this.setFocusFiltro();
  }

  onAceptar(): void {
    if (this.fcDetalle.isValidForm()) {
      const command = this.construirCommand();
      this.service.modificarParametros(command).subscribe((_: void) => {
        this.popupService.success(Resources.Messages.LaEdicionDeLosParametrosDeXFueGuardadaConExito.format(Resources.Labels.Sociedad));
        this.onCancelar();
      });
    } else {
      const errors = new Collection<string>();
      this.fcFiltros.validateForm(this.formDetalle.controls, errors, '');
      this.fcFiltros.showValidationError(errors);
    }
  }

  private construirCommand(): ModificarParametrosPorSociedadCommand {
    const command = new ModificarParametrosPorSociedadCommand();
    command.id = this.fcFiltros.getValue('sociedad');
    command.codigoSucursalEnvioCamara = this.fcDetalle.getValue('codigoSucursalEnvioCamara');
    command.esFerrocarril = this.fcDetalle.getValue('esFerrocarril');
    command.debeEnviarCodigoACamara = this.fcDetalle.getValue('debeEnviarCodigoACamara');
    return command;
  }

}
