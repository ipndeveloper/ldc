import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ValidableControl } from '../../../core/shared/super/validable-control.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { PopupService } from '../../services/popupService/popup.service';
import { Resources } from '../../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-fecha-con-etiqueta',
  templateUrl: './fecha-con-etiqueta.component.html',
  styleUrls: ['./fecha-con-etiqueta.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: FechaConEtiquetaComponent }
  ]
})

export class FechaConEtiquetaComponent
  extends ValidableControl<string | undefined>
  implements OnInit {

  @Input() etiqueta: string;
  @Input() idForm: string;
  @ViewChild('inputFecha') fechaElement: ElementRef;
  @Input() isFocused = false;

  faCalendarAlt = faCalendarAlt;
  autoCorrectedDatePipe: any = createAutoCorrectedDatePipe('dd/mm/yyyy');
  cssClassControl = 'col-sm-6';

  public mask = [/[0-3]/, /[0-9]/, '/', /[0-1]/, /[0-9]/, '/', /[0-9]/, /\d/, /\d/, /\d/ ];

  constructor(private readonly formater: NgbDateParserFormatter,
              private readonly popupService: PopupService) {
    super();
  }

  ngOnInit() {
  }

  onBlur(value: string): void {

    const strucFromControl = this.formater.parse(value);

    // Si desde el control nos devuelen un dato invalido le avisamos al form con null
    if (strucFromControl.day === 0 && strucFromControl.month === 0) {
      this.propagateChanges(null);
      this.fechaElement.nativeElement.value = null;
      if (strucFromControl.year === -1) {
        this.popupService.error(Resources.Messages.ElValorIngresadoEnFechaNoCorrespondeAUnaFechaValida.format(this.etiqueta));
      }
    } else {
      const formattedDateToForm = this.getFormatToUseOnForm(strucFromControl.day, strucFromControl.month, strucFromControl.year );
      const formattedDateToUI = this.getFormatToUseOnUI(strucFromControl.day, strucFromControl.month, strucFromControl.year );
      this.valor = formattedDateToUI;
      this.propagateChanges(formattedDateToForm);
    }
    this.touched();
  }

  setValue(value?: string): void {
    if (value) {
      const strucFromControl = this.formater.parse(value);
      const formattedDateToForm = this.getFormatToUseOnUI(strucFromControl.day, strucFromControl.month, strucFromControl.year );
      this.valor = formattedDateToForm;
    } else {
      this.valor = value;
    }
  }

  setFocus() {
    setTimeout(() => {
      this.fechaElement.nativeElement.focus();
    }, 0);
  }

  onSelectedNewDate(newDate: NgbDate) {

    const formattedDateToForm = this.getFormatToUseOnForm(newDate.day, newDate.month, newDate.year );
    const formattedDateToUI = this.getFormatToUseOnUI(newDate.day, newDate.month, newDate.year );

    this.valor = formattedDateToUI;
    this.propagateChanges(formattedDateToForm);
    this.touched();
    this.fechaElement.nativeElement.focus();
  }

  private getFormatToUseOnUI(day: number, month: number, year: number): string {
    const date = new NgbDate(year, month, day);
    return this.formater.format(date);
  }

  private getFormatToUseOnForm(day: number, month: number, year: number): string {
    const monthString = this.numberToDay(month);
    const dayString = this.numberToDay(day);

    return `${year}-${monthString}-${dayString}`;
  }

  // Turns a number to 2 digits day of the month with leading zero.
  private numberToDay(j: number): string {
    return ('0' + j).slice(-2);
  }
}
