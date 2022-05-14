import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ParametrosTerminalService } from '../../cargas-descargas/shared/services/parametros-terminal.service';

@Component({
  selector: 'yrd-patentes',
  templateUrl: './patentes.component.html',
  styleUrls: ['./patentes.component.css']
})
export class PatentesComponent implements OnInit {

  @Input() patentesForm: FormGroup;
  @Input() hidePatenteAcoplado = false;
  @Input() cssClassEtiquetaChasis = 'col-sm-3';
  @Input() cssClassControlChasis = 'col-sm-6';
  @Input() cssClassEtiquetaAcoplado = 'col-sm-3';
  @Input() cssClassControlAcoplado = 'col-sm-6';
  pattern: string;
  @ViewChild('patenteChasisControl') patenteChasisControl: ElementRef;

  constructor(private readonly parametrosTerminalService: ParametrosTerminalService) {  }

  ngOnInit() {
    this.parametrosTerminalService.getFormatosPatente().subscribe((values: string[]) => {
      if (values) {
        this.pattern = values.join('|');
      }
    });
  }

  chasisToUpperCase(patente: any) {
       this.patentesForm.controls.patenteCamion.setValue(patente.value.toUpperCase());
  }

  acopladoToUpperCase(patente: any) {
       this.patentesForm.controls.patenteAcoplado.setValue(patente.value.toUpperCase());
  }

  setFocus() {
    this.patenteChasisControl.nativeElement.focus();
  }

}
