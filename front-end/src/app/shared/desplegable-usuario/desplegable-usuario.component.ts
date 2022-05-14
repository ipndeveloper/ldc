import { Component } from '@angular/core';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../data-models/usuario';

@Component({
  selector: 'yrd-desplegable-usuario',
  templateUrl: './desplegable-usuario.component.html',
  styleUrls: ['./desplegable-usuario.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableUsuarioComponent }
  ]
})
export class DesplegableUsuarioComponent extends DropdownComponent<Usuario> {

  constructor(service: UsuarioService) {
    super(service);
  }
}

