import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'yrd-codigo-tarjeta-con-etiqueta',
  templateUrl: './codigo-tarjeta-con-etiqueta.component.html',
  styleUrls: ['./codigo-tarjeta-con-etiqueta.component.css']
})
export class CodigoTarjetaConEtiquetaComponent {

  @Input() form: FormGroup;
  @Input() etiqueta = 'Ingrese etiqueta';
  @Input() idForm: string;
  @Input() validationMessagesNumero: { [key: string]: string };

   readonly maskRegex: Array<any> = [/[/^A-Za-z0-9/]+/, /[/^A-Za-z0-9/]+/, /[/^A-Za-z0-9/]+/];

  constructor() {
  }

}
