import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DetalleSobreTransporteDataView } from '../../../shared/data-models/sobre-transporte-data-view';

@Component({
  selector: 'yrd-detalle-importar-sobres-transporte',
  templateUrl: './detalle-importar-sobres-transporte.component.html',
  styleUrls: ['./detalle-importar-sobres-transporte.component.css']
})
export class DetalleImportarSobresTransporteComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() detalleSobreTransporte: DetalleSobreTransporteDataView | null;

  constructor() { }

  ngOnInit() {
  }

}
