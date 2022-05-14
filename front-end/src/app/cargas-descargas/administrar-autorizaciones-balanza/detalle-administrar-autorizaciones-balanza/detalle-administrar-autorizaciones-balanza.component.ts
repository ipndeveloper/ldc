import { Component, Input, ViewChild, AfterViewInit, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { DesplegableCircuitoComponent } from '../../../shared/desplegable-circuito/desplegable-circuito.component';
import { TreeModel, TreeComponent, ITreeOptions } from 'angular-tree-component';
import { EntityWithDescription } from '../../../core/models/entity-with-description';
import { RolService } from '../../../shared/desplegable-rol/rol.service';
import { Subject } from 'rxjs';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { MotivoErrorBalanzaPorCircuitoDataView } from '../../../shared/data-models/motivo-error-balanza-por-circuito-data-view';
import { Resources } from '../../../../locale/artifacts/resources';
import { MotivosErrorBalanza, Permission } from '../../../shared/enums/enums';
import { NumeroConEtiquetaComponent } from '../../../core/controls/numero-con-etiqueta/numero-con-etiqueta.component';
import { DesplegableMotivoErrorBalanzaCircuitoComponent } from '../../../shared/desplegable-motivo-error-balanza-circuito/desplegable-motivo-error-balanza-circuito.component';

@Component({
  selector: 'yrd-detalle-administrar-autorizaciones-balanza',
  templateUrl: './detalle-administrar-autorizaciones-balanza.component.html',
  styleUrls: ['./detalle-administrar-autorizaciones-balanza.component.css']
})

export class DetalleAdministrarAutorizacionesBalanzaComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() form: FormGroup;
  @Input() esConsulta = false;
  @Input() esModificacion = false;
  @Input() isLoading = false;
  @Input() esCopia = false;
  tieneRango = false;
  topeAnterior: number | null;
  @ViewChild('circuito') circuito: DesplegableCircuitoComponent;
  @ViewChild('tope') tope: NumeroConEtiquetaComponent;
  @ViewChild('motivo') motivo: DesplegableMotivoErrorBalanzaCircuitoComponent;
  @ViewChild('habilitado') habilitado: ElementRef;
  @ViewChild('rolesPrimeraAutorizacionTree') rolesPrimeraAutorizacionTree: TreeComponent;
  @ViewChild('rolesSegundaAutorizacionTree') rolesSegundaAutorizacionTree: TreeComponent;

  Permission = Permission;

  rolesPrimeraAutorizacion: EntityWithDescription[] = [];
  rolesSegundaAutorizacion: EntityWithDescription[] = [];

  options: ITreeOptions  = {
    useCheckbox: true,
    displayField: 'descripcion',
    scrollContainer: document.body.parentElement as HTMLElement
  };

  readonly validationMessagesCircuito = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Circuito)
  };

  readonly validationMessagesEsEntrada = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.SentidoBalanza)
  };

  readonly validationMessagesMotivoErrorBalanzaCircuito = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Motivo)
  };

  readonly validationMessagesVendedor = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Vendedor)
  };

  private readonly onDestroy = new Subject();

  get detalleDeshabilitado() {
    return this.form.status === 'DISABLED';
  }

  get formEsEntrada(): boolean | null {
    return this.form.controls.esEntrada.value ? this.form.controls.esEntrada.value.id === 1 : null;
  }

  get formCircuito(): EntityWithDescription {
    return this.form.controls.circuito.value;
  }

  constructor(private readonly rolService: RolService) {
  }

  ngOnInit() {
    this.subscribeCircuitoOSentido();
    this.subscribeMotivoErrorBalanzaCircuito();
    this.completarRoles();
  }

  ngAfterViewInit() {
    this.subscribeToTreeModel(this.rolesPrimeraAutorizacionTree.treeModel, this.form.controls.rolesPrimeraAutorizacion);
    this.subscribeToTreeModel(this.rolesSegundaAutorizacionTree.treeModel, this.form.controls.rolesSegundaAutorizacion);
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }

  private subscribeMotivoErrorBalanzaCircuito() {
    this.form.controls.motivoErrorBalanzaCircuito.valueChanges
      .pipe(takeUntil(this.onDestroy), distinctUntilChanged())
      .subscribe((motivo: MotivoErrorBalanzaPorCircuitoDataView) => {
        if (!this.esConsulta) {
          if (motivo && motivo.tieneRango) {
            this.tieneRango = true;
            this.form.controls.tope.enable();
            if (this.topeAnterior) {
              this.form.controls.tope.setValue(this.topeAnterior);
              this.topeAnterior = null;
            }

            if (motivo.idMotivoErrorBalanza === MotivosErrorBalanza.DiferenciaPesoDocPorte) {
              this.form.controls.vendedor.enable();
            }
          } else {
            this.tieneRango = false;
            this.form.controls.tope.setValue(null);
            this.form.controls.tope.disable();
            this.form.controls.vendedor.reset();
            this.form.controls.vendedor.disable();
          }
        } else {
          this.form.controls.vendedor.disable();
        }
      });
  }

  private completarRoles() {
    this.rolService.getAll().subscribe((roles: EntityWithDescription[]) => {
      this.rolesPrimeraAutorizacion = this.rolesSegundaAutorizacion = roles;
      this.rolesPrimeraAutorizacionTree.treeModel.update();
      this.rolesSegundaAutorizacionTree.treeModel.update();
    });
  }

  private subscribeCircuitoOSentido() {
    this.form.controls.circuito.valueChanges
      .pipe(takeUntil(this.onDestroy), distinctUntilChanged())
      .subscribe(_ => this.onCircuitoOSentidoChanged());
    this.form.controls.esEntrada.valueChanges
      .pipe(takeUntil(this.onDestroy), distinctUntilChanged())
      .subscribe(_ => this.onCircuitoOSentidoChanged());
  }

  private onCircuitoOSentidoChanged() {
    if (this.esCopia) {
      this.motivo = this.form.controls.motivoErrorBalanzaCircuito.value;
      this.motivo.previousValue = this.form.controls.motivoErrorBalanzaCircuito.value;
      this.form.controls.motivoErrorBalanzaCircuito.setValue(this.motivo);
      this.topeAnterior = this.form.controls.tope.value;
    }
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

  setRoles(roles: EntityWithDescription[], esPrimeraAutorizacion: boolean): void {
    const treeModel = esPrimeraAutorizacion ? this.rolesPrimeraAutorizacionTree.treeModel : this.rolesSegundaAutorizacionTree.treeModel;
    this.selectNodes(roles, treeModel);
    treeModel.update();
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
    this.clearNodes(this.rolesPrimeraAutorizacion, this.rolesPrimeraAutorizacionTree.treeModel);
    this.clearNodes(this.rolesSegundaAutorizacion, this.rolesSegundaAutorizacionTree.treeModel);
  }

  private clearNodes(nodes: EntityWithDescription[], treeModel: TreeModel) {
    nodes.forEach((node: EntityWithDescription) => {
      const treeNode = treeModel.getNodeById(node.id);
      treeNode.setIsSelected(false);
    });
  }

  setFocus() {
    setTimeout(() => {
      if (!this.esModificacion) {
        this.circuito.setFocus();
      } else if (this.tieneRango) {
        this.tope.setFocus();
      } else {
        this.habilitado.nativeElement.focus();
      }
    }, 0);
  }

}
