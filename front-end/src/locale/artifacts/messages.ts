import { Resource } from './base/resource';

const fileName = 'messages';

export class Messages extends Resource {

    get FechaVencimientoMenorAHoy(): string {
        return this.Provider.translate(fileName, 'FechaVencimientoMenorAHoy');
    }

    get FechaVencimientoLoteMenorA15Dias(): string {
        return this.Provider.translate(fileName, 'FechaVencimientoLoteMenorA15Dias');
    }

    get FechaDesdeHastaMenorADiasParametrizados(): string {
        return this.Provider.translate(fileName, 'FechaDesdeHastaMenorADiasParametrizados');
    }

    get FechaDesdeHastaMenorA7Dias(): string {
        return this.Provider.translate(fileName, 'FechaDesdeHastaMenorA7Dias');
    }

    get FechaIngresadaMenorOIgualADiaHoy(): string {
        return this.Provider.translate(fileName, 'FechaIngresadaMenorOIgualADiaHoy');
    }

    get FechaDesdeDebeSerMenorOIgualAFechaHasta(): string {
        return this.Provider.translate(fileName, 'FechaDesdeDebeSerMenorOIgualAFechaHasta');
    }

    get FechaIngresadaDesdeMenorOIgualADiaHoy(): string {
        return this.Provider.translate(fileName, 'FechaIngresadaDesdeMenorOIgualADiaHoy');
    }

    get FechaIngresadaHastaMenorOIgualADiaHoy(): string {
        return this.Provider.translate(fileName, 'FechaIngresadaHastaMenorOIgualADiaHoy');
    }

    get FechaIngresadaHastaMayorADiaHoy(): string {
        return this.Provider.translate(fileName, 'FechaIngresadaHastaMayorADiaHoy');
    }

    get VerificarLosDatosIngresados(): string {
        return this.Provider.translate(fileName, 'VerificarLosDatosIngresados');
    }

    get ErrorValidacion(): string {
        return this.Provider.translate(fileName, 'ErrorValidacion');
    }

    get DescargaCerealesGuardada(): string {
        return this.Provider.translate(fileName, 'DescargaCerealesGuardada');
    }

    get DeseaContinuar(): string {
        return this.Provider.translate(fileName, 'DeseaContinuar');
    }

    get ControleLaReferenciaDestinoSojaEpa(): string {
        return this.Provider.translate(fileName, 'ControleLaReferenciaDestinoSojaEpa');
    }

    get ControleAccionATomarCalado(): string {
        return this.Provider.translate(fileName, 'ControleAccionATomarCalado');
    }

    get ElCamionNoSeEncuentraEnEstadoValidoParaIngresoCalidad(): string {
        return this.Provider.translate(fileName, 'ElCamionNoSeEncuentraEnEstadoValidoParaIngresoCalidad');
    }

    get ElMovimientoNoSeEncuentraEnEstadoValidoParaAlgunaActividad(): string {
        return this.Provider.translate(fileName, 'ElMovimientoNoSeEncuentraEnEstadoValidoParaAlgunaActividad');
    }

    get RegistroSalidaConDescargaGuardado(): string {
        return this.Provider.translate(fileName, 'RegistroSalidaConDescargaGuardado');
    }

    get RegistroSalidaConCargaGuardado(): string {
        return this.Provider.translate(fileName, 'RegistroSalidaConCargaGuardado');
    }

    get RegistroSalidaSinCargaGuardado(): string {
        return this.Provider.translate(fileName, 'RegistroSalidasinCargaGuardado');
    }

    get ElMovimientoNoSeEncuentraEnEstadoValidoParaControlSalidaExitoso(): string {
        return this.Provider.translate(fileName, 'ElMovimientoNoSeEncuentraEnEstadoValidoParaControlSalidaExitoso');
    }

    get RegistroSalidaSinDescargaGuardado(): string {
        return this.Provider.translate(fileName, 'RegistroSalidaSinDescargaGuardado');
    }

    get DeseaConfirmarEstaAccion(): string {
        return this.Provider.translate(fileName, 'DeseaConfirmarEstaAccion');
    }

    get DeseaConfirmarLaPlantaSeleccionada(): string {
        return this.Provider.translate(fileName, 'DeseaConfirmarLaPlantaSeleccionada');
    }

    get localidadProvinciaIngresadasDistintasAOrdenCarga(): string {
        return this.Provider.translate(fileName, 'localidadProvinciaIngresadasDistintasAOrdenCarga');
    }

    get SeEstaDejandoPendienteORechazandoMovimiento(): string {
        return this.Provider.translate(fileName, 'SeEstaDejandoPendienteORechazandoMovimiento');
    }

    get ElMovimientoNoSeEncuentraEnEstadoValidoParaCerrarCircuitoPorRechazo(): string {
        return this.Provider.translate(fileName, 'ElMovimientoNoSeEncuentraEnEstadoValidoParaCerrarCircuitoPorRechazo');
    }

    get NoSeEncontraronResultados(): string {
        return this.Provider.translate(fileName, 'NoSeEncontraronResultados');
    }

    get PorFavorSeleccioneUnUnicoRegistro(): string {
        return this.Provider.translate(fileName, 'PorFavorSeleccioneUnUnicoRegistro');
    }

    get DebeHaberAlMenosUnRegistroParaExportar(): string {
        return this.Provider.translate(fileName, 'DebeHaberAlMenosUnRegistroParaExportar');
    }
    get SinRespuestaDelEntregador(): string {
        return this.Provider.translate(fileName, 'SinRespuestaDelEntregador');
    }
    get ElMovimientoSeleccionadoAvanzoAlSiguienteEstado(): string {
        return this.Provider.translate(fileName, 'ElMovimientoSeleccionadoAvanzoAlSiguienteEstado');
    }
    get LosMovimientosSeleccionadosAvanzaronAlSiguienteEstado(): string {
        return this.Provider.translate(fileName, 'LosMovimientosSeleccionadosAvanzaronAlSiguienteEstado');
    }
    get ElCamionEstaListoParaConstinuarCircuitoPostLab(): string {
        return this.Provider.translate(fileName, 'ElCamionEstaListoParaConstinuarCircuitoPostLab');
    }
    get ElCamionEstaListoParaContinuarConElRegistroDecisionEntregador(): string {
        return this.Provider.translate(fileName, 'ElCamionEstaListoParaContinuarConElRegistroDecisionEntregador');
    }
    get ElCampoNroDocPorteFormato(): string {
        return this.Provider.translate(fileName, 'ElCampoNroDocPorteFormato');
    }

