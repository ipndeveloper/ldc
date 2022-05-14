import { Component } from '@angular/core';
import { DatosDocumentoControlarCargaCamionComponent } from '../../../controlar-carga-camion/datos-documento-controlar-carga-camion/datos-documento-controlar-carga-camion.component';

@Component({
  selector: 'yrd-detalle-modificar-datos-orden-carga-camion',
  templateUrl:
    './../../../controlar-carga-camion/datos-documento-controlar-carga-camion/datos-documento-controlar-carga-camion.component.html',
  styleUrls:
    ['./../../../controlar-carga-camion/datos-documento-controlar-carga-camion/datos-documento-controlar-carga-camion.component.css']
})
export class DetalleModificarDatosOrdenCargaCamionComponent extends DatosDocumentoControlarCargaCamionComponent {
  loadMovimiento(): void {
    super.loadMovimiento();
    this.fcService.setValue('datosDocumento.patentes.patenteCamion',
      this.movimientoCarga.patenteCamion, { onlySelf: true }, this.esConsulta || !this.esFueraCircuito);
    this.fcService.setValue('datosDocumento.patentes.patenteAcoplado',
      this.movimientoCarga.patenteAcoplado, { onlySelf: true }, this.esConsulta || !this.esFueraCircuito);
    this.fcService.setValue('datosDocumento.titular',
      this.movimientoCarga.titular, { onlySelf: true }, this.esConsulta || !this.esFueraCircuito);
    this.fcService.setValue('datosDocumento.intermediario',
      this.movimientoCarga.intermediario, { onlySelf: true }, this.esConsulta || !this.esFueraCircuito);
    this.fcService.setValue('datosDocumento.remitenteComercial',
      this.movimientoCarga.remitenteComercial, { onlySelf: true }, this.esConsulta || !this.esFueraCircuito);
    this.fcService.setValue('datosDocumento.corredorComprador',
      this.movimientoCarga.corredorComprador, { onlySelf: true }, this.esConsulta || !this.esFueraCircuito);
    this.fcService.setValue('datosDocumento.entregador',
      this.movimientoCarga.entregador, { onlySelf: true }, this.esConsulta || !this.esFueraCircuito);
    this.fcService.setValue('datosDocumento.destinatario',
      this.movimientoCarga.destinatario, { onlySelf: true }, this.esConsulta || !this.esFueraCircuito);
    this.fcService.setValue('datosDocumento.destino',
      this.movimientoCarga.destino, { onlySelf: true }, this.esConsulta || !this.esFueraCircuito);
    this.fcService.setValue('datosDocumento.tarifaFleteReferencia',
      this.movimientoCarga.tarifaFleteReferencia, { onlySelf: true }, this.esConsulta || !this.esFueraCircuito);
    this.fcService.setValue('datosDocumento.tarifaFletePorTn',
      this.movimientoCarga.tarifaFletePorTn, { onlySelf: true }, this.esConsulta || !this.esFueraCircuito);
    this.fcService.setValue('datosDocumento.kilometrosRecorridos',
      this.movimientoCarga.kilometrosRecorridos, { onlySelf: true }, this.esConsulta || !this.esFueraCircuito);
    this.fcService.setValue('datosDocumento.transportista',
      this.movimientoCarga.transportista, { onlySelf: true }, this.esConsulta || !this.esFueraCircuito);
    this.fcService.setValue('datosDocumento.chofer',
      this.movimientoCarga.chofer, { onlySelf: true }, this.esConsulta || !this.esFueraCircuito);
    this.fcService.setValue('datosDocumento.sedeOrigen',
      this.movimientoCarga.sedeVendedor, { onlySelf: true }, this.esConsulta || !(this.esAcopio && this.esFueraCircuito));
  }
}
