import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TextoConEtiquetaComponent } from '../../../core/controls/texto-con-etiqueta/texto-con-etiqueta.component';

@Component({
  selector: 'yrd-filtro-administrar-tiempo-limite-estado',
  templateUrl: './filtro-administrar-tiempo-limite-estado.component.html',
  styleUrls: ['./filtro-administrar-tiempo-limite-estado.component.css']
})
export class FiltroAdministrarTiempoLimiteEstadoComponent {

  @Input() form: FormGroup;
  @ViewChild('estado') estado: TextoConEtiquetaComponent;

  constructor() {
  }

  setFocus(): void {
    setTimeout(() => this.estado.setFocus(), 0);
  }
}
