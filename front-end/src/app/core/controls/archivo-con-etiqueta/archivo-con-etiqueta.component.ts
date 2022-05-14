import { Component, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ValidableControl } from '../../shared/super/validable-control.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Archivo } from '../../../shared/data-models/archivo';
import { PopupService } from '../../services/popupService/popup.service';
import { Resources } from '../../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-archivo-con-etiqueta',
  templateUrl: './archivo-con-etiqueta.component.html',
  styleUrls: ['./archivo-con-etiqueta.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: ArchivoConEtiquetaComponent
  }]
})
export class ArchivoConEtiquetaComponent
     extends ValidableControl<Archivo[]> {

  @Input() etiqueta = 'Ingrese etiqueta';
  @Input() idForm: string;
  @Input() isFocused = false;
  @Input() maxSize: Number | undefined;
  @Input() sizeErrorMessage: string;
  @ViewChild('inputArchivo') element: ElementRef;
  listaArchivos: Archivo[] = [];
  isLoading = false;

  get fileName(): string {
    if (this.valor && this.valor.length && this.valor instanceof Array) {
      return this.valor.map((archivo: Archivo) => archivo.nombre + '.' + archivo.extension)
                       .reduce((acum: string, currValue: string) => (acum + '; ' || '') + currValue + '; ') || '';
    }
    return '';
  }

  constructor(private readonly popupService: PopupService) {
    super();
  }

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0);
    if (file) {
      this.isLoading = true;
      const sum = this.listaArchivos.reduce((suma: number, current) => suma + current.peso, 0);
      if (this.maxSize && (sum + file.size) > this.maxSize) {
        this.isLoading = false;
        this.setValue(this.listaArchivos);
        this.popupService.error(this.sizeErrorMessage, Resources.Labels.Error);
      } else {
        const self = this;
        const reader = new FileReader();

        reader.readAsArrayBuffer(file);
        reader.onloadend = (evt: any) => {
          if (evt && evt.target.readyState === reader.DONE) {
            const fileByteArray: number[] = [];
            const arrayBuffer = evt.target.result;
            const array = new Uint8Array(arrayBuffer);
            for (let i = 0; i < array.length; i++) {
             fileByteArray.push(array[i]);
            }

            const [fileName, fileExtension] = file.name.split(/\.(?=[^\.]+$)/);
            const archivo = new Archivo(fileByteArray, file.size, fileName, fileExtension);

            self.isLoading = false;
            self.listaArchivos.push(archivo);
            self.setValue(self.listaArchivos);
          }
        };
      }
    }
  }

  setValue(value: Archivo[]): void {
    if (!value) {
      value = this.listaArchivos = [];
    }
    this.valor = value;
    if (this.propagateChanges) {
      this.propagateChanges(value);
    }
  }

  onClickEliminar(value: Archivo): void {
    this.listaArchivos.splice(this.listaArchivos.indexOf(value), 1);
    this.setValue(this.listaArchivos);
  }

  // Fix para Internet Explorer
  valueChanged(_value: Archivo[]): void { }
}
