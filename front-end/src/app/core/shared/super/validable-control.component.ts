import { debounceTime } from 'rxjs/operators';
import { Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, AbstractControl, ControlValueAccessor } from '@angular/forms';
import { Subscription } from 'rxjs';

export abstract class ValidableControl<T> implements OnChanges, ControlValueAccessor {

    @Input() control: FormControl;
    @Input() validationMessages: {[key: string]: string};
    @Input() cssClassEtiqueta = 'col-sm-3';
    @Input() cssClassControl = 'col-sm-9';

    errorMessage: string;
    validControl: boolean | null;
    valor: T; // Se Debe Setear desde la implementacion de setValue

    _isDisabled: boolean;

    currentSubscription: Subscription | null;

    set isDisabled(value: boolean) {
        this._isDisabled = value;
    }

    get isDisabled() {
        if (this.control) {
            return this.control.status === 'DISABLED';
        } else {
            return this._isDisabled;
        }
    }

    propagateChanges: (value: any) => void;
    onTouched: () => void;

    constructor() {
    }

    writeValue(value: T): void {
        this.setValue(value);
    }

    registerOnChange(fn: any): void {
        this.propagateChanges = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    valueChanged(value: T): void {
        this.valor = value;
        this.propagateChanges(value);
    }

    setDisabledState?(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    abstract setValue(value?: T): void;

    ngOnChanges(changes: SimpleChanges): void {
        const controlChange = changes['control'];

        if (controlChange && (controlChange.previousValue !== controlChange.currentValue)) {
            let previousSubscription = this.currentSubscription;

            this.currentSubscription = this.control.valueChanges
                .pipe(debounceTime(1000))
                .subscribe(() => {
                    this.validControl = this.validateControl(this.control);
                    this.setValidationMessage(this.control);

                    // Hacemos un unsubscribe aca porque si lo haciamos fuera de la current las pantallas funcionan mal
                    if (previousSubscription) {
                        previousSubscription.unsubscribe();
                        previousSubscription = null;
                    }
                });
        }
    }

    validateControl(c: AbstractControl): boolean | null {
        if (c && (c.touched || c.dirty)) {
          if (c.errors) {
            return false;
          }
          return true;
        }
        return null;
    }

    setValidationMessage(c: AbstractControl): void {
        this.errorMessage = '';
        if (c && c.errors) {
          this.errorMessage = Object.keys(c.errors).map(key =>
            this.validationMessages[key]).join(' ');
        }
    }

    touched(): void {
        this.onTouched();
        this.validControl = this.validateControl(this.control);
        this.setValidationMessage(this.control);
    }
}
