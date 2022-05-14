import { Component, Input, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { DesplegableTerminalComponent } from '../../../shared/desplegable-terminal/desplegable-terminal.component';
import { ITreeOptions, TreeComponent, TreeModel } from 'angular-tree-component';
import { Rubro } from '../../../shared/data-models/rubro';
import { EntityWithDescription } from '../../../core/models/entity-with-description';
import { Subject } from 'rxjs';
import { Resources } from '../../../../locale/artifacts/resources';
import { Permission } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-detalle-administrar-lectura-humedimetro',
  templateUrl: './detalle-administrar-lectura-humedimetro.component.html',
  styleUrls: ['./detalle-administrar-lectura-humedimetro.component.css']
})

export class DetalleAdministrarLecturaHumedimetroComponent
  implements AfterViewInit,
             OnDestroy {

  @Input() form: FormGroup;
  @Input() rubros: Rubro[];
  @ViewChild('terminal') terminal: DesplegableTerminalComponent;
  @ViewChild('rubrosTree') rubrosTree: TreeComponent;

  private readonly onDestroy = new Subject();
  readonly permiso = Permission.AdministrarLecturaHumedimetro;
  options: ITreeOptions  = {
    useCheckbox: true,
    displayField: 'descripcion',
    scrollContainer: document.body.parentElement as HTMLElement
  };

  readonly validationMessagesTerminal = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Terminal)
  };

  readonly validationMessagesHumedimetro = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Humedimetro)
  };

  readonly validationMessagesProducto = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Producto)
  };

  get detalleDeshabilitado() {
    return this.form.status === 'DISABLED';
  }

  ngAfterViewInit() {
    this.subscribeToTreeModel(this.rubrosTree.treeModel, this.form.controls.rubros);
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }

  clearCheckboxLists(): void {
    this.clearNodes(this.rubros, this.rubrosTree.treeModel);
  }

  setRubros(rubros: EntityWithDescription[]): void {
    this.selectNodes(rubros, this.rubrosTree.treeModel);
  }

  setFocus(): void {
    setTimeout(() => this.terminal.setFocus(), 0);
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

  private selectNodes(nodesToSelect: any[], treeModel: TreeModel): void {
    nodesToSelect.forEach((nodeToSelect: any) => {
      const node = treeModel.getNodeById(nodeToSelect.id);
      if (node) {
        node.setIsSelected(true);
      }
    });
  }

  private clearNodes(nodes: EntityWithDescription[], treeModel: TreeModel) {
    nodes.forEach((node: EntityWithDescription) => {
      const treeNode = treeModel.getNodeById(node.id);
      treeNode.setIsSelected(false);
    });
  }
}
