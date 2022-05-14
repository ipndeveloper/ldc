import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Movimiento } from '../../../../shared/data-models/movimiento';
import { DescargaEventsNotifierService } from '../../../shared/services/descarga-events-notifier.service';
import { CalidadMovimientoCerealService } from '../../../shared/services/calidad-movimiento-cereal.service';
import { IngresoCalidad } from '../../../../shared/data-models/ingreso-calidad/ingreso-calidad';
import { RubroCalidadMovimientoCereal } from '../../../../shared/data-models/ingreso-calidad/rubro-calidad-movimiento-cereal';
import { CondicionMermaEspecialDataView } from '../../../../shared/data-models/ingreso-calidad/condicion-merma-especial-data-view';
import { DecimalSeparatorPipe } from '../../../../core/pipes/decimal-separator.pipe';

@Component({
  selector: 'yrd-detalle-mermas',
  templateUrl: './detalle-mermas.component.html',
  styleUrls: ['./detalle-mermas.component.css']
})
export class DetalleMermasComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() movimiento: Movimiento;
  columns: any;
  columnsMermasEspeciales: any;
  rows: any;
  rowsMermasEspeciales: any;
  mostrarMermasEspeciales = false;

  get mermas(): FormArray {
    return this.form.get('mermas') as FormArray;
  }

  get mermasEspeciales(): FormArray {
    return this.form.get('mermasEspeciales') as FormArray;
  }

  constructor(private readonly fb: FormBuilder,
              private readonly eventsNotifierService: DescargaEventsNotifierService,
              private readonly calidadMovimientoCerealService: CalidadMovimientoCerealService,
              private readonly decimalSeparatorPipe: DecimalSeparatorPipe) { }

  ngOnInit() {
    this.setearColumnas();
    this.subscribeFormInteraction();
  }

  private setearColumnas(): void {
    this.columns = [
      {
        resizeable: false,
        name: 'Rubro',
        prop: 'value.descripcion'
      },
      {
        resizeable: false,
        name: 'Valor',
        prop: 'value.valorMedido'
      },
      {
        resizeable: false,
        name: '% Merma',
        prop: 'value.porcentajeMerma',
        pipe: this.decimalSeparatorPipe
      },
      {
        resizeable: false,
        name: 'KG Merma',
        prop: 'value.kgPesoMerma',
        pipe: this.decimalSeparatorPipe
      }
    ];
    this.columnsMermasEspeciales = [
      {
        resizeable: false,
        name: 'Mermas Especiales',
        prop: 'value.descripcion'
      },
      {
        resizeable: false,
        name: '% Merma',
        prop: 'value.porcentajeMerma',
        pipe: this.decimalSeparatorPipe
      },
      {
        resizeable: false,
        name: 'KG Merma',
        prop: 'value.kgPesoMerma',
        pipe: this.decimalSeparatorPipe
      }
    ];
  }

  private subscribeFormInteraction(): void {
    this.eventsNotifierService.movimientoRetrieved.subscribe((movimiento: Movimiento) => {
      setTimeout(() => {
        this.buscarMermas(movimiento.id);
      }, 0);
    });
  }

  private buscarMermas(idMovimiento: number): void {
    this.calidadMovimientoCerealService.getCalidadVigente(idMovimiento)
      .subscribe((calidad: IngresoCalidad) => {
        this.completarDatos(calidad);
      });
  }

  private completarDatos(calidad: IngresoCalidad): void {
    let totalMermas = 0;
    calidad.rubros.forEach((rubro) => totalMermas += rubro.kgPesoMerma || 0);
    calidad.condicionMermasEspeciales.forEach((mermaEspecial) => totalMermas += mermaEspecial.kgPesoMerma || 0);

    this.form.patchValue({ totalMermas: totalMermas });
    this.addRangeMermas(calidad.rubros);
    this.addRangeMermasEspciales(calidad.condicionMermasEspeciales);
  }

  private addRangeMermas(rubros: RubroCalidadMovimientoCereal[]): void {
    rubros.forEach(r => {
      this.mermas.push(this.buildMerma(r));
    });
    this.setRows(this.mermas);
  }

  private buildMerma(rubro: RubroCalidadMovimientoCereal): FormGroup {
    return this.fb.group({
      descripcion: rubro.descripcion,
      valorMedido: rubro.valorMedido,
      porcentajeMerma: rubro.porcentajeMerma,
      kgPesoMerma: rubro.kgPesoMerma
    });
  }

  private addRangeMermasEspciales(mermasEspeciales: CondicionMermaEspecialDataView[]): void {
    this.mostrarMermasEspeciales = mermasEspeciales.length > 0;

    mermasEspeciales.forEach(m => {
      this.mermasEspeciales.push(this.buildMermaEspecial(m));
    });

    this.setRowsMermasEspeciales(this.mermasEspeciales);
  }

  private buildMermaEspecial(mermasEspecial: CondicionMermaEspecialDataView): FormGroup {
    return this.fb.group({
      descripcion: mermasEspecial.descripcion,
      porcentajeMerma: mermasEspecial.porcentajeMerma,
      kgPesoMerma: mermasEspecial.kgPesoMerma
    });
  }

  private setRows(mermas: FormArray): void {
    this.rows = [...mermas.controls];
  }

  private setRowsMermasEspeciales(mermasEspeciales: FormArray): void {
    this.rowsMermasEspeciales = [...mermasEspeciales.controls];
  }

}
