import { Component, OnInit, TemplateRef, ViewChild, Input, OnChanges } from '@angular/core';
import { Resources } from '../../../../locale/artifacts/resources';
import { ChecklistControlPatrimonialService } from '../../checklist-control-patrimonial/checklist-control-patrimonial.service';
import { Movimiento } from '../../../shared/data-models/movimiento';
import { RegistrarControlPatrimonialService } from '../../registrar-control-patrimonial/registrar-control-patrimonial.service';
import { DecisionControlPatrimonial, ArchivoDecisionControlPatrimonial } from '../../../shared/data-models/decision-control-patrimonial';
import { FileService, FileType, FileExtension } from '../../../core/services/file/file.service';
import { PopupService } from '../../../core/services/popupService/popup.service';

@Component({
  selector: 'yrd-consulta-control-patrimonial',
  templateUrl: './consulta-control-patrimonial.component.html',
  styleUrls: ['./consulta-control-patrimonial.component.css']
})

export class ConsultaControlPatrimonialComponent
  implements OnInit, OnChanges {

  columnsDecision: any;
  columnsChecklist: any;
  rowsDecision: any;
  rowsChecklist: any;
  selectedRows: any = [];
  @Input() movimiento: Movimiento;
  @ViewChild('selectDecisionCellTemplate') selectDecisionCellTemplate: TemplateRef<any>;
  @ViewChild('tableChecklistTemplate') tableChecklistTemplate: TemplateRef<any>;

  constructor(private readonly decisionCPService: RegistrarControlPatrimonialService,
              private readonly checklistCPService: ChecklistControlPatrimonialService,
              private readonly popupService: PopupService,
              private readonly fileService: FileService) {
  }

  ngOnChanges(): void {
    if (this.movimiento) {
      this.getDataDecision();
      this.getDataChecklist();
    }
  }

  ngOnInit() {
    this.setGridColumns();
  }

  onSelect(rows: any) {
    const rowSeleccionada = rows.selected as DecisionControlPatrimonial;
    if (rowSeleccionada && rowSeleccionada.cantidadArchivos > 0) {
      this.selectedRows = rows.selected;
    }
  }

  private getDataDecision() {
    this.decisionCPService.getDecisiones(this.movimiento.id)
      .subscribe(datos => {
        this.rowsDecision = datos;
      });
  }

  private getDataChecklist() {
    this.checklistCPService.getMovimiento(null, this.movimiento.id)
      .subscribe(datos => {
        this.rowsChecklist = datos.checklist;
      });
  }

  private setGridColumns() {
    this.columnsDecision = [
      {
        name: '',
        prop: 'selected',
        sortable: false,
        canAutoResize: false,
        draggable: false,
        resizable: false,
        cellTemplate: this.selectDecisionCellTemplate,
        width: 30,
      },
      {
        name: Resources.Labels.Decision,
        prop: 'decision',
      },
      {
        name: Resources.Labels.Observacion,
        prop: 'observaciones'
      },
      {
        name: Resources.Labels.FechaHora,
        prop: 'fechaHora'
      },
      {
        name: Resources.Labels.Usuario,
        prop: 'usuario'
      },
      {
        name: Resources.Labels.Archivo,
        prop: 'cantidadArchivos'
      }
    ];

    this.columnsChecklist = [
      {
        name: '',
        prop: 'estaAprobado',
        sortable: false,
        canAutoResize: false,
        draggable: false,
        resizable: false,
        cellTemplate: this.tableChecklistTemplate,
        width: 30,
      },
      {
        name: Resources.Labels.DescControl,
        prop: 'descControl',
      },
      {
        name: Resources.Labels.Observacion,
        prop: 'observaciones'
      },
      {
        name: Resources.Labels.FechaHora,
        prop: 'fechaHora'
      },
      {
        name: Resources.Labels.Usuario,
        prop: 'usuario'
      }
    ];
  }

  onClickDescargar() {
    if (this.selectedRows && this.selectedRows.length > 0) {
      const archivosADescargar = this.selectedRows as DecisionControlPatrimonial[];
      if (archivosADescargar) {
        archivosADescargar.forEach((decisionSeleccionada: DecisionControlPatrimonial) => {
          if (decisionSeleccionada.cantidadArchivos > 0) {
            decisionSeleccionada.archivos.forEach((archivo: ArchivoDecisionControlPatrimonial) => {
              let fileType = `Content-Type: application/octet-stream; Content-Disposition: inline;` as FileType;
              fileType = `${fileType} filename="${archivo.nombreArchivo}.${archivo.extensionArchivo}"` as FileType;
              const fileExtension = `.${archivo.extensionArchivo}` as FileExtension;
              this.fileService.get(archivo.id).subscribe((contenidoArchivo: any) => {
                this.fileService.download(contenidoArchivo, archivo.nombreArchivo, fileType, fileExtension);
                this.popupService.success(Resources.Messages.DescargaDeArchivoExitoso);
              });
            });
          }
        });
      }
    }
  }

}
