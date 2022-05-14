import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Resources } from '../../../../../locale/artifacts/resources';
import { AutocompleteSedeService } from '../../../shared/services/autocomplete-sede.service';

@Component({
  selector: 'yrd-datos-ldc-datos-documento',
  templateUrl: './datos-ldc-datos-documento.component.html',
  styleUrls: ['./datos-ldc-datos-documento.component.css']
})
export class DatosLdcDatosDocumentoComponent {

  @Input() form: FormGroup;
  @Input() autocompleteSedeOrigenService: AutocompleteSedeService;
  @Input() autocompleteSedeDestinoService: AutocompleteSedeService;

  readonly validationMessagesSedeOrigen = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.SedeOrigen)
  };

  readonly validationMessagesSedeDestino = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.SedeDestino)
  };

  constructor() { }

}