    get DebeIngresarNroDocPorteARecuperar(): string {
        return this.Provider.translate(fileName, 'DebeIngresarNroDocPorteARecuperar');
    }

    get DebeSeleccionarAlMenosUnFiltro(): string {
        return this.Provider.translate(fileName, 'DebeSeleccionarAlMenosUnFiltro');
    }

    get DebeSeleccionarAlMenosUnaTerminal(): string {
        return this.Provider.translate(fileName, 'DebeSeleccionarAlMenosUnaTerminal');
    }

    get DebeSeleccionarAlMenosUnCircuito(): string {
        return this.Provider.translate(fileName, 'DebeSeleccionarAlMenosUnCircuito');
    }

    get DebeIngresarHasta250Caracteres(): string {
        return this.Provider.translate(fileName, 'DebeIngresarHasta250Caracteres');
    }
    get LaDescargaFueRechazada(): string {
        return this.Provider.translate(fileName, 'LaDescargaFueRechazada');
    }
    get ElMovimientoNoSeEncuentraEnEstadoValidoModificacion(): string {
        return this.Provider.translate(fileName, 'ElMovimientoNoSeEncuentraEnEstadoValidoModificacion');
    }
    get LaTarjetaFueAsignada(): string {
        return this.Provider.translate(fileName, 'LaTarjetaFueAsignada');
    }
    get ExistenCamionesAsignados(): string {
        return this.Provider.translate(fileName, 'ExistenCamionesAsignados');
    }
    get LaCondicionDeManipuleoFueEliminadaConExito(): string {
        return this.Provider.translate(fileName, 'LaCondicionDeManipuleoFueEliminadaConExito');
    }
    get LaEdicionDeLaCondicionDeManipuleoFueGuardadaConExito(): string {
        return this.Provider.translate(fileName, 'LaEdicionDeLaCondicionDeManipuleoFueGuardadaConExito');
    }
    get LaNuevaCondicionDeManipuleoFueAgregadaConExito(): string {
        return this.Provider.translate(fileName, 'LaNuevaCondicionDeManipuleoFueAgregadaConExito');
    }
    get ElPorcentajeDeValorMinimoDebeSerMenorAlPorcentajeDeValorMaximo(): string {
        return this.Provider.translate(fileName, 'ElPorcentajeDeValorMinimoDebeSerMenorAlPorcentajeDeValorMaximo');
    }
    get ReimpresionExitosa(): string {
        return this.Provider.translate(fileName, 'ReimpresionExitosa');
    }
    get CampoTarjetaSoloNumeros(): string {
        return this.Provider.translate(fileName, 'CampoTarjetaSoloNumeros');
    }
    get VerificarDatosFiltroBusqueda(): string {
        return this.Provider.translate(fileName, 'VerificarDatosFiltroBusqueda');
    }
    get CampoCodigoBarraCamaraRequerido(): string {
        return this.Provider.translate(fileName, 'CampoCodigoBarraCamaraRequerido');
    }
    get DebeSeleccionarAlMenosUnRubroParaCamara(): string {
        return this.Provider.translate(fileName, 'DebeSeleccionarAlMenosUnRubroParaCamara');
    }
    get DeberiaEnviarMuestraACamara(): string {
        return this.Provider.translate(fileName, 'DeberiaEnviarMuestraACamara');
    }
    get NoDeberiaEnviarMuestraACamara(): string {
        return this.Provider.translate(fileName, 'NoDeberiaEnviarMuestraACamara');
    }
    get ElMovimientoNoSeEncuentraEnCircuito(): string {
        return this.Provider.translate(fileName, 'ElMovimientoNoSeEncuentraEnCircuito');
    }
    get PorFavorIngreseUnMovimientoEnCircuito(): string {
        return this.Provider.translate(fileName, 'PorFavorIngreseUnMovimientoEnCircuito');
    }
    get PorFavorVerificarLosDatosAntesDeContinuar(): string {
        return this.Provider.translate(fileName, 'PorFavorVerificarLosDatosAntesDeContinuar');
    }
    get LaMuestraSeraDescartada(): string {
        return this.Provider.translate(fileName, 'LaMuestraSeraDescartada');
    }
    get LaMuestraFueDescartada(): string {
        return this.Provider.translate(fileName, 'LaMuestraFueDescartada');
    }
    get LaMuestraSeraAutorizada(): string {
        return this.Provider.translate(fileName, 'LaMuestraSeraAutorizada');
    }
    get LaMuestraFueAutorizada(): string {
        return this.Provider.translate(fileName, 'LaMuestraFueAutorizada');
    }
    get SeActualizoCodigoBarrasDeLaMuestra(): string {
        return this.Provider.translate(fileName, 'SeActualizoCodigoBarrasDeLaMuestra');
    }
    get LaMuestraSeraReversada(): string {
        return this.Provider.translate(fileName, 'LaMuestraSeraReversada');
    }
    get LaMuestraFueReversada(): string {
        return this.Provider.translate(fileName, 'LaMuestraFueReversada');
    }
    get MuestraDebeEstarPendienteAutorizacionParaAccion(): string {
        return this.Provider.translate(fileName, 'MuestraDebeEstarPendienteAutorizacionParaAccion');
    }
    get MuestraDebeEstarPendienteAutorizacionOAutorizadoEnvioParaAccion(): string {
        return this.Provider.translate(fileName, 'MuestraDebeEstarPendienteAutorizacionOAutorizadoEnvioParaAccion');
    }
    get MuestraDebeEstarDescartadaParaAccion(): string {
        return this.Provider.translate(fileName, 'MuestraDebeEstarDescartadaParaAccion');
    }
    get CampoAdmiteSoloNumeros(): string {
        return this.Provider.translate(fileName, 'CampoAdmiteSoloNumeros');
    }
    get ReintentoExitoso(): string {
        return this.Provider.translate(fileName, 'ReintentoExitoso');
    }
    get DescarteExitoso(): string {
        return this.Provider.translate(fileName, 'DescarteExitoso');
    }

    get SeCanceloLaNotificacion(): string {
        return this.Provider.translate(fileName, 'SeCanceloLaNotificacion');
    }

