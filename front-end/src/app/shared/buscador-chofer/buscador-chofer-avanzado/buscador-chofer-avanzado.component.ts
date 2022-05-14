import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { Chofer } from '../../data-models/chofer';
import { ChoferService } from './../chofer.service';
import { AdvancedSearchComponent } from '../../../core/shared/super/advanced-search.component';

@Component({
  selector: 'yrd-buscador-chofer-avanzado',
  templateUrl: './buscador-chofer-avanzado.component.html',
  styleUrls: ['./buscador-chofer-avanzado.component.css']
})
export class BuscadorChoferAvanzadoComponent extends AdvancedSearchComponent<Chofer> implements AfterViewInit {

  @ViewChild('inputRazonSocialChofer') inputRazonSocialChofer: ElementRef;

  constructor(private readonly choferService: ChoferService) {
    super(choferService);
  }

  public ngAfterViewInit() {
    this.setFocus();
  }

  protected callService(criteria: string): Chofer[] {
    if (criteria && criteria.trim() !== '') {
      return this.choferService.getByRazonSocial(criteria);
    }

    return [];
  }

  protected afterSearch(): void {
    this.setFocus();
  }
}
