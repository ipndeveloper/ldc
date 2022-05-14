import { Component, OnInit, ViewChild, Input, ElementRef, TemplateRef } from '@angular/core';
import { SearchComponent } from '../../core/shared/super/search.component';
import { Usuario } from '../data-models/usuario';
import { PopupService } from '../../core/services/popupService/popup.service';
import { FormBuilder, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UsuarioService } from './usuario.service';
import { Resources } from '../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-buscador-usuario',
  templateUrl: './buscador-usuario.component.html',
  styleUrls: ['./buscador-usuario.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: BuscadorUsuarioComponent }
  ]
})
export class BuscadorUsuarioComponent extends SearchComponent<Usuario> implements OnInit {

  @ViewChild('inputUsuario') inputElement: ElementRef;
  @ViewChild('selectCellTemplate') selectCellTemplate: TemplateRef<any>;

  @Input() etiqueta = 'Usuario';
  @Input() control: FormControl;

  constructor(protected usuarioService: UsuarioService,
              popupService: PopupService,
              private readonly fb: FormBuilder) {
    super(usuarioService, popupService);
  }

  ngOnInit() {
    this.baseElement = this.inputElement;

    this.advancedSearchForm = this.fb.group({
      nombre: ''
    });

    this.columns = [
      {
        prop: 'selected',
        name: '',
        sortable: false,
        canAutoResize: false,
        draggable: false,
        resizable: false,
        cellTemplate: this.selectCellTemplate,
        width: 30,
      },
      {
        name: Resources.Labels.Usuario,
        prop: 'nombreAD'
      },
      {
        name: Resources.Labels.Apellido,
        prop: 'apellido'
      },
      {
        name: Resources.Labels.Nombre,
        prop: 'nombre'
      }
    ];

    this.subscribeToAdvancedSearchFormChanges('nombre', 'nombre');
  }

  protected callServiceByCode(value: string) {
    return this.usuarioService.getByNombreUsuario(value);
  }
}
