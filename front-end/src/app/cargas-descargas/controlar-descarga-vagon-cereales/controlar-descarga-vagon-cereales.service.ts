import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ControlarDescargaCerealesCommand } from '../../shared/data-models/commands/cargas-descargas/controlar-descarga-camion-cereales-command';
import { ApiService } from '../../core/services/restClient/api.service';
import { IModificarFueraCircuito } from '../shared/modificar-descargas-base/modificar-fuera-circuito.interface';
import { IMapDatosDocumentoToCommand } from '../shared/modificar-descargas-base/map-datos-documento-to-command.interface';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { Productos } from '../../shared/enums/enums';

@Injectable({
  providedIn: 'root'
})
export class ControlarDescargaVagonCerealesService
  implements IModificarFueraCircuito<ControlarDescargaCerealesCommand>,
             IMapDatosDocumentoToCommand<ControlarDescargaCerealesCommand> {

  private readonly apiURL = 'control-descarga-vagon-cereales';

  constructor(private readonly apiService: ApiService) {
  }

  public RegistrarMovimiento(movimiento: ControlarDescargaCerealesCommand): Observable<string> {
    return this.apiService.post<string>(this.apiURL, movimiento);
  }

  public ModificarFueraPuesto(command: ControlarDescargaCerealesCommand): Observable<string> {
    return this.apiService.post<string>(this.apiURL + '/modificar-fuera-puesto', command);
  }

  public ModificarFueraCircuito(command: ControlarDescargaCerealesCommand): Observable<string> {
    return this.apiService.post<string>(this.apiURL + '/modificar-fuera-circuito', command);
  }

  public ModificarDocPorteFueraDePuesto(command: ControlarDescargaCerealesCommand): Observable<string> {
    return this.apiService.post<string>(this.apiURL + '/modificar-doc-porte-fuera-puesto', command);
  }

  public TodosVagonesFactiblesModificarFueraPuesto(nroDocPorte: string): Observable<boolean> {
    return this.apiService.get<boolean>(
      `${this.apiURL}/todos-vagones-factibles-modificar-fuera-puesto?numeroDocumentoPorte=${nroDocPorte}`
    );
  }

  public MapDatosDocumentoToCommand(fcService: FormComponentService, command: ControlarDescargaCerealesCommand): void {
    command.numeroVagon = Number(fcService.getValue('datosDocumento.datosVagon.numeroVagon'));
    command.operativo = Number(fcService.getValue('datosDocumento.operativo'));
    command.idFerrocarril = Number(fcService.getValue('datosDocumento.ferrocarril'));
    command.fechaCarga = String(fcService.getValue('datosDocumento.fechaCarga')) ;
    command.fechaVencimiento = String(fcService.getValue('datosDocumento.fechaVencimiento'));
    command.numeroCEE = Number(fcService.getValue('datosDocumento.numeroCEE'));
    command.idProducto = Number(fcService.getValue('datosDocumento.producto'));
    command.idTipoGrano = Number(fcService.getValue('datosDocumento.tipoGrano'));
    command.idTitularCartaPorte = Number(fcService.getValue('datosDocumento.titularCartaPorte'));
    command.idVendedor = Number(fcService.getValue('datosDocumento.vendedor'));
    command.numeroEstablecimiento = Number(fcService.getValue('datosDocumento.establecimiento.numeroEstablecimiento'));
    if (fcService.getValue('datosDocumento.sustentabilidad') || command.idProducto === Productos.SojaEPA) {
      command.idCampoEpaSustentable = Number(fcService.getValue('datosDocumento.campoEpa'));
    }
    command.idCosecha = Number(fcService.getValue('datosDocumento.cosecha'));
    command.idIntermediario = Number(fcService.getValue('datosDocumento.intermediario'));
    command.idRemitenteComercial = Number(fcService.getValue('datosDocumento.remitenteComercial'));
    command.idCorredorComprador = Number(fcService.getValue('datosDocumento.corredorComprador'));
    command.idMercadoTermino = Number(fcService.getValue('datosDocumento.mercadoTermino'));
    command.idCorredorVendedor = Number(fcService.getValue('datosDocumento.corredorVendedor'));
    command.kilometrosRecorridos = Number(fcService.getValue('datosDocumento.kilometrosRecorridos'));
    command.idEntregador = Number(fcService.getValue('datosDocumento.entregador'));
    command.tarifaReferencia = Number(fcService.getValue('datosDocumento.tarifaReferencia'));
    command.idDestinatario = Number(fcService.getValue('datosDocumento.destinatario'));
    command.tarifaTN = Number(fcService.getValue('datosDocumento.tarifaTN'));
    command.idIntermediarioFlete = Number(fcService.getValue('datosDocumento.datosVagon.intermediarioFlete'));
    command.kgBruto = Number(fcService.getValue('datosDocumento.datosVagon.kilosBrutosTaraGroup.kilosBruto'));
    command.kgTara = Number(fcService.getValue('datosDocumento.datosVagon.kilosBrutosTaraGroup.kilosTara'));
    command.idFinalidad = Number(fcService.getValue('datosDocumento.finalidad'));
    command.idProcedencia = Number(fcService.getValue('datosDocumento.procedencia'));
    command.idSedeOrigen = Number(fcService.getValue('datosDocumento.sedeOrigen'));
    command.idSedeDestino = Number(fcService.getValue('datosDocumento.sedeDestino'));
    command.sustentabilidad = Boolean(fcService.getValue('datosDocumento.sustentabilidad'));

    const transportista = fcService.getControl('datosDocumento.transportista');
    if (transportista && transportista.value) {
      if (transportista.value.id !== 0 ) {
        command.idTransportista = transportista.value.id;
      } else if (transportista.value.codigo) {
        command.codigoFiscalTransportista = transportista.value.codigo;
      }
    }

    command.observaciones = fcService.getValue('datosDocumento.observaciones');
  }
}
