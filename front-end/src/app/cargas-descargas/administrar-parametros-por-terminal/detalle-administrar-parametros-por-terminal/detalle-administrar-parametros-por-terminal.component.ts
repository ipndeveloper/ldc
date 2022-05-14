import { Component, OnInit, Input, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { TreeComponent, ITreeOptions, TreeModel } from 'angular-tree-component';
import { Subject } from 'rxjs';
import { FormatoPatente } from '../../../shared/data-models/formato-patente';
import { FormatoPatenteService } from '../../shared/services/formato-patente.service';
import { Resources } from '../../../../locale/artifacts/resources';
import { TextoConEtiquetaComponent } from '../../../core/controls/texto-con-etiqueta/texto-con-etiqueta.component';
import { DesplegableTerminalComponent } from '../../../shared/desplegable-terminal/desplegable-terminal.component';
import { Permission } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-detalle-administrar-parametros-por-terminal',
  templateUrl: './detalle-administrar-parametros-por-terminal.component.html',
  styleUrls: ['./detalle-administrar-parametros-por-terminal.component.css']
})
export class DetalleAdministrarParametrosPorTerminalComponent
  implements OnInit, AfterViewInit, OnDestroy {

  @Input() form: FormGroup;
  @ViewChild('formatosPatenteTree') formatosPatenteTree: TreeComponent;
  @ViewChild('direccion') direccion: TextoConEtiquetaComponent;
  @ViewChild('terminal') terminal: DesplegableTerminalComponent;
  private readonly onDestroy = new Subject();
  readonly Permission = Permission;
  readonly horaCorteCupoRegex: Array<any> = [/[0-9 ]+/, /[0-9 ]+/, ':', /[0-9 ]+/, /[0-9 ]+/];
  readonly options: ITreeOptions  = {
    useCheckbox: true,
    displayField: 'descripcion',
    scrollContainer: document.body.parentElement as HTMLElement
  };

  readonly validationMessagesTerminal = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Terminal)
  };

  readonly validationMessagesDireccion = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Direccion)
  };

  readonly validationMessagesAbreviatura = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Abreviatura)
  };

  readonly validationMessagesTipoTarjeta = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.TipoTarjeta)
  };

  readonly validationMessagesHoraCorteCupo = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.HoraCorteCupo),
    horaCupoValida: Resources.Messages.IngreseUnaHoraMinutoCorteCupoValida
  };

  readonly validationMessagesSede = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Sede)
  };

  readonly validationMessagesdiferenciaDiasMuestra = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.DiferenciaDiasFiltroGeneracionArchivoMuestra),
    min: Resources.Messages.ElCampoXDebeSerMayorAY.format(Resources.Labels.DiferenciaDiasFiltroGeneracionArchivoMuestra, '0')
  };

  readonly validationMessagesdiferenciaDiasPeso = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.DiferenciaDiasFiltroControlPeso),
    min: Resources.Messages.ElCampoXDebeSerMayorAY.format(Resources.Labels.DiferenciaDiasFiltroControlPeso, '0')
  };

  readonly validationMessagesFormatoPatente = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.FormatoPatente)
  };

  readonly validationMessagesCopiasTicketCalidadVagon = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.CopiasTicketCalidadVagon),
    min: Resources.Messages.ElCampoXDebeSerMayorAY.format(Resources.Labels.CopiasTicketCalidadVagon, '0')
  };

  readonly validationMessagesCopiasTicketCalidadCamion = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.CopiasTicketCalidadCamion),
    min: Resources.Messages.ElCampoXDebeSerMayorAY.format(Resources.Labels.CopiasTicketCalidadCamion, '0')
  };

  readonly validationMessagesCopiasTicketPesaje = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.CopiasTicketPesaje),
    min: Resources.Messages.ElCampoXDebeSerMayorAY.format(Resources.Labels.CopiasTicketPesaje, '0')
  };

  readonly validationMessagesCopiasRemito = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.CopiasRemito),
    min: Resources.Messages.ElCampoXDebeSerMayorAY.format(Resources.Labels.CopiasRemito, '0')
  };

  listaFormatosPatente: FormatoPatente[] = [];

  get detalleDeshabilitado() {
    return this.form.status === 'DISABLED';
  }

  constructor(private readonly formatoPatenteService: FormatoPatenteService) {
  }

  ngOnInit() {
    this.formatoPatenteService.getAll().subscribe((formatoPatente: FormatoPatente[]) => this.listaFormatosPatente = formatoPatente);
  }

  ngAfterViewInit() {
    this.subscribeToTreeModel(this.formatosPatenteTree.treeModel, this.form.controls.formatoPatente);
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }

  setFormatosPatente(listaFormatosPatente: number[]) {
    this.selectNodes(listaFormatosPatente, this.formatosPatenteTree.treeModel);
  }

  clearFormatosPatenteLists() {
    this.clearNodes(this.listaFormatosPatente, this.formatosPatenteTree.treeModel);
  }

  setFocus() {
    if (this.form.controls.nombreTerminal.disabled) {
      setTimeout(() => this.direccion.setFocus(), 0);
    } else {
      setTimeout(() => this.terminal.setFocus(), 0);
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

  private selectNodes(nodesToSelect: number[], treeModel: TreeModel) {
    nodesToSelect.forEach((nodeToSelect: number) => {
      const node = treeModel.getNodeById(nodeToSelect);
      if (node) {
        node.setIsSelected(true);
      }
    });
  }

  private clearNodes(nodes: FormatoPatente[], treeModel: TreeModel) {
    nodes.forEach((node: FormatoPatente) => {
      const treeNode = treeModel.getNodeById(node.id);
      treeNode.setIsSelected(false);
    });
  }

}
