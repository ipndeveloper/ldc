import { Observable } from 'rxjs';
import { EntityWithCode } from '../../models/entity-with-code';
import { EntityWithCodeService } from './entity-with-codeservice';
import { ElementRef, ViewChild, Input } from '@angular/core';
import { ValidableControl } from './validable-control.component';
import { AdvancedSearchFormComponent } from '../../components/advanced-search-form/advanced-search-form.component';
import { Dictionary } from '../../models/dictionary';
import { FormGroup } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import * as HttpStatus from 'http-status-codes';
import { PopupService } from '../../services/popupService/popup.service';
import { Resources } from '../../../../locale/artifacts/resources';

export abstract class SearchComponent<T extends EntityWithCode, S extends EntityWithCodeService<T> = EntityWithCodeService<T>>
  extends ValidableControl<T> {

  constructor(public readonly service: S,
              protected readonly popupService?: PopupService) {
    super();
  }

  currentEntity?: T;
  codigo: string;
  codigoAnterior?: string;
  isDisabled: boolean;
  baseElement: ElementRef;

  @Input() advancedSearch = false;
  @Input() etiqueta = 'Ingrese etiqueta';

  @ViewChild('advancedComponent') advancedComponent: AdvancedSearchFormComponent<T>;
  columns: any;
  rows: any;
  selected: any = [];
  filters: Dictionary<string> = new Dictionary<string>();
  advancedSearchForm: FormGroup;
  faSearch = faSearch;

  setValue(value: T): void {
    this.setCurrentEntity(value);
  }

  buscar(codigo: string): void {
    this.onTouched();
    if (this.isValidCode(codigo)) {
      if (this.shouldCallServiceByCode(codigo)) {
        this.callServiceByCode(codigo)
          .pipe(catchError((caught: HttpErrorResponse) => {
            if (caught.status === HttpStatus.NOT_FOUND) {
              if (this.popupService) {
                this.popupService.error(Resources.Messages.ElValorIngresadoParaElCampoXNoEsValido.format(this.etiqueta));
              }
              this.setCurrentEntity({codigo: this.baseElement.nativeElement.value, validSearch: false} as any);
              this.notifyChange();
            }
            throw caught;
          }))
          .subscribe(entity => {
            this.setCurrentEntity(entity);
            this.notifyChange();
          });
      }
    } else {
      this.clear();
    }
  }

  clear(): void {
    this.setCurrentEntity(undefined);
    this.codigoAnterior = this.baseElement.nativeElement.value;
    this.notifyChange();
  }

  setCurrentEntity(value?: T): void {
    this.currentEntity = value;
    if (this.currentEntity) {
      this.codigo = this.currentEntity.codigo;
      this.codigoAnterior = this.codigo;
      if (this.baseElement) {
        this.baseElement.nativeElement.value = this.codigo;
      }
    } else {
      this.limpiarCodigo();
    }
  }

  protected limpiarCodigo(): void {
    this.codigo = '';
    this.codigoAnterior = undefined;
  }

  protected callServiceByCode(codigo: string): Observable<T | undefined> {
    return this.service.get(codigo);
  }

  protected shouldCallServiceByCode(codigo: string): boolean {
    return this.isValidCode(codigo) &&
      ((this.codigoAnterior !== undefined && codigo !== this.codigoAnterior.toString()) || this.codigoAnterior === undefined);
  }

  protected isValidCode(codigo: string): boolean {
    return codigo !== undefined && codigo !== null && codigo.trim().length > 0;
  }

  notifyChange(): void {
    this.propagateChanges(this.currentEntity);
  }

  abrirBusquedaAvanzada() {
    if (this.advancedComponent) {
      this.advancedSearchForm.reset();
      this.advancedComponent.open();
    }
  }

  protected subscribeToAdvancedSearchFormChanges(token: string, keyDict: string): void {
    const filterControl = this.advancedSearchForm.get(token);
    if (filterControl) {
      filterControl.valueChanges.subscribe((value: any) => {
        this.filters[keyDict] = value;
      });
    }
  }

  setFocus() {
    this.baseElement.nativeElement.focus();
  }

}
