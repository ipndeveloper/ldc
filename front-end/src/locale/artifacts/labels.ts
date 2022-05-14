import { Resource } from './base/resource';

const fileName = 'labels';

export class Labels extends Resource {

    get Aceptar(): string {
        return this.Provider.translate(fileName, 'Aceptar');
    }

    get CapacidadMaxima(): string {
        return this.Provider.translate(fileName, 'CapacidadMaxima');
    }
    get SinBalancero(): string {
        return this.Provider.translate(fileName, 'SinBalancero');
    }
    get Si(): string {
        return this.Provider.translate(fileName, 'Si');
    }

    get No(): string {
        return this.Provider.translate(fileName, 'No');
    }

    get Rechazar(): string {
        return this.Provider.translate(fileName, 'Rechazar');
    }
    get Consultar(): string {
        return this.Provider.translate(fileName, 'Consultar');
    }
    get Modificacion(): string {
        return this.Provider.translate(fileName, 'Modificacion');
    }
    get ExportarAExcel(): string {
        return this.Provider.translate(fileName, 'ExportarAExcel');
    }
    get Todos(): string {
        return this.Provider.translate(fileName, 'Todos');
    }
    get Buscar(): string {
        return this.Provider.translate(fileName, 'Buscar');
    }
    get Limpiar(): string {
        return this.Provider.translate(fileName, 'Limpiar');
    }
    get Busqueda(): string {
        return this.Provider.translate(fileName, 'Busqueda');
    }
    get ResultadoBusqueda(): string {
        return this.Provider.translate(fileName, 'ResultadoBusqueda');
    }
    get Modificar(): string {
        return this.Provider.translate(fileName, 'Modificar');
    }
    get Copiar(): string {
        return this.Provider.translate(fileName, 'Copiar');
    }
    get ContinuarPostLab(): string {
        return this.Provider.translate(fileName, 'ContinuarPostLab');
    }
    get Tarjeta(): string {
        return this.Provider.translate(fileName, 'Tarjeta');
    }
    get QR(): string {
        return this.Provider.translate(fileName, 'QR');
    }
    get CodigoTarjeta(): string {
        return this.Provider.translate(fileName, 'CodigoTarjeta');
    }
    get Patente(): string {
        return this.Provider.translate(fileName, 'Patente');
    }
    get Producto(): string {
        return this.Provider.translate(fileName, 'Producto');
    }
    get Estado(): string {
        return this.Provider.translate(fileName, 'Estado');
    }
    get FechaHoraCalado(): string {
        return this.Provider.translate(fileName, 'FechaHoraCalado');
    }
    get FechaHoraModificacion(): string {
        return this.Provider.translate(fileName, 'FechaHoraModificacion');
    }
    get DocumentoPorte(): string {
        return this.Provider.translate(fileName, 'DocumentoPorte');
    }
    get Entregador(): string {
        return this.Provider.translate(fileName, 'Entregador');
    }
    get FechaEntrada(): string {
        return this.Provider.translate(fileName, 'FechaEntrada');
    }
    get TipoDocumentoPorte(): string {
        return this.Provider.translate(fileName, 'TipoDocumentoPorte');
    }
    get NumeroDocumentoPorte(): string {
        return this.Provider.translate(fileName, 'NumeroDocumentoPorte');
    }
    get CodigoTrazabilidadGrano(): string {
        return this.Provider.translate(fileName, 'CodigoTrazabilidadGrano');
    }
    get CodigoCupo(): string {
        return this.Provider.translate(fileName, 'CodigoCupo');
    }
    get Turno(): string {
        return this.Provider.translate(fileName, 'Turno');
    }
    get Motivo(): string {
        return this.Provider.translate(fileName, 'Motivo');
    }

    get RegistrarDecision(): string {
        return this.Provider.translate(fileName, 'RegistrarDecision');
    }

    get EnCircuito(): string {
        return this.Provider.translate(fileName, 'EnCircuito');
    }

    get Rechazados(): string {
        return this.Provider.translate(fileName, 'Rechazados');
    }

