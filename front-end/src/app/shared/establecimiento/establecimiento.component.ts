import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'yrd-establecimiento',
  templateUrl: './establecimiento.component.html',
  styleUrls: ['./establecimiento.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: EstablecimientoComponent }
  ]
})
export class EstablecimientoComponent implements OnChanges, OnDestroy {

  @Input() establecimientoForm: FormControl;
  @Input() control: FormControl;
  @Input() cssClassEtiqueta = 'col-sm-5';
  @Input() cssClassControl = 'col-sm-6';
  @Input() cssClassCheckbox = 'col-sm-6';

  numero?: number;
  private readonly onDestroy = new Subject();

  onChange: (value?: any) => void;
  onTouched: () => void;

  ngOnDestroy() {
    this.onDestroy.next();
  }

  ngOnChanges() {
    const noLlevaEstablecimiento = this.establecimientoForm.get('noLlevaEstablecimiento');
    const numeroEstablecimiento = this.establecimientoForm.get('numeroEstablecimiento');

    if (noLlevaEstablecimiento && numeroEstablecimiento) {
      noLlevaEstablecimiento.valueChanges
        .pipe(takeUntil(this.onDestroy))
        .subscribe((value: boolean) => {
          if (value) {
            numeroEstablecimiento.disable();
            numeroEstablecimiento.setValue(null);
          } else if (value !== null) {
            numeroEstablecimiento.enable();
          }
        });
    }
  }
}
