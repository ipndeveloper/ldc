import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { AutocompletePatenteComponent } from '../../../shared/autocomplete-patente/autocomplete-patente.component';
import { LecturaTarjetaComponent } from '../../shared/lectura-tarjeta/lectura-tarjeta.component';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { Resources } from '../../../../locale/artifacts/resources';
import { AuthService } from '../../../core/services/session/auth.service';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { Collection } from '../../../core/models/collection';

@Component({
  selector: 'yrd-filtro-reembolso-tasa-municipal',
  templateUrl: './filtro-reembolso-tasa-municipal.component.html',
  styleUrls: ['./filtro-reembolso-tasa-municipal.component.css']
})
export class FiltroReembolsoTasaMunicipalComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() maskRegex: Array<any>;
  @Output() buscarClicked = new EventEmitter();
  @ViewChild('autocompletePatente') autocompletePatente: AutocompletePatenteComponent;
  @ViewChild('tarjeta') tarjeta: LecturaTarjetaComponent;

  private readonly terminalUtilizaTarjeta: boolean;
  private readonly fcService: FormComponentService;

  readonly validationMessagesPatenteCamion = {
    required: Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.PatenteCamion),
    minlength: Resources.Messages.DebeIngresarAlMenosXCaracteres.format('3')
  };


  readonly validationMessagesTipoDocumentoPorte = {
    required: Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.TipoDocumentoPorte)
  };

  readonly validationMessagesNroPorte = {
    required: Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.NumeroDocumentoPorte),
    minlength: Resources.Messages.ElCampoNroDocPorteFormato
  };

  get botonBuscarDeshabilitado(): boolean {
    return this.form.disabled || this.terminalUtilizaTarjeta;
  }

  constructor(private readonly authService: AuthService,
    private readonly popupService: PopupService) {
      const userContext = this.authService.getUserContext();
      if (userContext) {
        this.terminalUtilizaTarjeta = userContext.terminal.utilizaTarjeta;
      }
      this.fcService = new FormComponentService(this.popupService);
    }

  ngOnInit(): void {
    this.fcService.initialize(this.form);
    this.setValidatorsTarjeta();
    this.setFocusPatente();
  }

  private setValidatorsTarjeta(): void {
    const tarjetaControl = this.fcService.getControl('tarjeta');
    if (tarjetaControl && this.terminalUtilizaTarjeta) {
      tarjetaControl.setValidators(Validators.required);
    }
  }

  private setFocusPatente(): void {
    setTimeout(() => {
      if (this.autocompletePatente) {
        this.autocompletePatente.setFocus();
      }
    }, 0);
  }

  onTarjetaLeida(): void {
    const tarjeta = this.fcService.getValue('tarjeta');
    const patente = this.fcService.getValue('patenteCamion');
    if (this.terminalUtilizaTarjeta) {
      if (tarjeta) {
        if (!patente) {
          this.fcService.setValue('tarjeta', '', {onlyself: true});
          this.setFocusPatente();
        } else {
          this.onClickBuscar();
        }
      } else {
        this.setFocusTarjeta();
      }
    } else {
      this.onClickBuscar();
    }
  }

  onClickBuscar(): void {
    if (this.fcService.isValidForm()) {
      this.buscarClicked.emit();
    } else {
      const errors = new Collection<string>();
      this.fcService.validateForm(this.form.controls, errors, '');
      this.fcService.showValidationError(errors);
      this.setFocusPatente();
    }
  }

  private setFocusTarjeta(): void {
    setTimeout(() => {
      if (this.tarjeta) {
        this.tarjeta.setFocus();
      }
    }, 0);
  }

  setEnableFiltroBusqueda(enable: boolean): void {
    if (this.form) {
      enable ? this.form.enable() : this.form.disable();
    }
  }

}
