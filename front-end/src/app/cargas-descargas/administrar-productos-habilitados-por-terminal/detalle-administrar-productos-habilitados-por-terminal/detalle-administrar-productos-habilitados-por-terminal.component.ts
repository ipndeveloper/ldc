import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, FormArray} from '@angular/forms';
import { Resources } from '../../../../locale/artifacts/resources';
import { ModalAgregarRubroComponent } from './modal-agregar-rubro/modal-agregar-rubro.component';
import { SiloService } from '../../../shared/desplegable-silo/desplegable-silo.service';
import { ITreeOptions, TreeComponent, TreeModel } from 'angular-tree-component';
import { Silo } from '../../../shared/data-models/silo';
import { distinctUntilChanged } from 'rxjs/operators';
import { Producto } from '../../../shared/data-models/producto';
import { GradoService } from '../../../shared/desplegable-grado/desplegable-grado.service';
import { Grado } from '../../../shared/data-models/grado';
import { Terminal } from '../../../shared/data-models/terminal';
import { RubroPorTerminalDataView } from '../../../shared/data-models/rubro-por-terminal-data-view';
import { AdministrarProductosHabilitadosPorTerminalService } from '../administrar-productos-habilitados-por-terminal.service';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { DesplegableTerminalComponent } from '../../../shared/desplegable-terminal/desplegable-terminal.component';
import { CheckboxConEtiquetaComponent } from '../../../core/controls/checkbox-con-etiqueta/checkbox-con-etiqueta.component';
import { Permission, TiposProducto } from '../../../shared/enums/enums';
import { AdministrarParametrosPorProductoService } from '../../administrar-parametros-por-producto/administrar-parametros-por-producto.service';
import { ParametrosPorProductoDataView } from '../../../shared/data-models/parametros-por-producto-data-view';

@Component({
  selector: 'yrd-detalle-administrar-productos-habilitados-por-terminal',
  templateUrl: './detalle-administrar-productos-habilitados-por-terminal.component.html',
  styleUrls: ['./detalle-administrar-productos-habilitados-por-terminal.component.css']
})
export class DetalleAdministrarProductosHabilitadosPorTerminalComponent implements OnInit, AfterViewInit {
  @Input() form: FormGroup;
  @ViewChild('modalRubro') modalRubro: ModalAgregarRubroComponent;
  @ViewChild('terminal') terminal: DesplegableTerminalComponent;
  @ViewChild('habilitado') habilitado: CheckboxConEtiquetaComponent;
  @ViewChild('gestionarCot') gestionarCot: CheckboxConEtiquetaComponent;
  columnsRubros: any;
  rowsRubros: any;
  selectedRowsRubros: any[];
  rubroTerminalEnEdicion: RubroPorTerminalDataView | null;

  @ViewChild('silosTree') silosTree: TreeComponent;
  @ViewChild('gradoTree') gradoTree: TreeComponent;
  @Input() esConsulta: boolean;
  @Input() esModificacion: boolean;
  @Input() isLoading: boolean;
  determinaGrado: boolean;
  listaSilos: Silo[] = [];
  listaGrados: Grado[] = [];
  options: ITreeOptions  = {
    useCheckbox: true,
    displayField: 'descripcion',
    scrollContainer: document.body.parentElement as HTMLElement
  };
  productoSeleccionado: Producto;
  terminalSeleccionada: Terminal;

