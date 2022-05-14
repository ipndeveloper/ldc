import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { ControlarDescargaCamionSubproductosCommand } from '../../shared/data-models/commands/cargas-descargas/controlar-descarga-camion-subproductos-command';
import { IModificarFueraCircuito } from '../shared/modificar-descargas-base/modificar-fuera-circuito.interface';
import { IMapDatosDocumentoToCommand } from '../shared/modificar-descargas-base/map-datos-documento-to-command.interface';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';

@Injectable({
  providedIn: 'root'
})
export class ControlarDescargaVagonNoGranosService
  implements IModificarFueraCircuito<ControlarDescargaCamionSubproductosCommand>,
             IMapDatosDocumentoToCommand<ControlarDescargaCamionSubproductosCommand> {

  private readonly apiURL = 'control-descarga-vagon-no-granos';

  constructor(private readonly apiService: ApiService) {
  }

  public RegistrarMovimiento(movimiento: ControlarDescargaCamionSubproductosCommand): Observable<string> {
    return this.apiService.post<string>(this.apiURL, movimiento);
  }

  public ModificarFueraPuesto(command: ControlarDescargaCamionSubproductosCommand): Observable<string> {
    return this.apiService.post<string>(this.apiURL + '/modificar-fuera-puesto', command);
  }

  public ModificarFueraCircuito(command: ControlarDescargaCamionSubproductosCommand): Observable<string> {
    return this.apiService.post<string>(this.apiURL + '/modificar-fuera-circuito', command);
  }

  public ModificarDocPorteFueraDePuesto(command: ControlarDescargaCamionSubproductosCommand): Observable<string> {
    return this.apiService.post<string>(this.apiURL + '/modificar-doc-porte-fuera-puesto', command);
  }

  public TodosVagonesFactiblesModificarFueraPuesto(nroDocPorte: string): Observable<boolean> {
    return this.apiService.get<boolean>(
      `${this.apiURL}/todos-vagones-factibles-modificar-fuera-puesto?numeroDocumentoPorte=${nroDocPorte}`
    );
  }

  public MapDatosDocumentoToCommand(fcService: FormComponentService, command: ControlarDescargaCamionSubproductosCommand): void {
    command.numeroVagon = Number(fcService.getValue('datosDocumento.datosVagon.numeroVagon'));
    command.operativo = Number(fcService.getValue('datosDocumento.operativo'));
    command.idFerrocarril = Number(fcService.getValue('datosDocumento.ferrocarril'));
    command.fechaCarga = String(fcService.getValue('datosDocumento.fechaCarga'));
    command.fechaVencimiento = String(fcService.getValue('datosDocumento.fechaVencimiento'));
    command.numeroCEE = Number(fcService.getValue('datosDocumento.numeroCEE'));
    command.idProducto = Number(fcService.getValue('datosDocumento.producto'));
    command.idTitular = Number(fcService.getValue('datosDocumento.titularCartaPorte'));
    command.idVendedor = Number(fcService.getValue('datosDocumento.vendedor'));
    command.idCosecha = Number(fcService.getValue('datosDocumento.cosecha'));
    command.idIntermediario = Number(fcService.getValue('datosDocumento.intermediario'));
    command.idCorredor = Number(fcService.getValue('datosDocumento.corredorComprador'));
    command.idRemitenteComercial = Number(fcService.getValue('datosDocumento.remitenteComercial'));
    command.idEntregador = Number(fcService.getValue('datosDocumento.entregador'));
    command.idDestinatario = Number(fcService.getValue('datosDocumento.destinatario'));
    command.kgBruto = Number(fcService.getValue('datosDocumento.datosVagon.kilosBrutosTaraGroup.kilosBruto'));
    command.kgTara = Number(fcService.getValue('datosDocumento.datosVagon.kilosBrutosTaraGroup.kilosTara'));
    command.idFinalidad = Number(fcService.getValue('datosDocumento.finalidad'));
    command.idProcedencia = Number(fcService.getValue('datosDocumento.procedencia'));
    command.idSedeOrigen = Number(fcService.getValue('datosDocumento.sedeOrigen'));
    command.idSedeDestino = Number(fcService.getValue('datosDocumento.sedeDestino'));
    command.observaciones = fcService.getValue('datosDocumento.observaciones');
    const transportista = fcService.getControl('datosDocumento.transportista');
    if (transportista) {
      if (transportista.value.id !== 0) {
        command.idTransportista = transportista.value.id;
      } else if (transportista.value.codigo) {
        command.codigoFiscalTransportista = transportista.value.codigo;
      }
    }
  }

}
