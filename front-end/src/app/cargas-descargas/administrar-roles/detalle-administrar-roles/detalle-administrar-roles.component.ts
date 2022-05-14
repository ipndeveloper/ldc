import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ITreeOptions, TreeComponent } from 'angular-tree-component';
import { PermisoDataView } from '../../../shared/data-models/permiso-data-view';
import { PermisoService } from './permiso.service';
import { TextoConEtiquetaComponent } from '../../../core/controls/texto-con-etiqueta/texto-con-etiqueta.component';
import { Resources } from '../../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-detalle-administrar-roles',
  templateUrl: './detalle-administrar-roles.component.html',
  styleUrls: ['./detalle-administrar-roles.component.css']
})
export class DetalleAdministrarRolesComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() esConsulta = false;
  @Input() esModificacion = false;
  @ViewChild('permisosTree') permisosTree: TreeComponent;
  @ViewChild('descripcion') descripcion: TextoConEtiquetaComponent;

  validationMessagesDescripcion = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Descripcion)
  };
  nodes: PermisoDataView[] = [];
  options: ITreeOptions  = {
    useCheckbox: true,
    displayField: 'nombre',
    childrenField: 'hijos',
    scrollContainer: document.body.parentElement as HTMLElement
  };

  get detalleDeshabilitado() {
    return this.form.status === 'DISABLED';
  }

  constructor(private readonly permisoService: PermisoService) { }

  ngOnInit() {
    this.permisoService.getAll().subscribe((permisos: PermisoDataView[]) => this.nodes = permisos);

    this.permisosTree.treeModel.subscribeToState(() => {
      const permisos: number[] = [];
      const leafs = this.permisosTree.treeModel.selectedLeafNodeIds;
      for (const key of Object.keys(leafs)) {
        if (leafs.hasOwnProperty(key) && leafs[key]) {
          const node = this.permisosTree.treeModel.getNodeById(key);
          permisos.push(+key);
          if (node.parent.data.nombre && !permisos.some(n => n === +node.parent.data.id)) {
            permisos.push(+node.parent.data.id);
          }
        }
      }
      this.form.controls.permisos.setValue(permisos);
    });
  }

  setFocus(): void {
    setTimeout(() => this.descripcion.setFocus(), 0);
  }

  setPermisos(permisos: number[]): void {
    permisos.forEach((id: number) => {
      const node = this.permisosTree.treeModel.getNodeById(id);
      if (node && ((node.parent && node.parent.data.nombre) || (!node.children))) {
        node.setIsSelected(true);
      }
    });
  }

  clearPermisos(): void {
    this.nodes.forEach((node: PermisoDataView) => {
      const treeNode = this.permisosTree.treeModel.getNodeById(node.id);
      treeNode.setIsSelected(false);
    });

    this.permisosTree.treeModel.collapseAll();
  }

}
