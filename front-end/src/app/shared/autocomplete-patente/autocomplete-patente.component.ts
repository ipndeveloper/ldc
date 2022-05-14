import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, tap, switchMap } from 'rxjs/operators';
import { ValidableControl } from '../../core/shared/super/validable-control.component';
import { PatenteService } from '../../cargas-descargas/shared/services/patente.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'yrd-autocomplete-patente',
  templateUrl: './autocomplete-patente.component.html',
  styleUrls: ['./autocomplete-patente.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: AutocompletePatenteComponent }
  ]
})
export class AutocompletePatenteComponent extends ValidableControl<string> {

  @Input() etiqueta = 'Ingrese etiqueta';
  @Input() idForm: string;
  @Input() isFocused = false;
  @ViewChild('inputPatenteCamion') patenteCamionElement: ElementRef;
  searching = false;
  searchFailed = false;
  cssClassEtiqueta = 'col-sm-3';
  cssClassControl = 'col-sm-9';

  constructor(private readonly patenteService: PatenteService) { super(); }

  setValue(value: string): void {
    this.valor = value;
  }

  search = (text$: Observable<string>) =>
    text$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter(term => term.length > 2),
        tap(() => this.searching = true),
        switchMap(term =>
          this.patenteService.getPatentes(term)
            .pipe(
              tap(() => this.searchFailed = false),
              catchError(() => {
                this.searchFailed = true;
                return of([]);
              })
            )
        ),
        tap(() => this.searching = false)
      )

  setFocus() {
    this.patenteCamionElement.nativeElement.focus();
  }
}
