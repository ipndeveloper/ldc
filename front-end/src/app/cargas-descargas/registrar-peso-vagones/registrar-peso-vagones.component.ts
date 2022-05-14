import { Component, OnInit, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { DispositivoDataView } from '../../shared/data-models/dispositivo-data-view';
import { RegistrarPesoVagonComponent } from '../registrar-peso-vagon/registrar-peso-vagon.component';
import { DispositivoService } from '../shared/services/dispositivo.service';
import { TiposDispositivo } from '../../shared/enums/enums';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Resources } from '../../../locale/artifacts/resources';
import { NavigationService } from '../../core/services/navigationService/navigation.service';

@Component({
  selector: 'yrd-registrar-peso-vagones',
  templateUrl: './registrar-peso-vagones.component.html',
  styleUrls: ['./registrar-peso-vagones.component.css']
})
export class RegistrarPesoVagonesComponent implements OnInit, OnDestroy {

  @ViewChildren('balanzaComponent') balanzasComponents: QueryList<RegistrarPesoVagonComponent>;
  balanzasHabilitadas: DispositivoDataView[];
  private readonly onDestroy = new Subject();
  private esAceptarYContinuar = false;

  constructor(private readonly dispositivoService: DispositivoService,
              private readonly popupService: PopupService,
              private readonly navigationService: NavigationService) {
  }

  ngOnInit(): void {
    this.determinarBalanzasHabilitadas();
    this.subscribeNavigation();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  private determinarBalanzasHabilitadas(): void {
    this.dispositivoService.consultarTiposDispositivos([TiposDispositivo.BalanzaVagon1, TiposDispositivo.BalanzaVagon2])
      .pipe(takeUntil(this.onDestroy))
      .subscribe(balanzas => {
        this.balanzasHabilitadas = balanzas;
        if (balanzas.length > 0) {
          if (this.esAceptarYContinuar) {
            this.balanzasHabilitadas = balanzas.splice(0, 1);
            this.esAceptarYContinuar = !this.esAceptarYContinuar;
          }
          setTimeout(() => {
            this.balanzasComponents.first.setFocus();
          }, 0);
        } else {
          this.popupService.error(Resources.Messages.NoHayBalanzasHabilitadas);
        }
    });
  }

  private subscribeNavigation(): void {
    this.navigationService.requestExtras()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((params) => {
        if (params.idMovimiento) {
          this.esAceptarYContinuar = true;
        }
    });
  }
}
