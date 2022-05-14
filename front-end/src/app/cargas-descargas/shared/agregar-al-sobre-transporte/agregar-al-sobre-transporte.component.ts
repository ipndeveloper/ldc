import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AgregarAlSobreTransporteService } from './agregar-al-sobre-transporte.service';
import { EntityWithDescription } from '../../../core/models/entity-with-description';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { Resources } from '../../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-agregar-al-sobre-transporte',
  templateUrl: './agregar-al-sobre-transporte.component.html',
  styleUrls: ['./agregar-al-sobre-transporte.component.css']
})
export class AgregarAlSobreTransporteComponent implements OnInit {

  @Input() idEntidad: number;
  @Input() idTablaTransporte: number;
  @Input() permission: string;
  @Input() enable = false;
  @Output() itemAgregado = new EventEmitter();

  sobresTransporte: EntityWithDescription[] = [];

  constructor(private readonly service: AgregarAlSobreTransporteService,
              private readonly popupService: PopupService) { }

  ngOnInit() {
    this.service.getAllSobresTransporteAbiertos().subscribe((sobres: EntityWithDescription[]) => {
      this.sobresTransporte = sobres;
    });
  }

  onClickAgregarAlSobre(idSobre: number) {
    this.service.agregarAlSobreTransporte(this.idEntidad, this.idTablaTransporte, idSobre)
      .subscribe(() => {
        this.popupService.success(Resources.Messages.ElItemSeAgregoAlSobreTransporteExitosamente,
                                  Resources.Labels.Transporte);
        this.itemAgregado.emit();
      });
  }

}
