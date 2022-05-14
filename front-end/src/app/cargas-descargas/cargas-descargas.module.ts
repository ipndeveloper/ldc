import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HotkeyModule, HotkeysService } from 'angular2-hotkeys';
import { SharedModule } from '../shared/shared.module';
import { CoreSharedModule } from '../core/core-shared.module';
import { DesplegableTipoDocumentoPorteComponent } from './shared/desplegable-tipo-documento-porte/desplegable-tipo-documento-porte.component';
import { TipoDocumentoPorteService } from './shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';
import { ControlarDescargaCamionInsumosComponent } from './controlar-descarga-camion-insumos/controlar-descarga-camion-insumos.component';
import { ControlarDescargaCamionCerealesComponent } from './controlar-descarga-camion-cereales/controlar-descarga-camion-cereales.component';
import { DatosDocumentoControlarDescargaCerealesComponent } from './controlar-descarga-camion-cereales/datos-documento-controlar-descarga-cereales/datos-documento-controlar-descarga-cereales.component';
import { CircuitoService } from './shared/services/circuito.service';
import { MovimientoService } from './shared/services/movimiento.service';
import { ModalMotivoComponent } from './shared/modals/modal-motivo/modal-motivo.component';
import { IngresarCalidadCaladoComponent } from './ingresar-calidad-calado/ingresar-calidad-calado.component';
import { ControlarDescargaCamionCerealesService } from './controlar-descarga-camion-cereales/controlar-descarga-camion-cereales.service';
import { FiltroMovimientoComponent } from './ingresar-calidad-calado/filtro-movimiento/filtro-movimiento.component';
import { DatosMovimientoComponent } from './ingresar-calidad-calado/datos-movimiento/datos-movimiento.component';
import { IngresarCalidadCaladoService } from './ingresar-calidad-calado/ingresar-calidad-calado.service';
import { CircuitoComponent } from './shared/circuito/circuito.component';
import { ConfirmacionArriboCtgComponent } from './shared/confirmacion-arribo-ctg/confirmacion-arribo-ctg.component';
import { CupoComponent } from './shared/cupo/cupo.component';
import { DocumentoPorteComponent } from './shared/documento-porte/documento-porte.component';
import { PatenteService } from './shared/services/patente.service';
import { AccionComponent } from './ingresar-calidad-calado/ingresar-calidad-accion/ingresar-calidad-accion.component';
import { RubrosCalidadComponent } from './ingresar-calidad-calado/rubros-calidad/rubros-calidad.component';
import { FormComponentService } from '../core/services/formComponent/formComponent.service';
import { RubrosCalidadService } from './ingresar-calidad-calado/rubros-calidad/rubros-calidad.service';
import { PopupService } from '../core/services/popupService/popup.service';
import { ConfirmacionProductoCalado } from './ingresar-calidad-calado/confirmaciones/confirmacionProductoCalado.service';
import { RegistrarPesoComponent } from './registrar-peso/registrar-peso.component';
import { DatosMovimientoPesajeComponent } from './registrar-peso/datos-movimiento-pesaje/datos-movimiento-pesaje.component';
import { SituacionEntradaComponent } from './registrar-peso/situacion-entrada/situacion-entrada.component';
import { ListaMotivosNoDescargaComponent } from './registrar-peso/situacion-entrada/lista-motivos-no-descarga/lista-motivos-no-descarga.component';
import { BusquedaMovimientoPesajeComponent } from './registrar-peso/busqueda-movimiento-pesaje/busqueda-movimiento-pesaje.component';
import { BusquedaMovimientoPesajeService } from './registrar-peso/busqueda-movimiento-pesaje/busqueda-movimiento-pesaje.service';
import { ControlarSalidaComponent } from './controlar-salida/controlar-salida.component';
import { BusquedaMovimientoControlSalidaComponent } from './controlar-salida/busqueda-movimiento-control-salida/busqueda-movimiento-control-salida.component';
import { DatosMovimientoControlSalidaComponent } from './controlar-salida/datos-movimiento-control-salida/datos-movimiento-control-salida.component';
import { RegistrarPesadaService } from './registrar-peso/registrar-pesada.service';
import { GestionarCalidadCaladoComponent } from './gestionar-calidad-calado/gestionar-calidad-calado.component';
import { SearchCalidadCaladoService } from './gestionar-calidad-calado/services/search-calidad-calado/search-calidad-calado.service';
import { SearchFormActionsNotifierService } from '../core/components/search-form/services/search-form-actions-notifier.service';
import { MotivosNoDescargaService } from './registrar-peso/situacion-entrada/lista-motivos-no-descarga/motivos-no-descarga.service';
import { ModalConfirmarConObservacionesComponent } from './shared/modals/modal-confirmar-con-observaciones/modal-confirmar-con-observaciones.component';
import { GestionarCalidadCaladoService } from './gestionar-calidad-calado/services/gestionar-calidad-calado/gestionar-calidad-calado.service';
import { GestionarControlComponent } from './gestionar-control/gestionar-control.component';
import { SearchControlService } from './gestionar-control/services/search-control.service';
import { FiltroBusquedaControlComponent } from './gestionar-control/filtro-busqueda-control/filtro-busqueda-control.component';
import { CondicionManipuleoService } from './registrar-peso/situacion-entrada/condicion-manipuleo.service';
import { GestionarManipuleoComponent } from './gestionar-manipuleo/gestionar-manipuleo.component';
import { DesplegableCondicionManipuleoComponent } from './registrar-peso/situacion-entrada/desplegable-condicion-manipuleo/desplegable-condicion-manipuleo.component';
import { GestionarManipuleoService } from './gestionar-manipuleo/gestionar-manipuleo.service';
import { FiltroBusquedaGestionarManipuleoComponent } from './gestionar-manipuleo/filtro-busqueda/filtro-busqueda-gestionar-manipuleo.component';
import { FiltroBusquedaGestionarCalidadCaladoComponent } from './gestionar-calidad-calado/filtro-busqueda/filtro-busqueda-gestionar-calidad-calado.component';
import { DatosEdicionGestionarManipuleoComponent } from './gestionar-manipuleo/datos-edicion/datos-edicion-gestionar-manipuleo.component';
import { GestionarDescargasPorEntregadorComponent } from './gestionar-descargas-por-entregador/gestionar-descargas-por-entregador.component';
import { SearchDescargasCamionesService } from './gestionar-descargas-por-entregador/services/search-descargas-camiones.service';
import { FiltroBusquedaEntregadoresComponent } from './gestionar-descargas-por-entregador/filtro-busqueda-entregadores/filtro-busqueda-entregadores.component';
import { ModalRechazarDescargaComponent } from './shared/modals/modal-rechazar-descarga/modal-rechazar-descarga.component';
import { RechazarDescargaService } from './shared/modals/modal-rechazar-descarga/rechazar-descarga.service';
import { ModalAsignarTarjetaComponent } from './shared/modals/modal-asignar-tarjeta/modal-asignar-tarjeta.component';
import { AsignarTarjetaService } from './shared/modals/modal-asignar-tarjeta/asignar-tarjeta.service';
import { IngresarCalidadCamaraComponent } from './ingresar-calidad-calado/ingresar-calidad-camara/ingresar-calidad-camara.component';
import { ReimprimirTicketPesajeComponent } from './reimprimir-ticket-pesaje/reimprimir-ticket-pesaje.component';
import { FiltroBusquedaReimpresionTicketPesajeComponent } from './reimprimir-ticket-pesaje/filtro-busqueda-reimpresion-ticket-pesaje/filtro-busqueda-reimpresion-ticket-pesaje.component';
import { SearchMovimientosReimpresionTicketPesajeService } from './reimprimir-ticket-pesaje/services/search-movimientos-reimpresion-ticket-pesaje.service';
import { ReimprimirTicketPesajeService } from './reimprimir-ticket-pesaje/services/reimprimir-ticket-pesaje.service';
import { GestionAfipModule } from '../gestion-afip/gestion-afip.module';
import { ReimprimirTicketCalidadComponent } from './reimprimir-ticket-calidad/reimprimir-ticket-calidad.component';
import { FiltroBusquedaReimpresionTicketCalidadComponent } from './reimprimir-ticket-calidad/filtro-busqueda-reimpresion-ticket-calidad/filtro-busqueda-reimpresion-ticket-calidad.component';
import { CambiarTarjetaComponent } from './cambiar-tarjeta/cambiar-tarjeta.component';
import { CambiarTarjetaService } from './cambiar-tarjeta/cambiar-tarjeta.service';
import { DetalleCambiarTarjetaComponent } from './cambiar-tarjeta/detalle-cambiar-tarjeta/detalle-cambiar-tarjeta.component';
import { GestionarMuestrasComponent } from './gestionar-muestras/gestionar-muestras.component';
import { FiltroBusquedaMuestrasComponent } from './gestionar-muestras/filtro-busqueda-muestras/filtro-busqueda-muestras.component';
import { SearchMuestrasService } from './gestionar-muestras/services/search-muestras.service';
import { GestionarMuestrasService } from './gestionar-muestras/services/gestionar-muestras.service';
import { ModalCambiarCodigoBarrasComponent } from './shared/modals/modal-cambiar-codigo-barras/modal-cambiar-codigo-barras.component';
import { ModalAutorizarMuestraAgilComponent } from './shared/modals/modal-autorizar-muestra-agil/modal-autorizar-muestra-agil.component';
import { AutorizarMuestrasAgilService } from './gestionar-muestras/services/autorizar-muestras-agil.service';
import { GestionarTrabajosArchivosMuestraComponent } from './gestionar-trabajos-archivos-muestra/gestionar-trabajos-archivos-muestra.component';
import { FiltroBusquedaTrabajosArchivosMuestraComponent } from './gestionar-trabajos-archivos-muestra/filtro-busqueda-trabajos-archivos-muestra/filtro-busqueda-trabajos-archivos-muestra.component';
import { GestionarTrabajosArchivosMuestraService } from './gestionar-trabajos-archivos-muestra/services/gestionar-trabajos-archivos-muestra.service';
import { SearchTrabajosArchivosMuestraService } from './gestionar-trabajos-archivos-muestra/services/search-trabajos-archivos-muestra.service';
import { ModalAgregarTrabajoGeneracionArchivosMuestraComponent } from './shared/modals/modal-agregar-trabajo-generacion-archivos-muestra/modal-agregar-trabajo-generacion-archivos-muestra.component';
import { ControlarDescargaCamionSubproductosComponent } from './controlar-descarga-camion-subproductos/controlar-descarga-camion-subproductos.component';
import { DatosDocumentoControlarDescargaSubproductosComponent } from './controlar-descarga-camion-subproductos/datos-documento-controlar-descarga-subproductos/datos-documento-controlar-descarga-subproductos.component';
import { ReversarSalidaComponent } from './reversar-salida/reversar-salida.component';
import { FiltroBusquedaReversarSalidaComponent } from './reversar-salida/filtro-busqueda/filtro-busqueda-reversar-salida.component';
import { SearchReversarSalidaService } from './reversar-salida/services/search-reversar-salida.service';
import { ControlarDescargaCamionSubproductosService } from './controlar-descarga-camion-subproductos/controlar-descarga-camion-subproductos.service';
import { ModalMostrarMensajeComponent } from './shared/modals/modal-mostrar-mensaje/modal-mostrar-mensaje.component';
import { ParametrosTerminalService } from './shared/services/parametros-terminal.service';
import { BusquedaMovimientoQuitarDeCircuitoComponent } from './quitar-de-circuito/busqueda-movimiento-quitar-de-circuito/busqueda-movimiento-quitar-de-circuito.component';
import { DatosMovimientoQuitarDeCircuitoComponent } from './quitar-de-circuito/datos-movimiento-quitar-de-circuito/datos-movimiento-quitar-de-circuito.component';
import { QuitarDeCircuitoComponent } from './quitar-de-circuito/quitar-de-circuito.component';
import { ModalReversarSalidaComponent } from './reversar-salida/modal-reversar-salida/modal-reversar-salida.component';
import { ReversarSalidaService } from './reversar-salida/services/reversar-salida.service';
import { ModificarControlDescargaCamionCerealesComponent } from './modificaciones/modificar-control-descarga-camion-cereales/modificar-control-descarga-camion-cereales.component';
import { FechaPeriodoStockSanComponent } from './modificaciones/fecha-periodo-stock-san/fecha-periodo-stock-san.component';
import { ModificarControlDescargaCamionSubproductosNogranosComponent } from './modificaciones/modificar-control-descarga-camion-subproductos-nogranos/modificar-control-descarga-camion-subproductos-nogranos.component';
import { GestionarMovimientosComponent } from './gestionar-movimientos/gestionar-movimientos.component';
import { FiltroBusquedaMovimientosComponent } from './gestionar-movimientos/filtro-busqueda-movimientos/filtro-busqueda-movimientos.component';
import { SearchMovimientosService } from './gestionar-movimientos/search-movimientos.service';
import { MovimientoPesajeFueraDeCircuitoService } from './modificaciones/modificar-pesos-fuera-de-circuito/movimiento-pesaje-fuera-de-circuito.service';
import { ModificarPesosFueraDeCircuitoComponent } from './modificaciones/modificar-pesos-fuera-de-circuito/modificar-pesos-fuera-de-circuito.component';
import { ConsultaCamionDescargaEstadoComponent } from './consulta-camion-descarga/consulta-camion-descarga-estado/consulta-camion-descarga-estado.component';
import { ModificarProductoFueraCircuitoComponent } from './modificaciones/modificar-producto-fuera-circuito/modificar-producto-fuera-circuito.component';
import { DatosMovimientoModificarProductoFueraCircuitoComponent } from './modificaciones/modificar-producto-fuera-circuito/datos-movimiento-modificar-producto-fuera-circuito/datos-movimiento-modificar-producto-fuera-circuito.component';
import { ModificarProductoFueraCircuitoService } from './modificaciones/modificar-producto-fuera-circuito/service/modificar-producto-fuera-circuito.service';
import { CalidadMovimientoCerealService } from './shared/services/calidad-movimiento-cereal.service';
import { DescargaEventsNotifierService } from './shared/services/descarga-events-notifier.service';
import { GestionarCalidadPorLaboratorioComponent } from './gestionar-calidad-por-laboratorio/gestionar-calidad-por-laboratorio.component';
import { FiltroCalidadPorLaboratorioComponent } from './gestionar-calidad-por-laboratorio/filtro-calidad-por-laboratorio/filtro-calidad-por-laboratorio.component';
import { GestionarCalidadPorLaboratorioService } from './gestionar-calidad-por-laboratorio/service/gestionar-calidad-por-laboratorio.service';
import { EstadoMovimientoComponent } from '../shared/estado-movimiento/estado-movimiento.component';
import { ConsultarCalidadComponent } from './shared/consultar-calidad/consultar-calidad.component';
import { ModalDetalleMuestrasComponent } from './gestionar-calidad-por-laboratorio/modal-detalle-muestras/modal-detalle-muestras.component';
import { ModalRegistrarDecisionLaboratorioComponent } from './gestionar-calidad-por-laboratorio/modal-registrar-decision-laboratorio/modal-registrar-decision-laboratorio.component';
import { DesplegableDecisionLaboratorioComponent } from './gestionar-calidad-por-laboratorio/desplegable-decision-laboratorio/desplegable-decision-laboratorio.component';
import { DecisionLaboratorioService } from './gestionar-calidad-por-laboratorio/service/decision-laboratorio.service';
import { IngresarCalidadObservacionesComponent } from './shared/ingresar-calidad-observaciones/ingresar-calidad-observaciones.component';
import { DatosLaboratorioComponent } from './shared/datos-laboratorio/datos-laboratorio.component';
import { ModalAgregarMuestraLaboratorioComponent } from './shared/modal-agregar-muestra-laboratorio/modal-agregar-muestra-laboratorio.component';
import { DatosPesajeComponent } from './shared/datos-pesaje/datos-pesaje.component';
import { ControlarPesajeEnBalanzaComponent } from './controlar-pesaje-en-balanza/controlar-pesaje-en-balanza.component';
import { FiltroControlPesajeEnBalanzaComponent } from './controlar-pesaje-en-balanza/filtro-control-pesaje-en-balanza/filtro-control-pesaje-en-balanza.component';
import { ControlarPesajeEnBalanzaService } from './controlar-pesaje-en-balanza/services/controlar-pesaje-en-balanza.service';
import { DatosControlarPesajeEnBalanzaComponent } from './controlar-pesaje-en-balanza/datos-controlar-pesaje-en-balanza/datos-controlar-pesaje-en-balanza.component';
import { ModificarCalidadCaladoComponent } from './modificaciones/modificar-calidad-calado/modificar-calidad-calado.component';
import '../core/extensions/string-extensions';
import '../core/extensions/date-extensions';
import { SituacionEgresoComponent } from './registrar-peso/situacion-egreso/situacion-egreso.component';
import { CaladoService } from './ingresar-calidad-calado/calado.service';
import { ConsultaDatosStockComponent } from './consulta-camion-descarga/consulta-datos-stock/consulta-datos-stock.component';
import { DetalleMermasComponent } from './consulta-camion-descarga/consulta-datos-stock/detalle-mermas/detalle-mermas.component';
import { DatosStockComponent } from './consulta-camion-descarga/consulta-datos-stock/datos-stock/datos-stock.component';
import { ModalIngresarRebajaConvenidaComponent } from './ingresar-calidad-calado/rubros-calidad/modal-ingresar-rebaja-convenida/modal-ingresar-rebaja-convenida.component';
import { ControlarDescargaVagonCerealesComponent } from './controlar-descarga-vagon-cereales/controlar-descarga-vagon-cereales.component';
import { DatosDocumentoControlarDescargaVagonCerealesComponent } from './controlar-descarga-vagon-cereales/datos-documento-controlar-descarga-vagon-cereales/datos-documento-controlar-descarga-vagon-cereales.component';
import { DatosVagonComponent } from './shared/datos-vagon/datos-vagon.component';
import { ConsultaSanService } from './gestionar-movimientos/consulta-san.service';
import { ModalAutorizacionComponent } from './shared/modals/modal-autorizacion/modal-autorizacion.component';
import { AutorizarcionService } from './shared/modals/modal-autorizacion/autorizacion.service';
import { ControlarDescargaVagonNoGranosComponent } from './controlar-descarga-vagon-no-granos/controlar-descarga-vagon-no-granos.component';
import { DatosDocumentoControlarDescargaVagonNoGranosComponent } from './controlar-descarga-vagon-no-granos/datos-documento-controlar-descarga-vagon-no-granos/datos-documento-controlar-descarga-vagon-no-granos.component';
import { RegistrarPesoVagonComponent } from './registrar-peso-vagon/registrar-peso-vagon.component';
import { DatosMovimientoPesajeVagonComponent } from './registrar-peso-vagon/datos-movimiento-pesaje-vagon/datos-movimiento-pesaje-vagon.component';
import { BusquedaMovimientoPesajeVagonComponent } from './registrar-peso-vagon/busqueda-movimiento-pesaje-vagon/busqueda-movimiento-pesaje-vagon.component';
import { RegistrarPesoVagonesComponent } from './registrar-peso-vagones/registrar-peso-vagones.component';
import { GestionarInterfacesSanComponent } from './gestionar-interfaces-san/gestionar-interfaces-san.component';
import { FiltroBusquedaInterfacesSanComponent } from './gestionar-interfaces-san/filtro-busqueda-interfaces-san/filtro-busqueda-interfaces-san.component';
import { ModificarControlDescargaVagonNogranosComponent } from './modificaciones/modificar-control-descarga-vagon-nogranos/modificar-control-descarga-vagon-nogranos.component';
import { ModificarControlDescargaVagonCerealesComponent } from './modificaciones/modificar-control-descarga-vagon-cereales/modificar-control-descarga-vagon-cereales.component';
import { TextMaskModule } from 'angular2-text-mask';
import { AdministrarNotificacionesComponent } from './administrar-notificaciones/administrar-notificaciones.component';
import { FiltroAdministrarNotificacionesComponent } from './administrar-notificaciones/filtro-administrar-notificaciones/filtro-administrar-notificaciones.component';
import { DetalleAdministrarNotificacionesComponent } from './administrar-notificaciones/detalle-administrar-notificaciones/detalle-administrar-notificaciones.component';
import { DatosDestinatariosComponent } from './administrar-notificaciones/detalle-administrar-notificaciones/datos-destinatarios/datos-destinatarios.component';
import { ModalAgregarDestinatarioComponent } from './administrar-notificaciones/detalle-administrar-notificaciones/datos-destinatarios/modal-agregar-destinatario/modal-agregar-destinatario.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { GestionarNotificacionesComponent } from './gestionar-notificaciones/gestionar-notificaciones.component';
import { AdministrarRolesComponent } from './administrar-roles/administrar-roles.component';
import { FiltroAdministrarRolesComponent } from './administrar-roles/filtro-administrar-roles/filtro-administrar-roles.component';
import { DetalleAdministrarRolesComponent } from './administrar-roles/detalle-administrar-roles/detalle-administrar-roles.component';
import { TreeModule } from 'angular-tree-component';
import { AdministrarUsuariosComponent } from './administrar-usuarios/administrar-usuarios.component';
import { FiltroAdministrarUsuariosComponent } from './administrar-usuarios/filtro-administrar-usuarios/filtro-administrar-usuarios.component';
import { DetalleAdministrarUsuariosComponent } from './administrar-usuarios/detalle-administrar-usuarios/detalle-administrar-usuarios.component';
import { ModalAgregarRolTerminalComponent } from './administrar-usuarios/detalle-administrar-usuarios/modal-agregar-rol-terminal/modal-agregar-rol-terminal.component';
import { AdministrarCaracteristicasComponent } from './administrar-caracteristicas/administrar-caracteristicas.component';
import { FiltroAdministrarCaracteristicasComponent } from './administrar-caracteristicas/filtro-administrar-caracteristicas/filtro-administrar-caracteristicas.component';
import { AdministrarCircuitosComponent } from './administrar-circuitos/administrar-circuitos.component';
import { FiltroAdministrarCircuitosComponent } from './administrar-circuitos/filtro-administrar-circuitos/filtro-administrar-circuitos.component';
import { DetalleAdministrarCircuitosComponent } from './administrar-circuitos/detalle-administrar-circuitos/detalle-administrar-circuitos.component';
import { DetalleAdministrarCaracteristicasComponent } from './administrar-caracteristicas/detalle-administrar-caracteristicas/detalle-administrar-caracteristicas.component';
import { FiltroAdministrarRestriccionesPorPuestoTrabajoComponent } from './administrar-restricciones-por-puesto-trabajo/filtro-administrar-restricciones-por-puesto-trabajo/filtro-administrar-restricciones-por-puesto-trabajo.component';
import { DetalleAdministrarRestriccionesPorPuestoTrabajoComponent } from './administrar-restricciones-por-puesto-trabajo/detalle-administrar-restricciones-por-puesto-trabajo/detalle-administrar-restricciones-por-puesto-trabajo.component';
import { AdministrarRestriccionesPorPuestoTrabajoComponent } from './administrar-restricciones-por-puesto-trabajo/administrar-restricciones-por-puesto-trabajo.component';
import { AdministrarChoferesComponent } from './administrar-choferes/administrar-choferes.component';
import { FiltroAdministrarChoferesComponent } from './administrar-choferes/filtro-administrar-choferes/filtro-administrar-choferes.component';
import { DetalleAdministrarChoferesComponent } from './administrar-choferes/detalle-administrar-choferes/detalle-administrar-choferes.component';
import { AdministrarImpresorasComponent } from './administrar-impresoras/administrar-impresoras.component';
import { FiltroAdministrarImpresorasComponent } from './administrar-impresoras/filtro-administrar-impresoras/filtro-administrar-impresoras.component';
import { DetalleAdministrarImpresorasComponent } from './administrar-impresoras/detalle-administrar-impresoras/detalle-administrar-impresoras.component';
import { AdministrarTarjetaComponent } from './administrar-tarjeta/administrar-tarjeta.component';
import { FiltroAdministrarTarjetaComponent } from './administrar-tarjeta/filtro-administrar-tarjeta/filtro-administrar-tarjeta.component';
import { DetalleAdministrarTarjetaComponent } from './administrar-tarjeta/detalle-administrar-tarjeta/detalle-administrar-tarjeta.component';
import { AdministrarDispositivosComponent } from './administrar-dispositivos/administrar-dispositivos.component';
import { FiltroAdministrarDispositivosComponent } from './administrar-dispositivos/filtro-administrar-dispositivos/filtro-administrar-dispositivos.component';
import { DetalleAdministrarDispositivosComponent } from './administrar-dispositivos/detalle-administrar-dispositivos/detalle-administrar-dispositivos.component';
import { AdministrarActividadesCircuitoComponent } from './administrar-actividades-circuito/administrar-actividades-circuito.component';
import { FiltroAdministrarActividadesCircuitoComponent } from './administrar-actividades-circuito/filtro-administrar-actividades-circuito/filtro-administrar-actividades-circuito.component';
import { DetalleAdministrarActividadesCircuitoComponent } from './administrar-actividades-circuito/detalle-administrar-actividades-circuito/detalle-administrar-actividades-circuito.component';
import { AdministrarAutorizacionesBalanzaComponent } from './administrar-autorizaciones-balanza/administrar-autorizaciones-balanza.component';
import { DetalleAdministrarAutorizacionesBalanzaComponent } from './administrar-autorizaciones-balanza/detalle-administrar-autorizaciones-balanza/detalle-administrar-autorizaciones-balanza.component';
import { FiltroAdministrarAutorizacionesBalanzaComponent } from './administrar-autorizaciones-balanza/filtro-administrar-autorizaciones-balanza/filtro-administrar-autorizaciones-balanza.component';
import { AdministrarPenalizacionChoferesComponent } from './administrar-penalizacion-choferes/administrar-penalizacion-choferes.component';
import { FiltroAdministrarPenalizacionChoferesComponent } from './administrar-penalizacion-choferes/filtro-administrar-penalizacion-choferes/filtro-administrar-penalizacion-choferes.component';
import { DetalleAdministrarPenalizacionChoferesComponent } from './administrar-penalizacion-choferes/detalle-administrar-penalizacion-choferes/detalle-administrar-penalizacion-choferes.component';
import { AdministrarPuestosDeTrabajoComponent } from './administrar-puestos-de-trabajo/administrar-puestos-de-trabajo.component';
import { FiltroAdministrarPuestosDeTrabajoComponent } from './administrar-puestos-de-trabajo/filtro-administrar-puestos-de-trabajo/filtro-administrar-puestos-de-trabajo.component';
import { DetalleAdministrarPuestosDeTrabajoComponent } from './administrar-puestos-de-trabajo/detalle-administrar-puestos-de-trabajo/detalle-administrar-puestos-de-trabajo.component';
import { ModalAgregarAccionComponent } from './administrar-puestos-de-trabajo/detalle-administrar-puestos-de-trabajo/modal-agregar-accion/modal-agregar-accion.component';
import { ModalAgregarDispositivoComponent } from './administrar-puestos-de-trabajo/detalle-administrar-puestos-de-trabajo/modal-agregar-dispositivo/modal-agregar-dispositivo.component';
import { AdministrarLecturaHumedimetroComponent } from './administrar-lectura-humedimetro/administrar-lectura-humedimetro.component';
import { FiltroAdministrarLecturaHumedimetroComponent } from './administrar-lectura-humedimetro/filtro-administrar-lectura-humedimetro/filtro-administrar-lectura-humedimetro.component';
import { DetalleAdministrarLecturaHumedimetroComponent } from './administrar-lectura-humedimetro/detalle-administrar-lectura-humedimetro/detalle-administrar-lectura-humedimetro.component';
import { AdministrarParametrosPorProductoComponent } from './administrar-parametros-por-producto/administrar-parametros-por-producto.component';
import { AdministrarParametrosPorRubroCalidadComponent } from './administrar-parametros-por-rubro-calidad/administrar-parametros-por-rubro-calidad.component';
import { AdministrarParametrosPorSociedadComponent } from './administrar-parametros-por-sociedad/administrar-parametros-por-sociedad.component';
import { AdministrarParametrosPorTerminalComponent } from './administrar-parametros-por-terminal/administrar-parametros-por-terminal.component';
import { FiltroAdministrarParametrosPorTerminalComponent } from './administrar-parametros-por-terminal/filtro-administrar-parametros-por-terminal/filtro-administrar-parametros-por-terminal.component';
import { DetalleAdministrarParametrosPorTerminalComponent } from './administrar-parametros-por-terminal/detalle-administrar-parametros-por-terminal/detalle-administrar-parametros-por-terminal.component';
import { ModalSituacionBalanzaComponent } from './registrar-peso/modal-situacion-balanza/modal-situacion-balanza.component';
import { AdministrarDestinosPostCaladoComponent } from './administrar-destinos-post-calado/administrar-destinos-post-calado.component';
import { FiltroAdministrarDestinosPostCaladoComponent } from './administrar-destinos-post-calado/filtro-administrar-destinos-post-calado/filtro-administrar-destinos-post-calado.component';
import { DetalleAdministrarDestinosPostCaladoComponent } from './administrar-destinos-post-calado/detalle-administrar-destinos-post-calado/detalle-administrar-destinos-post-calado.component';
import { AdministrarParametrosPorTipoAnalisisCamaraComponent } from './administrar-parametros-por-tipo-analisis-camara/administrar-parametros-por-tipo-analisis-camara.component';
import { AdministrarPlataformasComponent } from './administrar-plataformas/administrar-plataformas.component';
import { FiltroAdministrarPlataformasComponent } from './administrar-plataformas/filtro-administrar-plataformas/filtro-administrar-plataformas.component';
import { DetalleAdministrarPlataformasComponent } from './administrar-plataformas/detalle-administrar-plataformas/detalle-administrar-plataformas.component';
import { AdministrarRangosCodigoBarraCamaraComponent } from './administrar-rangos-codigo-barra-camara/administrar-rangos-codigo-barra-camara.component';
import { DetalleAdministrarRangosCodigoBarraCamaraComponent } from './administrar-rangos-codigo-barra-camara/detalle-administrar-rangos-codigo-barra-camara/detalle-administrar-rangos-codigo-barra-camara.component';
import { FiltroAdministrarRangosCodigoBarraCamaraComponent } from './administrar-rangos-codigo-barra-camara/filtro-administrar-rangos-codigo-barra-camara/filtro-administrar-rangos-codigo-barra-camara.component';
import { AdministrarEquivalenciaRubrosComponent } from './administrar-equivalencia-rubros/administrar-equivalencia-rubros.component';
import { DetalleAdministrarEquivalenciaRubrosComponent } from './administrar-equivalencia-rubros/detalle-administrar-equivalencia-rubros/detalle-administrar-equivalencia-rubros.component';
import { FiltroAdministrarEquivalenciaRubrosComponent } from './administrar-equivalencia-rubros/filtro-administrar-equivalencia-rubros/filtro-administrar-equivalencia-rubros.component';
import { AdministrarTipoDocumentoPorteTipoProductoComponent } from './administrar-tipo-documento-porte-tipo-producto/administrar-tipo-documento-porte-tipo-producto.component';
import { DetalleAdministrarTipoDocumentoPorteTipoProductoComponent } from './administrar-tipo-documento-porte-tipo-producto/detalle-administrar-tipo-documento-porte-tipo-producto/detalle-administrar-tipo-documento-porte-tipo-producto.component';
import { FiltroAdministrarTipoDocumentoPorteTipoProductoComponent } from './administrar-tipo-documento-porte-tipo-producto/filtro-administrar-tipo-documento-porte-tipo-producto/filtro-administrar-tipo-documento-porte-tipo-producto.component';
import { AdministrarProductosHabilitadosPorTerminalComponent } from './administrar-productos-habilitados-por-terminal/administrar-productos-habilitados-por-terminal.component';
import { FiltroAdministrarProductosHabilitadosPorTerminalComponent } from './administrar-productos-habilitados-por-terminal/filtro-administrar-productos-habilitados-por-terminal/filtro-administrar-productos-habilitados-por-terminal.component';
import { DetalleAdministrarProductosHabilitadosPorTerminalComponent } from './administrar-productos-habilitados-por-terminal/detalle-administrar-productos-habilitados-por-terminal/detalle-administrar-productos-habilitados-por-terminal.component';
import { ModalAgregarRubroComponent } from './administrar-productos-habilitados-por-terminal/detalle-administrar-productos-habilitados-por-terminal/modal-agregar-rubro/modal-agregar-rubro.component';
import { AdministrarGrupoProductoComponent } from './administrar-grupo-producto/administrar-grupo-producto.component';
import { FiltroAdministrarGrupoProductoComponent } from './administrar-grupo-producto/filtro-administrar-grupo-producto/filtro-administrar-grupo-producto.component';
import { DetalleAdministrarGrupoProductoComponent } from './administrar-grupo-producto/detalle-administrar-grupo-producto/detalle-administrar-grupo-producto.component';
import { LecturaTarjetaComponent } from './shared/lectura-tarjeta/lectura-tarjeta.component';
import { ModalLecturaTarjetaComponent } from './shared/lectura-tarjeta/modal-lectura-tarjeta/modal-lectura-tarjeta.component';
import { DatosEntregaComponent } from './shared/datos-entrega/datos-entrega.component';
import { ControlarCargaCamionComponent } from './controlar-carga-camion/controlar-carga-camion.component';
import { DatosDocumentoControlarCargaCamionComponent } from './controlar-carga-camion/datos-documento-controlar-carga-camion/datos-documento-controlar-carga-camion.component';
import { GestionarOrdenesCargaComponent } from './gestionar-ordenes-carga/gestionar-ordenes-carga.component';
import { FiltroGestionarOrdenesCargaComponent } from './gestionar-ordenes-carga/filtro-gestionar-ordenes-carga/filtro-gestionar-ordenes-carga.component';
import { ControlarCalidadCamionCargaComponent } from './controlar-calidad-camion-carga/controlar-calidad-camion-carga.component';
import { FiltroControlarCalidadCamionCargaComponent } from './controlar-calidad-camion-carga/filtro-controlar-calidad-camion-carga/filtro-controlar-calidad-camion-carga.component';
import { DatosControlarCalidadCamionCargaComponent } from './controlar-calidad-camion-carga/datos-controlar-calidad-camion-carga/datos-controlar-calidad-camion-carga.component';
import { ControlarCargaCamionInsumoVarioComponent } from './controlar-carga-camion-varios/controlar-carga-camion-insumo-vario.component';
import { DatosDocumentoControlarCargaCamionInsumoVarioComponent } from './controlar-carga-camion-varios/datos-documento-controlar-carga-camion-varios/datos-documento-controlar-carga-camion-Insumo-vario.component';
import { ChecklistControlPatrimonialComponent } from './checklist-control-patrimonial/checklist-control-patrimonial.component';
import { FiltroChecklistControlPatrimonialComponent } from './checklist-control-patrimonial/filtro-checklist-control-patrimonial/filtro-checklist-control-patrimonial.component';
import { DatosChecklistControlPatrimonialComponent } from './checklist-control-patrimonial/datos-checklist-control-patrimonial/datos-checklist-control-patrimonial.component';
import { ListaChecklistControlPatrimonialComponent } from './checklist-control-patrimonial/lista-checklist-control-patrimonial/lista-checklist-control-patrimonial.component';
import { ModalAgregarImpresoraComponent } from './administrar-usuarios/detalle-administrar-usuarios/modal-agregar-impresora/modal-agregar-impresora.component';
import { MisImpresorasComponent } from './mis-impresoras/mis-impresoras.component';
import { FiltroMisImpresorasComponent } from './mis-impresoras/filtro-mis-impresoras/filtro-mis-impresoras.component';
import { DetalleMisImpresorasComponent } from './mis-impresoras/detalle-mis-impresoras/detalle-mis-impresoras.component';
import { AsignarTarjetaComponent } from './asignar-tarjeta/asignar-tarjeta.component';
import { ModalChecklistControlPatrimonialComponent } from './controlar-salida/modal-checklist-control-patrimonial/modal-checklist-control-patrimonial.component';
import { ConsultaControlPatrimonialComponent } from './consulta-camion-descarga/consulta-control-patrimonial/consulta-control-patrimonial.component';
import { RegistrarControlPatrimonialComponent } from './registrar-control-patrimonial/registrar-control-patrimonial.component';
import { FiltroRegistrarControlPatrimonialComponent } from './registrar-control-patrimonial/filtro-registrar-control-patrimonial/filtro-registrar-control-patrimonial.component';
import { DatosRegistrarControlPatrimonialComponent } from './registrar-control-patrimonial/datos-registrar-control-patrimonial/datos-registrar-control-patrimonial.component';
import { DecisionRegistrarControlPatrimonialComponent } from './registrar-control-patrimonial/decision-registrar-control-patrimonial/decision-registrar-control-patrimonial.component';
import { ReimprimirDocumentoPorteComponent } from './reimprimir-documento-porte/reimprimir-documento-porte.component';
import { FiltroBusquedaReimpresionDocumentoPorteComponent } from './reimprimir-documento-porte/filtro-busqueda-reimpresion-documento-porte/filtro-busqueda-reimpresion-documento-porte.component';
import { DatosDocumentoInsumosComponent } from './controlar-descarga-camion-insumos/datos-documento-insumos/datos-documento-insumos.component';
import { ModificarControlDescargaCamionInsumosComponent } from './modificaciones/modificar-control-descarga-camion-insumos/modificar-control-descarga-camion-insumos.component';
import { ConsultaCalidadCargaComponent } from './consulta-camion-descarga/consulta-calidad-carga/consulta-calidad-carga.component';
import { ConsultaMovimientoComponent } from './consulta-camion-descarga/consulta-movimiento.component';
import { AdministrarSuplenciasComponent } from './administrar-suplencias/administrar-suplencias.component';
import { FiltroAdministrarSuplenciasComponent } from './administrar-suplencias/filtro-administrar-suplencias/filtro-administrar-suplencias.component';
import { DetalleAdministrarSuplenciasComponent } from './administrar-suplencias/detalle-administrar-suplencias/detalle-administrar-suplencias.component';
import { ValidarCupoComponent } from './validar-cupo/validar-cupo.component';
import { DatosDocumentoValidarCupoComponent } from './validar-cupo/datos-documento-validar-cupo/datos-documento-validar-cupo.component';
import { ReimprimirTurnoPlayaComponent } from './reimprimir-turno-playa/reimprimir-turno-playa.component';
import { FiltroReimprimirTurnoPlayaComponent } from './reimprimir-turno-playa/filtro-reimprimir-turno-playa/filtro-reimprimir-turno-playa.component';
import { GestionarCuposComponent } from './gestionar-cupos/gestionar-cupos.component';
import { FiltroGestionarCuposComponent } from './gestionar-cupos/filtro-gestionar-cupos/filtro-gestionar-cupos.component';
import { EstadoCupoComponent } from './validar-cupo/estado-cupo/estado-cupo.component';
import { IdentificarCamionCerealCupoComponent } from './controlar-descarga-camion-cereales/identificar-camion-cereal-cupo/identificar-camion-cereal-cupo.component';
import { CupoDatosDocumentoComponent } from './controlar-descarga-camion-cereales/datos-documento-controlar-descarga-cereales/cupo-datos-documento/cupo-datos-documento.component';
import { CartaPorteDatosDocumentoComponent } from './controlar-descarga-camion-cereales/datos-documento-controlar-descarga-cereales/carta-porte-datos-documento/carta-porte-datos-documento.component';
import { IntervinientesDatosDocumentoComponent } from './controlar-descarga-camion-cereales/datos-documento-controlar-descarga-cereales/intervinientes-datos-documento/intervinientes-datos-documento.component';
import { GranosEspeciesDatosDocumentoComponent } from './controlar-descarga-camion-cereales/datos-documento-controlar-descarga-cereales/granos-especies-datos-documento/granos-especies-datos-documento.component';
import { DestinoDatosDocumentoComponent } from './controlar-descarga-camion-cereales/datos-documento-controlar-descarga-cereales/destino-datos-documento/destino-datos-documento.component';
import { DatosTransporteDatosDocumentoComponent } from './controlar-descarga-camion-cereales/datos-documento-controlar-descarga-cereales/datos-transporte-datos-documento/datos-transporte-datos-documento.component';
import { ConfirmacionArriboCtgDatosDocumentoComponent } from './controlar-descarga-camion-cereales/datos-documento-controlar-descarga-cereales/confirmacion-arribo-ctg-datos-documento/confirmacion-arribo-ctg-datos-documento.component';
import { DatosLdcDatosDocumentoComponent } from './controlar-descarga-camion-cereales/datos-documento-controlar-descarga-cereales/datos-ldc-datos-documento/datos-ldc-datos-documento.component';
import { ObservacionesDatosDocumentoComponent } from './controlar-descarga-camion-cereales/datos-documento-controlar-descarga-cereales/observaciones-datos-documento/observaciones-datos-documento.component';
import { MovimientoDatosDocumentoComponent } from './controlar-descarga-camion-cereales/datos-documento-controlar-descarga-cereales/movimiento-datos-documento/movimiento-datos-documento.component';
import { DatosDocumentoTransportesVariosComponent } from './controlar-descarga-camion-insumos/datos-documento-transportes-varios/datos-documento-transportes-varios.component';
import { ModalSeleccionarRemitoComponent } from './shared/modal-seleccionar-remito/modal-seleccionar-remito.component';
import { AdministrarTiposPuestosTrabajoComponent } from './administrar-tipos-puestos-trabajo/administrar-tipos-puestos-trabajo.component';
import { DetalleAdministrarTiposPuestosTrabajoComponent } from './administrar-tipos-puestos-trabajo/detalle-administrar-tipos-puestos-trabajo/detalle-administrar-tipos-puestos-trabajo.component';
import { FiltroAdministrarTiposPuestosTrabajoComponent } from './administrar-tipos-puestos-trabajo/filtro-administrar-tipos-puestos-trabajo/filtro-administrar-tipos-puestos-trabajo.component';
import { AdministrarSobresTransporteComponent } from './administrar-sobres-transporte/administrar-sobres-transporte.component';
import { FiltroAdministrarSobresTransporteComponent } from './administrar-sobres-transporte/filtro-administrar-sobres-transporte/filtro-administrar-sobres-transporte.component';
import { DetalleAdministrarSobresTransporteComponent } from './administrar-sobres-transporte/detalle-administrar-sobres-transporte/detalle-administrar-sobres-transporte.component';
import { AgregarAlSobreTransporteComponent } from './shared/agregar-al-sobre-transporte/agregar-al-sobre-transporte.component';
import { TesteoTarjetaComponent } from './testeo-tarjeta/testeo-tarjeta.component';
import { ImportarSobresTransporteComponent } from './importar-sobres-transporte/importar-sobres-transporte.component';
import { FiltroImportarSobresTransporteComponent } from './importar-sobres-transporte/filtro-importar-sobres-transporte/filtro-importar-sobres-transporte.component';
import { DetalleImportarSobresTransporteComponent } from './importar-sobres-transporte/detalle-importar-sobres-transporte/detalle-importar-sobres-transporte.component';
import { DetalleSobreTransporteComponent } from './administrar-sobres-transporte/detalle-administrar-sobres-transporte/detalle-sobre-transporte/detalle-sobre-transporte.component';
import { ConsultaEntidadTransportableComponent } from './administrar-sobres-transporte/detalle-administrar-sobres-transporte/consulta-entidad-transportable/consulta-entidad-transportable.component';
import { AdministrarTarjetaAutorizacionComponent } from './administrar-tarjeta-autorizacion/administrar-tarjeta-autorizacion.component';
import { FiltroAdministrarTarjetaAutorizacionComponent } from './administrar-tarjeta-autorizacion/filtro-administrar-tarjeta-autorizacion/filtro-administrar-tarjeta-autorizacion.component';
import { DetalleAdministrarTarjetaAutorizacionComponent } from './administrar-tarjeta-autorizacion/detalle-administrar-tarjeta-autorizacion/detalle-administrar-tarjeta-autorizacion.component';
import { CodigoTarjetaConEtiquetaComponent } from './administrar-tarjeta/codigo-tarjeta-con-etiqueta/codigo-tarjeta-con-etiqueta.component';
import { ModalHistorialSobreTransporteComponent } from './administrar-sobres-transporte/modal-historial-sobre-transporte/modal-historial-sobre-transporte.component';
import { DetalleParametrosPorRubroCalidadComponent } from './administrar-parametros-por-rubro-calidad/detalle-parametros-por-rubro-calidad/detalle-parametros-por-rubro-calidad.component';
import { FiltroAdministrarParametrosPorProductoComponent } from './administrar-parametros-por-producto/filtro-administrar-parametros-por-producto/filtro-administrar-parametros-por-producto.component';
import { DetalleAdministrarParametrosPorProductoComponent } from './administrar-parametros-por-producto/detalle-administrar-parametros-por-producto/detalle-administrar-parametros-por-producto.component';
import { FiltroAdministrarParametrosPorTipoAnalisisCamaraComponent } from './administrar-parametros-por-tipo-analisis-camara/filtro-administrar-parametros-por-tipo-analisis-camara/filtro-administrar-parametros-por-tipo-analisis-camara.component';
import { DetalleAdministrarParametrosPorTipoAnalisisCamaraComponent } from './administrar-parametros-por-tipo-analisis-camara/detalle-administrar-parametros-por-tipo-analisis-camara/detalle-administrar-parametros-por-tipo-analisis-camara.component';
import { AdministrarTiempoLimiteEstadoComponent } from './administrar-tiempo-limite-estado/administrar-tiempo-limite-estado.component';
import { FiltroAdministrarTiempoLimiteEstadoComponent } from './administrar-tiempo-limite-estado/filtro-administrar-tiempo-limite-estado/filtro-administrar-tiempo-limite-estado.component';
import { DetalleAdministrarTiempoLimiteEstadoComponent } from './administrar-tiempo-limite-estado/detalle-administrar-tiempo-limite-estado/detalle-administrar-tiempo-limite-estado.component';
import { ConfigurarAmbienteComponent } from './configurar-ambiente/configurar-ambiente.component';
import { AutocompleteProductoService } from './shared/services/autocomplete-producto.service';
import { ModalImportarExcelComponent } from './administrar-tarjeta/modal-importar-excel/modal-importar-excel.component';
import { ModalDecisionRegistrarControlPatrimonialComponent } from './registrar-control-patrimonial/modal-decision-registrar-control-patrimonial/modal-decision-registrar-control-patrimonial.component';
import { ModalDecisionControlarCalidadCamionCargaComponent } from './controlar-calidad-camion-carga/modal-decision-controlar-calidad-camion-carga/modal-decision-controlar-calidad-camion-carga.component';
import { FiltroAdministrarPuntosCargaComponent } from './administrar-puntos-carga/filtro-administrar-puntos-carga/filtro-administrar-puntos-carga.component';
import { DetalleAdministrarPuntosCargaComponent } from './administrar-puntos-carga/detalle-administrar-puntos-carga/detalle-administrar-puntos-carga.component';
import { AdministrarPuntosCargaComponent } from './administrar-puntos-carga/administrar-puntos-carga.component';
import { ModificarDatosOrdenCargaCamionComponent } from './modificaciones/modificar-datos-orden-carga-camion/modificar-datos-orden-carga-camion.component';
import { DetalleModificarDatosOrdenCargaCamionComponent } from './modificaciones/modificar-datos-orden-carga-camion/detalle-modificar-datos-orden-carga-camion/detalle-modificar-datos-orden-carga-camion.component';
import { ModificarDatosOrdenCargaCamionInsumoVariosComponent } from './modificaciones/modificar-datos-orden-carga-camion-insumo-vario/modificar-datos-orden-carga-camion-insumo-varios.component';
import { DetalleModificarDatosOrdenCargaCamionInsumoVariosComponent } from './modificaciones/modificar-datos-orden-carga-camion-insumo-vario/detalle-modificar-datos-orden-carga-camion-insumo-vario/detalle-modificar-datos-orden-carga-camion-insumo-varios.component';
import { PagoTasaMunicipalComponent } from './pago-tasa-municipal/pago-tasa-municipal.component';
import { FiltroPagoTasaMunicipalComponent } from './pago-tasa-municipal/filtro-pago-tasa-municipal/filtro-pago-tasa-municipal.component';
import { DetallePagoTasaMunicipalComponent } from './pago-tasa-municipal/detalle-pago-tasa-municipal/detalle-pago-tasa-municipal.component';
import { ReembolsoTasaMunicipalComponent } from './reembolso-tasa-municipal/reembolso-tasa-municipal.component';
import { DetalleReembolsoTasaMunicipalComponent } from './reembolso-tasa-municipal/detalle-reembolso-tasa-municipal/detalle-reembolso-tasa-municipal.component';
import { FiltroReembolsoTasaMunicipalComponent } from './reembolso-tasa-municipal/filtro-reembolso-tasa-municipal/filtro-reembolso-tasa-municipal.component';
import { LecturaQRComponent } from './shared/lectura-qr/lectura-qr.component';
import { ModalLecturaQRComponent } from './shared/lectura-qr/modal-lectura-qr/modal-lectura-qr.component';
import { AdministrarTextoGmpComponent } from './administrar-texto-gmp/administrar-texto-gmp.component';
import { FiltroAdministrarTextoGmpComponent } from './administrar-texto-gmp/filtro-administrar-texto-gmp/filtro-administrar-texto-gmp.component';
import { DetalleAdministrarTextoGmpComponent } from './administrar-texto-gmp/detalle-administrar-texto-gmp/detalle-administrar-texto-gmp.component';
import { AdministrarFinalidadesEnvioPdfTicketBalanzaComponent } from './administrar-finalidades-envio-pdf-ticket-balanza/administrar-finalidades-envio-pdf-ticket-balanza.component';
import { FiltroAdministrarFinalidadesEnvioPdfTicketBalanzaComponent } from './administrar-finalidades-envio-pdf-ticket-balanza/filtro-administrar-finalidades-envio-pdf-ticket-balanza/filtro-administrar-finalidades-envio-pdf-ticket-balanza.component';
import { DetalleAdministrarFinalidadesEnvioPdfTicketBalanzaComponent } from './administrar-finalidades-envio-pdf-ticket-balanza/detalle-administrar-finalidades-envio-pdf-ticket-balanza/detalle-administrar-finalidades-envio-pdf-ticket-balanza.component';
import { TurnoCircularService } from './shared/services/turno-circular.service';
import { DatosTurnoCircularComponent } from './shared/datos-turno-circular/datos-turno-circular.component';
import { FiltroBusquedaGestionTransporteCircuitoComponent } from './gestionar-transportes-circuito/filtro-busqueda-gestion-transporte-circuito/filtro-busqueda-gestion-transporte-circuito.component';
import { GestionarTransportesCircuitoComponent } from './gestionar-transportes-circuito/gestionar-transportes-circuito.component';
import { MermasEspecialesComponent } from './ingresar-calidad-calado/mermas-especiales/mermas-especiales.component';
import { ReimprimirObleaLaboratorioComponent } from './reimprimir-oblea-laboratorio/reimprimir-oblea-laboratorio.component';
import { FiltroBusquedaReimpresionObleaLaboratorioComponent } from './reimprimir-oblea-laboratorio/filtro-busqueda-reimpresion-oblea-laboratorio/filtro-busqueda-reimpresion-oblea-laboratorio.component';
import { ReimprimirObleaLaboratorioService } from './reimprimir-oblea-laboratorio/reimprimir-oblea-laboratorio.service';
import { ModalConfirmarImpresionComponent } from './shared/modals/modal-confirmar-impresion/modal-confirmar-impresion.component';
import { DashboardBalanzasAutomatizadasComponent } from './dashboard-balanzas-automatizadas/dashboard-balanzas-automatizadas.component';
import { DetalleBalanzaComponent } from './dashboard-balanzas-automatizadas/detalle-balanza/detalle-balanza.component';
import { ModalSeleccionarBalanzasComponent } from './dashboard-balanzas-automatizadas/modal-seleccionar-balanzas/modal-seleccionar-balanzas.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardService } from './shared/services/dashboard.service';
import { SignalrService } from './shared/services/signalr/signalr.service';
import { ResolverEventoComponent } from './resolver-evento/resolver-evento.component';
import { AdministrarEventosComponent } from './administrar-eventos/administrar-eventos.component';
import { FiltroAdministrarEventosComponent } from './administrar-eventos/filtro-administrar-eventos/filtro-administrar-eventos.component';
import { DetalleAdministrarEventosComponent } from './administrar-eventos/detalle-administrar-eventos/detalle-administrar-eventos.component';
import { SeleccionarBalanzaSalidaComponent } from './seleccionar-balanza-salida/seleccionar-balanza-salida.component';
import { DatosBalanzaSeleccionarBalanzaSalidaComponent } from './seleccionar-balanza-salida/datos-balanza-seleccionar-balanza-salida/datos-balanza-seleccionar-balanza-salida.component';
import { DetalleSeleccionarBalanzaSalidaComponent } from './seleccionar-balanza-salida/detalle-seleccionar-balanza-salida/detalle-seleccionar-balanza-salida.component';
import { ResolverEventoPlataformaRequeridaComponent } from './resolver-evento-plataforma-requerida/resolver-evento-plataforma-requerida.component';
import { DetallePlataformaRequeridaComponent } from './resolver-evento-plataforma-requerida/detalle-plataforma-requerida/detalle-plataforma-requerida.component';
import { ResolverPlataformaDescargaComponent } from './resolver-plataforma-descarga/resolver-plataforma-descarga.component';
import { ResolverEventoAutorizacionesComponent } from './resolver-evento-autorizaciones/resolver-evento-autorizaciones.component';
import { ModalResolverEventoTarjetaMatriculaComponent } from './dashboard-balanzas-automatizadas/detalle-balanza/modal-resolver-evento-tarjeta-matricula/modal-resolver-evento-tarjeta-matricula.component';
import { ModalSeleccionarBalanzaSalidaComponent } from './dashboard-balanzas-automatizadas/detalle-balanza/modal-seleccionar-balanza-salida/modal-seleccionar-balanza-salida.component';
import { ModalResolverEventoAutorizacionesComponent } from './dashboard-balanzas-automatizadas/detalle-balanza/modal-resolver-evento-autorizaciones/modal-resolver-evento-autorizaciones.component';
import { ModalResolverPlataformaDescargaComponent } from './dashboard-balanzas-automatizadas/detalle-balanza/modal-resolver-plataforma-descarga/modal-resolver-plataforma-descarga.component';
import { ModalResolverEventoplataformaRequeridaComponent } from './dashboard-balanzas-automatizadas/detalle-balanza/modal-resolver-evento-plataforma-requerida/modal-resolver-evento-plataforma-requerida.component';
import { ResolverEventosPendientesComponent } from './resolver-eventos-pendientes/resolver-eventos-pendientes.component';
import { DetalleEventosPendientesComponent } from './resolver-eventos-pendientes/detalle-eventos-pendientes/detalle-eventos-pendientes.component';
import { ModalSeleccionarMovimientoComponent } from './controlar-descarga-camion-cereales/modal-seleccionar-movimiento/modal-seleccionar-movimiento.component';
import { FiltroCambiarTarjetaComponent } from './cambiar-tarjeta/filtro-cambiar-tarjeta/filtro-cambiar-tarjeta.component';


