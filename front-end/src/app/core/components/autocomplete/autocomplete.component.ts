import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { EntityWithDescription } from '../../models/entity-with-description';
import { ValidableControl } from '../../shared/super/validable-control.component';
import { NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap, switchMap, catchError } from 'rxjs/operators';
import { AutocompleteService } from './autocomplete.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'yrd-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: AutocompleteComponent }
  ]
})
export class AutocompleteComponent<T extends EntityWithDescription> extends ValidableControl<T> {
  @Input() etiqueta = 'Ingrese etiqueta';
  @Input() idForm: string;
  @Input() cssClassEtiqueta = 'col-sm-3';
  @Input() cssClassControl = 'col-sm-9';
  @Input() service: AutocompleteService<T>;
  @Input() minLengthToSearch = 3;
  @Input() isFocused = false;
  @ViewChild('inputElement') inputElement: ElementRef;
  @ViewChild('typeaheadInstance') typeaheadInstance: NgbTypeahead;

  searching = false;
  searchFailed = false;

  get printValue(): string {
    if (this.valor && this.valor.descripcion) {
      return this.valor.descripcion;
    }
    return '';
  }

  setValue(value: T): void {
    this.valor = value;
  }

  search = (text$: Observable<string>) =>
    text$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter(term => term.length >= this.minLengthToSearch),
        tap(() => this.searching = true),
        switchMap(term =>
          this.getDataByFilter(term)
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

  getDataByFilter(term: string) {
    return this.service.getDataByFilter(term);
  }

  setFocus() {
    if (this.inputElement) {
      this.inputElement.nativeElement.focus();
    }
  }

  formatter = (x: T | null) => {
    if (x) {
      return x.descripcion;
    }
    return '';
  }

  onBlur(valor: string) {
    if (valor !== this.printValue) {
      this.valueChanged(null as any);
      setTimeout(() => {
        if (this.inputElement) {
          this.inputElement.nativeElement.value = '';
        }
      }, 0);
    } else {
      this.valueChanged(this.valor);
    }
  }

  onSelectItem(event: NgbTypeaheadSelectItemEvent) {
    this.valueChanged(event.item);
    this.setFocus();
  }

  typeaheadKeydown() {
    if (this.typeaheadInstance.isPopupOpen()) {
      setTimeout(() => {
        const popup = document.getElementById(this.typeaheadInstance.popupId);
        if (popup) {
          const activeElements = popup.getElementsByClassName('active');
          if (activeElements.length === 1) {
            const elem = (activeElements[0] as any);
            if (typeof elem.scrollIntoViewIfNeeded === 'function') {
              elem.scrollIntoViewIfNeeded();
            } else {
              this.scrollIntoViewIfNeededPolyfill(elem as HTMLElement);
            }
          }
        }
      }, 0);
    }
  }

  private scrollIntoViewIfNeededPolyfill(elem: HTMLElement, centerIfNeeded = true) {
    const parent = elem.parentElement;
    if (parent) {
      const parentComputedStyle = window.getComputedStyle(parent, null as any);
      const parentBorderTopWidth = parseInt(parentComputedStyle.getPropertyValue('border-top-width'), 10);
      const parentBorderLeftWidth = parseInt(parentComputedStyle.getPropertyValue('border-left-width'), 10);
      const overTop = elem.offsetTop - parent.offsetTop < parent.scrollTop;
      const overBottom = (elem.offsetTop - parent.offsetTop + elem.clientHeight - parentBorderTopWidth) >
                          (parent.scrollTop + parent.clientHeight);
      const overLeft = elem.offsetLeft - parent.offsetLeft < parent.scrollLeft;
      const overRight = (elem.offsetLeft - parent.offsetLeft + elem.clientWidth - parentBorderLeftWidth) >
                      (parent.scrollLeft + parent.clientWidth);
      const alignWithTop = overTop && !overBottom;

      if ((overTop || overBottom) && centerIfNeeded) {
        parent.scrollTop = elem.offsetTop - parent.offsetTop - parent.clientHeight / 2 - parentBorderTopWidth + elem.clientHeight / 2;
      }

      if ((overLeft || overRight) && centerIfNeeded) {
        parent.scrollLeft = elem.offsetLeft - parent.offsetLeft - parent.clientWidth / 2 - parentBorderLeftWidth + elem.clientWidth / 2;
      }

      if ((overTop || overBottom || overLeft || overRight) && !centerIfNeeded) {
        elem.scrollIntoView(alignWithTop);
      }
    }
  }
}
