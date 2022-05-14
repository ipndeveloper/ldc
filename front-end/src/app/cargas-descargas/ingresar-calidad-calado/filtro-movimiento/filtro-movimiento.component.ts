import {Component, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresarCalidadCaladoService } from '../ingresar-calidad-calado.service';
import { MovimientoCalado } from '../../../shared/data-models/movimiento-calado';
import { AutocompletePatenteComponent } from '../../../shared/autocomplete-patente/autocomplete-patente.component';
import { Resources } from '../../../../locale/artifacts/resources';
import { AutocompleteVagonComponent } from '../../../shared/autocomplete-vagon/autocomplete-vagon.component';
import { AuthService } from '../../../../app/core/services/session/auth.service';
import { LecturaTarjetaComponent } from '../../shared/lectura-tarjeta/lectura-tarjeta.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'yrd-filtro-movimiento',
  templateUrl: './filtro-movimiento.component.html',
  styleUrls: ['./filtro-movimiento.component.css']
})
export class FiltroMovimientoComponent implements OnDestroy {

  @Input() filtroMovimientoForm: FormGroup;
  @Input() esVagon: boolean;
  @Output() movimientoRecuperado = new EventEmitter<MovimientoCalado>();
  @ViewChild('autocompletePatente') autocompletePatente: AutocompletePatenteComponent;
  @ViewChild('autocompleteVagon') autocompleteVagon: AutocompleteVagonComponent;
  @ViewChild('tarjeta') tarjeta: LecturaTarjetaComponent;
  @Input() esModificacion = false;

  private readonly terminalUtilizaTarjeta: boolean;
  private onDestroy = new Subject();

  validationMessagesTarjeta = {
    required: Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.Tarjeta)
  };

  validationMessagesPatenteCamion = {
    required: Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.PatenteCamion)
  };

  validationMessagesNumeroVagon = {
    required: Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.NumeroDeVagon)
  };

  constructor(
    private readonly ingresarCalidadCaladoService: IngresarCalidadCaladoService,
    authService: AuthService) {

      const userContext = authService.getUserContext();
      if (userContext) {
        this.terminalUtilizaTarjeta = userContext.terminal.utilizaTarjeta;
      }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  getMovimientoCalado() {
    const patenteCamionControl = this.filtroMovimientoForm.get('patenteCamion');
    const numeroVagonControl = this.filtroMovimientoForm.get('numeroVagon');
    const tarjetaControl = this.filtroMovimientoForm.get('tarjeta');

    if (patenteCamionControl && tarjetaControl && numeroVagonControl) {
        this.setValidators(patenteCamionControl as FormControl, numeroVagonControl as FormControl, tarjetaControl as FormControl);
        this.validate(patenteCamionControl as FormControl, numeroVagonControl as FormControl, tarjetaControl as FormControl);
      if (patenteCamionControl.valid && numeroVagonControl.valid && (tarjetaControl.disabled || tarjetaControl.valid)) {
        this.ingresarCalidadCaladoService.getMovimientoCalado(patenteCamionControl.value, numeroVagonControl.value, tarjetaControl.value)
          .pipe(takeUntil(this.onDestroy))
          .subscribe(datos => {
            if (!datos) {
              tarjetaControl.setValue('', { onlySelf: true });
              this.tarjeta.setFocus();
            }
            this.movimientoRecuperado.emit(datos);
          }, () => {
            tarjetaControl.setValue('', { onlySelf: true });
            this.tarjeta.setFocus();
          });
      }

      this.clearValidators(patenteCamionControl as FormControl, numeroVagonControl as FormControl, tarjetaControl as FormControl);
    }
  }

  private setValidators(patenteCamionControl: FormControl, numeroVagonControl: FormControl, tarjetaControl: FormControl): void {
    if (this.esVagon) {
      numeroVagonControl.setValidators(Validators.required);
    } else {
      patenteCamionControl.setValidators(Validators.required);
    }
    if (tarjetaControl.disabled) {
      tarjetaControl.setValidators(Validators.required);
    }
  }

  private validate(patenteCamionControl: FormControl, numeroVagonControl: FormControl, tarjetaControl: FormControl) {
    patenteCamionControl.markAsTouched();
    if (tarjetaControl.disabled) {
      tarjetaControl.markAsTouched();
    }
    numeroVagonControl.markAsTouched();
    patenteCamionControl.updateValueAndValidity();
    tarjetaControl.updateValueAndValidity();
    numeroVagonControl.updateValueAndValidity();
  }

  private clearValidators(patenteCamionControl: FormControl, numeroVagonControl: FormControl, tarjetaControl: FormControl) {
    patenteCamionControl.clearValidators();
    numeroVagonControl.clearValidators();
    tarjetaControl.clearValidators();
  }

  setFocus() {
    setTimeout(() => {
      if (this.autocompletePatente) {
        this.autocompletePatente.setFocus();
      }
      if (this.autocompleteVagon) {
        this.autocompleteVagon.setFocus();
      }
    }, 0);
  }

  onTarjetaLeida() {
    if (this.terminalUtilizaTarjeta) {
      if (this.filtroMovimientoForm.controls.tarjeta.value) {
        if (!this.filtroMovimientoForm.controls.patenteCamion.value &&
            !this.filtroMovimientoForm.controls.numeroVagon.value) {
          this.filtroMovimientoForm.controls.tarjeta.setValue('');
          if (this.autocompletePatente) {
            this.autocompletePatente.setFocus();
          }
          if (this.autocompleteVagon) {
            this.autocompleteVagon.setFocus();
          }
        } else {
          this.getMovimientoCalado();
        }
      } else {
        this.tarjeta.setFocus();
      }
    } else {
      this.getMovimientoCalado();
    }
  }

  get botonBuscarDeshabilitado(): boolean {

    return this.filtroMovimientoForm.disabled || this.terminalUtilizaTarjeta;
  }
}
