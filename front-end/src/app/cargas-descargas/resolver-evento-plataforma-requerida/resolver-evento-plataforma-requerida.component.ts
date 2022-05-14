import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ResolverEventoPlataformaRequeridaCommand } from '../../../app/shared/data-models/commands/cargas-descargas/resolver-evento-plataforma-requerida-command';
import { FormComponentService } from '../../../app/core/services/formComponent/formComponent.service';
import { DatosBalanzaDataView } from '../../../app/shared/data-models/datos-balanza-data-view';
import { ResolverEventoPlataformaRequerdidaService } from './resolver-evento-plataforma-requerida.service';
import { DetallePlataformaRequeridaComponent } from './detalle-plataforma-requerida/detalle-plataforma-requerida.component';
import { PopupService } from '../../core/services/popupService/popup.service';

@Component({
  selector: 'yrd-resolver-evento-plataforma-requerida',
  templateUrl: './resolver-evento-plataforma-requerida.component.html',
  styleUrls: ['./resolver-evento-plataforma-requerida.component.css']
})
export class ResolverEventoPlataformaRequeridaComponent implements OnInit {

  @Input() command: ResolverEventoPlataformaRequeridaCommand;
  @ViewChild('detallePlataformaRequerida') DetallePlataformaRequerida: DetallePlataformaRequeridaComponent;
  @Output() cerrarPopUp = new EventEmitter();
  protected onDestroy: ReplaySubject<boolean> = new ReplaySubject(1);
  form: FormGroup;
  pathArchestra: string;

  constructor(
    private readonly popupService: PopupService,
    private readonly fb: FormBuilder,
    private readonly fcService: FormComponentService,
    private readonly service: ResolverEventoPlataformaRequerdidaService) { }

  ngOnInit() {
    this.getParameters();
    this.createForm();
    this.getInformation();
  }
  createForm() {
    this.form = this.fb.group({
      patente: { value: '', disabled: true },
      producto: { value: '', disabled: true },
      calidad: { value: '', disabled: true }
    });

    this.fcService.initialize(this.form);
  }

  getParameters() {
    this.pathArchestra = this.command.pathArchestra != null ? this.command.pathArchestra : '';
  }

  getInformation() {
    this.service.obtenerDatosBalanza(this.pathArchestra)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(datos => this.llenarCampos(datos));
  }

  llenarCampos(datos: DatosBalanzaDataView): void {
    this.fcService.setValue('patente', datos.patente, { onlySelf: true });
    this.fcService.setValue('producto', datos.producto, { onlySelf: true });
    this.fcService.setValue('calidad', datos.calidad, { onlySelf: true });
  }

  aprobarRechazar(aprobar: boolean) {
    const selectRows = this.DetallePlataformaRequerida.selectedRow;
    if ((selectRows != null && selectRows.length > 0) || !aprobar) {
      const selectRow = selectRows[0] as FormGroup;
      this.command.aprobar = aprobar;
      this.command.idPlataforma = aprobar ? selectRow.controls.idPlataforma.value : 0;

      this.service.aprobarRechazar(this.command).subscribe(() => {
        if (aprobar) {
          this.popupService.success('Se envió con éxito los datos para aprobar plataforma requerida');
        } else {
          this.popupService.success('Se envió con éxito los datos para rechazar');
        }
        this.cerrarPopUp.emit();
      });
      this.cerrarPopUp.emit();
    } else {
      this.popupService.error('Seleccione una plataforma');
    }
  }
}
