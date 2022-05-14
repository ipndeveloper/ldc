import { Component, Input, ViewChild, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Resources } from '../../../../locale/artifacts/resources';
import { TextoConEtiquetaComponent } from '../../../core/controls/texto-con-etiqueta/texto-con-etiqueta.component';
import { ModalAgregarRolTerminalComponent } from './modal-agregar-rol-terminal/modal-agregar-rol-terminal.component';
import { Subject } from 'rxjs';
import { RolTerminalDataView, ImpresoraUsuarioDataView } from '../../../shared/data-models/usuario-data-view';
import { ModalAgregarImpresoraComponent } from './modal-agregar-impresora/modal-agregar-impresora.component';

@Component({
  selector: 'yrd-detalle-administrar-usuarios',
  templateUrl: './detalle-administrar-usuarios.component.html',
  styleUrls: ['./detalle-administrar-usuarios.component.css']
})
export class DetalleAdministrarUsuariosComponent implements OnInit, OnDestroy {

  @Input() form: FormGroup;
  @Input() disableActions = false;
  @Input() esConsulta = false;
  @Input() esModificacion = false;
  @Input() isLoading = false;
  @Input() buscandoEnAD = false;
  @ViewChild('nombreAD') nombreAD: TextoConEtiquetaComponent;
  @ViewChild('selectRolesTerminalCellTemplate') selectRolesTerminalCellTemplate: TemplateRef<any>;
  @ViewChild('modalRolTerminal') modalRolTerminal: ModalAgregarRolTerminalComponent;
  @ViewChild('modalImpresora') modalImpresora: ModalAgregarImpresoraComponent;

  columns: any;
  rows: any;
  selectedRows: any = [];
  rolTerminalSiendoEditando: RolTerminalDataView | null = null;

  columnsImpresoras: any;
  rowsImpresoras: any;
  selectedRowsImpresoras: any = [];
  impresoraSiendoEditando: ImpresoraUsuarioDataView | null = null;

  private readonly onDestroy = new Subject();

  get rolesTerminal(): FormArray {
    return this.form.controls.rolesTerminal as FormArray;
  }

  get impresoras(): FormArray {
    return this.form.controls.impresoras as FormArray;
  }

  validationMessagesNombreAD = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.NombreAD)
  };
  validationMessagesMail = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Mail),
    pattern: Resources.Messages.FormatoDelCampoXIncorrecto.format(Resources.Labels.Mail)
  };

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit() {
    this.setGridColumns();
  }

  refreshGrid() {
    this.selectedRows = [];
    this.selectedRowsImpresoras = [];
    this.rows = [...this.rolesTerminal.controls];
    this.rowsImpresoras = [...this.impresoras.controls];
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
        cellTemplate: this.selectRolesTerminalCellTemplate,
        width: 30,
      },
      {
        name: Resources.Labels.Terminal,
        prop: 'value.terminal.descripcion'
      },
      {
        name: Resources.Labels.Rol,
        prop: 'value.rol.descripcion'
      },
      {
        name: Resources.Labels.Habilitado,
        prop: 'value.estaHabilitado'
      }
    ];
    this.columnsImpresoras = [
      {
        prop: 'selected',
        name: '',
        sortable: false,
        canAutoResize: false,
        draggable: false,
        resizable: false,
        cellTemplate: this.selectRolesTerminalCellTemplate,
        width: 30,
      },
      {
        name: Resources.Labels.Impresora,
        prop: 'value.impresora.descripcion'
      },
      {
        name: Resources.Labels.Habilitado,
        prop: 'value.estaHabilitado'
      }
    ];
  }

  onSelect(rows: any) {
    this.selectedRows = rows.selected;
  }

  onSelectImpresora(rows: any) {
    this.selectedRowsImpresoras = rows.selected;
  }

  setRolesTerminal(rolesTerminal: RolTerminalDataView[]): any {
    rolesTerminal.forEach((d: RolTerminalDataView) => {
      this.rolesTerminal.push(this.createRolTerminal(d));
    });
    this.refreshGrid();
  }

  setImpresoras(impresoras: ImpresoraUsuarioDataView[]): any {
    impresoras.forEach((d: ImpresoraUsuarioDataView) => {
      this.impresoras.push(this.createImpresora(d));
    });
    this.refreshGrid();
  }

  setFocus() {
    setTimeout(() => {
      this.nombreAD.setFocus();
    }, 0);
  }

  onAgregar() {
    this.modalRolTerminal.open();
  }

  onAgregarImpresora() {
    this.modalImpresora.open();
  }

  onAcceptedRolTerminal() {
    if (this.rolTerminalSiendoEditando) {
      const ctl = this.rolesTerminal.controls.find(c => this.rolTerminalSiendoEditando != null &&
                                                        c.value.id === this.rolTerminalSiendoEditando.id);
      if (ctl) {
        const value = (this.form.controls.datosModalRolTerminal as FormGroup).getRawValue();
        value['estaHabilitado'] = value.habilitado ? 'SI' : 'NO';

        ctl.patchValue(value);
      }
      this.rolTerminalSiendoEditando = null;
    } else {
      this.rolesTerminal.push(
        this.createRolTerminal(
          (this.form.controls.datosModalRolTerminal as FormGroup).getRawValue()
        )
      );
    }
    this.refreshGrid();
    this.modalRolTerminal.close();
  }

  private createRolTerminal(rolTerminal: any) {
    return this.fb.group({
      id: rolTerminal.id,
      terminal: rolTerminal.terminal,
      rol: rolTerminal.rol,
      habilitado: rolTerminal.habilitado,
      estaHabilitado: rolTerminal.habilitado ? 'SI' : 'NO'
    });
  }

  onAcceptedImpresora() {
    if (this.impresoraSiendoEditando) {
      const ctl = this.impresoras.controls.find(c => this.impresoraSiendoEditando != null &&
                                                     c.value.id === this.impresoraSiendoEditando.id);
      if (ctl) {
        const value = (this.form.controls.datosModalImpresora as FormGroup).getRawValue();
        value['estaHabilitado'] = value.habilitado ? 'SI' : 'NO';

        ctl.patchValue(value);
      }
      this.impresoraSiendoEditando = null;
    } else {
      this.impresoras.push(
        this.createImpresora(
          (this.form.controls.datosModalImpresora as FormGroup).getRawValue()
        )
      );
    }
    this.refreshGrid();
    this.modalImpresora.close();
  }

  private createImpresora(impresoraUsuario: any) {
    return this.fb.group({
      id: impresoraUsuario.id,
      impresora: impresoraUsuario.impresora,
      habilitado: impresoraUsuario.habilitado,
      estaHabilitado: impresoraUsuario.habilitado ? 'SI' : 'NO'
    });
  }

  onModificar() {
    this.rolTerminalSiendoEditando = this.selectedRows[0].value;
    this.modalRolTerminal.modificar(this.selectedRows[0].value);
  }

  onModificarImpresora() {
    this.impresoraSiendoEditando = this.selectedRowsImpresoras[0].value;
    this.modalImpresora.modificar(this.selectedRowsImpresoras[0].value);
  }

  onClosingRolTerminal() {
    this.rolTerminalSiendoEditando = null;
  }

  onClosingImpresora() {
    this.impresoraSiendoEditando = null;
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
