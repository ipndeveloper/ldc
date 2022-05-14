import { Component, OnInit, ViewChild, Input, HostListener, ElementRef, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../../../core/components/modal/modal.component';

@Component({
  selector: 'yrd-modal-lectura-tarjeta',
  templateUrl: './modal-lectura-tarjeta.component.html',
  styleUrls: ['./modal-lectura-tarjeta.component.css']
})
export class ModalLecturaTarjetaComponent implements OnInit {

  @ViewChild('modalComponent') modalComponent: ModalComponent;
  @ViewChild('foco') foco: ElementRef;
  @Input() contador: number;
  @Input() prefijoPrimerKeycode: number;
  @Input() prefijoSegundoKeycode: number;
  @Input() sufijo: number;
  @Output() tarjetaLeida = new EventEmitter<string>();

  modalAbierto = false;
  tarjetaEscrita: string;
  primerPrefijoLeido: boolean;
  segundoPrefijoLeido: boolean;
  DLE_KEYCODE = 16;

  constructor() { }

  ngOnInit() {
  }

  open() {
    this.modalAbierto = true;
    this.modalComponent.open();
    this.tarjetaEscrita = '';
    this.primerPrefijoLeido = false;
    this.segundoPrefijoLeido = false;
    setTimeout(() => {
      this.foco.nativeElement.focus();
    }, 0);
  }

  close() {
    if (this.modalAbierto) {
      this.modalAbierto = false;
      this.modalComponent.close();
      this.tarjetaLeida.emit(this.tarjetaEscrita);
    }
  }

  @HostListener(':keydown', ['$event']) onkeydown(event: KeyboardEvent) {
    if (this.modalAbierto) {
      // tslint:disable:deprecation
      const keycode = event.keyCode || event.which;

      if (keycode === 13) {
          event.preventDefault();
          event.stopPropagation();
          event.cancelBubble = true;
      } else {
        // Se ignora el Data Link Escape ya que LDC tiene dos DLE antes de cada prefijo
        if (keycode !== this.DLE_KEYCODE) {
          if (keycode === this.sufijo) {
            this.close();
          } else if (keycode === this.prefijoPrimerKeycode && !this.primerPrefijoLeido) {
            this.primerPrefijoLeido = true;
          } else if (keycode === this.prefijoSegundoKeycode && this.primerPrefijoLeido && !this.segundoPrefijoLeido) {
            this.segundoPrefijoLeido = true;
          } else if (this.primerPrefijoLeido && this.segundoPrefijoLeido) {
            this.tarjetaEscrita += event.key;
          }
        }
      }

    }
  }
}