@NgModule({
  declarations: [
    CircuitoComponent,
    ConfirmacionArriboCtgComponent,
    CupoComponent,
    DesplegableTipoDocumentoPorteComponent,
    DocumentoPorteComponent,
    ControlarDescargaCamionInsumosComponent,
    GestionarControlComponent,
    ControlarDescargaCamionCerealesComponent,
    DatosDocumentoControlarDescargaCerealesComponent,
    DatosDocumentoTransportesVariosComponent,
    ModalMotivoComponent,
    IngresarCalidadCaladoComponent,
    FiltroMovimientoComponent,
    DatosMovimientoComponent,
    AccionComponent,
    RubrosCalidadComponent,
    IngresarCalidadObservacionesComponent,
    RegistrarPesoComponent,
    DatosMovimientoPesajeComponent,
    DatosPesajeComponent,
    SituacionEntradaComponent,
    ListaMotivosNoDescargaComponent,
    BusquedaMovimientoPesajeComponent,
    ControlarSalidaComponent,
    QuitarDeCircuitoComponent,
    BusquedaMovimientoControlSalidaComponent,
    BusquedaMovimientoQuitarDeCircuitoComponent,
    DatosMovimientoControlSalidaComponent,
    DatosMovimientoQuitarDeCircuitoComponent,
    GestionarCalidadCaladoComponent,
    FiltroBusquedaGestionarCalidadCaladoComponent,
    ModalConfirmarConObservacionesComponent,
    FiltroBusquedaControlComponent,
    GestionarDescargasPorEntregadorComponent,
    FiltroBusquedaEntregadoresComponent,
    ModalRechazarDescargaComponent,
    GestionarManipuleoComponent,
    FiltroBusquedaGestionarManipuleoComponent,
    DatosEdicionGestionarManipuleoComponent,
    DesplegableCondicionManipuleoComponent,
    ModalAsignarTarjetaComponent,
    IngresarCalidadCamaraComponent,
    ReimprimirTicketPesajeComponent,
    FiltroBusquedaReimpresionTicketPesajeComponent,
    ReimprimirTicketCalidadComponent,
    FiltroBusquedaReimpresionTicketCalidadComponent,
    CambiarTarjetaComponent,
    DetalleCambiarTarjetaComponent,
    GestionarMuestrasComponent,
    FiltroBusquedaMuestrasComponent,
    ModalCambiarCodigoBarrasComponent,
    GestionarTrabajosArchivosMuestraComponent,
    FiltroBusquedaTrabajosArchivosMuestraComponent,
    ModalAutorizarMuestraAgilComponent,
    ModalAgregarTrabajoGeneracionArchivosMuestraComponent,
    ControlarDescargaCamionSubproductosComponent,
    DatosDocumentoControlarDescargaSubproductosComponent,
    ModalMostrarMensajeComponent,
    ReversarSalidaComponent,
    FiltroBusquedaReversarSalidaComponent,
    ModalReversarSalidaComponent,
    ModificarControlDescargaCamionCerealesComponent,
    FechaPeriodoStockSanComponent,
    ModificarControlDescargaCamionSubproductosNogranosComponent,
    GestionarMovimientosComponent,
    FiltroBusquedaMovimientosComponent,
    ModificarControlDescargaCamionSubproductosNogranosComponent,
    ConsultaMovimientoComponent,
    ConsultaCamionDescargaEstadoComponent,
    ModalIngresarRebajaConvenidaComponent,
    ModificarPesosFueraDeCircuitoComponent,
    DatosLaboratorioComponent,
    ModalAgregarMuestraLaboratorioComponent,
    EstadoMovimientoComponent,
    ModificarProductoFueraCircuitoComponent,
    DatosMovimientoModificarProductoFueraCircuitoComponent,
    GestionarCalidadPorLaboratorioComponent,
    FiltroCalidadPorLaboratorioComponent,
    ConsultarCalidadComponent,
    FiltroCalidadPorLaboratorioComponent,
    ModalDetalleMuestrasComponent,
    ModalRegistrarDecisionLaboratorioComponent,
    DesplegableDecisionLaboratorioComponent,
    ControlarPesajeEnBalanzaComponent,
    FiltroControlPesajeEnBalanzaComponent,
    DatosControlarPesajeEnBalanzaComponent,
    ModificarCalidadCaladoComponent,
    SituacionEgresoComponent,
    ModalAutorizacionComponent,
    DetalleMermasComponent,
    ConsultaDatosStockComponent,
    DatosStockComponent,
    ControlarDescargaVagonCerealesComponent,
    DatosDocumentoControlarDescargaVagonCerealesComponent,
    DatosVagonComponent,
    ControlarDescargaVagonNoGranosComponent,
    DatosDocumentoControlarDescargaVagonNoGranosComponent,
    RegistrarPesoVagonComponent,
    DatosMovimientoPesajeVagonComponent,
    BusquedaMovimientoPesajeVagonComponent,
    RegistrarPesoVagonesComponent,
    GestionarInterfacesSanComponent,
    FiltroBusquedaInterfacesSanComponent,
    ModificarControlDescargaVagonNogranosComponent,
    ModificarControlDescargaVagonCerealesComponent,
    AdministrarNotificacionesComponent,
    FiltroAdministrarNotificacionesComponent,
    DetalleAdministrarNotificacionesComponent,
    DatosDestinatariosComponent,
    ModalAgregarDestinatarioComponent,
    GestionarNotificacionesComponent,
    AdministrarRolesComponent,
    FiltroAdministrarRolesComponent,
    DetalleAdministrarRolesComponent,
    AdministrarUsuariosComponent,
    FiltroAdministrarUsuariosComponent,
    DetalleAdministrarUsuariosComponent,
    ModalAgregarRolTerminalComponent,
    AdministrarCaracteristicasComponent,
    AdministrarCircuitosComponent,
    FiltroAdministrarCircuitosComponent,
    DetalleAdministrarCircuitosComponent,
    FiltroAdministrarCaracteristicasComponent,
    DetalleAdministrarCaracteristicasComponent,
    AdministrarRestriccionesPorPuestoTrabajoComponent,
    FiltroAdministrarRestriccionesPorPuestoTrabajoComponent,
    DetalleAdministrarRestriccionesPorPuestoTrabajoComponent,
    AdministrarChoferesComponent,
    FiltroAdministrarChoferesComponent,
    DetalleAdministrarChoferesComponent,
    AdministrarImpresorasComponent,
    FiltroAdministrarImpresorasComponent,
    DetalleAdministrarImpresorasComponent,
    AdministrarTarjetaComponent,
    FiltroAdministrarTarjetaComponent,
    DetalleAdministrarTarjetaComponent,
    AdministrarDispositivosComponent,
    FiltroAdministrarDispositivosComponent,
    DetalleAdministrarDispositivosComponent,
    DetalleAdministrarCaracteristicasComponent,
    AdministrarActividadesCircuitoComponent,
    FiltroAdministrarActividadesCircuitoComponent,
    DetalleAdministrarActividadesCircuitoComponent,
    AdministrarAutorizacionesBalanzaComponent,
    DetalleAdministrarAutorizacionesBalanzaComponent,
    FiltroAdministrarAutorizacionesBalanzaComponent,
    AdministrarPenalizacionChoferesComponent,
    FiltroAdministrarPenalizacionChoferesComponent,
    DetalleAdministrarPenalizacionChoferesComponent,
    AdministrarPuestosDeTrabajoComponent,
    FiltroAdministrarPuestosDeTrabajoComponent,
    DetalleAdministrarPuestosDeTrabajoComponent,
    ModalAgregarAccionComponent,
    ModalAgregarDispositivoComponent,
    AdministrarLecturaHumedimetroComponent,
    FiltroAdministrarLecturaHumedimetroComponent,
    DetalleAdministrarLecturaHumedimetroComponent,
    AdministrarParametrosPorProductoComponent,
    AdministrarParametrosPorRubroCalidadComponent,
    AdministrarParametrosPorSociedadComponent,
    DetalleAdministrarLecturaHumedimetroComponent,
    ModalAgregarDispositivoComponent,
    AdministrarParametrosPorTerminalComponent,
    FiltroAdministrarParametrosPorTerminalComponent,
    DetalleAdministrarParametrosPorTerminalComponent,
    ModalSituacionBalanzaComponent,
    DetalleAdministrarParametrosPorTerminalComponent,
    ModalAgregarDispositivoComponent,
    AdministrarDestinosPostCaladoComponent,
    FiltroAdministrarDestinosPostCaladoComponent,
    DetalleAdministrarDestinosPostCaladoComponent,
    AdministrarParametrosPorTipoAnalisisCamaraComponent,
    AdministrarPlataformasComponent,
    FiltroAdministrarPlataformasComponent,
    DetalleAdministrarPlataformasComponent,
    ModalSituacionBalanzaComponent,
    AdministrarRangosCodigoBarraCamaraComponent,
    DetalleAdministrarRangosCodigoBarraCamaraComponent,
    FiltroAdministrarRangosCodigoBarraCamaraComponent,
    AdministrarEquivalenciaRubrosComponent,
    DetalleAdministrarEquivalenciaRubrosComponent,
    FiltroAdministrarEquivalenciaRubrosComponent,
    AdministrarTipoDocumentoPorteTipoProductoComponent,
    DetalleAdministrarTipoDocumentoPorteTipoProductoComponent,
    FiltroAdministrarTipoDocumentoPorteTipoProductoComponent,
    AdministrarGrupoProductoComponent,
    FiltroAdministrarGrupoProductoComponent,
    DetalleAdministrarGrupoProductoComponent,
    LecturaTarjetaComponent,
    ModalLecturaTarjetaComponent,
    FiltroAdministrarTipoDocumentoPorteTipoProductoComponent,
    AdministrarProductosHabilitadosPorTerminalComponent,
    FiltroAdministrarProductosHabilitadosPorTerminalComponent,
    DetalleAdministrarProductosHabilitadosPorTerminalComponent,
    ModalAgregarRubroComponent,
    DatosEntregaComponent,
    ControlarCargaCamionComponent,
    DatosDocumentoControlarCargaCamionComponent,
    GestionarOrdenesCargaComponent,
    FiltroGestionarOrdenesCargaComponent,
    ControlarCalidadCamionCargaComponent,
    FiltroControlarCalidadCamionCargaComponent,
    DatosControlarCalidadCamionCargaComponent,
    ControlarCargaCamionInsumoVarioComponent,
    DatosDocumentoControlarCargaCamionInsumoVarioComponent,
    ChecklistControlPatrimonialComponent,
    FiltroChecklistControlPatrimonialComponent,
    DatosChecklistControlPatrimonialComponent,
    ListaChecklistControlPatrimonialComponent,
    ModalAgregarImpresoraComponent,
    MisImpresorasComponent,
    FiltroMisImpresorasComponent,
    DetalleMisImpresorasComponent,
    AsignarTarjetaComponent,
    ModalChecklistControlPatrimonialComponent,
    ConsultaControlPatrimonialComponent,
    ModalChecklistControlPatrimonialComponent,
    RegistrarControlPatrimonialComponent,
    FiltroRegistrarControlPatrimonialComponent,
    DatosRegistrarControlPatrimonialComponent,
    DecisionRegistrarControlPatrimonialComponent,
    ReimprimirDocumentoPorteComponent,
    FiltroBusquedaReimpresionDocumentoPorteComponent,
    DatosDocumentoInsumosComponent,
    ModificarControlDescargaCamionInsumosComponent,
    ConsultaCalidadCargaComponent,
    AdministrarSuplenciasComponent,
    FiltroAdministrarSuplenciasComponent,
    DetalleAdministrarSuplenciasComponent,
    ValidarCupoComponent,
    DatosDocumentoValidarCupoComponent,
    ReimprimirTurnoPlayaComponent,
    FiltroReimprimirTurnoPlayaComponent,
    GestionarCuposComponent,
    FiltroGestionarCuposComponent,
    EstadoCupoComponent,
    IdentificarCamionCerealCupoComponent,
    CupoDatosDocumentoComponent,
    CartaPorteDatosDocumentoComponent,
    IntervinientesDatosDocumentoComponent,
    GranosEspeciesDatosDocumentoComponent,
    DestinoDatosDocumentoComponent,
    DatosTransporteDatosDocumentoComponent,
    ConfirmacionArriboCtgDatosDocumentoComponent,
    DatosLdcDatosDocumentoComponent,
    ObservacionesDatosDocumentoComponent,
    MovimientoDatosDocumentoComponent,
    AdministrarTiposPuestosTrabajoComponent,
    DetalleAdministrarTiposPuestosTrabajoComponent,
    FiltroAdministrarTiposPuestosTrabajoComponent,
    ModalSeleccionarRemitoComponent,
    AdministrarSobresTransporteComponent,
    FiltroAdministrarSobresTransporteComponent,
    DetalleAdministrarSobresTransporteComponent,
    AgregarAlSobreTransporteComponent,
    TesteoTarjetaComponent,
    AgregarAlSobreTransporteComponent,
    ImportarSobresTransporteComponent,
    FiltroImportarSobresTransporteComponent,
    DetalleImportarSobresTransporteComponent,
    DetalleSobreTransporteComponent,
    ConsultaEntidadTransportableComponent,
    AdministrarTarjetaAutorizacionComponent,
    FiltroAdministrarTarjetaAutorizacionComponent,
    DetalleAdministrarTarjetaAutorizacionComponent,
    CodigoTarjetaConEtiquetaComponent,
    ModalHistorialSobreTransporteComponent,
    DetalleParametrosPorRubroCalidadComponent,
    FiltroAdministrarParametrosPorProductoComponent,
    DetalleAdministrarParametrosPorProductoComponent,
    FiltroAdministrarParametrosPorTipoAnalisisCamaraComponent,
    DetalleAdministrarParametrosPorTipoAnalisisCamaraComponent,
    AdministrarTiempoLimiteEstadoComponent,
    FiltroAdministrarTiempoLimiteEstadoComponent,
    DetalleAdministrarTiempoLimiteEstadoComponent,
    DetalleAdministrarParametrosPorTipoAnalisisCamaraComponent,
    ConfigurarAmbienteComponent,
    ModalImportarExcelComponent,
    ModalDecisionRegistrarControlPatrimonialComponent,
    ModalDecisionControlarCalidadCamionCargaComponent,
    AdministrarPuntosCargaComponent,
    FiltroAdministrarPuntosCargaComponent,
    DetalleAdministrarPuntosCargaComponent,
    ModificarDatosOrdenCargaCamionComponent,
    DetalleModificarDatosOrdenCargaCamionComponent,
    ModificarDatosOrdenCargaCamionInsumoVariosComponent,
    DetalleModificarDatosOrdenCargaCamionInsumoVariosComponent,
    PagoTasaMunicipalComponent,
    FiltroPagoTasaMunicipalComponent,
    DetallePagoTasaMunicipalComponent,
    ReembolsoTasaMunicipalComponent,
    DetalleReembolsoTasaMunicipalComponent,
    FiltroReembolsoTasaMunicipalComponent,
    LecturaQRComponent,
    ModalLecturaQRComponent,
    AdministrarTextoGmpComponent,
    FiltroAdministrarTextoGmpComponent,
    DetalleAdministrarTextoGmpComponent,
    AdministrarFinalidadesEnvioPdfTicketBalanzaComponent,
    FiltroAdministrarFinalidadesEnvioPdfTicketBalanzaComponent,
    DetalleAdministrarFinalidadesEnvioPdfTicketBalanzaComponent,
    DatosTurnoCircularComponent,
    GestionarTransportesCircuitoComponent,
    FiltroBusquedaGestionTransporteCircuitoComponent,
    MermasEspecialesComponent,
    ReimprimirObleaLaboratorioComponent,
    FiltroBusquedaReimpresionObleaLaboratorioComponent,
    ModalConfirmarImpresionComponent,
    DashboardBalanzasAutomatizadasComponent,
    DetalleBalanzaComponent,
    ModalSeleccionarBalanzasComponent,
    AdministrarEventosComponent,
    DetalleAdministrarEventosComponent,
    FiltroAdministrarEventosComponent,
    ResolverEventoComponent,
    ResolverEventoAutorizacionesComponent,
    ResolverEventoPlataformaRequeridaComponent,
    SeleccionarBalanzaSalidaComponent,
    DatosBalanzaSeleccionarBalanzaSalidaComponent,
    DetalleSeleccionarBalanzaSalidaComponent,
    ResolverPlataformaDescargaComponent,
    DetallePlataformaRequeridaComponent,
    ModalResolverEventoplataformaRequeridaComponent,
    ModalResolverEventoTarjetaMatriculaComponent,
    ModalSeleccionarBalanzaSalidaComponent,
    ModalResolverEventoAutorizacionesComponent,
    ModalResolverPlataformaDescargaComponent,
    ResolverEventosPendientesComponent,
    DetalleEventosPendientesComponent,
    ModalSeleccionarMovimientoComponent,
    FiltroCambiarTarjetaComponent
  ],
  exports: [
    ControlarDescargaCamionCerealesComponent,
    IngresarCalidadCaladoComponent,
    RegistrarPesoComponent
  ],
  imports: [
    CommonModule,
    GestionAfipModule,
    HotkeyModule,
    ReactiveFormsModule,
    SharedModule,
    CoreSharedModule,
    NgbModule,
    TextMaskModule,
    NgxPermissionsModule,
    TreeModule,
    FontAwesomeModule
  ],
  providers: [
    TipoDocumentoPorteService,
    HotkeysService,
    ControlarDescargaCamionCerealesService,
    CircuitoService,
    MovimientoService,
    IngresarCalidadCaladoService,
    PatenteService,
    FormComponentService,
    RubrosCalidadService,
    CaladoService,
    ConfirmacionProductoCalado,
    PopupService,
    CondicionManipuleoService,
    BusquedaMovimientoPesajeService,
    RegistrarPesadaService,
    SearchCalidadCaladoService,
    SearchFormActionsNotifierService,
    MotivosNoDescargaService,
    GestionarCalidadCaladoService,
    SearchDescargasCamionesService,
    SearchControlService,
    SearchDescargasCamionesService,
    AsignarTarjetaService,
    RechazarDescargaService,
    GestionarManipuleoService,
    SearchMovimientosReimpresionTicketPesajeService,
    ReimprimirTicketPesajeService,
    CambiarTarjetaService,
    SearchMuestrasService,
    GestionarMuestrasService,
    SearchTrabajosArchivosMuestraService,
    GestionarTrabajosArchivosMuestraService,
    AutorizarMuestrasAgilService,
    SearchReversarSalidaService,
    ControlarDescargaCamionSubproductosService,
    ParametrosTerminalService,
    ReversarSalidaService,
    SearchMovimientosService,
    MovimientoPesajeFueraDeCircuitoService,
    ModificarProductoFueraCircuitoService,
    CalidadMovimientoCerealService,
    ModificarProductoFueraCircuitoService,
    MovimientoPesajeFueraDeCircuitoService,
    DescargaEventsNotifierService,
    CalidadMovimientoCerealService,
    GestionarCalidadPorLaboratorioService,
    DecisionLaboratorioService,
    ControlarPesajeEnBalanzaService,
    AutorizarcionService,
    ConsultaSanService,
    AutocompleteProductoService,
    TurnoCircularService,
    DatePipe,
    ReimprimirObleaLaboratorioService,
    DashboardService,
    SignalrService
  ]
})
export class CargasDescargasModule { }
