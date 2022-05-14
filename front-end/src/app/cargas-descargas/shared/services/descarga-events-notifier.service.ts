import { Injectable, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Movimiento } from '../../../shared/data-models/movimiento';
import { MovimientoCalado } from '../../../shared/data-models/movimiento-calado';

@Injectable()
export class DescargaEventsNotifierService {

  @Output() childFormIntanceReady: EventEmitter<[FormGroup, string]>  = new EventEmitter();
  @Output() parentFormHasBeenReseted: EventEmitter<void>  = new EventEmitter();
  @Output() movimientoRetrieved: EventEmitter<Movimiento>  = new EventEmitter();
  @Output() movimientoCaladoRetrieved: EventEmitter<MovimientoCalado>  = new EventEmitter();
  @Output() habilitarCTG: EventEmitter<void>  = new EventEmitter();

  constructor() { }

  public onChildFormIntanceReady(form: FormGroup, identifier: string) {
    let tuple: [FormGroup, string];
    tuple = [form, identifier];
    this.childFormIntanceReady.emit(tuple);
  }

  public onParentFormHasBeenReseted() {
    this.parentFormHasBeenReseted.emit();
  }

  public onMovimientoRetrieved(movimiento: Movimiento) {
    this.movimientoRetrieved.emit(movimiento);
  }

  public onMovimientoCaladoRetrieved(movimiento: MovimientoCalado) {
    this.movimientoCaladoRetrieved.emit(movimiento);
  }

  public onHabilitarCTG() {
    this.habilitarCTG.emit();
  }
}
