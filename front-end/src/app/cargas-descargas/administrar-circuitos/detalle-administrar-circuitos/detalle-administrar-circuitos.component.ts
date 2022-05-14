import { Component, OnInit, ViewChild, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { TreeComponent, ITreeOptions, TreeModel } from 'angular-tree-component';
import { FormGroup, AbstractControl } from '@angular/forms';
import { FinalidadService } from '../../../shared/desplegable-finalidad/finalidad.service';
import { Finalidad } from '../../../shared/data-models/finalidad';
import { DesplegableTerminalComponent } from '../../../shared/desplegable-terminal/desplegable-terminal.component';
import { Subject } from 'rxjs';
import { EntityWithDescription } from '../../../core/models/entity-with-description';
import { MotivoErrorBalanzaService } from './motivo-error-balanza.service';
import { MotivoErrorBalanzaCircuitoDataView } from '../../../shared/data-models/motivo-error-balanza-circuito-data-view';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Resources } from '../../../../locale/artifacts/resources';
import { Permission, TiposProducto, MotivosErrorBalanza } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-detalle-administrar-circuitos',
  templateUrl: './detalle-administrar-circuitos.component.html',
  styleUrls: ['./detalle-administrar-circuitos.component.css']
})

export class DetalleAdministrarCircuitosComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() form: FormGroup;
  @Input() esConsulta = false;
  @Input() esModificacion = false;
  @Input() isLoading = false;
  @ViewChild('finalidadesTree') finalidadesTree: TreeComponent;
  @ViewChild('motivosErrorBalanzaEntradaTree') motivosErrorBalanzaEntradaTree: TreeComponent;
  @ViewChild('motivosErrorBalanzaSalidaTree') motivosErrorBalanzaSalidaTree: TreeComponent;
  @ViewChild('terminal') terminal: DesplegableTerminalComponent;

  private readonly onDestroy = new Subject();

  get detalleDeshabilitado() {
    return this.form.status === 'DISABLED';
  }

  Permission = Permission;
  finalidades: Finalidad[] = [];
  motivosErrorBalanzaEntrada: MotivoErrorBalanzaCircuitoDataView[] = [];
  motivosErrorBalanzaSalida: MotivoErrorBalanzaCircuitoDataView[] = [];

  options: ITreeOptions  = {
    useCheckbox: true,
    displayField: 'descripcion',
    scrollContainer: document.body.parentElement as HTMLElement
  };

  validationMessagesNombre = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Nombre)
  };
  validationMessagesTerminal = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Terminal)
  };
  validationMessagesTipoMovimiento = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.TipoMovimiento)
  };
  validationMessagesTipoProducto = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.TipoProducto)
  };

  constructor(private readonly finalidadService: FinalidadService,
              private readonly motivoErrorBalanzaService: MotivoErrorBalanzaService) { }

  ngOnInit() {
    this.finalidadService.getAll().subscribe((finalidades: Finalidad[]) => this.finalidades = finalidades);

    this.subscribeTipoMovimientoYTipoTransporteYTipoProducto();
  }

  private subscribeTipoMovimientoYTipoTransporteYTipoProducto() {
    this.form.controls.tipoMovimiento.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.onDestroy))
      .subscribe(_ => {
        if (!this.isLoading) {
          this.buscarMotivosPorTipoMovimientoYTipoTransporteYTipoProducto();
        }
      });
    this.form.controls.tipoTransporte.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.onDestroy))
      .subscribe(_ => {
        if (!this.isLoading) {
          this.buscarMotivosPorTipoMovimientoYTipoTransporteYTipoProducto();
        }
      });
    this.form.controls.tipoProducto.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.onDestroy))
      .subscribe(_ => {
        if (!this.isLoading) {
          this.buscarMotivosPorTipoMovimientoYTipoTransporteYTipoProducto();
        }
      });
  }

  private buscarMotivosPorTipoMovimientoYTipoTransporteYTipoProducto(): void {
    const tipoMovimiento = this.form.controls.tipoMovimiento.value;
    const tipoTransporte = this.form.controls.tipoTransporte.value;
    const tipoProducto = this.form.controls.tipoProducto.value;

    if (tipoMovimiento && tipoTransporte) {
      this.motivoErrorBalanzaService.getAllByTipoMovimientoYTipoTransporte(tipoMovimiento.id, tipoTransporte.id, true)
        .subscribe((motivos: MotivoErrorBalanzaCircuitoDataView[]) => {
          if (!tipoProducto || tipoProducto.id !== TiposProducto.InsumosLiquidos) {
            this.motivosErrorBalanzaEntrada = motivos.filter(m => m.idMotivoErrorBalanza !== MotivosErrorBalanza.RechazoLaboratorio);
          } else {
            this.motivosErrorBalanzaEntrada = motivos;
          }
          setTimeout(() => {
            this.clearNodes(this.motivosErrorBalanzaEntrada, this.motivosErrorBalanzaEntradaTree.treeModel);
            this.selectNodes(this.motivosErrorBalanzaEntrada.filter(m => !m.esEditable),
                             this.motivosErrorBalanzaEntradaTree.treeModel);
          }, 0);
        });
      this.motivoErrorBalanzaService.getAllByTipoMovimientoYTipoTransporte(tipoMovimiento.id, tipoTransporte.id, false)
        .subscribe((motivos: MotivoErrorBalanzaCircuitoDataView[]) => {
          this.motivosErrorBalanzaSalida = motivos;
          setTimeout(() => {
            this.clearNodes(this.motivosErrorBalanzaSalida, this.motivosErrorBalanzaSalidaTree.treeModel);
            this.selectNodes(this.motivosErrorBalanzaSalida.filter(m => !m.esEditable),
                             this.motivosErrorBalanzaSalidaTree.treeModel);
          }, 0);
        });
    } else {
      this.motivosErrorBalanzaEntrada = [];
      this.motivosErrorBalanzaSalida = [];
    }
  }

  ngAfterViewInit() {
    this.subscribeToTreeModel(this.finalidadesTree.treeModel, this.form.controls.finalidades);
    this.subscribeToTreeModel(this.motivosErrorBalanzaEntradaTree.treeModel, this.form.controls.motivosErrorBalanzaEntrada);
    this.subscribeToTreeModel(this.motivosErrorBalanzaSalidaTree.treeModel, this.form.controls.motivosErrorBalanzaSalida);
  }

  private subscribeToTreeModel(treeModel: TreeModel, control: AbstractControl) {
    treeModel.subscribeToState(() => {
      const values: number[] = [];
      const leafs = treeModel.selectedLeafNodeIds;
      for (const key of Object.keys(leafs)) {
        if (leafs.hasOwnProperty(key) && leafs[key]) {
          values.push(+key);
        }
      }
      control.setValue(values);
    });
  }

  setFocus(): void {
    setTimeout(() => this.terminal.setFocus(), 0);
  }

  setFinalidades(finalidades: EntityWithDescription[]): void {
    this.selectNodes(finalidades, this.finalidadesTree.treeModel);
  }

  setMotivosEntrada(motivos: MotivoErrorBalanzaCircuitoDataView[]): void {
    this.motivosErrorBalanzaEntrada = motivos;
    this.motivosErrorBalanzaSalidaTree.treeModel.update();
    setTimeout(() => {
      this.selectNodes(motivos.filter(m => m.habilitado), this.motivosErrorBalanzaEntradaTree.treeModel);
    }, 0);
  }

  setMotivosSalida(motivos: MotivoErrorBalanzaCircuitoDataView[]): void {
    this.motivosErrorBalanzaSalida = motivos;
    this.motivosErrorBalanzaSalidaTree.treeModel.update();
    setTimeout(() => {
      this.selectNodes(motivos.filter(m => m.habilitado), this.motivosErrorBalanzaSalidaTree.treeModel);
    }, 0);
  }

  private selectNodes(nodesToSelect: any[], treeModel: TreeModel): void {
    nodesToSelect.forEach((nodeToSelect: any) => {
      const node = treeModel.getNodeById(nodeToSelect.id);
      if (node) {
        node.setIsSelected(true);
      }
    });
  }

  clearCheckboxLists(): void {
    this.clearNodes(this.finalidades, this.finalidadesTree.treeModel);
    this.clearNodes(this.motivosErrorBalanzaEntrada, this.motivosErrorBalanzaEntradaTree.treeModel);
    this.clearNodes(this.motivosErrorBalanzaSalida, this.motivosErrorBalanzaSalidaTree.treeModel);
    this.motivosErrorBalanzaEntrada = [];
    this.motivosErrorBalanzaSalida = [];
  }

  private clearNodes(nodes: EntityWithDescription[], treeModel: TreeModel) {
    nodes.forEach((node: EntityWithDescription) => {
      const treeNode = treeModel.getNodeById(node.id);
      treeNode.setIsSelected(false);
    });
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
