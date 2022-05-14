
export enum Acciones {
    HabilitarPlataformaBalanza = 1,
    PesarCamion = 2,
    LiberarPlataformaBalanza = 3,
    LecturaFoss = 4,
    LecturaDickeyJohn = 5,
    LecturaTarjeta = 6,
    WSAFIP = 7,
    TomarPesoBalanzaVagon1 = 8,
    TomarPesoBalanzaVagon2 = 9
}
export enum ComportamientoAfip {
    RegimenPapel = 1,
    RegimenElectronico = 2
}
export enum Actividades {
    ControlarDescargaCamionTransportesVarios = 1,
    ControlarDescargaCamionCereales = 2,
    IngresarCalidadCalado = 3,
    CapturarPesoBruto = 4,
    CapturarPesoTara = 5,
    RegistrarSalidaConDescarga = 6,
    RegistrarSalidaSinDescarga = 7,
    ModificarCalidad = 8,
    ModificarCalidadFueraDePuesto = 9,
    SinRespuestaEntregador = 10,
    ContinuarCircuitoPostLab = 11,
    ModificarControlIngreso = 12,
    ModificarControlFueraPuesto = 13,
    AsignarTarjeta = 14,
    RechazarDescarga = 15,
    RegistrarDecisionEntregador = 16,
    Descargar = 17,
    ControlarDescargaCamionSubproductos = 18,
    ReversarSalida = 19,
    ControlarDescargaCamionNoGranos = 20,
    SacarDeCircuito = 21,
    ModificarControlFueraCircuito = 22,
    ModificarPesosFueraCircuito = 23,
    ModificarProductoFueraCircuito = 24,
    ModificarCalidadFueraCircuito = 25,
    RegistrarDecisionLaboratorio = 26,
    ControlarDescargaVagonCereales = 27,
    ControlarDescargaVagonNoGranos = 28,
    ModificarDocPorteVagonesFueraDePuesto = 29,
    DeterminarCoeficiente = 30,
    ControlarCalidad = 31,
    DeterminarCoeficientePostBalanza = 44,
    ControlarIngresoCargaCamion = 32,
    CapturarPesoTaraCarga = 33,
    CapturarPesoBrutoCarga = 34,
    RegistrarAprobacion = 35,
    RegistrarSalidaConCarga = 36,
    RegistrarSalidaSinCarga = 37,
    ReversarSalidaCarga = 38,
    ControlarDescargaCamionInsumos = 39,
    PreIngresarDescargaCamión = 40,
    ValidacionCupo = 40,
    AnularValidacionCupo = 43,
    ModificarValidacionCupo = 41,
    ModificarValidacionCupoFueraPuesto = 42,

}

export enum Caracteristicas {
    AsignarTarjetaControlDescarga = 1,
    ConfirmaCtgControlDescargaCereales = 3,
    EnviarACamara = 4,
    AsignacionReferenciaDestino = 5,
    AccionCaladoAptoDescarga= 6,
    AccionCaladoRechazar = 7,
    AccionCaladoPendienteSupervisor = 8,
    AccionCaladoPendienteEntregador = 9,
    AccionCaladoPendienteLaboratiorio = 10,
    TarjetaHabilitada = 11,
    CalculaCalidadSAN = 12,
    AsignaLugarDescargaCarga = 13,
    ConRechazoCTG = 14,
    AccionLaboratorioAprobar = 15,
    AccionLaboratorioRechazar = 16,
    AccionLaboratorioReCalar = 17,
    LiberarTarjeta = 18,
    ImprimirTicketBalanza = 19,
    ConfirmacionDefinitivaCTG = 20,
    ActualizarStock = 21,
    SinRechazoCTG = 22,
    SolicitarCTG = 23,
    ImprimirTicketPesajeCarga = 25,
    ImprimirRemitoPreimpreso = 26,
    ActualizarStockCarga = 27,
    IngresoConCupo = 28,
    IngresoSinCupo = 29,
    ImprimirTurnoPlaya = 30,
    ImprimirTicketCalidad = 31,
    InformarCambioEstadoViaje = 32,
    InformarCircularArriboCamion = 33,
    InformarCircularEgresoCamion = 34,
    AccionCaladoAceptarCalidad = 37,
    ImprimirCartaPorte = 38
}

export enum EstadosMovimiento {
    EstadoNinguno = 1,
    AptoBalanzaEntrada = 2,
    PendienteControl = 3,
    AptoCalado = 4,
    AptoControlSalidaPorRechazoCalidad = 5,
    AptoControlSalidaPorQuitaDeCircuito = 20,
    PendienteSupervisorCalidad = 6,
    PendienteEntregadorCalidad = 7,
    AptoControlSalidaSinDescargar = 8,
    AptoLaboratorio = 9,
    AptoControlEntrada = 10,
    Finalizado = 11,
    Rechazado = 12,
    AptoBalanzaSalida = 13,
    AptoControlCalidad = 28,
    AptoBalanzaSalidaSinDescargar = 14,
    AptoDescarga = 15,
    AptoControlSalida = 16,
    Desviado = 17,
    AptoCaladoPostLaboratorio = 18,
    AptoCobroParking = 19,
    PendienteAsignacionTarjeta = 21,
    PendienteCupo = 22,
    AptoBalanzaEntradaVueltaCargado = 23,
    AptoBalanzaSalidaVueltaVacio = 24,
    AptoAprobacionPatrimonial = 25
}

export enum Circuitos {
    BahiaBlancaDescargaCamionesVarios = 1
}

export enum MotivosEstadoMovimiento {
    Datos = 4
}

export enum Productos {
    Soja = 23,
    SojaEPA = 151
}

export enum TiposProducto {
    Cereal = 1,
    Insumos = 2,
    SubProductos = 3,
    Varios = 4,
    NoGranos = 5,
    Chatarra = 6,
    Decomiso = 7,
    InsumosLiquidos = 8
}

