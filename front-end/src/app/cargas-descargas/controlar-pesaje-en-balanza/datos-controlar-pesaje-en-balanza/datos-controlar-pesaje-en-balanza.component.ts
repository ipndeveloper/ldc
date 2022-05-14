import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MovimientoControlPesoDataView } from '../../../shared/data-models/movimiento-control-peso-data-view';
import { Resources } from '../../../../locale/artifacts/resources';
import { ExcelService } from '../../../core/services/excelService/excel.service';
import { DataGridComponent } from '../../../core/controls/data-grid/data-grid.component';

@Component({
  selector: 'yrd-datos-controlar-pesaje-en-balanza',
  templateUrl: './datos-controlar-pesaje-en-balanza.component.html',
  styleUrls: ['./datos-controlar-pesaje-en-balanza.component.css']
})

export class DatosControlarPesajeEnBalanzaComponent implements OnInit, OnChanges {

  @Input() datosPesajesForm: FormGroup;
  @Input() controlPeso: MovimientoControlPesoDataView;
  @ViewChild('dataGridPesajes') dataGridPesajes: DataGridComponent;
  @ViewChild('dataGridDiferencias') dataGridDiferencias: DataGridComponent;
  columnsPesajes: any;
  columnsDiferencias: any;
  rowsPesajes: any;
  rowsDiferencias: any;

  constructor(private readonly excelExportService: ExcelService) { }

  ngOnInit() {
    this.setColumns();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes['controlPeso'] && changes['controlPeso'].currentValue) {
      this.setGridsRows();
    }
  }

  setGridsRows() {
    this.rowsPesajes = [...this.controlPeso.pesajes];
    this.rowsDiferencias = [...this.controlPeso.diferenciaPesos];
  }

  setColumns() {
    this.columnsPesajes = [
      {
        name: Resources.Labels.Balanza,
        prop: 'balanza'
      },
      {
        name: Resources.Labels.TipoBalanza,
        prop: 'tipoBalanza'
      },
      {
        name: Resources.Labels.Peso,
        prop: 'peso'
      },
      {
        name: Resources.Labels.FechaHora,
        prop: 'fechaHora'
      }
    ];

    this.columnsDiferencias = [
      {
        name: Resources.Labels.BalanzaEntrada,
        prop: 'balanzaEntrada'
      },
      {
        name: Resources.Labels.BalanzaSalida,
        prop: 'balanzaSalida'
      },
      {
        name: Resources.Labels.Diferencia,
        prop: 'diferencia'
      }
    ];
  }

  clearGridsRows() {
    this.rowsPesajes = null;
    this.rowsDiferencias = null;
  }


  exportarAExcel() {
    this.excelExportService.exportDataGridAsExcel([this.dataGridPesajes, this.dataGridDiferencias],
                                                        'Control de Balanzas', ['Pesajes', 'Diferencias']);
  }


}
