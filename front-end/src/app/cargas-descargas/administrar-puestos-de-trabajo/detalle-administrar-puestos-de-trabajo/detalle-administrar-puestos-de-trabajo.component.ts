import { Component, OnInit, OnDestroy, Input, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { Resources } from '../../../../locale/artifacts/resources';
import { DesplegableTerminalComponent } from '../../../shared/desplegable-terminal/desplegable-terminal.component';
import { AccionPuestoTrabajoDataView, DispositivoPuestoTrabajoDataView } from '../../../shared/data-models/puesto-trabajo-data-view';
import { ModalAgregarAccionComponent } from './modal-agregar-accion/modal-agregar-accion.component';
import { ModalAgregarDispositivoComponent } from './modal-agregar-dispositivo/modal-agregar-dispositivo.component';
import { Permission } from '../../../shared/enums/enums';
import { EntityWithDescription } from '../../../core/models/entity-with-description';

@Component({
  selector: 'yrd-detalle-administrar-puestos-de-trabajo',
  templateUrl: './detalle-administrar-puestos-de-trabajo.component.html',
  styleUrls: ['./detalle-administrar-puestos-de-trabajo.component.css']
})

export class DetalleAdministrarPuestosDeTrabajoComponent implements OnInit, OnDestroy {

  @Input() form: FormGroup;
  @Input() disableActions = false;
  @Input() esConsulta = false;
  @Input() esModificacion = false;
  @Input() isLoading = false;
  @ViewChild('terminal') terminal: DesplegableTerminalComponent;
  @ViewChild('selectAccionesHeaderTemplate') selectAccionesHeaderTemplate: TemplateRef<any>;
  @ViewChild('selectAccionesCellTemplate') selectAccionesCellTemplate: TemplateRef<any>;
  @ViewChild('selectDispositivosHeaderTemplate') selectDispositivosHeaderTemplate: TemplateRef<any>;
  @ViewChild('selectDispositivosCellTemplate') selectDispositivosCellTemplate: TemplateRef<any>;
  @ViewChild('modalAccion') modalAccion: ModalAgregarAccionComponent;
  @ViewChild('modalDispositivo') modalDispositivo: ModalAgregarDispositivoComponent;
  @ViewChild('botonAgregarAccion') btnAgregarAccion: ElementRef;
  @ViewChild('botonModificarAccion') btnModificarAccion: ElementRef;
  @ViewChild('botonAgregarDispositivo') btnAgregarDispositivo: ElementRef;
  @ViewChild('botonModificarDispositivo') btnModificarDispositivo: ElementRef;

  Permission = Permission;
  columnsAcciones: any;
  rowsAcciones: any;
  selectedRowsAcciones: any = [];
  columnsDispositivos: any;
  rowsDispositivos: any;
  selectedRowsDispositivos: any = [];
  accionPuestoTrabajoSiendoEditando: AccionPuestoTrabajoDataView | null = null;
  dispositivoPuestoTrabajoSiendoEditando: DispositivoPuestoTrabajoDataView | null = null;
  estaModificandoModal: boolean;

  private readonly onDestroy = new Subject();

  get accionesPuestoTrabajo(): FormArray {
    return this.form.controls.accionesPuestoTrabajo as FormArray;
  }

  get dispositivosPuestoTrabajo(): FormArray {
    return this.form.controls.dispositivosPuestoTrabajo as FormArray;
  }

  get terminalActual(): EntityWithDescription | null {
    return this.form.controls.terminal.value;
  }

  validationMessagesTerminal = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Terminal)
  };

  validationMessagesTipoPuestoTrabajo = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.TipoPuesto)
  };

  validationMessagesNombre = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Nombre)
  };

  validationMessagesDireccionIP = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.DireccionIP)
  };

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit() {
    this.setGridsColumns();
  }

  refreshGridAcciones() {
    this.selectedRowsAcciones = [];
    this.rowsAcciones = [...this.accionesPuestoTrabajo.controls];
  }

  refreshGridDispositivos() {
    this.selectedRowsDispositivos = [];
    this.rowsDispositivos = [...this.dispositivosPuestoTrabajo.controls];
  }

  private setGridsColumns() {
    this.columnsAcciones = [
      {
        prop: 'selected',
        name: '',
        sortable: false,
        canAutoResize: false,
        draggable: false,
        resizable: false,
        headerTemplate: this.selectAccionesHeaderTemplate,
        cellTemplate: this.selectAccionesCellTemplate,
        width: 30,
      },
      {
        name: Resources.Labels.Accion,
        prop: 'value.accion.descripcion'
      },
      {
        name: Resources.Labels.Automatico,
        prop: 'value.esAutomatico'
      },
      {
        name: Resources.Labels.Habilitado,
        prop: 'value.estaHabilitado'
      }
    ];
    this.columnsDispositivos = [
      {
        prop: 'selected',
        name: '',
        sortable: false,
        canAutoResize: false,
        draggable: false,
        resizable: false,
        headerTemplate: this.selectDispositivosHeaderTemplate,
        cellTemplate: this.selectDispositivosCellTemplate,
        width: 30,
      },
      {
        name: Resources.Labels.TipoDispositivo,
        prop: 'value.tipoDispositivo.descripcion'
      },
      {
        name: Resources.Labels.Dispositivo,
        prop: 'value.dispositivo.descripcion'
      },
      {
        name: Resources.Labels.Habilitado,
        prop: 'value.estaHabilitado'
      }
    ];
  }

  onSelectAcciones(rows: any) {
    this.selectedRowsAcciones = rows.selected;
  }

  onSelectDispositivos(rows: any) {
    this.selectedRowsDispositivos = rows.selected;
  }

  setAccionesPuestoTrabajo(accionesPuestoTrabajo: AccionPuestoTrabajoDataView[]): any {
    accionesPuestoTrabajo.forEach((d: AccionPuestoTrabajoDataView) => {
      this.accionesPuestoTrabajo.push(this.createAccionPuestoTrabajo(d));
    });
    this.refreshGridAcciones();
  }

  setDispositivosPuestoTrabajo(dispositivosPuestoTrabajo: DispositivoPuestoTrabajoDataView[]): any {
    dispositivosPuestoTrabajo.forEach((d: DispositivoPuestoTrabajoDataView) => {
      this.dispositivosPuestoTrabajo.push(this.createDispositivoPuestoTrabajo(d));
    });
    this.refreshGridDispositivos();
  }

  setFocus() {
    setTimeout(() => {
      this.terminal.setFocus();
    }, 0);
  }

  onAgregarAccion() {
    this.estaModificandoModal = false;
    this.modalAccion.open();
  }

  onAgregarDispositivo() {
    this.estaModificandoModal = false;
    this.modalDispositivo.open();
  }

  onAcceptedAccionPuestoTrabajo() {
    if (this.accionPuestoTrabajoSiendoEditando) {
      const ctl = this.accionesPuestoTrabajo.controls.find(c => this.accionPuestoTrabajoSiendoEditando != null
                                                             && this.accionPuestoTrabajoSiendoEditando.id === c.value.id);
      if (ctl) {
        const value = (this.form.controls.datosModalAccionPuestoTrabajo as FormGroup).getRawValue();
        value['estaHabilitado'] = value.habilitado ? 'SI' : 'NO';
        value['esAutomatico'] = value.automatico ? 'SI' : 'NO';

        ctl.patchValue(value);
      }
      this.accionPuestoTrabajoSiendoEditando = null;
    } else {
      this.accionesPuestoTrabajo.push(
        this.createAccionPuestoTrabajo(
          (this.form.controls.datosModalAccionPuestoTrabajo as FormGroup).getRawValue()
        )
      );
    }
    this.refreshGridAcciones();
    this.modalAccion.close();
  }

  onAcceptedDispositivoPuestoTrabajo() {
    if (this.dispositivoPuestoTrabajoSiendoEditando) {
      const ctl = this.dispositivosPuestoTrabajo.controls.find(c => this.dispositivoPuestoTrabajoSiendoEditando != null
                                                                 && this.dispositivoPuestoTrabajoSiendoEditando.id === c.value.id);
      if (ctl) {
        const value = (this.form.controls.datosModalDispositivoPuestoTrabajo as FormGroup).getRawValue();
        value['estaHabilitado'] = value.habilitado ? 'SI' : 'NO';

        ctl.patchValue(value);
      }
      this.dispositivoPuestoTrabajoSiendoEditando = null;
    } else {
      this.dispositivosPuestoTrabajo.push(
        this.createDispositivoPuestoTrabajo(
          (this.form.controls.datosModalDispositivoPuestoTrabajo as FormGroup).getRawValue()
        )
      );
    }
    this.refreshGridDispositivos();
    this.modalDispositivo.close();
  }

  private createAccionPuestoTrabajo(accionPuestoTrabajo: any) {
    return this.fb.group({
      id: accionPuestoTrabajo.id,
      accion: accionPuestoTrabajo.accion,
      automatico: accionPuestoTrabajo.automatico,
      esAutomatico: accionPuestoTrabajo.automatico ? 'SI' : 'NO',
      habilitado: accionPuestoTrabajo.habilitado,
      estaHabilitado: accionPuestoTrabajo.habilitado ? 'SI' : 'NO'
    });
  }

  private createDispositivoPuestoTrabajo(dispositivoPuestoTrabajo: any) {
    return this.fb.group({
      id: dispositivoPuestoTrabajo.id,
      tipoDispositivo: dispositivoPuestoTrabajo.tipoDispositivo,
      dispositivo: dispositivoPuestoTrabajo.dispositivo,
      habilitado: dispositivoPuestoTrabajo.habilitado,
      estaHabilitado: dispositivoPuestoTrabajo.habilitado ? 'SI' : 'NO'
    });
  }

  onModificarAccion() {
    this.estaModificandoModal = true;
    this.accionPuestoTrabajoSiendoEditando = this.selectedRowsAcciones[0].value;
    this.modalAccion.modificar(this.selectedRowsAcciones[0].value);
  }

  onModificarDispositivo() {
    this.estaModificandoModal = true;
    this.dispositivoPuestoTrabajoSiendoEditando = this.selectedRowsDispositivos[0].value;
    this.modalDispositivo.modificar(this.selectedRowsDispositivos[0].value);
  }

  onClosingAccionPuestoTrabajo() {
    this.accionPuestoTrabajoSiendoEditando = null;
    if (this.estaModificandoModal) {
      this.btnModificarAccion.nativeElement.focus();
    } else {
      this.btnAgregarAccion.nativeElement.focus();
    }
  }

  onClosingDispositivoPuestoTrabajo() {
    this.dispositivoPuestoTrabajoSiendoEditando = null;
    if (this.estaModificandoModal) {
      this.btnModificarDispositivo.nativeElement.focus();
    } else {
      this.btnAgregarDispositivo.nativeElement.focus();
    }
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}