export enum TiposCoeficienteConversionLitros {
    Fijo = 1,
    Variable = 2
}

export enum AccionesCalidad {
    AptoDescarga = 1,
    PendienteSupervisor = 2,
    PendienteEntregador = 3,
    Rechazar = 4,
    PendienteLaboratorio = 5,
    aceptarCalidad = 6
}

export enum DecisionesLaboratorio {
    Aprobado = 1,
    Rechazado = 2,
    ReCalar = 3
}

export enum MotivosErrorBalanza {
    ProblemasConTarjeta = 1,
    EstadoIncorrecto = 2,
    ExedeToleranciaPeso = 3,
    DiferenciaPesoDocPorte = 4,
    ProductoCalidadIncorrecto = 5,
    ResolverConEntregador = 6,
    ControlPesoInterno = 7,
    DiferenciaPesoEntreBalanzas = 8,
    ExcedeTiempoEntreBalanzas = 9,
    BrutoMenorOIgualATara = 11,
    ExcedeCantidadOrdenDeCarga = 12,
    CargaInsuficiente = 13,
    ExcedeToleranciaNetoNegativo = 14,
    TaraInvalida = 15,
    StockInsuficiente = 16,
    RechazoLaboratorio = 17,
    ExcedeTiempoEntreCCalidadPatrimonialYBalanza = 18
}

export enum Operaciones {
    Alta = 1,
    Consulta = 2,
    Modificacion = 3,
    RegistroDecisionEntregador= 4,
    ContinuarCircuitoPostLab = 5
}

export enum EstadosMuestra {
    PendienteAutorizacion = 1,
    AutorizadoEnvioCamara = 3,
    Descartada = 4
}

export enum AccionesReversarSalida {
    ReversarHaciaCalado = 15,
    ReversarHaciaSupervisorCalado = 16,
    ReversarHaciaBalanzaEntrada = 14,
    ReversarHaciaBalanzaEntradaCarga = 22,
    ReversarHaciaControlCalidad = 24,
    ReversarHaciaControlPatrimonial = 25
}

export enum GrupoProducto {
    Soja = 1,
    Maiz = 2,
    Insumos = 3,
    Hexanos = 4,
    SubProductos = 5,
    Varios = 6,
    NoGrano = 7
}

export enum Sociedades {
    LDC = 1
}

export enum TipoFinalidad {
    CompraVenta = 1,
    Acopio = 2,
    Transferencia = 3,
    Fazon = 5,
    Elevacion = 6
}

export enum TiposTransporte {
    Camion = 1,
    Tren = 2
}

export enum TipoTransporteMovimiento {
    Camion = 'Cami�n',
    Tren = 'Tren'
}

export enum TiposDispositivo {
    Foss = 1,
    DickeyJohn = 2,
    BalanzaCamion = 3,
    TarjetaProx = 4,
    BalanzaVagon1 = 5,
    BalanzaVagon2 = 6
}
export enum TiposEvento {
    Exito = 1,
    Advertencia = 2,
    Error = 3
}

export enum EstadosInterfazSan {
    Pendiente = 1,
    Procesando = 2,
    Finalizado = 3,
    MovimientoRechazado = 4,
    ErrorTecnico = 5,
}

export enum ResultadosPesaje {
    Exito = 1,
    Error = 2,
    CargoConError = 3
}

export enum MenuIdentifiers {
    Login = 'Login',
    Home = 'Home'
}

export enum SentidosBalanza {
    Entrada = 1,
    Salida = 2,
    EntradaSalida = 3
}

export enum EstadosViaje {
    Pendiente = 1,
    EnProceso = 2,
    Realizado = 3,
    Anulado = 4,
    ReasignadoEntrada = 5,
    ReasignadoSalida = 6
}

export enum TiposDocumentoPorte {
    CartaDePorte = 1,
    CartaDePorteFerroviaria = 4,
    CartaDePorteCamion = 7,
    Remito = 10
}


