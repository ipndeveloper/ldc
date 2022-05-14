import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Resources } from '../../../../../locale/artifacts/resources';
import { Circuito } from '../../../../shared/data-models/circuito/circuito';
import { Finalidad } from '../../../../shared/data-models/finalidad';

@Component({
  selector: 'yrd-intervinientes-datos-documento',
  templateUrl: './intervinientes-datos-documento.component.html',
  styleUrls: ['./intervinientes-datos-documento.component.css']
})
export class IntervinientesDatosDocumentoComponent {

  @Input() form: FormGroup;
  @Input() circuito: Circuito;
  @Input() finalidad: Finalidad;
  @Input() circuitoContemplaCupo: boolean;

  validationMessagesTitular = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Titular),
    searchValueNotValid: Resources.Messages.ElCuitIngresadoNoEsValido
  };

  validationMessagesIntermediario = {
    searchValueNotValid: Resources.Messages.ElCuitIngresadoNoEsValido
  };

  validationMessagesRemitenteComercial = {
    searchValueNotValid: Resources.Messages.ElCuitIngresadoNoEsValido
  };

  validationMessagesCorredorComprador = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.CorredorComprador),
    searchValueNotValid: Resources.Messages.ElCuitIngresadoNoEsValido
  };

  validationMessagesCorredorVendedor = {
    searchValueNotValid: Resources.Messages.ElCuitIngresadoNoEsValido
  };

  validationMessagesEntregador = {
    searchValueNotValid: Resources.Messages.ElCuitIngresadoNoEsValido
  };

  validationMessagesDestinatario = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Destinatario),
    searchValueNotValid: Resources.Messages.ElCuitIngresadoNoEsValido
  };

  validationMessagesIntermediarioFlete = {
    searchValueNotValid: Resources.Messages.ElCuitIngresadoNoEsValido
  };

  validationMessagesChofer = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Chofer),
    choferInhabilitado: Resources.Messages.ElChoferSeEncuentraInhabilitadoParaElIngreso,
    choferPenalizado: Resources.Messages.ElChoferSeEncuentraPenalizadoParaElIngreso,
    searchValueNotValid: Resources.Messages.ElCuitIngresadoNoEsValido
  };

  validationMessagesTransportista = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Transportista),
  };

  validationMessagesMotivoCupo = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.MotivoCupo)
  };

  constructor() { }
}
