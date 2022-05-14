import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { Terminal } from '../data-models/terminal';
import { TerminalService } from '../desplegable-terminal-login/terminal.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'yrd-desplegable-terminal',
  templateUrl: './desplegable-terminal.component.html',
  styleUrls: ['./desplegable-terminal.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableTerminalComponent }
  ]
})
export class DesplegableTerminalComponent extends DropdownComponent<Terminal>
 implements OnInit {

  @ViewChild('selectTerminal') select: ElementRef;
  @Input() permiso: string;
  @Input() incluirAdministracionCentral = false;
  @Input() utilizaTarjeta = undefined;

  constructor(private readonly terminalService: TerminalService) {
    super(terminalService);
  }

  setFocus() {
    this.select.nativeElement.focus();
  }

  getData(): Observable<Terminal[]> {
    if (this.permiso || this.utilizaTarjeta) {
      return this.terminalService.getAllByFiltro(this.incluirAdministracionCentral, this.permiso, this.utilizaTarjeta);
    }
    return this.terminalService.getAll();
  }
}