export enum Permission {
    AdministrarActividadesCircuitos = 'AdministrarActividadesCircuitos',
    AdministrarActividadesCircuitosAgregar = 'AdministrarActividadesCircuitos.Agregar',
    AdministrarActividadesCircuitosConsultar = 'AdministrarActividadesCircuitos.Consultar',
    AdministrarActividadesCircuitosEliminar = 'AdministrarActividadesCircuitos.Eliminar',
    AdministrarActividadesCircuitosExportarAExcel = 'AdministrarActividadesCircuitos.ExportarAExcel',
    AdministrarActividadesCircuitosModificar = 'AdministrarActividadesCircuitos.Modificar',
    AdministrarAutorizacionesBalanza = 'AdministrarAutorizacionesBalanza',
    AdministrarAutorizacionesBalanzaAgregar = 'AdministrarAutorizacionesBalanza.Agregar',
    AdministrarAutorizacionesBalanzaConsultar = 'AdministrarAutorizacionesBalanza.Consultar',
    AdministrarAutorizacionesBalanzaCopiar = 'AdministrarAutorizacionesBalanza.Copiar',
    AdministrarAutorizacionesBalanzaEliminar = 'AdministrarAutorizacionesBalanza.Eliminar',
    AdministrarAutorizacionesBalanzaModificar = 'AdministrarAutorizacionesBalanza.Modificar',
    AdministrarAutorizacionesBalanzaTransportar = 'AdministrarAutorizacionesBalanza.Transportar',
    AdministrarCaracteristicas = 'AdministrarCaracteristicas',
    AdministrarCaracteristicasAgregar = 'AdministrarCaracteristicas.Agregar',
    AdministrarCaracteristicasConsultar = 'AdministrarCaracteristicas.Consultar',
    AdministrarCaracteristicasEliminar = 'AdministrarCaracteristicas.Eliminar',
    AdministrarCaracteristicasExportarAExcel = 'AdministrarCaracteristicas.ExportarAExcel',
    AdministrarCaracteristicasModificar = 'AdministrarCaracteristicas.Modificar',
    AdministrarChoferes = 'AdministrarChoferes',
    AdministrarChoferesAgregar = 'AdministrarChoferes.Agregar',
    AdministrarChoferesConsultar = 'AdministrarChoferes.Consultar',
    AdministrarChoferesExportarAExcel = 'AdministrarChoferes.ExportarAExcel',
    AdministrarChoferesModificar = 'AdministrarChoferes.Modificar',
    AdministrarCircuitos = 'AdministrarCircuitos',
    AdministrarCircuitosAgregar = 'AdministrarCircuitos.Agregar',
    AdministrarCircuitosConsultar = 'AdministrarCircuitos.Consultar',
    AdministrarCircuitosCopiar = 'AdministrarCircuitos.Copiar',
    AdministrarCircuitosEliminar = 'AdministrarCircuitos.Eliminar',
    AdministrarCircuitosExportarAExcel = 'AdministrarCircuitos.ExportarAExcel',
    AdministrarCircuitosModificar = 'AdministrarCircuitos.Modificar',
    AdministrarCircuitosTransportar = 'AdministrarCircuitos.Transportar',
    AdministrarDestinosPostCalado = 'AdministrarDestinosPostCalado',
    AdministrarDestinosPostCaladoAgregar = 'AdministrarDestinosPostCalado.Agregar',
    AdministrarDestinosPostCaladoConsultar = 'AdministrarDestinosPostCalado.Consultar',
    AdministrarDestinosPostCaladoEliminar = 'AdministrarDestinosPostCalado.Eliminar',
    AdministrarDestinosPostCaladoExportarAExcel = 'AdministrarDestinosPostCalado.ExportarAExcel',
    AdministrarDestinosPostCaladoModificar = 'AdministrarDestinosPostCalado.Modificar',
    AdministrarDispositivos = 'AdministrarDispositivos',
    AdministrarDispositivosAgregar = 'AdministrarDispositivos.Agregar',
    AdministrarDispositivosConsultar = 'AdministrarDispositivos.Consultar',
    AdministrarDispositivosCopiar = 'AdministrarDispositivos.Copiar',
    AdministrarDispositivosEliminar = 'AdministrarDispositivos.Eliminar',
    AdministrarDispositivosExportarAExcel = 'AdministrarDispositivos.ExportarAExcel',
    AdministrarDispositivosModificar = 'AdministrarDispositivos.Modificar',
    AdministrarEventos = 'AdministrarEventos',
    AdministrarEventosAgregar = 'AdministrarEventos.Agregar',
    AdministrarEventosConsultar = 'AdministrarEventos.Consultar',
    AdministrarEventosCopiar = 'AdministrarEventos.Copiar',
    AdministrarEventosEliminar = 'AdministrarEventos.Eliminar',
    AdministrarEventosExportarAExcel = 'AdministrarEventos.ExportarAExcel',
    AdministrarEventosModificar = 'AdministrarEventos.Modificar',
    AdministrarEquivalenciaRubros = 'AdministrarEquivalenciaRubros',
    AdministrarEquivalenciaRubrosAgregar = 'AdministrarEquivalenciaRubros.Agregar',
    AdministrarEquivalenciaRubrosConsultar = 'AdministrarEquivalenciaRubros.Consultar',
    AdministrarEquivalenciaRubrosEliminar = 'AdministrarEquivalenciaRubros.Eliminar',
    AdministrarEquivalenciaRubrosExportarAExcel = 'AdministrarEquivalenciaRubros.ExportarAExcel',
    AdministrarEquivalenciaRubrosModificar = 'AdministrarEquivalenciaRubros.Modificar',
    AdministrarEquivalenciasArchestraRubroCalidad = 'AdministrarEquivalenciasArchestraRubroCalidad',
    AdministrarEquivalenciasArchestraRubroCalidadConsultar = 'AdministrarEquivalenciasArchestraRubroCalidad.Consultar',
    AdministrarEquivalenciasArchestraRubroCalidadExportarAExcel = 'AdministrarEquivalenciasArchestraRubroCalidad.ExportarAExcel',
    AdministrarEquivalenciasArchestraRubroCalidadModificar = 'AdministrarEquivalenciasArchestraRubroCalidad.Modificar',
    AdministrarEquivalenciasArchestraRubroCalidadTransportar = 'AdministrarEquivalenciasArchestraRubroCalidad.Transportar',
    AdministrarLeyendaGmpPorSociedad = 'AdministrarLeyendaGmpPorSociedad',
    AdministrarLeyendaGmpPorSociedadAgregar = 'AdministrarLeyendaGmpPorSociedad.Agregar',
    AdministrarLeyendaGmpPorSociedadConsultar = 'AdministrarLeyendaGmpPorSociedad.Consultar',
    AdministrarLeyendaGmpPorSociedadEliminar = 'AdministrarLeyendaGmpPorSociedad.Eliminar',
    AdministrarLeyendaGmpPorSociedadExportarAExcel = 'AdministrarLeyendaGmpPorSociedad.ExportarAExcel',
    AdministrarLeyendaGmpPorSociedadModificar = 'AdministrarLeyendaGmpPorSociedad.Modificar',
    AdministrarFinalidadesEnvioPdfTicketBalanza = 'AdministrarFinalidadesEnvioPdfTicketBalanza',
    AdministrarFinalidadesEnvioPdfTicketBalanzaAgregar = 'AdministrarFinalidadesEnvioPdfTicketBalanza.Agregar',
    AdministrarFinalidadesEnvioPdfTicketBalanzaModificar = 'AdministrarFinalidadesEnvioPdfTicketBalanza.Modificar',
    AdministrarFinalidadesEnvioPdfTicketBalanzaConsultar = 'AdministrarFinalidadesEnvioPdfTicketBalanza.Consultar',
    AdministrarFinalidadesEnvioPdfTicketBalanzaExportarAExcel = 'AdministrarFinalidadesEnvioPdfTicketBalanza.ExportarAExcel',
    AdministrarGrupoProductoModificacionFueraCircuito = 'AdministrarGrupoProductoModificacionFueraCircuito',
    AdministrarGrupoProductoModificacionFueraCircuitoAgregar = 'AdministrarGrupoProductoModificacionFueraCircuito.Agregar',
    AdministrarGrupoProductoModificacionFueraCircuitoConsultar = 'AdministrarGrupoProductoModificacionFueraCircuito.Consultar',
    AdministrarGrupoProductoModificacionFueraCircuitoEliminar = 'AdministrarGrupoProductoModificacionFueraCircuito.Eliminar',
    AdministrarGrupoProductoModificacionFueraCircuitoExportarAExcel = 'AdministrarGrupoProductoModificacionFueraCircuito.ExportarAExcel',
    AdministrarGrupoProductoModificacionFueraCircuitoModificar = 'AdministrarGrupoProductoModificacionFueraCircuito.Modificar',
    AdministrarImpresoras = 'AdministrarImpresoras',
    AdministrarImpresorasAgregar = 'AdministrarImpresoras.Agregar',
    AdministrarImpresorasConsultar = 'AdministrarImpresoras.Consultar',
    AdministrarImpresorasEliminar = 'AdministrarImpresoras.Eliminar',
    AdministrarImpresorasExportarAExcel = 'AdministrarImpresoras.ExportarAExcel',
    AdministrarImpresorasModificar = 'AdministrarImpresoras.Modificar',
    AdministrarLecturaHumedimetro = 'AdministrarLecturaHumedimetro',
    AdministrarLecturaHumedimetroAgregar = 'AdministrarLecturaHumedimetro.Agregar',
    AdministrarLecturaHumedimetroConsultar = 'AdministrarLecturaHumedimetro.Consultar',
    AdministrarLecturaHumedimetroCopiar = 'AdministrarLecturaHumedimetro.Copiar',
    AdministrarLecturaHumedimetroEliminar = 'AdministrarLecturaHumedimetro.Eliminar',
    AdministrarLecturaHumedimetroExportarAExcel = 'AdministrarLecturaHumedimetro.ExportarAExcel',
    AdministrarLecturaHumedimetroModificar = 'AdministrarLecturaHumedimetro.Modificar',
    AdministrarLecturaHumedimetroTransportar = 'AdministrarLecturaHumedimetro.Transportar',
    AdministrarNotificaciones = 'AdministrarNotificaciones',
    AdministrarNotificacionesAgregar = 'AdministrarNotificaciones.Agregar',
    AdministrarNotificacionesConsultar = 'AdministrarNotificaciones.Consultar',
    AdministrarNotificacionesEliminar = 'AdministrarNotificaciones.Eliminar',
    AdministrarNotificacionesExportarAExcel = 'AdministrarNotificaciones.ExportarAExcel',
    AdministrarNotificacionesModificar = 'AdministrarNotificaciones.Modificar',
    AdministrarParametrosPorProducto = 'AdministrarParametrosPorProducto',
    AdministrarParametrosPorProductoAgregar = 'AdministrarParametrosPorProducto.Agregar',
    AdministrarParametrosPorProductoConsultar = 'AdministrarParametrosPorProducto.Consultar',
    AdministrarParametrosPorProductoExportarAExcel = 'AdministrarParametrosPorProducto.ExportarAExcel',
    AdministrarParametrosPorProductoModificar = 'AdministrarParametrosPorProducto.Modificar',
    AdministrarParametrosPorSociedad = 'AdministrarParametrosPorSociedad',
    AdministrarParametrosPorTerminal = 'AdministrarParametrosPorTerminal',
    AdministrarParametrosPorTerminalConsultar = 'AdministrarParametrosPorTerminal.Consultar',
    AdministrarParametrosPorTerminalExportarAExcel = 'AdministrarParametrosPorTerminal.ExportarAExcel',
    AdministrarParametrosPorTerminalModificar = 'AdministrarParametrosPorTerminal.Modificar',
    AdministrarParametrosPorTipoAnalisisCamara = 'AdministrarParametrosPorTipoAnalisisCamara',
    AdministrarParametrosPorTipoAnalisisCamaraAgregar = 'AdministrarParametrosPorTipoAnalisisCamara.Agregar',
    AdministrarParametrosPorTipoAnalisisCamaraConsultar = 'AdministrarParametrosPorTipoAnalisisCamara.Consultar',
    AdministrarParametrosPorTipoAnalisisCamaraExportarAExcel = 'AdministrarParametrosPorTipoAnalisisCamara.ExportarAExcel',
    AdministrarParametrosPorTipoAnalisisCamaraModificar = 'AdministrarParametrosPorTipoAnalisisCamara.Modificar',
    AdministrarPenalizacionChoferes = 'AdministrarPenalizacionChoferes',
    AdministrarPenalizacionChoferesAgregar = 'AdministrarPenalizacionChoferes.Agregar',
    AdministrarPenalizacionChoferesConsultar = 'AdministrarPenalizacionChoferes.Consultar',
    AdministrarPenalizacionChoferesExportarAExcel = 'AdministrarPenalizacionChoferes.ExportarAExcel',
    AdministrarPenalizacionChoferesModificar = 'AdministrarPenalizacionChoferes.Modificar',
    AdministrarPlataformas = 'AdministrarPlataformas',
    AdministrarPlataformasAgregar = 'AdministrarPlataformas.Agregar',
    AdministrarPlataformasConsultar = 'AdministrarPlataformas.Consultar',
    AdministrarPlataformasEliminar = 'AdministrarPlataformas.Eliminar',
    AdministrarPlataformasExportarAExcel = 'AdministrarPlataformas.ExportarAExcel',
    AdministrarPlataformasModificar = 'AdministrarPlataformas.Modificar',
    AdministrarProductosHabilitadosPorTerminal = 'AdministrarProductosHabilitadosPorTerminal',
    AdministrarProductosHabilitadosPorTerminalAExcel = 'AdministrarProductosHabilitadosPorTerminal.ExportarAExcel',
    AdministrarProductosHabilitadosPorTerminalAgregar = 'AdministrarProductosHabilitadosPorTerminal.Agregar',
    AdministrarProductosHabilitadosPorTerminalConsultar = 'AdministrarProductosHabilitadosPorTerminal.Consultar',
    AdministrarProductosHabilitadosPorTerminalModificar = 'AdministrarProductosHabilitadosPorTerminal.Modificar',
    AdministrarPuestosTrabajo = 'AdministrarPuestosTrabajo',
    AdministrarPuestosTrabajoAgregar = 'AdministrarPuestosTrabajo.Agregar',
    AdministrarPuestosTrabajoConsultar = 'AdministrarPuestosTrabajo.Consultar',
    AdministrarPuestosTrabajoEliminar = 'AdministrarPuestosTrabajo.Eliminar',
    AdministrarPuestosTrabajoExportarAExcel = 'AdministrarPuestosTrabajo.ExportarAExcel',
    AdministrarPuestosTrabajoModificar = 'AdministrarPuestosTrabajo.Modificar',
    AdministrarPuntosCarga = 'AdministrarPuntosCarga',
    AdministrarPuntosCargaAgregar = 'AdministrarPuntosCarga.Agregar',
    AdministrarPuntosCargaConsultar = 'AdministrarPuntosCarga.Consultar',
    AdministrarPuntosCargaEliminar = 'AdministrarPuntosCarga.Eliminar',
    AdministrarPuntosCargaExportarAExcel = 'AdministrarPuntosCarga.ExportarAExcel',
    AdministrarPuntosCargaModificar = 'AdministrarPuntosCarga.Modificar',
    AdministrarRangosCodigoBarraCamara = 'AdministrarRangosCodigoBarraCamara',
    AdministrarRangosCodigoBarraCamaraAgregar = 'AdministrarRangosCodigoBarraCamara.Agregar',
    AdministrarRangosCodigoBarraCamaraConsultar = 'AdministrarRangosCodigoBarraCamara.Consultar',
    AdministrarRangosCodigoBarraCamaraExportarAExcel = 'AdministrarRangosCodigoBarraCamara.ExportarAExcel',
    AdministrarRangosCodigoBarraCamaraModificar = 'AdministrarRangosCodigoBarraCamara.Modificar',
    AdministrarRestriccionesPorPuestoTrabajo = 'AdministrarRestriccionesPorPuestoTrabajo',
    AdministrarRestriccionesPorPuestoTrabajoAgregar = 'AdministrarRestriccionesPorPuestoTrabajo.Agregar',
    AdministrarRestriccionesPorPuestoTrabajoConsultar = 'AdministrarRestriccionesPorPuestoTrabajo.Consultar',
    AdministrarRestriccionesPorPuestoTrabajoEliminar = 'AdministrarRestriccionesPorPuestoTrabajo.Eliminar',
    AdministrarRestriccionesPorPuestoTrabajoModificar = 'AdministrarRestriccionesPorPuestoTrabajo.Modificar',
    AdministrarRoles = 'AdministrarRoles',
    AdministrarRolesAgregar = 'AdministrarRoles.Agregar',
    AdministrarRolesConsultar = 'AdministrarRoles.Consultar',
    AdministrarRolesEliminar = 'AdministrarRoles.Eliminar',
    AdministrarRolesModificar = 'AdministrarRoles.Modificar',
    AdministrarRolesTransportar = 'AdministrarRoles.Transportar',
    AdministrarSobresTransporte = 'AdministrarSobresTransporte',
    AdministrarSobresTransporteAgregar = 'AdministrarSobresTransporte.Agregar',
    AdministrarSobresTransporteAnular = 'AdministrarSobresTransporte.Anular',
    AdministrarSobresTransporteCerrar = 'AdministrarSobresTransporte.Cerrar',
    AdministrarSobresTransporteConsultar = 'AdministrarSobresTransporte.Consultar',
    AdministrarSobresTransporteModificar = 'AdministrarSobresTransporte.Modificar',
    AdministrarSobresTransporteVerDetalleError = 'AdministrarSobresTransporte.VerDetalleError',
    AdministrarSobresTransporteVerHistorial = 'AdministrarSobresTransporte.VerHistorial',
    AdministrarSuplencias = 'AdministrarSuplencias',
    AdministrarSuplenciasAgregar = 'AdministrarSuplencias.Agregar',
    AdministrarSuplenciasConsultar = 'AdministrarSuplencias.Consultar',
    AdministrarSuplenciasExportarAExcel = 'AdministrarSuplencias.ExportarAExcel',
    AdministrarSuplenciasModificar = 'AdministrarSuplencias.Modificar',
    AdministrarTarjetas = 'AdministrarTarjetas',
    AdministrarTarjetasAgregar = 'AdministrarTarjetas.Agregar',
    AdministrarTarjetasAutorizacion = 'AdministrarTarjetasAutorizacion',
    AdministrarTarjetasAutorizacionAgregar = 'AdministrarTarjetasAutorizacion.Agregar',
    AdministrarTarjetasAutorizacionConsultar = 'AdministrarTarjetasAutorizacion.Consultar',
    AdministrarTarjetasAutorizacionEliminar = 'AdministrarTarjetasAutorizacion.Eliminar',
    AdministrarTarjetasAutorizacionExportarAExcel = 'AdministrarTarjetasAutorizacion.ExportarAExcel',
    AdministrarTarjetasAutorizacionModificar = 'AdministrarTarjetasAutorizacion.Modificar',
    AdministrarTarjetasConsultar = 'AdministrarTarjetas.Consultar',
    AdministrarTarjetasEliminar = 'AdministrarTarjetas.Eliminar',
    AdministrarTarjetasExportarAExcel = 'AdministrarTarjetas.ExportarAExcel',
    AdministrarTarjetasImportarExcel = 'AdministrarTarjetas.ImportarExcel',
    AdministrarTarjetasModificar = 'AdministrarTarjetas.Modificar',
    AdministrarTiempoLimiteEstado = 'AdministrarTiempoLimiteEstado',
    AdministrarTiempoLimiteEstadoAgregar = 'AdministrarTiempoLimiteEstado.Agregar',
    AdministrarTiempoLimiteEstadoConsultar = 'AdministrarTiempoLimiteEstado.Consultar',
    AdministrarTiempoLimiteEstadoEliminar = 'AdministrarTiempoLimiteEstado.Eliminar',
    AdministrarTiempoLimiteEstadoExportarAExcel = 'AdministrarTiempoLimiteEstado.ExportarAExcel',
    AdministrarTiempoLimiteEstadoModificar = 'AdministrarTiempoLimiteEstado.Modificar',
    AdministrarTipoDocumentoPorteTipoProducto = 'AdministrarTipoDocumentoPorteTipoProducto',
    AdministrarTipoDocumentoPorteTipoProductoAgregar = 'AdministrarTipoDocumentoPorteTipoProducto.Agregar',
    AdministrarTipoDocumentoPorteTipoProductoConsultar = 'AdministrarTipoDocumentoPorteTipoProducto.Consultar',
    AdministrarTipoDocumentoPorteTipoProductoExportarAExcel = 'AdministrarTipoDocumentoPorteTipoProducto.ExportarAExcel',
    AdministrarTipoDocumentoPorteTipoProductoModificar = 'AdministrarTipoDocumentoPorteTipoProducto.Modificar',
    AdministrarTiposPuestosTrabajo = 'AdministrarTiposPuestosTrabajo',
    AdministrarTiposPuestosTrabajoAgregar = 'AdministrarTiposPuestosTrabajo.Agregar',
    AdministrarTiposPuestosTrabajoConsultar = 'AdministrarTiposPuestosTrabajo.Consultar',
    AdministrarTiposPuestosTrabajoExportarAExcel = 'AdministrarTiposPuestosTrabajo.ExportarAExcel',
    AdministrarTiposPuestosTrabajoModificar = 'AdministrarTiposPuestosTrabajo.Modificar',
    AdministrarUsuarios = 'AdministrarUsuarios',
    AdministrarUsuariosAgregar = 'AdministrarUsuarios.Agregar',
    AdministrarUsuariosConsultar = 'AdministrarUsuarios.Consultar',
    AdministrarUsuariosCopiar = 'AdministrarUsuarios.Copiar',
    AdministrarUsuariosEliminar = 'AdministrarUsuarios.Eliminar',
    AdministrarUsuariosModificar = 'AdministrarUsuarios.Modificar',
    AdministrarUsuariosTransportar = 'AdministrarUsuarios.Transportar',
    AsignarTarjeta = 'AsignarTarjeta',
    CambiarTarjeta = 'CambiarTarjeta',
    ChecklistControlPatrimonial = 'ChecklistControlPatrimonial',
    ConfigurarAmbienteCentral = 'ConfigurarAmbienteCentral',
    ConfigurarAmbienteLocal = 'ConfigurarAmbienteLocal',
    ControlarCalidadCamionCarga = 'ControlarCalidadCamionCarga',
    ControlarCalidadCamionCargaRegistrarDecision = 'ControlarCalidadCamionCarga.RegistrarDecision',
    ControlarCalidadCamionCargaExportarAExcel = 'ControlarCalidadCamionCarga.ExportarAExcel',
    ControlarCargaCamion = 'ControlarCargaCamion',
    ControlarCargaCamionVarios = 'ControlarCargaCamionVarios',
    ControlarDescargaCamionCereales = 'ControlarDescargaCamionCereales',
    ControlarDescargaCamionInsumosVarios = 'ControlarDescargaCamionInsumosVarios',
    ControlarDescargaCamionSubproductos = 'ControlarDescargaCamionSubproductos',
    ControlarDescargaCamionVarios = 'ControlarDescargaCamionVarios',
    ControlarDescargaVagonCereales = 'ControlarDescargaVagonCereales',
    ControlarDescargaVagonNoGrano = 'ControlarDescargaVagonNoGrano',
    ControlarPesajeEnBalanza = 'ControlarPesajeEnBalanza',
    ControlarSalida = 'ControlarSalida',
    GestionarCalidadCalado = 'GestionarCalidadCalado',
    GestionarCalidadCaladoConsultar = 'GestionarCalidadCalado.Consultar',
    GestionarCalidadCaladoContinuarCircuitoPostLab = 'GestionarCalidadCalado.ContinuarCircuitoPostLab',
    GestionarCalidadCaladoExportarAExcel = 'GestionarCalidadCalado.ExportarAExcel',
    GestionarCalidadCaladoModificar = 'GestionarCalidadCalado.Modificar',
    GestionarCalidadCaladoSinRespuestaEntregador = 'GestionarCalidadCalado.SinRespuestaEntregador',
    GestionarCalidadPorLaboratorio = 'GestionarCalidadPorLaboratorio',
    GestionarCalidadPorLaboratorioConsultarMuestras = 'GestionarCalidadPorLaboratorio.ConsultarMuestras',
    GestionarCalidadPorLaboratorioRegistrarDecision = 'GestionarCalidadPorLaboratorio.RegistrarDecision',
    GestionarControl = 'GestionarControl',
    GestionarControlAsignarTarjeta = 'GestionarControl.AsignarTarjeta',
    GestionarControlConsultar = 'GestionarControl.Consultar',
    GestionarControlExportarAExcel = 'GestionarControl.ExportarAExcel',
    GestionarControlModificar = 'GestionarControl.Modificar',
    GestionarControlModificarDocPorteVagones = 'GestionarControl.ModificarDocPorteVagones',
    GestionarControlRechazar = 'GestionarControl.Rechazar',
    GestionarCupos = 'GestionarCupos',
    GestionarCuposConsultar = 'GestionarCupos.Consultar',
    GestionarCuposExportarAExcel = 'GestionarCupos.ExportarAExcel',
    GestionarCuposModificar = 'GestionarCupos.Modificar',
    GestionarDescargasPorEntregador = 'GestionarDescargasPorEntregador',
    GestionarDescargasPorEntregadorConsultar = 'GestionarDescargasPorEntregador.Consultar',
    GestionarDescargasPorEntregadorExportarAExcel = 'GestionarDescargasPorEntregador.ExportarAExcel',
    GestionarDescargasPorEntregadorRegistrarDecision = 'GestionarDescargasPorEntregador.RegistrarDecision',
    GestionarInterfacesAFIP = 'GestionarInterfacesAFIP',
    GestionarInterfacesAFIPConfirmacionManual = 'GestionarInterfacesAFIP.ConfirmacionManual',
    GestionarInterfacesAFIPReIntentar = 'GestionarInterfacesAFIP.ReIntentar',
    GestionarInterfacesAFIPVerDetalle = 'GestionarInterfacesAFIP.VerDetalle',
    GestionarInterfacesSAN = 'GestionarInterfacesSAN',
    GestionarInterfacesSANReEjecutar = 'GestionarInterfacesSAN.ReEjecutar',
    GestionarInterfacesSANReIntentar = 'GestionarInterfacesSAN.ReIntentar',
    GestionarInterfacesSANVerDetalle = 'GestionarInterfacesSAN.VerDetalle',
    GestionarManipuleo = 'GestionarManipuleo',
    GestionarManipuleoAgregar = 'GestionarManipuleo.Agregar',
    GestionarManipuleoConsultar = 'GestionarManipuleo.Consultar',
    GestionarManipuleoEliminar = 'GestionarManipuleo.Eliminar',
    GestionarManipuleoExportarAExcel = 'GestionarManipuleo.ExportarAExcel',
    GestionarManipuleoModificar = 'GestionarManipuleo.Modificar',
    GestionarMovimientos = 'GestionarMovimientos',
    GestionarMovimientosConsultar = 'GestionarMovimientos.Consultar',
    GestionarMovimientosModificarBalanza = 'GestionarMovimientos.ModificarBalanza',
    GestionarMovimientosModificarCalidad = 'GestionarMovimientos.ModificarCalidad',
    GestionarMovimientosModificarCupoYControl = 'GestionarMovimientos.ModificarCupoYControl',
    GestionarMovimientosModificarProducto = 'GestionarMovimientos.ModificarProducto',
    GestionarMovimientosModificarDatosOrdenCarga = 'GestionarMovimientos.ModificarDatosOrdenCarga',
    GestionarMuestras = 'GestionarMuestras',
    GestionarMuestrasAutorizar = 'GestionarMuestras.Autorizar',
    GestionarMuestrasAutorizarEnFormaAgil = 'GestionarMuestras.AutorizarEnFormaAgil',
    GestionarMuestrasCambiarCodBarra = 'GestionarMuestras.CambiarCodBarra',
    GestionarMuestrasDescartar = 'GestionarMuestras.Descartar',
    GestionarMuestrasReversarEstadoMuestra = 'GestionarMuestras.ReversarEstadoMuestra',
    GestionarNotificaciones = 'GestionarNotificaciones',
    GestionarNotificacionesCancelar = 'GestionarNotificaciones.Cancelar',
    GestionarNotificacionesReIntentar = 'GestionarNotificaciones.ReIntentar',
    GestionarNotificacionesVerDetalle = 'GestionarNotificaciones.VerDetalle',
    GestionarOrdenesCarga = 'GestionarOrdenesCarga',
    GestionarOrdenesCargaConsultar = 'GestionarOrdenesCarga.Consultar',
    GestionarOrdenesCargaExportarAExcel = 'GestionarOrdenesCarga.ExportarAExcel',
    GestionarOrdenesCargaIngresar = 'GestionarOrdenesCarga.Ingresar',
    GestionarTrabajosGeneracionArchivosMuestras = 'GestionarTrabajosGeneracionArchivosMuestras',
    GestionarTrabajosGeneracionArchivosMuestrasActualizarLista = 'GestionarTrabajosGeneracionArchivosMuestras.ActualizarLista',
    GestionarTrabajosGeneracionArchivosMuestrasDescargarArchivo = 'GestionarTrabajosGeneracionArchivosMuestras.DescargarArchivo',
    GestionarTrabajosGeneracionArchivosMuestrasDescartar = 'GestionarTrabajosGeneracionArchivosMuestras.Descartar',
    GestionarTrabajosGeneracionArchivosMuestrasGeneracionManual = 'GestionarTrabajosGeneracionArchivosMuestras.GeneracionManual',
    GestionarTrabajosGeneracionArchivosMuestrasReIntentar = 'GestionarTrabajosGeneracionArchivosMuestras.ReIntentar',
    GestionarTrabajosGeneracionArchivosMuestrasVerError = 'GestionarTrabajosGeneracionArchivosMuestras.VerError',
    GestionarTransporteCircuito = 'GestionarTransporteCircuito',
    GestionarTransporteCircuitoContinuarCircuito = 'GestionarTransporteCircuito.ContinuarCircuito',
    GestionarTransporteCircuitoConsultar = 'GestionarTransporteCircuito.Consultar',
    GestionarTransporteCircuitoExportarAExcel = 'GestionarTransporteCircuito.ExportarAExcel',
    ImportarSobresTransporte = 'ImportarSobresTransporte',
    ImportarSobresTransporteConsultar = 'ImportarSobresTransporte.Consultar',
    ImportarSobresTransporteImportar = 'ImportarSobresTransporte.Importar',
    ImportarSobresTransporteVerDetalleError = 'ImportarSobresTransporte.VerDetalleError',
    IngresarCalidadCalado = 'IngresarCalidadCalado',
    IngresarCalidadCaladoVagon = 'IngresarCalidadCaladoVagon',
    MisImpresoras = 'MisImpresoras',
    MisImpresorasAdmin = 'MisImpresorasAdmin',
    PruebaLecturaTarjeta = 'PruebaLecturaTarjeta',
    QuitarCircuito = 'QuitarCircuito',
    RegistrarControlPatrimonial = 'RegistrarControlPatrimonial',
    RegistrarControlPatrimonialRegistrarDecision = 'RegistrarControlPatrimonial.RegistrarDecision',
    RegistrarControlPatrimonialExportarAExcel = 'RegistrarControlPatrimonial.ExportarAExcel',
    RegistrarPeso = 'RegistrarPeso',
    RegistrarPesoVagon = 'RegistrarPesoVagon',
    ReimprimirDocumentoPorte = 'ReimprimirDocumentoPorte',
    ReimprimirTicketDeCalidad = 'ReimprimirTicketDeCalidad',
    ReimprimirTicketDePesaje = 'ReimprimirTicketDePesaje',
    ReimprimirTurnoPlaya = 'ReimprimirTurnoPlaya',
    ReversarSalida = 'ReversarSalida',
    ValidarCupo = 'ValidarCupo',
    PagoTasaMunicipal = 'PagoTasaMunicipal',
    ReimprimirObleaLaboratorio = 'ReimprimirObleaLaboratorio',
    DashboardBalanzasAutomatizadas = 'DashboardBalanzasAutomatizadas',
    DashboardBalanzasAutomatizadasSeleccionarBalanzas = 'DashboardBalanzasAutomatizadas.SeleccionarBalanzas',
    ResolverAcciones = 'ResolverAcciones',
    ResolverAccionesSeleccionarBalanzaSalida = 'ResolverAcciones.SeleccionarBalanzaSalida',
    ResolverEventoAutorizaciones = 'ResolverEventoAutorizaciones',
}