    get Agregar(): string {
        return this.Provider.translate(fileName, 'Agregar');
    }
    get Eliminar(): string {
        return this.Provider.translate(fileName, 'Eliminar');
    }
    get Datos(): string {
        return this.Provider.translate(fileName, 'Datos');
    }
    get NroPlataforma(): string {
        return this.Provider.translate(fileName, 'NroPlataforma');
    }
    get DescripcionPlataforma(): string {
        return this.Provider.translate(fileName, 'DescripcionPlataforma');
    }
    get TipoTransporte(): string {
        return this.Provider.translate(fileName, 'TipoTransporte');
    }
    get Activo(): string {
        return this.Provider.translate(fileName, 'Activo');
    }
    get NroSilo(): string {
        return this.Provider.translate(fileName, 'NroSilo');
    }
    get DescripcionSilo(): string {
        return this.Provider.translate(fileName, 'DescripcionSilo');
    }
    get Grado(): string {
        return this.Provider.translate(fileName, 'Grado');
    }
    get ProteinaMinimo(): string {
        return this.Provider.translate(fileName, 'ProteinaMinimo');
    }
    get ProteinaMaximo(): string {
        return this.Provider.translate(fileName, 'ProteinaMaximo');
    }
    get HumedadMinimo(): string {
        return this.Provider.translate(fileName, 'HumedadMinimo');
    }
    get HumedadMaximo(): string {
        return this.Provider.translate(fileName, 'HumedadMaximo');
    }
    get Error(): string {
        return this.Provider.translate(fileName, 'Error');
    }
    get AsignarTarjeta(): string {
        return this.Provider.translate(fileName, 'AsignarTarjeta');
    }
    get ServicioAfip(): string {
        return this.Provider.translate(fileName, 'ServicioAfip');
    }
    get CartaPorte(): string {
        return this.Provider.translate(fileName, 'CartaPorte');
    }
    get EstadoCamion(): string {
        return this.Provider.translate(fileName, 'EstadoCamion');
    }
    get ValoresHumedad(): string {
        return this.Provider.translate(fileName, 'ValoresHumedad');
    }
    get ValoresProteinas(): string {
        return this.Provider.translate(fileName, 'ValoresProteinas');
    }
    get NroTicket(): string {
        return this.Provider.translate(fileName, 'NroTicket');
    }
    get Cosecha(): string {
        return this.Provider.translate(fileName, 'Cosecha');
    }
    get Vendedor(): string {
        return this.Provider.translate(fileName, 'Vendedor');
    }
    get Destinatario(): string {
        return this.Provider.translate(fileName, 'Destinatario');
    }
    get Finalidad(): string {
        return this.Provider.translate(fileName, 'Finalidad');
    }
    get TipoMovimiento(): string {
        return this.Provider.translate(fileName, 'TipoMovimiento');
    }
    get PatenteCamion(): string {
        return this.Provider.translate(fileName, 'PatenteCamion');
    }
    get Confirmar(): string {
        return this.Provider.translate(fileName, 'Confirmar');
    }
    get TipoNumeroPorte(): string {
        return this.Provider.translate(fileName, 'TipoNumeroPorte');
    }
    get CodBarra(): string {
        return this.Provider.translate(fileName, 'CodBarra');
    }
    get EstadoMuestra(): string {
        return this.Provider.translate(fileName, 'EstadoMuestra');
    }
    get Camara(): string {
        return this.Provider.translate(fileName, 'Camara');
    }
    get TipoAnalisis(): string {
        return this.Provider.translate(fileName, 'TipoAnalisis');
    }
    get FechaAut(): string {
        return this.Provider.translate(fileName, 'FechaAut');
    }
    get FechaEnvio(): string {
        return this.Provider.translate(fileName, 'FechaEnvio');
    }
    get Fecha(): string {
        return this.Provider.translate(fileName, 'Fecha');
    }
    get FechaYHora(): string {
      return this.Provider.translate(fileName, 'FechaYHora');
  }
    get Ubicacion(): string {
        return this.Provider.translate(fileName, 'Ubicacion');
    }
    get Descartar(): string {
        return this.Provider.translate(fileName, 'Descartar');
    }
    get Autorizar(): string {
        return this.Provider.translate(fileName, 'Autorizar');
    }
    get CambiarCodBarra(): string {
        return this.Provider.translate(fileName, 'CambiarCodBarra');
    }
    get ReversarEstadoMuestra(): string {
        return this.Provider.translate(fileName, 'ReversarEstadoMuestra');
    }
    get FechaGeneracion(): string {
        return this.Provider.translate(fileName, 'FechaGeneracion');
    }
    get ModoAutomaticoManual(): string {
        return this.Provider.translate(fileName, 'ModoAutomaticoManual');
    }
    get EnvioMailAutomaticoManual(): string {
        return this.Provider.translate(fileName, 'EnvioMailAutomaticoManual');
    }
    get FechaHoraProgramada(): string {
        return this.Provider.translate(fileName, 'FechaHoraProgramada');
    }
    get DescripcionTarea(): string {
        return this.Provider.translate(fileName, 'DescripcionTarea');
    }
    get AutorizarEnFormaAgil(): string {
        return this.Provider.translate(fileName, 'AutorizarEnFormaAgil');
    }
    get Vagon(): string {
        return this.Provider.translate(fileName, 'Vagon');
    }
    get ReversarSalida(): string {
        return this.Provider.translate(fileName, 'ReversarSalida');
    }
    get FechaSalida(): string {
        return this.Provider.translate(fileName, 'FechaSalida');
    }
    get RebajaConvenida(): string {
        return this.Provider.translate(fileName, 'RebajaConvenida');
    }
    get CodigoBarra(): string {
        return this.Provider.translate(fileName, 'CodigoBarra');
    }
    get Observacion(): string {
        return this.Provider.translate(fileName, 'Observacion');
    }
    get EliminarMuestraLaboratorio(): string {
        return this.Provider.translate(fileName, 'EliminarMuestraLaboratorio');
    }
    get Acoplado(): string {
        return this.Provider.translate(fileName, 'Acoplado');
    }
    get FechaHora(): string {
        return this.Provider.translate(fileName, 'FechaHora');
    }
    get ControlPeso(): string {
        return this.Provider.translate(fileName, 'ControlPeso');
    }
    get Balanza(): string {
        return this.Provider.translate(fileName, 'Balanza');
    }
    get TipoBalanza(): string {
        return this.Provider.translate(fileName, 'TipoBalanza');
    }
    get Peso(): string {
        return this.Provider.translate(fileName, 'Peso');
    }
    get PesoBruto(): string {
        return this.Provider.translate(fileName, 'PesoBruto');
    }
    get Moneda(): string {
        return this.Provider.translate(fileName, 'Moneda');
    }
    get MedioDePago(): string {
        return this.Provider.translate(fileName, 'MedioDePago');
    }
    get BalanzaEntrada(): string {
        return this.Provider.translate(fileName, 'BalanzaEntrada');
    }
    get BalanzaSalida(): string {
        return this.Provider.translate(fileName, 'BalanzaSalida');
    }
    get Diferencia(): string {
        return this.Provider.translate(fileName, 'Diferencia');
    }
    get CodigoConfirmacionManual(): string {
        return this.Provider.translate(fileName, 'CodigoConfirmacionManual');
    }
    get FechaAutorizacionDesde(): string {
        return this.Provider.translate(fileName, 'FechaAutorizacionDesde');
    }
    get FechaAutorizacionHasta(): string {
        return this.Provider.translate(fileName, 'FechaAutorizacionHasta');
    }
    get FechaDesde(): string {
        return this.Provider.translate(fileName, 'FechaDesde');
    }
    get FechaHasta(): string {
        return this.Provider.translate(fileName, 'FechaHasta');
    }
    get FechaOperacion(): string {
        return this.Provider.translate(fileName, 'FechaOperacion');
    }
    get KilosBruto(): string {
        return this.Provider.translate(fileName, 'KilosBruto');
    }
    get KilosTara(): string {
        return this.Provider.translate(fileName, 'KilosTara');
    }
    get Transportista(): string {
        return this.Provider.translate(fileName, 'Transportista');
    }
    get NumeroCEE(): string {
        return this.Provider.translate(fileName, 'NumeroCEE');
    }
    get KilometrosRecorridos(): string {
        return this.Provider.translate(fileName, 'KilometrosRecorridos');
    }
    get TarifaDeReferencia(): string {
        return this.Provider.translate(fileName, 'TarifaDeReferencia');
    }
    get TarifaTN(): string {
        return this.Provider.translate(fileName, 'TarifaTN');
    }
    get FechaCarga(): string {
        return this.Provider.translate(fileName, 'FechaCarga');
    }
    get FechaVencimiento(): string {
        return this.Provider.translate(fileName, 'FechaVencimiento');
    }
    get Titular(): string {
        return this.Provider.translate(fileName, 'Titular');
    }
    get TitularCP(): string {
        return this.Provider.translate(fileName, 'TitularCP');
    }
    get CorredorComprador(): string {
        return this.Provider.translate(fileName, 'CorredorComprador');
    }
    get Procedencia(): string {
        return this.Provider.translate(fileName, 'Procedencia');
    }
    get Chofer(): string {
        return this.Provider.translate(fileName, 'Chofer');
    }
    get Corredor(): string {
        return this.Provider.translate(fileName, 'Corredor');
    }
    get Decision(): string {
        return this.Provider.translate(fileName, 'Decision');
    }
    get FechaStockSAN(): string {
        return this.Provider.translate(fileName, 'FechaStockSAN');
    }
    get NumeroDeVagon(): string {
        return this.Provider.translate(fileName, 'NumeroDeVagon');
    }
    get CTG(): string {
        return this.Provider.translate(fileName, 'CTG');
    }
    get TramiteCOT(): string {
        return this.Provider.translate(fileName, 'TramiteCOT');
    }
    get COT(): string {
        return this.Provider.translate(fileName, 'COT');
    }
    get CodCancelacionCTG(): string {
        return this.Provider.translate(fileName, 'CodCancelacionCTG');
    }
    get PesoNeto(): string {
        return this.Provider.translate(fileName, 'PesoNeto');
    }
    get Observaciones(): string {
        return this.Provider.translate(fileName, 'Observaciones');
    }
    get Habilitado(): string {
        return this.Provider.translate(fileName, 'Habilitado');
    }
    get Reintentar(): string {
        return this.Provider.translate(fileName, 'Reintentar');
    }
    get VerError(): string {
        return this.Provider.translate(fileName, 'VerError');
    }
    get DescargarArchivo(): string {
        return this.Provider.translate(fileName, 'DescargarArchivo');
    }
    get Usuario(): string {
        return this.Provider.translate(fileName, 'Usuario');
    }
    get Contraseña(): string {
        return this.Provider.translate(fileName, 'Contraseña');
    }
    get Notificacion(): string {
        return this.Provider.translate(fileName, 'Notificacion');
    }
    get CamionVagon(): string {
        return this.Provider.translate(fileName, 'CamionVagon');
    }
    get Ferrocarril(): string {
        return this.Provider.translate(fileName, 'Ferrocarril');
    }
    get Operativo(): string {
        return this.Provider.translate(fileName, 'Operativo');
    }
    get Cancelar(): string {
        return this.Provider.translate(fileName, 'Cancelar');
    }
    get ServicioSan(): string {
        return this.Provider.translate(fileName, 'ServicioSan');
    }
    get FechaPocesamiento(): string {
        return this.Provider.translate(fileName, 'FechaPocesamiento');
    }
    get SinPasarASan(): string {
        return this.Provider.translate(fileName, 'SinPasarASan');
    }
    get Terminal(): string {
        return this.Provider.translate(fileName, 'Terminal');
    }
    get Destino(): string {
        return this.Provider.translate(fileName, 'Destino');
    }
    get Subject(): string {
        return this.Provider.translate(fileName, 'Subject');
    }
    get Tipo(): string {
        return this.Provider.translate(fileName, 'Tipo');
    }
    get Descripcion(): string {
        return this.Provider.translate(fileName, 'Descripcion');
    }
    get Cuerpo(): string {
        return this.Provider.translate(fileName, 'Cuerpo');
    }
    get Mail(): string {
        return this.Provider.translate(fileName, 'Mail');
    }
    get Rol(): string {
        return this.Provider.translate(fileName, 'Rol');
    }
    get NombreAD(): string {
        return this.Provider.translate(fileName, 'NombreAD');
    }
    get Nombre(): string {
        return this.Provider.translate(fileName, 'Nombre');
    }
    get Apellido(): string {
        return this.Provider.translate(fileName, 'Apellido');
    }
    get Circuito(): string {
        return this.Provider.translate(fileName, 'Circuito');
    }
    get Actividad(): string {
        return this.Provider.translate(fileName, 'Actividad');
    }
    get Caracteristica(): string {
        return this.Provider.translate(fileName, 'Caracteristica');
    }
    get Cuit(): string {
        return this.Provider.translate(fileName, 'Cuit');
    }
    get Cuil(): string {
        return this.Provider.translate(fileName, 'Cuil');
    }
    get CodigoPostal(): string {
        return this.Provider.translate(fileName, 'CodigoPostal');
    }
    get CodigoProducto(): string {
        return this.Provider.translate(fileName, 'CodigoProducto');
    }
    get CodigoCamara(): string {
        return this.Provider.translate(fileName, 'CodigoCamara');
    }
    get Codigo(): string {
        return this.Provider.translate(fileName, 'Codigo');
    }
    get PendienteSupervisor(): string {
        return this.Provider.translate(fileName, 'PendienteSupervisor');
    }
    get TipoProducto(): string {
        return this.Provider.translate(fileName, 'TipoProducto');
    }
    get Permiso(): string {
        return this.Provider.translate(fileName, 'Permiso');
    }
    get PuestoTrabajo(): string {
        return this.Provider.translate(fileName, 'PuestoTrabajo');
    }
    get ApellidoYNombre(): string {
        return this.Provider.translate(fileName, 'ApellidoYNombre');
    }
    get Impresora(): string {
        return this.Provider.translate(fileName, 'Impresora');
    }
    get UncPath(): string {
        return this.Provider.translate(fileName, 'UncPath');
    }
    get Dispositivo(): string {
        return this.Provider.translate(fileName, 'Dispositivo');
    }
    get TipoDispositivo(): string {
        return this.Provider.translate(fileName, 'TipoDispositivo');
    }
    get EstadoInicial(): string {
        return this.Provider.translate(fileName, 'EstadoInicial');
    }
    get ActividadCircuito(): string {
        return this.Provider.translate(fileName, 'ActividadCircuito');
    }
    get SentidoBalanza(): string {
        return this.Provider.translate(fileName, 'SentidoBalanza');
    }
    get Tope(): string {
        return this.Provider.translate(fileName, 'Tope');
    }
    get AutorizacionBalanza(): string {
        return this.Provider.translate(fileName, 'AutorizacionBalanza');
    }
    get MotivoSancion(): string {
        return this.Provider.translate(fileName, 'MotivoSancion');
    }
    get Responsable(): string {
        return this.Provider.translate(fileName, 'Responsable');
    }
    get FechaExpiracion(): string {
        return this.Provider.translate(fileName, 'FechaExpiracion');
    }
    get FechaLevanto(): string {
        return this.Provider.translate(fileName, 'FechaLevanto');
    }
    get Penalizacion(): string {
        return this.Provider.translate(fileName, 'Penalizacion');
    }
    get Ambiente(): string {
        return this.Provider.translate(fileName, 'Ambiente');
    }
    get TipoAmbiente(): string {
        return this.Provider.translate(fileName, 'TipoAmbiente');
    }
    get UbicacionFisica(): string {
        return this.Provider.translate(fileName, 'UbicacionFisica');
    }
    get ConexionSobresTransporte(): string {
        return this.Provider.translate(fileName, 'ConexionSobresTransporte');
    }
    get ConexionSAN(): string {
        return this.Provider.translate(fileName, 'ConexionSAN');
    }
    get TipoPuesto(): string {
        return this.Provider.translate(fileName, 'TipoPuesto');
    }
    get Accion(): string {
        return this.Provider.translate(fileName, 'Accion');
    }
    get DireccionIP(): string {
        return this.Provider.translate(fileName, 'DireccionIP');
    }
    get AutorizacionPuestoTarjeta(): string {
        return this.Provider.translate(fileName, 'AutorizacionPuestoTarjeta');
    }
    get Automatico(): string {
        return this.Provider.translate(fileName, 'Automatico');
    }
    get Humedimetro(): string {
        return this.Provider.translate(fileName, 'Humedimetro');
    }
    get CoeficienteConversionLitros(): string {
        return this.Provider.translate(fileName, 'CoeficienteConversionLitros');
    }
    get Rubro(): string {
        return this.Provider.translate(fileName, 'Rubro');
    }
    get RubroCalidad(): string {
        return this.Provider.translate(fileName, 'RubroCalidad');
    }
    get EquivalenciaArchestra(): string {
        return this.Provider.translate(fileName, 'EquivalenciaArchestra');
    }
    get TipoTarjeta(): string {
        return this.Provider.translate(fileName, 'TipoTarjeta');
    }
    get Abreviatura(): string {
        return this.Provider.translate(fileName, 'Abreviatura');
    }
    get LimiteHumedad(): string {
        return this.Provider.translate(fileName, 'LimiteHumedad');
    }
    get LimiteHumedadRechazoCalidad(): string {
        return this.Provider.translate(fileName, 'LimiteHumedadRechazoCalidad');
    }
    get HoraCorteCupo(): string {
        return this.Provider.translate(fileName, 'HoraCorteCupo');
    }
    get MotivoCupo(): string {
        return this.Provider.translate(fileName, 'MotivoCupo');
    }
    get Sede(): string {
        return this.Provider.translate(fileName, 'Sede');
    }
    get DiferenciaDiasFiltroGeneracionArchivoMuestra(): string {
        return this.Provider.translate(fileName, 'DiferenciaDiasFiltroGeneracionArchivoMuestra');
    }
    get DiferenciaDiasFiltroControlPeso(): string {
        return this.Provider.translate(fileName, 'DiferenciaDiasFiltroControlPeso');
    }
    get HoraExpiracionRespuestaEntregador(): string {
        return this.Provider.translate(fileName, 'HoraExpiracionRespuestaEntregador');
    }
    get CopiasTicketCalidadVagon(): string {
        return this.Provider.translate(fileName, 'CopiasTicketCalidadVagon');
    }
    get CopiasTicketCalidadCamion(): string {
        return this.Provider.translate(fileName, 'CopiasTicketCalidadCamion');
    }
    get CopiasTicketPesaje(): string {
        return this.Provider.translate(fileName, 'CopiasTicketPesaje');
    }
    get CopiasRemito(): string {
        return this.Provider.translate(fileName, 'CopiasRemito');
    }
    get FormatoPatente(): string {
        return this.Provider.translate(fileName, 'FormatoPatente');
    }
    get Direccion(): string {
        return this.Provider.translate(fileName, 'Direccion');
    }
    get Sociedad(): string {
        return this.Provider.translate(fileName, 'Sociedad');
    }
    get Ingreso(): string {
        return this.Provider.translate(fileName, 'Ingreso');
    }
    get Egreso(): string {
        return this.Provider.translate(fileName, 'Egreso');
    }
    get SituacionEntrada(): string {
        return this.Provider.translate(fileName, 'SituacionEntrada');
    }
    get SituacionSalida(): string {
        return this.Provider.translate(fileName, 'SituacionSalida');
    }
    get Descarga(): string {
        return this.Provider.translate(fileName, 'Descarga');
    }
    get Carga(): string {
        return this.Provider.translate(fileName, 'Carga');
    }
    get Descargo(): string {
        return this.Provider.translate(fileName, 'Descargo');
    }
    get DestinoPostCalado(): string {
        return this.Provider.translate(fileName, 'DestinoPostCalado');
    }
    get Plataforma(): string {
        return this.Provider.translate(fileName, 'Plataforma');
    }
    get CodigoDesde(): string {
        return this.Provider.translate(fileName, 'CodigoDesde');
    }
    get CodigoHasta(): string {
        return this.Provider.translate(fileName, 'CodigoHasta');
    }
    get TipoDocumentoPorteTipoProducto(): string {
        return this.Provider.translate(fileName, 'TipoDocumentoPorteTipoProducto');
    }
    get GrupoProductos(): string {
        return this.Provider.translate(fileName, 'GrupoProductos');
    }
    get Orden(): string {
        return this.Provider.translate(fileName, 'Orden');
    }
    get valorRecepcionMinimo(): string {
        return this.Provider.translate(fileName, 'valorRecepcionMinimo');
    }
    get valorRecepcionMaximo(): string {
        return this.Provider.translate(fileName, 'valorRecepcionMaximo');
    }
    get OrdenCarga(): string {
        return this.Provider.translate(fileName, 'OrdenCarga');
    }
    get NroViaje(): string {
        return this.Provider.translate(fileName, 'NroViaje');
    }
    get PatenteAcoplado(): string {
        return this.Provider.translate(fileName, 'PatenteAcoplado');
    }
    get FechaVigenciaDesdeHasta(): string {
        return this.Provider.translate(fileName, 'FechaVigenciaDesdeHasta');
    }
    get EstadoViaje(): string {
        return this.Provider.translate(fileName, 'EstadoViaje');
    }
    get Camion(): string {
        return this.Provider.translate(fileName, 'Camion');
    }
    get TipoPesada(): string {
        return this.Provider.translate(fileName, 'TipoPesada');
    }
    get DescControl(): string {
        return this.Provider.translate(fileName, 'DescControl');
    }
    get PorDefecto(): string {
        return this.Provider.translate(fileName, 'PorDefecto');
    }
    get ImpresoraHabilitada(): string {
        return this.Provider.translate(fileName, 'ImpresoraHabilitada');
    }
    get Intermediario(): string {
        return this.Provider.translate(fileName, 'Intermediario');
    }
    get Cargo(): string {
        return this.Provider.translate(fileName, 'Cargo');
    }
    get Archivo(): string {
        return this.Provider.translate(fileName, 'Archivo');
    }
    get Detalle(): string {
        return this.Provider.translate(fileName, 'Detalle');
    }
    get DescargaCarga(): string {
        return this.Provider.translate(fileName, 'DescargaCarga');
    }
    get Copiado(): string {
        return this.Provider.translate(fileName, 'Copiado');
    }
    get UsuarioCreacion(): string {
        return this.Provider.translate(fileName, 'UsuarioCreacion');
    }
    get UsuarioOrigen(): string {
        return this.Provider.translate(fileName, 'UsuarioOrigen');
    }
    get UsuarioDestino(): string {
        return this.Provider.translate(fileName, 'UsuarioDestino');
    }
    get AnularValidacionCupo(): string {
        return this.Provider.translate(fileName, 'AnularValidacionCupo');
    }
    get FechaIngreso(): string {
        return this.Provider.translate(fileName, 'FechaIngreso');
    }
    get EstadoCupo(): string {
        return this.Provider.translate(fileName, 'EstadoCupo');
    }
    get Coeficiente(): string {
        return this.Provider.translate(fileName, 'Coeficiente');
    }
    get SedeOrigen(): string {
        return this.Provider.translate(fileName, 'SedeOrigen');
    }
    get SedeDestino(): string {
        return this.Provider.translate(fileName, 'SedeDestino');
    }
    get ErrorAfip(): string {
        return this.Provider.translate(fileName, 'ErrorAfip');
    }
    get Remito(): string {
        return this.Provider.translate(fileName, 'Remito');
    }
    get SobreTransporte(): string {
        return this.Provider.translate(fileName, 'SobreTransporte');
    }
    get Transporte(): string {
        return this.Provider.translate(fileName, 'Transporte');
    }
    get FechaCreacion(): string {
        return this.Provider.translate(fileName, 'FechaCreacion');
    }
    get FechaImportacion(): string {
        return this.Provider.translate(fileName, 'FechaImportacion');
    }
    get NombreUsuarioCreacion(): string {
        return this.Provider.translate(fileName, 'NombreUsuarioCreacion');
    }
    get AmbienteCreacion(): string {
        return this.Provider.translate(fileName, 'AmbienteCreacion');
    }
    get Exito(): string {
        return this.Provider.translate(fileName, 'Exito');
    }
    get CodigoTipo(): string {
        return this.Provider.translate(fileName, 'CodigoTipo');
    }
    get ObligatorioSAN(): string {
        return this.Provider.translate(fileName, 'ObligatorioSAN');
    }
    get ObligatorioPlanta(): string {
        return this.Provider.translate(fileName, 'ObligatorioPlanta');
    }
    get Importar(): string {
        return this.Provider.translate(fileName, 'Importar');
    }
    get NombreUsuarioImportacion(): string {
        return this.Provider.translate(fileName, 'NombreUsuarioImportacion');
    }
    get NumeroTarjeta(): string {
        return this.Provider.translate(fileName, 'NumeroTarjeta');
    }
    get Suplencia(): string {
        return this.Provider.translate(fileName, 'Suplencia');
    }
    get AnalisisPorTecnologia(): string {
        return this.Provider.translate(fileName, 'AnalisisPorTecnologia');
    }
    get EsEspecial(): string {
        return this.Provider.translate(fileName, 'EsEspecial');
    }
    get TiempoLimite(): string {
        return this.Provider.translate(fileName, 'TiempoLimite');
    }
    get TiempoLimitePorEstado(): string {
        return this.Provider.translate(fileName, 'TiempoLimitePorEstado');
    }
    get LugarCarga(): string {
        return this.Provider.translate(fileName, 'LugarCarga');
    }
    get LugarDescarga(): string {
        return this.Provider.translate(fileName, 'LugarDescarga');
    }
    get EsperePorFavor(): string {
        return this.Provider.translate(fileName, 'EsperePorFavor');
    }
    get PuntoCarga(): string {
        return this.Provider.translate(fileName, 'PuntoCarga');
    }
    get PlataformaPCarga(): string {
        return this.Provider.translate(fileName, 'PlataformaPCarga');
    }
    get TicketDePago(): string {
        return this.Provider.translate(fileName, 'TicketDePago');
    }
    get ControlPatrimonial(): string {
        return this.Provider.translate(fileName, 'ControlPatrimonial');
    }
    get LeyendaGmp(): string {
        return this.Provider.translate(fileName, 'LeyendaGmp');
    }
    get FinalidadEnvioPdfTicketBalanza(): string {
        return this.Provider.translate(fileName, 'FinalidadEnvioPdfTicketBalanza');
    }
    get CantidadCopiasOblea(): string {
        return this.Provider.translate(fileName, 'CantidadCopiasOblea');
    }
    get Laboratorio(): string {
        return this.Provider.translate(fileName, 'Laboratorio');
    }
    get Aviso(): string {
        return this.Provider.translate(fileName, 'Aviso');
    }
    get BalanzasAutomatizadas(): string {
        return this.Provider.translate(fileName, 'BalanzasAutomatizadas');
    }
    get TipoEvento(): string {
        return this.Provider.translate(fileName, 'TipoEvento');
    }
    get RequiereAccion(): string {
        return this.Provider.translate(fileName, 'RequiereAccion');
    }
    get MensajeDashboard(): string {
        return this.Provider.translate(fileName, 'MensajeDashboard');
    }
    get MensajeArchestra(): string {
        return this.Provider.translate(fileName, 'MensajeArchestra');
    }
    get Dashboard(): string {
        return this.Provider.translate(fileName, 'Dashboard');
    }
    get Archestra(): string {
        return this.Provider.translate(fileName, 'Archestra');
    }
    get Correo(): string {
        return this.Provider.translate(fileName, 'Correo');
    }
    get Evento(): string {
        return this.Provider.translate(fileName, 'Evento');
    }
    get TipoGrano(): string {
        return this.Provider.translate(fileName, 'TipoGrano');
    }
}