  validationMessagesTerminal = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Terminal)
  };

  validationMessagesProducto = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Producto)
  };

  validationMessagesCopiasOblea = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.CantidadCopiasOblea),
    min: Resources.Messages.ElCampoXDebeSerMayorAY.format(Resources.Labels.CantidadCopiasOblea, '0')
  };

  Permission = Permission;

  get gradoHabilitado() {
    if (!this.esConsulta) {
      return !this.determinaGrado;
    }
    return true;
  }
  constructor(private readonly siloService: SiloService,
              private readonly fb: FormBuilder,
              private readonly service: AdministrarProductosHabilitadosPorTerminalService,
              private readonly popupService: PopupService,
              private readonly gradoService: GradoService,
              private readonly parametrosPorProductoService: AdministrarParametrosPorProductoService) {
   }

   get rubros(): FormArray {
    return this.form.controls.rubros as FormArray;
  }

  ngAfterViewInit() {
    this.subscribeToTreeModel(this.silosTree.treeModel, this.form.controls.silos);
    this.subscribeToTreeModel(this.gradoTree.treeModel, this.form.controls.gradoPorDefecto);
  }

  ngOnInit() {
    this.subscribeToProductChange();
    this.subscribeToTerminalChange();
    this.setGridColumns();
    this.determinaGrado = false;
    this.gradoService.getAll().subscribe((grados: Grado[]) => this.listaGrados = grados);
  }

  setFocusHabilitado() {
    setTimeout(() => {
      this.habilitado.setFocus();
    }, 0);
  }

  setFocusTerminal() {
    setTimeout(() => {
      this.terminal.setFocus();
    }, 0);
  }

  private subscribeToProductChange() {
    const producto = this.form.get('producto');
    if (producto) {
      producto.valueChanges.pipe(distinctUntilChanged())
        .subscribe((value: Producto) => {
          if (value) {
            this.productoSeleccionado = value;
            this.determinaGrado = value.determinaGrado;
            this.habilitarUsaSustentabilidad(value.id);
            this.limpiarRubros();
            this.obtenerRubroCalidad();
          }
        });
    }
  }

  private habilitarUsaSustentabilidad(idProducto: number) {
    const usaSustentabilidadCtrl = this.form.get('usaSustentabilidad');
    if (idProducto && usaSustentabilidadCtrl) {
      this.parametrosPorProductoService.getDataById(idProducto).pipe(distinctUntilChanged())
        .subscribe((value: ParametrosPorProductoDataView) => {
          if (value.tipoProductoDescarga.id === TiposProducto.Cereal) {
            usaSustentabilidadCtrl.enable();
            return;
          }
          usaSustentabilidadCtrl.disable();
          usaSustentabilidadCtrl.reset();
        });
    }
  }

  private obtenerRubroCalidad(): void {
    if (!this.isLoading && !this.esConsulta && !this.esModificacion && this.productoSeleccionado && this.terminalSeleccionada) {
      this.service.getRubroCalidadPorTerminalYProducto(this.productoSeleccionado.id, this.terminalSeleccionada.id)
        .subscribe((data: RubroPorTerminalDataView[]) => {
          if (data) {
            this.setRubrosPorTerminal(data);
          }
        });
    }
  }

  private limpiarRubros(): void {
    this.clearGridRubros();
    this.clearRubros();
  }

  get detalleDeshabilitado() {
    return this.form.status === 'DISABLED';
  }

  public clearRubros() {
    this.form.controls.rubros = this.fb.array([]);
    this.rowsRubros = [];
  }

  public subscribeToTerminalChange() {
    const terminal = this.form.get('terminal');
    if (terminal) {
      terminal.valueChanges.pipe(distinctUntilChanged())
        .subscribe((value: Terminal) => {
          if (value) {
            this.terminalSeleccionada = value;
            this.limpiarRubros();
            this.obtenerRubroCalidad();
            this.obtenerSilos();
          } else {
            this.clearSilos();
            this.listaSilos = [];
          }
        });
    }
  }

  private obtenerSilos(): void {
    if (!this.isLoading) {
      this.siloService.getSilosPorTerminal(this.terminalSeleccionada.id).subscribe((Silos: Silo[]) => this.listaSilos = Silos);
    }
  }

  setGridColumns(): void {

    this.columnsRubros = [
      {
        prop: 'selected',
        name: '',
        sortable: false,
        canAutoResize: false,
        draggable: false,
        resizable: false,
        headerCheckboxable: false,
        checkboxable: true,
        width: 30
      },
      {
        name: Resources.Labels.Rubro,
        prop: 'value.rubroCalidad.descripcion'
      },
      {
        name: Resources.Labels.Orden,
        prop: 'value.orden'
      },
      {
        name: Resources.Labels.valorRecepcionMinimo,
        prop: 'value.minimo'
      },
      {
        name: Resources.Labels.valorRecepcionMaximo,
        prop: 'value.maximo'
      },
      {
        name: Resources.Labels.ObligatorioSAN,
        prop: 'value.esRequeridoSAN'
      },
      {
        name: Resources.Labels.ObligatorioPlanta,
        prop: 'value.esRequeridoPlanta'
      }
    ];
  }

  onAgregarRubro() {
    this.modalRubro.open();
  }

  public setListaSilos(silos: Silo[]): void {
    this.listaSilos = silos;
    this.silosTree.treeModel.update();
  }

  public setListaGrados(grados: Grado[]): void {
    this.listaGrados = grados;
    this.gradoTree.treeModel.update();
  }

  onAcceptedModalRubro(): void {
    if (this.rubroTerminalEnEdicion && this.verficarValoresDeRecepcion() && this.verificarNumeroOrdenEnUso()) {
      const ctl = this.rubros.controls.find(c => this.rubroTerminalEnEdicion != null
                                              && c.value.id === this.rubroTerminalEnEdicion.id);
      if (ctl) {
        const value = (this.form.controls.datosModalRubro as FormGroup).getRawValue();
        value['esRequeridoSAN'] = value.requeridoSAN ? Resources.Labels.Si.toUpperCase() : Resources.Labels.No.toUpperCase();
        value['esRequeridoPlanta'] = value.requeridoPlanta ? Resources.Labels.Si.toUpperCase() : Resources.Labels.No.toUpperCase();
        ctl.patchValue(value);
      }
      this.rubroTerminalEnEdicion = null;
      this.refreshGridRubrosPorTerminal();
      this.modalRubro.close();
    }
  }

  private verificarNumeroOrdenEnUso(): boolean {
    const rubroEditado = (this.form.controls.datosModalRubro as FormGroup).getRawValue();
      const rubro = this.rubros.controls.find( c => rubroEditado != null &&
                                               c.value.orden === +rubroEditado.orden && c.value.id !== +rubroEditado.id);
      if (rubro) {
        this.popupService.error(Resources.Messages.NoPuedeDefinirRubrosConElMismoNroDeOrdenDeVisualizacion,
                                Resources.Labels.Error);
        return false;
      }
      return true;
  }

  private verficarValoresDeRecepcion(): boolean {
    const rubroEditado = (this.form.controls.datosModalRubro as FormGroup).getRawValue();
    if (rubroEditado && rubroEditado.minimo && rubroEditado.maximo
                && +rubroEditado.minimo > +rubroEditado.maximo) {
         this.popupService.error(Resources.Messages.ElValorDeRecepcionMinimoDeTodoRubroDebeSerMenorOIgualAlValorDeRecepcionMaximoDelMismo,
                                 Resources.Labels.Error);
         return false;
    }
    return true;
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

  public setSilos(listaSilos: number[]): void {
    this.selectNodes(listaSilos, this.silosTree.treeModel);
    this.silosTree.treeModel.update();
  }

  public setGrado(listaGrados: number[]): void {
    this.selectNodes(listaGrados, this.gradoTree.treeModel);
    this.gradoTree.treeModel.update();
  }

  clearSilos(): void {
    this.clearNodes(this.listaSilos, this.silosTree.treeModel);
  }

  clearGrados(): void {
    this.clearNodes(this.listaGrados, this.gradoTree.treeModel);
  }

  private clearNodes(nodes: any[], treeModel: TreeModel) {
    nodes.forEach((node: any) => {
      const treeNode = treeModel.getNodeById(node.id);
      treeNode.setIsSelected(false);
    });
  }

  private selectNodes(nodesToSelect: number[], treeModel: TreeModel): void {
    nodesToSelect.forEach((nodeToSelect: number) => {
      const node = treeModel.getNodeById(nodeToSelect);
      if (node) {
        node.setIsSelected(true);
      }
    });
  }

  setRubrosPorTerminal(rubrosPorTerminal: RubroPorTerminalDataView[]): any {
    rubrosPorTerminal.forEach((r: RubroPorTerminalDataView) => {
      this.rubros.push(this.createRubrosPorTerminal(r));
    });
     this.refreshGridRubrosPorTerminal();
  }

  private createRubrosPorTerminal(rubrosPorTerminal: RubroPorTerminalDataView) {
    let requeridoPlanta: string;
    if (rubrosPorTerminal.requeridoSAN) {
      requeridoPlanta = Resources.Labels.Si.toUpperCase();
    } else {
      requeridoPlanta = rubrosPorTerminal.requeridoPlanta ? Resources.Labels.Si.toUpperCase() : Resources.Labels.No.toUpperCase();
    }
    return this.fb.group({
      id: rubrosPorTerminal.id,
      rubroCalidad: rubrosPorTerminal.rubroCalidad,
      orden: rubrosPorTerminal.orden,
      minimo: rubrosPorTerminal.minimo,
      maximo: rubrosPorTerminal.maximo,
      esRequeridoSAN: rubrosPorTerminal.requeridoSAN ? Resources.Labels.Si.toUpperCase() : Resources.Labels.No.toUpperCase(),
      requeridoSAN: rubrosPorTerminal.requeridoSAN,
      esRequeridoPlanta: requeridoPlanta,
      requeridoPlanta: rubrosPorTerminal.requeridoSAN || rubrosPorTerminal.requeridoPlanta,
      idRubroCalidad: rubrosPorTerminal.rubroCalidad.id
    });
  }

  public refreshGridRubrosPorTerminal() {
    this.rowsRubros = [];
    this.selectedRowsRubros = [];
    this.rowsRubros = [...this.rubros.controls];
  }

  public clearGridRubros() {
    this.rubros.reset();
    this.refreshGridRubrosPorTerminal();
  }

  onModificarRubro() {
    if (this.selectedRowsRubros[0].value) {
      this.rubroTerminalEnEdicion = this.selectedRowsRubros[0].value;
      this.modalRubro.modificar(this.selectedRowsRubros[0].value);
    }
  }

}