    get ReintentoNotificacionExitoso(): string {
        return this.Provider.translate(fileName, 'ReintentoNotificacionExitoso');
    }

    get TrabajoGeneracionArchivoMuestraCreado(): string {
        return this.Provider.translate(fileName, 'TrabajoGeneracionArchivoMuestraCreado');
    }
    get DescargaDeArchivoExitoso(): string {
        return this.Provider.translate(fileName, 'DescargaDeArchivoExitoso');
    }

    get TrabajoGeneracionArchivoMuestraSinError(): string {
        return this.Provider.translate(fileName, 'TrabajoGeneracionArchivoMuestraSinError');
    }
    get DescargaSubproductosGuardada(): string {
        return this.Provider.translate(fileName, 'DescargaSubproductosGuardada');
    }
    get DescargaNoGranoGuardada(): string {
        return this.Provider.translate(fileName, 'DescargaNoGranoGuardada');
    }
    get SeReversoSalidaHaciaBalanzaEntrada(): string {
        return this.Provider.translate(fileName, 'SeReversoSalidaHaciaBalanzaEntrada');
    }
    get SeReversoSalidaHaciaCalado(): string {
        return this.Provider.translate(fileName, 'SeReversoSalidaHaciaCalado');
    }
    get SeReversoSalidaHaciaSupervisorCalado(): string {
        return this.Provider.translate(fileName, 'SeReversoSalidaHaciaSupervisorCalado');
    }
    get DebeIndicarEstadoRetornoCircuito(): string {
        return this.Provider.translate(fileName, 'DebeIndicarEstadoRetornoCircuito');
    }
    get QuitarDeCircuitoGuardado(): string {
        return this.Provider.translate(fileName, 'QuitarDeCircuitoGuardado');
    }
    get DescargaCamionGuardada(): string {
        return this.Provider.translate(fileName, 'DescargaCamionGuardada');
    }
    get SeAceptoElIngresoDelPesaje(): string {
        return this.Provider.translate(fileName, 'SeAceptoElIngresoDelPesaje');
    }
    get SeCanceloElIngresoDelPesaje(): string {
        return this.Provider.translate(fileName, 'SeCanceloElIngresoDelPesaje');
    }
    get RubroSeleccionadoValorMayorACero(): string {
        return this.Provider.translate(fileName, 'RubroSeleccionadoValorMayorACero');
    }
    get RebajaConvenidaPorcentajeEntreCeroYCien(): string {
        return this.Provider.translate(fileName, 'RebajaConvenidaPorcentajeEntreCeroYCien');
    }
    get DebeIngresarUnDocumentoPorte(): string {
        return this.Provider.translate(fileName, 'DebeIngresarUnDocumentoPorte');
    }
    get DebeIngresarUnDocumentoPorteOCTG(): string {
        return this.Provider.translate(fileName, 'DebeIngresarUnDocumentoPorteOCTG');
    }
    get DebeCalcularParaPoderIngresarRebajaConvenida(): string {
        return this.Provider.translate(fileName, 'DebeCalcularParaPoderIngresarRebajaConvenida');
    }
    get DebeSeleccionarAlMenosUnRegistroParaEliminar(): string {
        return this.Provider.translate(fileName, 'DebeSeleccionarAlMenosUnRegistroParaEliminar');
    }
    get DecisionRegistrada(): string {
        return this.Provider.translate(fileName, 'DecisionRegistrada');
    }
    get ElCamionCuentaConAnalisisCalidadPrevio(): string {
        return this.Provider.translate(fileName, 'ElCamionCuentaConAnalisisCalidadPrevio');
    }
    get YaExisteUnaMuestraConElCodigoBarraIngresado(): string {
        return this.Provider.translate(fileName, 'YaExisteUnaMuestraConElCodigoBarraIngresado');
    }
    get DebeIngresarUnaReferenciaDestinoParaLaDescarga(): string {
        return this.Provider.translate(fileName, 'DebeIngresarUnaReferenciaDestinoParaLaDescarga');
    }
    get ElCampoXEsRequerido(): string {
        return this.Provider.translate(fileName, 'ElCampoXEsRequerido');
    }
    get ElCampoXEsRequeridoParaBuscar(): string {
        return this.Provider.translate(fileName, 'ElCampoXEsRequeridoParaBuscar');
    }
    get ElCampoXDebeSerMayorAY(): string {
        return this.Provider.translate(fileName, 'ElCampoXDebeSerMayorAY');
    }
    get ElCampoXDebeSerMenorAY(): string {
        return this.Provider.translate(fileName, 'ElCampoXDebeSerMenorAY');
    }
    get ElCamionNoSeEncuentraEnUnEstadoValidoParaRealizarEstaAccion(): string {
        return this.Provider.translate(fileName, 'ElCamionNoSeEncuentraEnUnEstadoValidoParaRealizarEstaAccion');
    }
    get ElVagonNoSeEncuentraEnUnEstadoValidoParaRealizarEstaAccion(): string {
        return this.Provider.translate(fileName, 'ElVagonNoSeEncuentraEnUnEstadoValidoParaRealizarEstaAccion');
    }
    get NoEsPosibleModificarMovimientoEnPuesto(): string {
        return this.Provider.translate(fileName, 'NoEsPosibleModificarMovimientoEnPuesto');
    }
    get ElNumeroCTGDebeContenerHastaXDigitosYSerDistintoDeCero(): string {
        return this.Provider.translate(fileName, 'ElNumeroCTGDebeContenerHastaXDigitosYSerDistintoDeCero');
    }
    get NoSePuedeModificarLaCalidadDeUnMovimientoConProductoDelTipoVarios(): string {
        return this.Provider.translate(fileName, 'NoSePuedeModificarLaCalidadDeUnMovimientoConProductoDelTipoVarios');
    }

    get DebeSeleccionarAlMenosUnCheck(): string {
        return this.Provider.translate(fileName, 'DebeSeleccionarAlMenosUnCheck');
    }

    get SeAceptoElRegistroDelPeso(): string {
        return this.Provider.translate(fileName, 'SeAceptoElRegistroDelPeso');
    }

    get DebeSeleccionarUnMotivoDeErrorParaLaAccionSeleccionada(): string {
        return this.Provider.translate(fileName, 'DebeSeleccionarUnMotivoDeErrorParaLaAccionSeleccionada');
    }

