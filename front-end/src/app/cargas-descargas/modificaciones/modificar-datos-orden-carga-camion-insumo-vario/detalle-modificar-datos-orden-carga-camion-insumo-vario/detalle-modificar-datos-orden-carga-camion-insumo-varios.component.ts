import { Component } from '@angular/core';
import { DatosDocumentoControlarCargaCamionInsumoVarioComponent } from '../../../controlar-carga-camion-varios/datos-documento-controlar-carga-camion-varios/datos-documento-controlar-carga-camion-Insumo-vario.component';
import { TiposProducto } from '../../../../shared/enums/enums';

@Component({
  selector: 'yrd-detalle-modificar-datos-orden-carga-camion-insumo-varios',
  // tslint:disable-next-line: max-line-length
  templateUrl: './../../../controlar-carga-camion-varios/datos-documento-controlar-carga-camion-varios/datos-documento-controlar-carga-camion-insumo-vario.component.html',
  // tslint:disable-next-line: max-line-length
  styleUrls: ['./../../../controlar-carga-camion-varios/datos-documento-controlar-carga-camion-varios/datos-documento-controlar-carga-camion-insumo-vario.component.css']
})
export class DetalleModificarDatosOrdenCargaCamionInsumoVariosComponent
extends DatosDocumentoControlarCargaCamionInsumoVarioComponent {
  loadMovimiento(): void {
    super.loadMovimiento();
    const esVarios = this.tipoProducto.id === TiposProducto.Varios ||
    this.tipoProducto.id === TiposProducto.Chatarra ||
    this.tipoProducto.id === TiposProducto.Decomiso;
    this.fcService.setValue('datosDocumento.patenteCamion',
    this.movimientoCarga.patenteCamion, { onlySelf: true }, this.esConsulta || !this.esFueraCircuito);
    this.fcService.setValue('datosDocumento.patenteAcoplado',
    this.movimientoCarga.patenteAcoplado, { onlySelf: true }, this.esConsulta || !this.esFueraCircuito);
    this.fcService.setValue('datosDocumento.intermediario',
    this.movimientoCarga.intermediario, { onlySelf: true }, esVarios || this.esConsulta || !this.esFueraCircuito);
    this.fcService.setValue('datosDocumento.remitenteComercial',
    this.movimientoCarga.remitenteComercial, { onlySelf: true }, esVarios || this.esConsulta || !this.esFueraCircuito);
    this.fcService.setValue('datosDocumento.corredor',
    this.movimientoCarga.corredorComprador, { onlySelf: true }, esVarios || this.esConsulta || !this.esFueraCircuito);
    this.fcService.setValue('datosDocumento.destinatario',
    this.movimientoCarga.destinatario, { onlySelf: true }, this.esConsulta || !this.esFueraCircuito);
    this.fcService.setValue('datosDocumento.tarifaFleteReferencia',
    this.movimientoCarga.tarifaFleteReferencia, { onlySelf: true }, this.esConsulta || !this.esFueraCircuito);
    this.fcService.setValue('datosDocumento.tarifaFletePorTn',
    this.movimientoCarga.tarifaFletePorTn, { onlySelf: true }, this.esConsulta || !this.esFueraCircuito);
    this.fcService.setValue('datosDocumento.transportista',
    this.movimientoCarga.transportista, { onlySelf: true }, this.esConsulta || !this.esFueraCircuito);
    this.fcService.setValue('datosDocumento.chofer',
    this.movimientoCarga.chofer, { onlySelf: true }, this.esConsulta || !this.esFueraCircuito);
    this.fcService.setValue('datosDocumento.sedeOrigen',
    this.movimientoCarga.sedeVendedor, { onlySelf: true }, this.esConsulta || !(this.esAcopio && this.esFueraCircuito));
  }
}
