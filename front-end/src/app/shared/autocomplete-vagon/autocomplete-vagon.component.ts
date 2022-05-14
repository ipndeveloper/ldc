import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { ValidableControl } from '../../core/shared/super/validable-control.component';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap, switchMap, catchError } from 'rxjs/operators';
import { VagonService } from './vagon.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { createNumberMask } from 'text-mask-addons';

@Component({
  selector: 'yrd-autocomplete-vagon',
  templateUrl: './autocomplete-vagon.component.html',
  styleUrls: ['./autocomplete-vagon.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: AutocompleteVagonComponent }
  ]
})
export class AutocompleteVagonComponent extends ValidableControl<string> {

  @Input() etiqueta = 'Ingrese etiqueta';
  @Input() idForm: string;
  @Input() isFocused = false;
  @ViewChild('inputVagon') vagonElement: ElementRef;
  searching = false;
  searchFailed = false;
  mask: any;

  constructor(private readonly vagonService: VagonService) {
    super();
    this.mask = createNumberMask({
      prefix: '',
      includeThousandsSeparator: false,
      integerLimit: 8
    });
  }

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
          this.vagonService.getVagones(term)
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
    this.vagonElement.nativeElement.focus();
  }
}