    get DeseaVolverAPesar(): string {
        return this.Provider.translate(fileName, 'DeseaVolverAPesar');
    }

    get DebeLeerElDispositivoAntesDeCalcularLaCalidad(): string {
        return  this.Provider.translate(fileName, 'DebeLeerElDispositivoAntesDeCalcularLaCalidad');
    }

    get LaDescargaDeCerealesQuedoEnEstadoPendiente(): string {
        return this.Provider.translate(fileName, 'LaDescargaDeCerealesQuedoEnEstadoPendiente');
    }

    get LaDescargaQuedoEnEstadoPendiente(): string {
        return this.Provider.translate(fileName, 'LaDescargaQuedoEnEstadoPendiente');
    }

    get SeDebeIngresarUnValorMayorA(): string {
        return this.Provider.translate(fileName, 'SeDebeIngresarUnValorMayorA');
    }

    get ElPorcentajeIngresadoDebeSerMenorOIgualA(): string {
        return this.Provider.translate(fileName, 'ElPorcentajeIngresadoDebeSerMenorOIgualA');
    }

    get SeDebenIngresarNumerosEnteros(): string {
        return this.Provider.translate(fileName, 'SeDebenIngresarNumerosEnteros');
    }

    get ElMovimientoNoSeEncuentraEnUnEstadoValidoParaRecibirEstaAccion(): string {
        return this.Provider.translate(fileName, 'ElMovimientoNoSeEncuentraEnUnEstadoValidoParaRecibirEstaAccion');
    }

    get ElMovimientoNoSeEncuentraEnEstadoValidoParaIngresoCalidad(): string {
        return this.Provider.translate(fileName, 'ElMovimientoNoSeEncuentraEnEstadoValidoParaIngresoCalidad');
    }

    get ElMovimientoCuentaConAnalisisCalidadPrevio(): string {
        return this.Provider.translate(fileName, 'ElMovimientoCuentaConAnalisisCalidadPrevio');
    }

    get ModificacionFueraDeCircuitoPeriodoStockCerrado(): string {
        return this.Provider.translate(fileName, 'ModificacionFueraDeCircuitoPeriodoStockCerrado');
    }

    get ModificacionFueraDeCircuitoNoPodraModificarseMovimiento(): string {
        return this.Provider.translate(fileName, 'ModificacionFueraDeCircuitoNoPodraModificarseMovimiento');
    }

    get ModificacionFueraDeCircuitoNoPodraModificarseProductoMovimiento(): string {
        return this.Provider.translate(fileName, 'ModificacionFueraDeCircuitoNoPodraModificarseProductoMovimiento');
    }

    get ModificacionFueraDeCircuitoNoPodraModificarseCalidadMovimiento(): string {
        return this.Provider.translate(fileName, 'ModificacionFueraDeCircuitoNoPodraModificarseCalidadMovimiento');
    }

    get ModificacionFueraDeCircuitoNoPodraModificarseDatosPesaje(): string {
        return this.Provider.translate(fileName, 'ModificacionFueraDeCircuitoNoPodraModificarseDatosPesaje');
    }

    get ModificacionFueraDeCircuitoPodranModificarseCiertosCamposDelMovimiento(): string {
        return this.Provider.translate(fileName, 'ModificacionFueraDeCircuitoPodranModificarseCiertosCamposDelMovimiento');
    }

    get ModificacionFueraDeCircuitoCargaNoPodranModificarseCiertosCamposDelMovimiento(): string {
        return this.Provider.translate(fileName, 'ModificacionFueraDeCircuitoCargaNoPodranModificarseCiertosCamposDelMovimiento');
    }

    get ModificacionFueraDeCircuitoNoPodraModificarseMovimientoAplicadoYF1116Emitido(): string {
        return this.Provider.translate(fileName, 'ModificacionFueraDeCircuitoNoPodraModificarseMovimientoAplicadoYF1116Emitido');
    }

    get ExistenVagonesDelDocumentoDePorteQueNoSePuedenModificarFueraDePuesto(): string {
        return this.Provider.translate(fileName, 'ExistenVagonesDelDocumentoDePorteQueNoSePuedenModificarFueraDePuesto');
    }

    get SeCanceloElIngresoDeLaDescarga(): string {
        return this.Provider.translate(fileName, 'SeCanceloElIngresoDeLaDescarga');
    }

    get SeCanceloElIngresoDeLaCarga(): string {
        return this.Provider.translate(fileName, 'SeCanceloElIngresoDeLaCarga');
    }

    get LaInterfazNoSeEncuentraEnUnEstadoValidoParaRealizarLaAccion(): string {
        return this.Provider.translate(fileName, 'LaInterfazNoSeEncuentraEnUnEstadoValidoParaRealizarLaAccion');
    }

    get LaFechaStockSANDebeSerMenorOIgualAHoy(): string {
        return this.Provider.translate(fileName, 'LaFechaStockSANDebeSerMenorOIgualAHoy');
    }

    get ReEjecutandoInterfaces(): string {
        return this.Provider.translate(fileName, 'ReEjecutandoInterfaces');
    }

    get InterfacesReEjecutadas(): string {
        return this.Provider.translate(fileName, 'InterfacesReEjecutadas');
    }

    get FormatoDelCampoXIncorrecto(): string {
        return this.Provider.translate(fileName, 'FormatoDelCampoXIncorrecto');
    }

    get DebeIngresarAlMenosUnDestinatario(): string {
        return this.Provider.translate(fileName, 'DebeIngresarAlMenosUnDestinatario');
    }

    get ElDestinatarioQueIntentaIngresarYaSeEncuentraConfigurado(): string {
        return this.Provider.translate(fileName, 'ElDestinatarioQueIntentaIngresarYaSeEncuentraConfigurado');
    }

    get LaNuevaNotificacionFueAgregadaConExito(): string {
        return this.Provider.translate(fileName, 'LaNuevaNotificacionFueAgregadaConExito');
    }

    get LaEdicionDeLaNotificacionFueGuardadaConExito(): string {
        return this.Provider.translate(fileName, 'LaEdicionDeLaNotificacionFueGuardadaConExito');
    }

    get ElNuevoXFueAgregadoConExito(): string {
        return this.Provider.translate(fileName, 'ElNuevoXFueAgregadoConExito');
    }

