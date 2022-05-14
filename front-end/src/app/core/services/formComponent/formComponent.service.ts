import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Collection } from '../../models/collection';
import { Resources } from '../../../../locale/artifacts/resources';
import { PopupService } from '../popupService/popup.service';

@Injectable()
export class FormComponentService {

  form: FormGroup;

  constructor(public readonly popupService: PopupService) {
  }

  public initialize(form: FormGroup) {
    this.form = form;
  }

  public setValue(controlName: string, value: any, options?: any, disable?: boolean) {
    const control = this.form.get(controlName);
    if (!options) {
      options = {onlySelf: true};
    }
    if (control) {
      control.setValue(value, options);
      if (disable === true) {
        control.disable();
      } else if (disable === false) {
        control.enable();
      }
    }
  }

  public enableControl(controlName: string): void {
    const control = this.form.get(controlName);
    if (control) {
      control.enable();
      control.updateValueAndValidity();
    }
  }

  public disableControl(controlName: string): void {
    const control = this.form.get(controlName);
    if (control) {
      control.disable();
      control.updateValueAndValidity();
    }
  }

  public showValidationError(errors: Collection<string>) {
    if (errors && errors.Count() > 0) {
      const messageErrors = Resources.Messages.VerificarLosDatosIngresados;
      this.popupService.error(messageErrors, Resources.Messages.ErrorValidacion, { enableHtml: true });
    }
  }

  public resetForm(options?: any, state?: any): void {
    if (!state) {
      state = {};
    }
    if (this.form) {
      this.form.reset(state, options);
    }
  }

  public getValue(key: string): any {
    const obj = this.form.get(key);

    let value: any;
    if (obj) {
      const objValue = (obj as any).getRawValue ? (obj as any).getRawValue() : obj.value;
      if (objValue) {
        if (objValue.id !== 'undefined' && objValue.id !== null && objValue.id > -3) {
          value = objValue.id;
        } else {
          // Fix checkbox cuando valor inicial es un objeto
          if (objValue.value) {
            value = objValue.value;
          } else {
            value = objValue;
          }
        }
      }
    }
    return value;
  }

  public isEmpty(value: string): boolean {
    return (value.length === 0 || !value.trim());
  }

  public validateForm(controls: any, errors: Collection<string>, parentControlName: string): void {
    if (controls) {
      Object.keys(controls).forEach(controlKey => {
        let complexControlKey = parentControlName;
        if (!this.isEmpty(complexControlKey)) {
          complexControlKey += '.' + controlKey;
        } else {
          complexControlKey = controlKey;
        }
        const currentControl = this.form.get(complexControlKey);
        if (currentControl) {

          const formGroupReference = currentControl as FormGroup;

          if (formGroupReference && formGroupReference.controls) {
            this.validateForm(formGroupReference.controls, errors, complexControlKey);
          } else {
            if (currentControl.invalid) {
              currentControl.markAsDirty();
              currentControl.markAsTouched();
              currentControl.updateValueAndValidity();
              errors.Add(controlKey);
            }
          }
        }
      });
    }
  }

  public isValidForm(): boolean {
    return (this.form.valid);
  }

  public forceValidationCheck(control: any): void {
    if (control) {
      control.markAsDirty();
      control.markAsTouched();
      control.updateValueAndValidity();
    }
  }

  public applyMask(value: string, format: string, maxLength: number): string {
    let valueWithMask = '';
    if (value) {
      valueWithMask = format + value;
      valueWithMask = valueWithMask.substr(valueWithMask.length - maxLength);
    }
    return valueWithMask;
  }

  public getControl(key: string) {
    return this.form.get(key);
  }
}
