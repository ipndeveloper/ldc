import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ValidableControl } from '../../core/shared/super/validable-control.component';
import { Observable, of } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged, filter, switchMap, catchError } from 'rxjs/operators';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AutocompleteLocalidadService } from './autocomplete-localidad.service';
import { NgbTypeaheadSelectItemEvent, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'yrd-autocomplete-localidad',
  templateUrl: './autocomplete-localidad.component.html',
  styleUrls: ['./autocomplete-localidad.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: AutocompleteLocalidadComponent }
  ]
})
export class AutocompleteLocalidadComponent extends ValidableControl<EntityWithDescription> {

  @Input() etiqueta = 'Ingrese etiqueta';
  @Input() idForm: string;
  @Input() isFocused = false;
  @Input() cssClassControl = 'col-sm-9';
  @ViewChild('inputLocalidad') localidadElement: ElementRef;
  @ViewChild('typeaheadInstance') typeaheadInstance: NgbTypeahead;

  searching = false;
  searchFailed = false;

  get printValue(): string {
    if (this.valor && this.valor.descripcion) {
      return this.valor.descripcion;
    }
    return '';
  }

  constructor(private readonly service: AutocompleteLocalidadService) { super(); }

  setValue(value: EntityWithDescription): void {
    this.valor = value;
  }

  search = (text$: Observable<string>) =>
    text$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter(term => term.length > 2),
        tap(() => this.searching = true),
        switchMap(term =>
          this.service.getLocalidades(term)
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
    this.localidadElement.nativeElement.focus();
  }

  formatter = (x: EntityWithDescription | null) => {
    if (x) {
      return x.descripcion;
    }
    return '';
  }

  onBlur(valor: string) {
    if (valor !== this.printValue) {
      this.valueChanged(null as any);
      setTimeout(() => {
        if (this.localidadElement) {
          this.localidadElement.nativeElement.value = '';
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
            // activeElements[0].scrollIntoView();
            const elem = (activeElements[0] as any);
            if (typeof elem.scrollIntoViewIfNeeded === 'function') {
              // non standard function, but works (in chrome)...
              elem.scrollIntoViewIfNeeded();
            } else {
              // do custom scroll calculation or use jQuery Plugin or ...
              this.scrollIntoViewIfNeededPolyfill(elem as HTMLElement);
            }
          }
        }
      });
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