    get LaNuevaXFueAgregadaConExito(): string {
        return this.Provider.translate(fileName, 'LaNuevaXFueAgregadaConExito');
    }

    get SeAgregaronNuevasTarjetasConExito(): string {
        return this.Provider.translate(fileName, 'SeAgregaronNuevasTarjetasConExito');
    }

    get LaEdicionDelXFueGuardadaConExito(): string {
        return this.Provider.translate(fileName, 'LaEdicionDelXFueGuardadaConExito');
    }

    get ElXFueEliminadoConExito(): string {
        return this.Provider.translate(fileName, 'ElXFueEliminadoConExito');
    }

    get LaEdicionDeLaXFueGuardadaConExito(): string {
        return this.Provider.translate(fileName, 'LaEdicionDeLaXFueGuardadaConExito');
    }

    get DebeIngresarAlMenosUnRol(): string {
        return this.Provider.translate(fileName, 'DebeIngresarAlMenosUnRol');
    }

    get TipoDocumentoPorteObligatorioDejarPendiente(): string {
        return this.Provider.translate(fileName, 'TipoDocumentoPorteObligatorioDejarPendiente');
    }

    get NumeroDocumentoPorteObligatorioDejarPendiente(): string {
        return this.Provider.translate(fileName, 'NumeroDocumentoPorteObligatorioDejarPendiente');
    }
    get PorFavorIngreseAlMenosUnFiltroParaBuscar(): string {
        return this.Provider.translate(fileName, 'PorFavorIngreseAlMenosUnFiltroParaBuscar');
    }
    get NoEsPosibleModificarYaQueExisteAlMenosUnMovimientoQueEstaSiendoModificadoEnAlgunPuesto(): string {
        return this.Provider.translate(fileName, 'NoEsPosibleModificarYaQueExisteAlMenosUnMovimientoQueEstaSiendoModificadoEnAlgunPuesto');
    }
    get TarjetaEnUso(): string {
        return this.Provider.translate(fileName, 'TarjetaEnUso');
    }
    get FaltaConfigurarLosPermisosDeAccesoALasOpcionesDeMenuEnLaPcIngresada(): string {
        return this.Provider.translate(fileName, 'FaltaConfigurarLosPermisosDeAccesoALasOpcionesDeMenuEnLaPcIngresada');
    }
    get NoSePuedeModificarUnaPenalizacionDadaDeAltaEnOtraTerminal(): string {
        return this.Provider.translate(fileName, 'NoSePuedeModificarUnaPenalizacionDadaDeAltaEnOtraTerminal');
    }
    get ElPesoNetoResultanteEsNegativo(): string {
        return this.Provider.translate(fileName, 'ElPesoNetoResultanteEsNegativo');
    }
    get LaEdicionDeLosParametrosDeXFueGuardadaConExito(): string {
        return this.Provider.translate(fileName, 'LaEdicionDeLosParametrosDeXFueGuardadaConExito');
    }
    get LaEdicionDeLosParametrosDeLaXFueGuardadaConExito(): string {
        return this.Provider.translate(fileName, 'LaEdicionDeLosParametrosDeLaXFueGuardadaConExito');
    }
    get IngreseUnaHoraMinutoCorteCupoValida(): string {
        return this.Provider.translate(fileName, 'IngreseUnaHoraMinutoCorteCupoValida');
    }
    get LaAccionElegidaNoEsValidaEnLaSituacionActual(): string {
        return this.Provider.translate(fileName, 'LaAccionElegidaNoEsValidaEnLaSituacionActual');
    }
    get SeModificoSentidoBalanza(): string {
        return this.Provider.translate(fileName, 'SeModificoSentidoBalanza');
    }
    get SeDebeIngresarUnValorMayorOIgualAX(): string {
        return this.Provider.translate(fileName, 'SeDebeIngresarUnValorMayorOIgualAX');
    }
    get TarjetaInvalidaIntenteNuevamente(): string {
        return this.Provider.translate(fileName, 'TarjetaInvalidaIntenteNuevamente');
    }
    get QRInvalidoIntenteNuevamente(): string {
        return this.Provider.translate(fileName, 'QRInvalidoIntenteNuevamente');
    }
    get ElCampoNumeroDocumentoPorteNoCoindideConElLargoDeLaMascara(): string {
        return this.Provider.translate(fileName, 'ElCampoNumeroDocumentoPorteNoCoindideConElLargoDeLaMascara');
    }
    get ElCampocodigoCupoNoCoindideConElLargoDeLaMascara(): string {
        return this.Provider.translate(fileName, 'ElCampocodigoCupoNoCoindideConElLargoDeLaMascara');
    }
    get ElValorDeRecepcionMinimoDeTodoRubroDebeSerMenorOIgualAlValorDeRecepcionMaximoDelMismo(): string {
        return this.Provider.translate(fileName, 'ElValorDeRecepcionMinimoDeTodoRubroDebeSerMenorOIgualAlValorDeRecepcionMaximoDelMismo');
    }
    get NoPuedeDefinirRubrosConElMismoNroDeOrdenDeVisualizacion(): string {
        return this.Provider.translate(fileName, 'NoPuedeDefinirRubrosConElMismoNroDeOrdenDeVisualizacion');
    }
    get LaNuevaCargaFueGuardadaConExito(): string {
        return this.Provider.translate(fileName, 'LaNuevaCargaFueGuardadaConExito');
    }
    get LaEdicionDeLaCargaFueGuardadaConExito(): string {
        return this.Provider.translate(fileName, 'LaEdicionDeLaCargaFueGuardadaConExito');
    }
    get NoEsPosibleIngresarOrdenCargaEstadoIncorrecto(): string {
        return this.Provider.translate(fileName, 'NoEsPosibleIngresarOrdenCargaEstadoIncorrecto');
    }
    get FechaActualNoSeEncuentraRangoOrdenCarga(): string {
        return this.Provider.translate(fileName, 'FechaActualNoSeEncuentraRangoOrdenCarga');
    }
    get ElControlCalidadDeCargaDeCamionesFueGuardadoConExito(): string {
        return this.Provider.translate(fileName, 'ElControlCalidadDeCargaDeCamionesFueGuardadoConExito');
    }
    get ElPagoExceptuadoHaSidoRegistradoExitosamente(): string {
        return this.Provider.translate(fileName, 'ElPagoExceptuadoHaSidoRegistradoExitosamente');
    }
    get ElPagoHaSidoRegistradoExitosamente(): string {
        return this.Provider.translate(fileName, 'ElPagoHaSidoRegistradoExitosamente');
    }
    get ElMovimientoNoSeEncuentraEnEstadoValidoParaControlCalidadExitoso(): string {
        return this.Provider.translate(fileName, 'ElMovimientoNoSeEncuentraEnEstadoValidoParaControlCalidadExitoso');
    }
    get ElChoferSeEncuentraPenalizadoContinuar(): string {
        return this.Provider.translate(fileName, 'ElChoferSeEncuentraPenalizadoContinuar');
    }
    get ElCeeIngresadoDebeTener14DigitosYSerDistintoDeCero(): string {
        return this.Provider.translate(fileName, 'ElCeeIngresadoDebeTener14DigitosYSerDistintoDeCero');
    }
    get LaImpresoraHaSidoMarcadaPorDefectoConExito(): string {
        return this.Provider.translate(fileName, 'LaImpresoraHaSidoMarcadaPorDefectoConExito');
    }
    get ElDocumentoDePorteNoCoincideConLaPatente(): string {
        return this.Provider.translate(fileName, 'ElDocumentoDePorteNoCoincideConLaPatente');
    }
    get LosDatosIngresadosNoIdentificanUnCamionEnCircuitoDeCarga(): string {
        return this.Provider.translate(fileName, 'LosDatosIngresadosNoIdentificanUnCamionEnCircuitoDeCarga');
    }
    get ElCamionIdentificadoNoRequiereControlPatrimonial(): string {
        return this.Provider.translate(fileName, 'ElCamionIdentificadoNoRequiereControlPatrimonial');
    }
    get ChecklistControlPatrimonial(): string {
        return this.Provider.translate(fileName, 'ChecklistControlPatrimonial');
    }
    get ElCamionIdentificadoNoTieneDefinidoUnChecklistDeControlPatrimonial(): string {
        return this.Provider.translate(fileName, 'ElCamionIdentificadoNoTieneDefinidoUnChecklistDeControlPatrimonial');
    }
    get ElCamionIdentificadoNoHaFinalizadoLaCargaConExito(): string {
        return this.Provider.translate(fileName, 'ElCamionIdentificadoNoHaFinalizadoLaCargaConExito');
    }
    get ElValorIngresadoEnFechaNoCorrespondeAUnaFechaValida(): string {
        return this.Provider.translate(fileName, 'ElValorIngresadoEnFechaNoCorrespondeAUnaFechaValida');
    }
    get ExisteUnaNuevaVersionDelSistema(): string {
        return this.Provider.translate(fileName, 'ExisteUnaNuevaVersionDelSistema');
    }
    get NuevaVersionDelSistema(): string {
        return this.Provider.translate(fileName, 'NuevaVersionDelSistema');
    }
    get ElCircuitoSeEncuentraDeshabilitadoONoExistePorFavorReviseLaParametrizacion(): string {
        return this.Provider.translate(fileName, 'ElCircuitoSeEncuentraDeshabilitadoONoExistePorFavorReviseLaParametrizacion');
    }
    get NoSeEncontraronResultadosPorFavorUtiliceLaBusquedaAvanzada(): string {
        return this.Provider.translate(fileName, 'NoSeEncontraronResultadosPorFavorUtiliceLaBusquedaAvanzada');
    }
    get ElValorIngresadoParaElCampoXNoEsValido(): string {
        return this.Provider.translate(fileName, 'ElValorIngresadoParaElCampoXNoEsValido');
    }
    get ElCuitIngresadoNoEsValido(): string {
        return this.Provider.translate(fileName, 'ElCuitIngresadoNoEsValido');
    }
    get DebeSeleccionarUnaPlanta(): string {
        return this.Provider.translate(fileName, 'DebeSeleccionarUnaPlanta');
    }
    get ElProductoNoExisteONoCorrespondeAlCircuito(): string {
        return this.Provider.translate(fileName, 'ElProductoNoExisteONoCorrespondeAlCircuito');
    }
    get LasSedeIngresadaNoExiste(): string {
        return this.Provider.translate(fileName, 'LasSedeIngresadaNoExiste');
    }
    get LosDatosIngresadosNoIdentificanUnCamionEnCircuitoEnUnEstadoValidoParaRealizarLaAccion(): string {
        return this.Provider.translate(fileName, 'LosDatosIngresadosNoIdentificanUnCamionEnCircuitoEnUnEstadoValidoParaRealizarLaAccion');
    }
    get ArchivoDebePesarMenosDeX(): string {
        return this.Provider.translate(fileName, 'ArchivoDebePesarMenosDeX');
    }
    get ConectandoConElServicioAfip(): string {
        return this.Provider.translate(fileName, 'ConectandoConElServicioAfip');
    }
    get ElServicioAfipNoSeEncuentraDisponible(): string {
        return this.Provider.translate(fileName, 'ElServicioAfipNoSeEncuentraDisponible');
    }
    get InconsistenciaDeDatos(): string {
        return this.Provider.translate(fileName, 'InconsistenciaDeDatos');
    }
    get ElServicioArbaNoSeEncuentraDisponible(): string {
        return this.Provider.translate(fileName, 'ElServicioArbaNoSeEncuentraDisponible');
    }
    get ElXNoSeEncuentraEnUnEstadoValidoParaRecibirEstaAccion(): string {
        return this.Provider.translate(fileName, 'ElXNoSeEncuentraEnUnEstadoValidoParaRecibirEstaAccion');
    }
    get SeAceptoElIngresoDeLaDescarga(): string {
        return this.Provider.translate(fileName, 'SeAceptoElIngresoDeLaDescarga');
    }
    get DebeIngresarMenosDeXCaracteres(): string {
        return this.Provider.translate(fileName, 'DebeIngresarMenosDeXCaracteres');
    }
    get DebeIngresarAlMenosXCaracteres(): string {
        return this.Provider.translate(fileName, 'DebeIngresarAlMenosXCaracteres');
    }
    get SuUsuarioNoPoseeImpresorasHabilitadas(): string {
        return this.Provider.translate(fileName, 'SuUsuarioNoPoseeImpresorasHabilitadas');
    }
    get ElNombreDeADIngresadoNoCorrespondeAUnUsuario(): string {
        return this.Provider.translate(fileName, 'ElNombreDeADIngresadoNoCorrespondeAUnUsuario');
    }
    get RegistrarDecisionEntregador(): string {
        return this.Provider.translate(fileName, 'RegistrarDecisionEntregador');
    }
    get LaAccionSeleccionadaNoEsValidaSiNoExistenMotivosDeError(): string {
        return this.Provider.translate(fileName, 'LaAccionSeleccionadaNoEsValidaSiNoExistenMotivosDeError');
    }
    get LaAnulacionDelCupoSeRealizoConExito(): string {
        return this.Provider.translate(fileName, 'LaAnulacionDelCupoSeRealizoConExito');
    }
    get LaDescargaDeInsumosQuedoEnEstadoPendiente(): string {
        return this.Provider.translate(fileName, 'LaDescargaDeInsumosQuedoEnEstadoPendiente');
    }
    get ElTipoDocumentoPorteEsObligatorioDejarPendiente(): string {
        return this.Provider.translate(fileName, 'ElTipoDocumentoPorteEsObligatorioDejarPendiente');
    }
    get ElNumeroDocumentoPorteEsObligatorioDejarPendiente(): string {
        return this.Provider.translate(fileName, 'ElNumeroDocumentoPorteEsObligatorioDejarPendiente');
    }
    get ElCupoIngresadoNoExiste(): string {
        return this.Provider.translate(fileName, 'ElCupoIngresadoNoExiste');
    }
    get ElCupoNoEsValido(): string {
        return this.Provider.translate(fileName, 'ElCupoNoEsValido');
    }
    get LaFechaDelCupoEsAnteriorOPosteriorALaPermitidaSeIngresaraSinCupo(): string {
        return this.Provider.translate(fileName, 'LaFechaDelCupoEsAnteriorOPosteriorALaPermitidaSeIngresaraSinCupo');
    }
    get ElChoferSeEncuentraInhabilitadoParaElIngreso(): string {
        return this.Provider.translate(fileName, 'ElChoferSeEncuentraInhabilitadoParaElIngreso');
    }
    get ElChoferSeEncuentraPenalizadoParaElIngreso(): string {
        return this.Provider.translate(fileName, 'ElChoferSeEncuentraPenalizadoParaElIngreso');
    }
    get ElCupoNoTieneCorredorAsignadoSeIngresaraComoDefectoX(): string {
        return this.Provider.translate(fileName, 'ElCupoNoTieneCorredorAsignadoSeIngresaraComoDefectoX');
    }
    get ReviseLaParametrizacionDelCircuito(): string {
        return this.Provider.translate(fileName, 'ReviseLaParametrizacionDelCircuito');
    }
    get DebeIngresarUnNroDeCTGAConsultar(): string {
        return this.Provider.translate(fileName, 'DebeIngresarUnNroDeCTGAConsultar');
    }
    get ElProductoNoExisteONoImputaStock(): string {
        return this.Provider.translate(fileName, 'ElProductoNoExisteONoImputaStock');
    }
    get ElTipoDocPorteSeEncuentraDeshabilitadoONoExistePorFavorReviseLaParametrizacion(): string {
        return this.Provider.translate(fileName, 'ElTipoDocPorteSeEncuentraDeshabilitadoONoExistePorFavorReviseLaParametrizacion');
    }
    get ElCupoEsObligatorioCuandoEsMovimientoConCupoDejarPendiente(): string {
        return this.Provider.translate(fileName, 'ElCupoEsObligatorioCuandoEsMovimientoConCupoDejarPendiente');
    }
    get ElCTGEsObligatorioCuandoEsMovimientoConCupoDejarPendiente(): string {
        return this.Provider.translate(fileName, 'ElCTGEsObligatorioCuandoEsMovimientoConCupoDejarPendiente');
    }
    get ElDocumentoDePorteNoSeEncuentraCargadoONoCorrespondeAlCircuito(): string {
        return this.Provider.translate(fileName, 'ElDocumentoDePorteNoSeEncuentraCargadoONoCorrespondeAlCircuito');
    }
    get NoSePuedeUsarCupoPorqueProductoActualTieneCalidad(): string {
        return this.Provider.translate(fileName, 'NoSePuedeUsarCupoPorqueProductoActualTieneCalidad');
    }