export enum TiposDestinatario {
    Rol = 1,
    Usuario = 2,
    Mail = 3,
}

export enum OpcionesSiNo {
    Todos = -1,
    Si = 1,
    No
}
export enum TiposCartaPorte {
    CpEmitida = 5
}

export enum TiposMovimiento {
    Carga = 1,
    Descarga = 2
}
export enum TiposMovimientoEtiqueta {
    Carga = 'Carga',
    Descarga = 'Descarga'
}

export enum TiposTransporteEtiqueta {
    Camion = 'Camion',
    Tren = 'Tren'
}
export enum TiposNotificacion {
    BalanzaErroresSalidaSinDescarga = 1,
    BalanzaErroresSalidaConDescarga = 2,
    LaboratorioRegistrarDecision = 3,
    CaladoInformarMuestrarALaboratorio = 4,
    CaladoFaltaRespuestaEntregador = 5,
    CaladoMuestrasABolsa = 6,
    BiztalkServidorConError = 7,
    BiztalkServidorOK = 8,
    SuplenciaGeneracionSuplencia = 9,
    SuplenciaInicioSuplencia = 10,
    SuplenciaFinSuplencia = 11,
    EntregadorRegistrarDecisionAceptar = 12,
    EntregadorRegistrarDecisionRechazar = 13,
    SANServidorConError = 14,
    SANServidorOK = 15,
    BalanzaErroresEntrada = 16,
    MovimientoTiempolimiteExcedidoEstado = 17
}
export enum EstadosCupo {
    CupoAsignado = 1,
    CupoAnulado = 2,
    ConCupoAnterior = 3,
    ConCupoVigente = 4,
    ConCupoSiguiente = 5,
    CupoCumplidoAnterior = 6,
    CupoCumplidoVigente = 7,
    CupoCumplidoSiguiente = 8,
    CupoRechazado = 9,
    SinCupo = 10,
    CupoLibre = 11,
    PendienteCupo = 12,
    ConCupo = 13,
    CupoDesviado = 14,
    CupoVencido = 15,
    CupoPendientePlanta = 16,
    CupoRechazadoPlanta = 17,
    CupoBorrador = 18
}

