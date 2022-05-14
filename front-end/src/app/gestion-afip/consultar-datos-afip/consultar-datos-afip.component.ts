import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { DatosAfipDataView } from './datos-afip-data-view';
import { ConsultarDatosAfipService } from './consultar-datos-afip-service';

@Component({
  selector: 'yrd-consultar-datos-afip',
  templateUrl: './consultar-datos-afip.component.html',
  styleUrls: ['./consultar-datos-afip.component.css'],
  providers: [FormComponentService]
})
export class ConsultarDatosAfipComponent implements OnInit {

  datosAfipForm: FormGroup;

  private codigoCtg: number;

  constructor(private readonly fb: FormBuilder,
              private readonly formService: FormComponentService,
              private readonly service: ConsultarDatosAfipService) { }

  ngOnInit() {
    this.datosAfipForm = this.fb.group({
      codigoCtg: { value: '', disabled: true },
      solicitante: { value: '', disabled: true },
      cartaPorte: { value: '', disabled: true },
      estado: { value: '', disabled: true },
      fechaEmision: { value: '', disabled: true },
      fechaVigenciaDesde: { value: '', disabled: true },
      fechaVigenciaHasta: { value: '', disabled: true },
      cuitCanjeador: { value: '', disabled: true },
      canjeadorComoRemitenteComercial: { value: '', disabled: true },
      especie: { value: '', disabled: true },
      cuitDestino: { value: '', disabled: true },
      cuitDestinatario: { value: '', disabled: true },
      establecimiento: { value: '', disabled: true },
      localidadOrigen: { value: '', disabled: true },
      localidadDestino: { value: '', disabled: true },
      cosecha: { value: '', disabled: true },
      cuitTransportista: { value: '', disabled: true },
      detalle: { value: '', disabled: true },
      cantidadHoras: { value: '', disabled: true },
      patenteVehiculo: { value: '', disabled: true },
      pesoNetoCarga: { value: '', disabled: true },
      kmARecorrer: { value: '', disabled: true },
      tarifaReferencia: { value: '', disabled: true },
      fechaHoraConfirmacionDefinitiva: { value: '', disabled: true },
      ctcCodigo: { value: '', disabled: true },
      cuitCorredor: { value: '', disabled: true },
      turno: { value: '', disabled: true }
    });

    this.formService.initialize(this.datosAfipForm);
  }

  abrir(codigoCtg: number) {
    this.codigoCtg = codigoCtg;
    this.service.getData(this.codigoCtg)
        .subscribe((datosAfip: DatosAfipDataView) => {
          this.completarDatos(datosAfip);
        });
  }

  private completarDatos(datosAfip: DatosAfipDataView) {
    this.formService.setValue('codigoCtg', datosAfip.ctg, {onlySelf: true});
    this.formService.setValue('solicitante', datosAfip.solicitante, {onlySelf: true});
    this.formService.setValue('cartaPorte', datosAfip.cartaPorte, {onlySelf: true});
    this.formService.setValue('estado', datosAfip.estado, {onlySelf: true});
    this.formService.setValue('fechaEmision', datosAfip.fechaEmision, {onlySelf: true});
    this.formService.setValue('fechaVigenciaDesde', datosAfip.fechaVigenciaDesde, {onlySelf: true});
    this.formService.setValue('fechaVigenciaHasta', datosAfip.fechaVigenciaHasta, {onlySelf: true});
    this.formService.setValue('cuitCanjeador', datosAfip.cuitCanjeador, {onlySelf: true});
    this.formService.setValue('canjeadorComoRemitenteComercial', datosAfip.canjeadorComoRemitenteComercial, {onlySelf: true});
    this.formService.setValue('especie', datosAfip.especie, {onlySelf: true});
    this.formService.setValue('cuitDestino', datosAfip.cuitDestino, {onlySelf: true});
    this.formService.setValue('cuitDestinatario', datosAfip.cuitDestinatario, {onlySelf: true});
    this.formService.setValue('establecimiento', datosAfip.establecimiento, {onlySelf: true});
    this.formService.setValue('localidadOrigen', datosAfip.localidadOrigen, {onlySelf: true});
    this.formService.setValue('localidadDestino', datosAfip.localidadDestino, {onlySelf: true});
    this.formService.setValue('cosecha', datosAfip.cosecha, {onlySelf: true});
    this.formService.setValue('cuitTransportista', datosAfip.cuitTransportista, {onlySelf: true});
    this.formService.setValue('detalle', datosAfip.detalle, {onlySelf: true});
    this.formService.setValue('cantidadHoras', datosAfip.cantidadHoras, {onlySelf: true});
    this.formService.setValue('patenteVehiculo', datosAfip.patenteVehiculo, {onlySelf: true});
    this.formService.setValue('pesoNetoCarga', datosAfip.pesoNetoCarga, {onlySelf: true});
    this.formService.setValue('kmARecorrer', datosAfip.kmARecorrer, {onlySelf: true});
    this.formService.setValue('tarifaReferencia', datosAfip.tarifaReferencia, {onlySelf: true});
    this.formService.setValue('fechaHoraConfirmacionDefinitiva', datosAfip.fechaHoraConfirmacionDefinitiva, {onlySelf: true});
    this.formService.setValue('ctcCodigo', datosAfip.ctcCodigo, {onlySelf: true});
    this.formService.setValue('cuitCorredor', datosAfip.cuitCorredor, {onlySelf: true});
    this.formService.setValue('turno', datosAfip.turno, {onlySelf: true});
  }

  reinicializar() {
    this.formService.resetForm();
  }
}