    get UsuarioInexistente(): string {
        return this.Provider.translate(fileName, 'UsuarioInexistente');
    }
    get EstaSeguroQueDeseaEliminarElRegistroSeleccionado(): string {
        return this.Provider.translate(fileName, 'EstaSeguroQueDeseaEliminarElRegistroSeleccionado');
    }
    get ElRegistroFueEliminadoExitosamente(): string {
        return this.Provider.translate(fileName, 'ElRegistroFueEliminadoExitosamente');
    }
    get ElItemSeAgregoAlSobreTransporteExitosamente(): string {
        return this.Provider.translate(fileName, 'ElItemSeAgregoAlSobreTransporteExitosamente');
    }
    get ElSobreTransporteHaSidoCerradoConExito(): string {
        return this.Provider.translate(fileName, 'ElSobreTransporteHaSidoCerradoConExito');
    }
    get ElSobreTransporteDebeEstarEnEstadoAbiertoParaPoderCerrarlo(): string {
        return this.Provider.translate(fileName, 'ElSobreTransporteDebeEstarEnEstadoAbiertoParaPoderCerrarlo');
    }
    get ElSobreTransporteDebeEstarEnEstadoAbiertoParaPoderModificarlo(): string {
        return this.Provider.translate(fileName, 'ElSobreTransporteDebeEstarEnEstadoAbiertoParaPoderModificarlo');
    }
    get ElSobreTransporteHaSidoAnuladoConExito(): string {
        return this.Provider.translate(fileName, 'ElSobreTransporteHaSidoAnuladoConExito');
    }
    get ElSobreTransporteDebeEstarEnEstadoAbiertoOCerradoParaPoderAnularlo(): string {
        return this.Provider.translate(fileName, 'ElSobreTransporteDebeEstarEnEstadoAbiertoOCerradoParaPoderAnularlo');
    }
    get SeIntentoImportarElSobreTransporte(): string {
        return this.Provider.translate(fileName, 'SeIntentoImportarElSobreTransporte');
    }
    get ElSobreTransporteDebeEstarEnEstadoCerradoParaPoderImportarlo(): string {
        return this.Provider.translate(fileName, 'ElSobreTransporteDebeEstarEnEstadoCerradoParaPoderImportarlo');
    }
    get ElSobreTransporteDebeEstarEnEstadoErrorOErrorTecnicoParaVerSuError(): string {
        return this.Provider.translate(fileName, 'ElSobreTransporteDebeEstarEnEstadoErrorOErrorTecnicoParaVerSuError');
    }
    get AguardePorFavor(): string {
        return this.Provider.translate(fileName, 'AguardePorFavor');
    }
    get ElXEsRequerido(): string {
        return this.Provider.translate(fileName, 'ElXEsRequerido');
    }
    get TarjetaLeida(): string {
        return this.Provider.translate(fileName, 'TarjetaLeida');
    }
    get DesliceTarjetaLector(): string {
        return this.Provider.translate(fileName, 'DesliceTarjetaLector');
    }
    get CodigoTarjetaHastaMayorACodigoTarjetaDesde(): string {
        return this.Provider.translate(fileName, 'CodigoTarjetaHastaMayorACodigoTarjetaDesde');
    }
    get CoeficienteFijoConversionLitros(): string {
        return this.Provider.translate(fileName, 'CoeficienteFijoConversionLitros');
    }
    get NoSeImplementoElAceptarYContinuar(): string {
        return this.Provider.translate(fileName, 'NoSeImplementoElAceptarYContinuar');
    }
    get NoSePermiteIngresarAccionesRepetidas(): string {
        return this.Provider.translate(fileName, 'NoSePermiteIngresarAccionesRepetidas');
    }
    get NoSePermiteIngresarDispositivosRepetidos(): string {
        return this.Provider.translate(fileName, 'NoSePermiteIngresarDispositivosRepetidos');
    }
    get ElTipoProductoSeEncuentraDeshabilitadoONoEstaParametrizado(): string {
        return this.Provider.translate(fileName, 'ElTipoProductoSeEncuentraDeshabilitadoONoEstaParametrizado');
    }
    get StockInsuficiente(): string {
        return this.Provider.translate(fileName, 'StockInsuficiente');
    }
    get ElProductNoSeEncuentraHabilitadoParaEstaTerminal(): string {
        return this.Provider.translate(fileName, 'ElProductNoSeEncuentraHabilitadoParaEstaTerminal');
    }
    get ElStockFisicoEsInsuficiente(): string {
        return this.Provider.translate(fileName, 'ElStockFisicoEsInsuficiente');
    }
    get ElStockTitularEsInsuficiente(): string {
        return this.Provider.translate(fileName, 'ElStockTitularEsInsuficiente');
    }
    get DeseaImprimirElDocumentoEnEsteMomento(): string {
        return this.Provider.translate(fileName, 'DeseaImprimirElDocumentoEnEsteMomento');
    }
    get DebeIngresarUnMotivoDeError(): string {
        return this.Provider.translate(fileName, 'DebeIngresarUnMotivoDeError');
    }
    get noSePuedeObtenerStockFisicoTitular(): string {
        return this.Provider.translate(fileName, 'noSePuedeObtenerStockFisicoTitular');
    }
    get errorConexionSAN(): string {
        return this.Provider.translate(fileName, 'errorConexionSAN');
    }
    get SeReversoSalidaHaciaControlCalidad(): string {
        return this.Provider.translate(fileName, 'SeReversoSalidaHaciaControlCalidad');
    }
    get SeReversoSalidaHaciaControlPatrimonial(): string {
        return this.Provider.translate(fileName, 'SeReversoSalidaHaciaControlPatrimonial');
    }
    get ElReembolsoHaSidoRegistradoExitosamente(): string {
        return this.Provider.translate(fileName, 'ElReembolsoHaSidoRegistradoExitosamente');
    }
    get ExisteExcepcionDePago(): string {
        return this.Provider.translate(fileName, 'ExisteExcepcionDePago');
    }
    get MovimientoCuentaConTurnoCircular(): string {
        return this.Provider.translate(fileName, 'MovimientoCuentaConTurnoCircular');
    }
    get MovimientoCuentaConTurnoCircularVencido(): string {
        return this.Provider.translate(fileName, 'MovimientoCuentaConTurnoCircularVencido');
    }
    get ElMovimientoHaFinalizadoElCircuito(): string {
        return this.Provider.translate(fileName, 'ElMovimientoHaFinalizadoElCircuito');
    }
    get EstaContinuandoElCircuitoDelMovimiento(): string {
        return this.Provider.translate(fileName, 'EstaContinuandoElCircuitoDelMovimiento');
    }
    get EstaContinuandoElCircuitoDelMovimientoConPatenteX(): string {
        return this.Provider.translate(fileName, 'EstaContinuandoElCircuitoDelMovimientoConPatenteX');
    }
    get EstaContinuandoElCircuitoDelMovimientoConNumeroDeVagonX(): string {
        return this.Provider.translate(fileName, 'EstaContinuandoElCircuitoDelMovimientoConNumeroDeVagonX');
    }
    get NoHayBalanzasHabilitadas(): string {
        return this.Provider.translate(fileName, 'NoHayBalanzasHabilitadas');
    }
    get NoSeEncuentraConfiguradaNotificacionPorFaltaDeParametrizacionMermasEspeciales(): string {
        return this.Provider.translate(fileName, 'NoSeEncuentraConfiguradaNotificacionPorFaltaDeParametrizacionMermasEspeciales');
    }
    get DeseaImprimirLaObleaLaboratorioEnEsteMomento(): string {
        return this.Provider.translate(fileName, 'DeseaImprimirLaObleaLaboratorioEnEsteMomento');
    }
    get NoPuedeSeleccionarMasDe4Balanzas(): string {
        return this.Provider.translate(fileName, 'NoPuedeSeleccionarMasDe4Balanzas');
    }
    get NoSeEncontraronBalanzasAutomatizadas(): string {
        return this.Provider.translate(fileName, 'NoSeEncontraronBalanzasAutomatizadas');
    }
    get EsObligatorioMensajeArchestraSiNotificaArchestra(): string {
        return this.Provider.translate(fileName, 'EsObligatorioMensajeArchestraSiNotificaArchestra');
    }
}
