import { Component, OnInit, Input, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Resources } from '../../../../locale/artifacts/resources';
import { TextoConEtiquetaComponent } from '../../../core/controls/texto-con-etiqueta/texto-con-etiqueta.component';
import { TreeComponent, TreeModel, ITreeOptions } from 'angular-tree-component';
import { EntityWithDescription } from '../../../core/models/entity-with-description';
import { ProductoService } from '../../../shared/buscador-producto/producto.service';
import { Producto } from '../../../shared/data-models/producto';
import { DespegableTipoProductoComponent } from '../../../shared/desplegable-tipo-producto/desplegable-tipo-producto.component';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { TipoProducto } from '../../../shared/data-models/tipo-producto';
import { Subject } from 'rxjs';

@Component({
  selector: 'yrd-detalle-administrar-grupo-producto',
  templateUrl: './detalle-administrar-grupo-producto.component.html',
  styleUrls: ['./detalle-administrar-grupo-producto.component.css']
})
export class DetalleAdministrarGrupoProductoComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() form: FormGroup;
  @Input() isLoading = false;
  @Input() esConsulta: false;
  @Input() esModificacion: false;
  @ViewChild('descripcion') descripcion: TextoConEtiquetaComponent;
  @ViewChild('tipoProducto') tipoProducto: DespegableTipoProductoComponent;
  @ViewChild('productosTree') productosTree: TreeComponent;

  productos: EntityWithDescription[] = [];
  private readonly onDestroy = new Subject();
  options: ITreeOptions = {
    useCheckbox: true,
    displayField: 'descripcion',
    scrollContainer: document.body.parentElement as HTMLElement
  };

  validationMessagesDescripcion = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Descripcion)
  };

  constructor(
    private readonly productoService: ProductoService
  ) {}

  ngOnInit() {
    this.subscribeCambioTipoProducto();
  }

  ngAfterViewInit() {
    this.subscribeToTreeModel(this.productosTree.treeModel, this.form.controls.productos);
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

  private subscribeCambioTipoProducto() {
    const tipoProducto = this.form.get('tipoProducto');
    if (tipoProducto) {
      tipoProducto.valueChanges.subscribe((value: TipoProducto) => {
        setTimeout(() => {
          this.form.controls.productos.setValue([]);
          this.clearNodes(this.productos, this.productosTree.treeModel);
        }, 0);

        if (value && value.id) {
          this.productoService.getProductosPorTipoProducto(value.id)
          .pipe(distinctUntilChanged(), takeUntil(this.onDestroy))
          .subscribe((productos: Producto[]) => {
            this.productos = productos;
          });
        }
      });
    }
  }

  setFocus(): void {
    setTimeout(() => {
      this.descripcion.setFocus();
    }, 0);
  }

  setProductos(productos: EntityWithDescription[]): void {
    this.productos = productos;
    setTimeout(() => {
      this.selectNodes(productos, this.productosTree.treeModel);
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

  get detalleDeshabilitado() {
    return this.form.status === 'DISABLED';
  }

  clearCheckboxLists(): void {
    this.clearNodes(this.productos, this.productosTree.treeModel);
    this.productos = [];
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