export enum TipoSeleccionDataGrid {
    single = 'single',
    checkbox = 'checkbox'
}

export enum TablasTransporte {
    Rol = 1,
    RolPermiso = 2,
    Usuario = 3,
    TerminalUsuarioRol = 4,
    Circuito = 5,
    FinalidadCircuito = 6,
    MotivoErrorBalanzaCircuito = 7,
    RangoAutorizacionBalanza = 8,
    RolAutorizacionBalanza = 9,
    ActividadCircuito = 10,
    ResultadoActividadCircuito = 11,
    CaracteristicaCircuito = 12,
    TipoDispositivoPorProducto = 13,
    RubrosCalidad = 14
}

export enum EstadosSobreTransporte {
    Abierto = 1,
    Cerrado = 2,
    ErrorTecnico = 4,
    Error = 5
}

export enum TiposSobreTransporte {
    AltaModificacion = 1,
    Eliminacion = 2,
}

export enum MediosDePago {
  Efectivo = 1,
  MercadoPago = 2,
  NoAplica = 3
}

export enum EstadosPagoTasaMunicipal {
    Pago = 1,
    NoPago = 2
}

export enum Balanzas {
  BahiaBlanca = 0,
  TimbuesBalanzaCamion = 1,
  TimbuesBalanza12 = 2
}

export enum Finalidades {
    CompraVenta = 1,
    VentaNoAdminSAN = 16
}
