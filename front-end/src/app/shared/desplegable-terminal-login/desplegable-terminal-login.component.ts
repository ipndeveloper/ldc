import { Component, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { Terminal } from '../data-models/terminal';
import { TerminalService } from './terminal.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'yrd-desplegable-terminal-login',
  templateUrl: './desplegable-terminal-login.component.html',
  styleUrls: ['./desplegable-terminal-login.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableTerminalLoginComponent }
  ]
})
export class DesplegableTerminalLoginComponent extends DropdownComponent<Terminal>
 implements OnChanges {

  @ViewChild('selectTerminal') selectTerminal: ElementRef;

  @Input() terminales: Terminal[];

  constructor(terminalService: TerminalService) {
    super(terminalService);
  }

  ngOnChanges() {
    this.databind();
  }

  protected getData(): Observable<Terminal[]> {
    return of(this.terminales);
  }

  setFocus() {
    this.selectTerminal.nativeElement.focus();
  }
}
