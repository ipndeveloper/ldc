import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Resources } from '../../../../../locale/artifacts/resources';
import { ModalAgregarDestinatarioComponent } from './modal-agregar-destinatario/modal-agregar-destinatario.component';
import { DestinatarioDataView } from '../../../../shared/data-models/mail-template-data-view';
import { TiposDestinatario } from '../../../../shared/enums/enums';
import { PopupService } from '../../../../core/services/popupService/popup.service';

@Component({
  selector: 'yrd-datos-destinatarios',
  templateUrl: './datos-destinatarios.component.html',
  styleUrls: ['./datos-destinatarios.component.css']
})
export class DatosDestinatariosComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() disableActions = false;
  @Input() esConsulta = false;
  @ViewChild('modalDestinatario') modalAgregarDestinatarioComponent: ModalAgregarDestinatarioComponent;
  @ViewChild('selectDestinatarioCellTemplate') selectDestinatarioCellTemplate: TemplateRef<any>;
  columns: any;
  rows: any;
  selectedRows: any = [];
  destintarioSiendoEditando: any = null;

  constructor(private readonly fb: FormBuilder,
              private readonly popupService: PopupService) { }

  get destinatarios(): FormArray {
    return this.form.controls.destinatarios as FormArray;
  }

  ngOnInit() {
    this.setGridColumns();
  }

  private setGridColumns() {
    this.columns = [
      {
        prop: 'selected',
        name: '',
        sortable: false,
        canAutoResize: false,
        draggable: false,
        resizable: false,
        cellTemplate: this.selectDestinatarioCellTemplate,
        width: 30,
      },
      {
        name: Resources.Labels.Tipo,
        prop: 'value.nombreTipoDestinatario'
      },
      {
        name: Resources.Labels.Descripcion,
        prop: 'value.descripcion'
      }
    ];
  }

  onAgregar() {
    this.modalAgregarDestinatarioComponent.open();
    this.disableActions = true;
  }

  onAcceptedDestinatario() {
    if (this.destinatarioValido()) {
      this.disableActions = false;
      if (this.destintarioSiendoEditando) {
        this.destintarioSiendoEditando = null;
        this.eliminarDestinatariosSeleccionados();
      }
      this.destinatarios.push(this.createDestinatario(this.form.controls.datosModalDestinatario.value));
      this.refreshGrid();
      this.modalAgregarDestinatarioComponent.close();
    } else {
      this.popupService.error(Resources.Messages.ElDestinatarioQueIntentaIngresarYaSeEncuentraConfigurado);
    }
  }

  onClosingDestinatario() {
    this.disableActions = false;
    this.destintarioSiendoEditando = null;
  }

  private destinatarioValido(): boolean {
    const dest = (this.form.controls.datosModalDestinatario as FormGroup).getRawValue();
    if (!this.destintarioSiendoEditando || !this.destintarioSiendoEditandoIgualA(dest)) {
      const tipo = dest.idTipo || dest.tipo.id;
      if (tipo === TiposDestinatario.Mail) {
        return !this.destinatarios.getRawValue().some(d => d.mail === dest.mail);
      } else if (tipo === TiposDestinatario.Rol) {
        return !this.destinatarios.getRawValue().some(d => d.rol && d.rol.id === dest.rol.id);
      } else if (tipo === TiposDestinatario.Usuario) {
        return !this.destinatarios.getRawValue().some(d => d.usuario && d.usuario.id === dest.usuario.id);
      }
    }
    return true;
  }

  private destintarioSiendoEditandoIgualA(dest: any): boolean {
    const tipoIgual = (this.destintarioSiendoEditando.idTipo || this.destintarioSiendoEditando.tipo.id) === (dest.idTipo || dest.tipo.id);
    const mailIgual = this.destintarioSiendoEditando.mail === dest.mail;
    const rolIgual = (this.destintarioSiendoEditando.rol && this.destintarioSiendoEditando.rol.id) === (dest.rol && dest.rol.id);
    const usuarioIgual = (this.destintarioSiendoEditando.usuario && this.destintarioSiendoEditando.usuario.id)
                          === (dest.usuario && dest.usuario.id);

    return tipoIgual && mailIgual && rolIgual && usuarioIgual;
  }

  private createDestinatario(destinatario: any) {
    const descripcion = this.obtenerDescripcion(destinatario);
    const nombreTipoDestinatario = this.obtenerNombreTipoDestinatario(destinatario);

    return this.fb.group({
      id: destinatario.id,
      idTipo: destinatario.idTipo || destinatario.tipo.id,
      nombreTipoDestinatario,
      rol: destinatario.rol,
      usuario: destinatario.usuario,
      mail: destinatario.mail,
      descripcion
    });
  }

  private obtenerDescripcion(destinatario: any) {
    let descripcion = '';
    if (destinatario.rol) {
      descripcion = destinatario.rol.descripcion;
    } else if (destinatario.usuario) {
      descripcion = destinatario.usuario.descripcion;
    } else {
      descripcion = destinatario.mail;
    }
    return descripcion;
  }

  private obtenerNombreTipoDestinatario(destinatario: any) {
    let nombreTipoDestinatario = '';
    if (destinatario.tipo) {
      nombreTipoDestinatario = destinatario.tipo.descripcion;
    } else {
      if (destinatario.idTipo === 1) {
        nombreTipoDestinatario = 'Rol';
      } else if (destinatario.idTipo === 2) {
        nombreTipoDestinatario = 'Usuario';
      } else {
        nombreTipoDestinatario = 'Mail';
      }
    }
    return nombreTipoDestinatario;
  }

  onSelect(rows: any) {
    this.selectedRows = rows.selected;
  }

  onEliminar() {
    this.eliminarDestinatariosSeleccionados();
    this.refreshGrid();
  }

  onModificar() {
    this.destintarioSiendoEditando = this.selectedRows[0].value;
    this.modalAgregarDestinatarioComponent.modificar(this.selectedRows[0].value);
  }

  eliminarDestinatariosSeleccionados() {
    this.selectedRows.forEach((row: any) => {
      const destinatarioAEliminar = this.destinatarios.controls
        .find(m => m.value.nombreTipoDestinatario === row.value.nombreTipoDestinatario &&
                   m.value.descripcion === row.value.descripcion);
      if (destinatarioAEliminar) {
        const rowIndex = this.destinatarios.controls.indexOf(destinatarioAEliminar);
        if (rowIndex >= -1) {
          this.destinatarios.controls.splice(rowIndex, 1);
        }
      }
    });
  }

  refreshGrid() {
    this.selectedRows = [];
    this.rows = [...this.destinatarios.controls];
  }

  setDestinatarios(destinatarios: DestinatarioDataView[]): any {
    destinatarios.forEach((d: DestinatarioDataView) => {
      this.destinatarios.push(this.createDestinatario(d));
    });
    this.refreshGrid();
  }
}
