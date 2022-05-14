import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { LecturaTarjetaService } from '../shared/services/lectura-tarjeta.service';
import { LecturaTarjetaEnAutomaticoDataView } from '../../shared/data-models/lectura-tarjeta-en-automatico-data-view';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { Resources } from '../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-testeo-tarjeta',
  templateUrl: './testeo-tarjeta.component.html',
  styleUrls: ['./testeo-tarjeta.component.css']
})

export class TesteoTarjetaComponent implements OnInit, AfterViewInit {

  @ViewChild('nuevaLectura') nuevaLectura: ElementRef;
  formTesteoTarjeta: FormGroup;
  prefijoPrimerKeycode: number;
  prefijoSegundoKeycode: number;
  sufijo: number;
  primerPrefijoLeido: boolean | null = null;
  segundoPrefijoLeido: boolean | null = null;
  sufijoLeido: boolean | null = null;
  tarjetaEscrita: string;
  numeroTarjeta: string;
  DLE_KEYCODE = 16;
  posicion: number;
  leyendo = false;
  mensajeInformativo = '';

  constructor(private readonly fb: FormBuilder,
              private readonly fcService: FormComponentService,
              private readonly lecturaTarjetaService: LecturaTarjetaService) {
  }

  ngOnInit(): void {
    this.createForm();
    this.fcService.initialize(this.formTesteoTarjeta);
    this.lecturaTarjetaService.consultarModoLecturaTarjeta()
        .subscribe((propiedadesTarjeta: LecturaTarjetaEnAutomaticoDataView) => {
          this.sufijo = propiedadesTarjeta.sufijoKeycode;
          this.prefijoPrimerKeycode = propiedadesTarjeta.prefijoPrimerKeycode;
          this.prefijoSegundoKeycode = propiedadesTarjeta.prefijoSegundoKeycode;
          this.fcService.setValue('primerPrefijo', `${this.prefijoPrimerKeycode} [${String.fromCharCode(this.prefijoPrimerKeycode)}]`);
          this.fcService.setValue('segundoPrefijo', `${this.prefijoSegundoKeycode} [${String.fromCharCode(this.prefijoSegundoKeycode)}]`);
          if (this.sufijo === 9) {
            this.fcService.setValue('sufijo',  `${this.sufijo} [TAB]`);
          } else {
            this.fcService.setValue('sufijo',  `${this.sufijo} [${String.fromCharCode(this.sufijo)}]`);
          }
        });
  }

  ngAfterViewInit(): void {
    this.setButtonFocus();
  }

  private createForm(): void {
    this.formTesteoTarjeta = this.fb.group({
      primerPrefijo: { value: '', disabled: true },
      segundoPrefijo: { value: '', disabled: true },
      sufijo: { value: '', disabled: true },
      lecturaCompleta: { value: '', disabled: true },
      tarjetaLeida: { value: '', disabled: true }
    });
  }

  private cambiarMensaje(leido: boolean): string {
    return  leido ? Resources.Messages.TarjetaLeida : Resources.Messages.DesliceTarjetaLector;
  }

  private setButtonFocus(): void {
    setTimeout(() => this.nuevaLectura.nativeElement.focus(), 0);
  }

  @HostListener(':keydown', ['$event'])
  onkeydown(event: KeyboardEvent): void {
    // tslint:disable:deprecation
    const keycode = event.keyCode || event.which;
    // Se ignora el Data Link Escape ya que LDC tiene dos DLE antes de cada prefijo
    if (keycode !== this.DLE_KEYCODE) {
      this.tarjetaEscrita += event.key.toUpperCase();
      this.posicion += 1;
      if (keycode === this.sufijo) {
        this.sufijoLeido = true;
        this.fcService.setValue('lecturaCompleta', this.tarjetaEscrita);
        this.mensajeInformativo = this.cambiarMensaje(true);
      } else if (keycode === this.prefijoPrimerKeycode && !this.primerPrefijoLeido && this.posicion === 1) {
        this.primerPrefijoLeido = true;
      } else if (keycode === this.prefijoSegundoKeycode && this.primerPrefijoLeido
                  && !this.segundoPrefijoLeido && this.posicion === 2) {
        this.segundoPrefijoLeido = true;
      } else if (this.primerPrefijoLeido && this.segundoPrefijoLeido) {
        this.numeroTarjeta += event.key.toUpperCase();
        this.fcService.setValue('tarjetaLeida', this.numeroTarjeta);
      }
    }
  }

  limpiar(): void {
    this.primerPrefijoLeido = false;
    this.segundoPrefijoLeido = false;
    this.sufijoLeido = false;
    this.fcService.setValue('tarjetaLeida', '');
    this.fcService.setValue('lecturaCompleta', '');
    this.tarjetaEscrita = '';
    this.numeroTarjeta = '';
    this.posicion = 0;
    this.mensajeInformativo = this.cambiarMensaje(false);
    this.setButtonFocus();
  }
}
