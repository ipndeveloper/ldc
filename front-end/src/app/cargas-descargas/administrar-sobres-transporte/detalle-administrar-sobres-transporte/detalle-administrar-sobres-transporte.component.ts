import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { ITreeOptions, TreeModel, TreeComponent } from 'angular-tree-component';
import { UsuarioTreeDataView } from '../../../shared/data-models/usuario-tree-data-view';
import { UsuarioService } from '../../../shared/desplegable-usuario/usuario.service';
import { EntityWithDescription } from '../../../core/models/entity-with-description';
import { Resources } from '../../../../locale/artifacts/resources';
import { AuthService } from '../../../core/services/session/auth.service';
import { TextoConEtiquetaComponent } from '../../../core/controls/texto-con-etiqueta/texto-con-etiqueta.component';
import { DetalleSobreTransporteDataView } from '../../../shared/data-models/sobre-transporte-data-view';

@Component({
  selector: 'yrd-detalle-administrar-sobres-transporte',
  templateUrl: './detalle-administrar-sobres-transporte.component.html',
  styleUrls: ['./detalle-administrar-sobres-transporte.component.css']
})
export class DetalleAdministrarSobresTransporteComponent implements OnInit, AfterViewInit {

  @Input() form: FormGroup;
  @Input() mostrarUsuarios = false;
  @Input() detalleSobreTransporte: DetalleSobreTransporteDataView;
  @ViewChild('usuariosTree') usuariosTree: TreeComponent;
  @ViewChild('nombre') nombre: TextoConEtiquetaComponent;

  get displayUsuarios() {
    return this.mostrarUsuarios ? '' : 'none';
  }

  get detalleDeshabilitado() {
    return this.form.status === 'DISABLED';
  }

  get idUsuario() {
    const userContext =  this.authService.getUserContext();
    if (userContext) {
      return userContext.idUsuario;
    }
    return 0;
  }

  nodes: UsuarioTreeDataView[] = [];

  options: ITreeOptions  = {
    useCheckbox: true,
    displayField: 'nombre',
    scrollContainer: document.body.parentElement as HTMLElement
  };

  validationMessagesNombre = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Nombre)
  };

  constructor(private readonly usuarioService: UsuarioService,
              private readonly authService: AuthService) { }

  ngOnInit() {
    this.usuarioService.getAll()
      .subscribe((usuarios: EntityWithDescription[]) => {
        if (usuarios) {
          this.nodes = usuarios.map((value: EntityWithDescription) => {
            const usuarioTree = new UsuarioTreeDataView();
            usuarioTree.id = value.id;
            usuarioTree.nombre = value.descripcion || '';
            usuarioTree.deshabilitado = value.id === this.idUsuario;
            return usuarioTree;
          });
        }
      });
  }

  ngAfterViewInit() {
    this.subscribeToTreeModel(this.usuariosTree.treeModel, this.form.controls.usuarios);
  }

  setFocus() {
    setTimeout(() => {
      if (this.nombre) {
        this.nombre.setFocus();
      }
    }, 0);
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

  setUsuarios(usuarios: number[]): void {
    usuarios.forEach((id: number) => {
      const node = this.usuariosTree.treeModel.getNodeById(id);
      if (node) {
        node.setIsSelected(true);
      }
    });
  }

  clearUsuarios(): void {
    this.nodes.forEach((node: UsuarioTreeDataView) => {
      const treeNode = this.usuariosTree.treeModel.getNodeById(node.id);
      treeNode.setIsSelected(false);
    });

    this.usuariosTree.treeModel.collapseAll();
  }

  setUsuarioActualPorDefecto(): void {
    const node = this.usuariosTree.treeModel.getNodeById(this.idUsuario);
    if (node) {
      node.setIsSelected(true);
    }
  }

}
