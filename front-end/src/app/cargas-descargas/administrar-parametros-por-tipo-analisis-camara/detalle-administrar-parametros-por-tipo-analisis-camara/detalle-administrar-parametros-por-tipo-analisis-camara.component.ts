import { Component, Input, ViewChild, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Resources } from '../../../../locale/artifacts/resources';
import { Terminal } from '../../../shared/data-models/terminal';
import { Producto } from '../../../shared/data-models/producto';
import { Permission } from '../../../shared/enums/enums';
import { GrupoRubroCalidadAnalisis } from '../../../shared/data-models/grupo-rubro-calidad-analisis';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DesplegableTerminalComponent } from '../../../shared/desplegable-terminal/desplegable-terminal.component';

@Component({
  selector: 'yrd-detalle-administrar-parametros-por-tipo-analisis-camara',
  templateUrl: './detalle-administrar-parametros-por-tipo-analisis-camara.component.html',
  styleUrls: ['./detalle-administrar-parametros-por-tipo-analisis-camara.component.css']
})
export class DetalleAdministrarParametrosPorTipoAnalisisCamaraComponent implements OnInit, OnDestroy {
  @Input() form: FormGroup;
  @Input() esModificacion = false;
  @ViewChild('checkboxEsEspecial') checkboxEsEspecial: ElementRef;
  @ViewChild('terminal') desplegableTerminal: DesplegableTerminalComponent;

  onDestroy: Subject<Boolean> = new Subject();
  terminalSeleccionada?: Terminal;
  productoSeleccionado?: Producto;
  entidadSeleccionada?: GrupoRubroCalidadAnalisis;
  readonly Permission = Permission;
  readonly validationMessagesTerminal = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Terminal)
  };
  readonly validationMessagesProducto = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Producto)
  };
  readonly validationMessagesTipoAnalisis = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.TipoAnalisis)
  };
  readonly validationMessagesEsEspecial = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.EsEspecial)
  };
  readonly validationMessagesCodigoCamara = {
    min: Resources.Messages.SeDebeIngresarUnValorMayorA.format('0')
  };

  constructor() {
  }

  ngOnInit(): void {
    this.form.controls.terminal.valueChanges.pipe(
      distinctUntilChanged(),
      takeUntil(this.onDestroy)
    ).subscribe((terminal: Terminal) => {
      this.terminalSeleccionada = terminal;
    });
    this.form.controls.producto.valueChanges.pipe(
      distinctUntilChanged(),
      takeUntil(this.onDestroy)
    ).subscribe((producto: Producto) => {
      this.productoSeleccionado = producto;
    });
    this.form.controls.tipoAnalisis.valueChanges.pipe(
      distinctUntilChanged(),
      takeUntil(this.onDestroy)
    ).subscribe((tipoAnalisis: GrupoRubroCalidadAnalisis) => {
      this.entidadSeleccionada = tipoAnalisis;
    });
  }

  ngOnDestroy() {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }

  setFocus(): void {
    if (this.esModificacion) {
      setTimeout(() => this.checkboxEsEspecial.nativeElement.focus(), 0);
    } else {
      setTimeout(() => this.desplegableTerminal.setFocus(), 0);
    }
  }
}
