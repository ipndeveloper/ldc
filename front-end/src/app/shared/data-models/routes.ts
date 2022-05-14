//#region Imports
import { Routes } from '@angular/router';
import { HomeComponent } from '../../home/home.component';
import { ControlarDescargaCamionCerealesComponent } from '../../cargas-descargas/controlar-descarga-camion-cereales/controlar-descarga-camion-cereales.component';
import { IngresarCalidadCaladoComponent } from '../../cargas-descargas/ingresar-calidad-calado/ingresar-calidad-calado.component';
import { RegistrarPesoComponent } from '../../cargas-descargas/registrar-peso/registrar-peso.component';
import { ControlarSalidaComponent } from '../../cargas-descargas/controlar-salida/controlar-salida.component';
import { GestionarCalidadCaladoComponent } from '../../cargas-descargas/gestionar-calidad-calado/gestionar-calidad-calado.component';
import { GestionarControlComponent } from '../../cargas-descargas/gestionar-control/gestionar-control.component';
import { GestionarDescargasPorEntregadorComponent } from '../../cargas-descargas/gestionar-descargas-por-entregador/gestionar-descargas-por-entregador.component';
import { GestionarInterfacesAfipComponent } from '../../gestion-afip/gestionar-interfaces-afip/gestionar-interfaces-afip.component';
import { GestionarManipuleoComponent } from '../../cargas-descargas/gestionar-manipuleo/gestionar-manipuleo.component';
import { ReimprimirTicketPesajeComponent } from '../../cargas-descargas/reimprimir-ticket-pesaje/reimprimir-ticket-pesaje.component';
import { ReimprimirTicketCalidadComponent } from '../../cargas-descargas/reimprimir-ticket-calidad/reimprimir-ticket-calidad.component';
import { CambiarTarjetaComponent } from '../../cargas-descargas/cambiar-tarjeta/cambiar-tarjeta.component';
import { GestionarMuestrasComponent } from '../../cargas-descargas/gestionar-muestras/gestionar-muestras.component';
import { GestionarTrabajosArchivosMuestraComponent } from '../../cargas-descargas/gestionar-trabajos-archivos-muestra/gestionar-trabajos-archivos-muestra.component';
import { ControlarDescargaCamionSubproductosComponent } from '../../cargas-descargas/controlar-descarga-camion-subproductos/controlar-descarga-camion-subproductos.component';
import { ReversarSalidaComponent } from '../../cargas-descargas/reversar-salida/reversar-salida.component';
import { QuitarDeCircuitoComponent } from '../../cargas-descargas/quitar-de-circuito/quitar-de-circuito.component';
import { ModificarControlDescargaCamionCerealesComponent } from '../../cargas-descargas/modificaciones/modificar-control-descarga-camion-cereales/modificar-control-descarga-camion-cereales.component';
import { ModificarControlDescargaCamionSubproductosNogranosComponent } from '../../cargas-descargas/modificaciones/modificar-control-descarga-camion-subproductos-nogranos/modificar-control-descarga-camion-subproductos-nogranos.component';
import { GestionarMovimientosComponent } from '../../cargas-descargas/gestionar-movimientos/gestionar-movimientos.component';
import { ModificarPesosFueraDeCircuitoComponent } from '../../cargas-descargas/modificaciones/modificar-pesos-fuera-de-circuito/modificar-pesos-fuera-de-circuito.component';
import { ModificarProductoFueraCircuitoComponent } from '../../cargas-descargas/modificaciones/modificar-producto-fuera-circuito/modificar-producto-fuera-circuito.component';
import { GestionarCalidadPorLaboratorioComponent } from '../../cargas-descargas/gestionar-calidad-por-laboratorio/gestionar-calidad-por-laboratorio.component';
import { ControlarPesajeEnBalanzaComponent } from '../../cargas-descargas/controlar-pesaje-en-balanza/controlar-pesaje-en-balanza.component';
import { ModificarCalidadCaladoComponent } from '../../cargas-descargas/modificaciones/modificar-calidad-calado/modificar-calidad-calado.component';
import { ControlarDescargaVagonCerealesComponent } from '../../cargas-descargas/controlar-descarga-vagon-cereales/controlar-descarga-vagon-cereales.component';
import { ControlarDescargaVagonNoGranosComponent } from '../../cargas-descargas/controlar-descarga-vagon-no-granos/controlar-descarga-vagon-no-granos.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { LoginComponent } from '../../../app/login/login.component';
import { MenuIdentifiers, Permission } from '../enums/enums';
import { LoginGuard } from '../../../app/core/guards/loginGuard';
import { GestionarInterfacesSanComponent } from '../../cargas-descargas/gestionar-interfaces-san/gestionar-interfaces-san.component';
import { ModificarControlDescargaVagonNogranosComponent } from '../../cargas-descargas/modificaciones/modificar-control-descarga-vagon-nogranos/modificar-control-descarga-vagon-nogranos.component';
import { ModificarControlDescargaVagonCerealesComponent } from '../../cargas-descargas/modificaciones/modificar-control-descarga-vagon-cereales/modificar-control-descarga-vagon-cereales.component';
import { RegistrarPesoVagonesComponent } from '../../cargas-descargas/registrar-peso-vagones/registrar-peso-vagones.component';
import { AdministrarNotificacionesComponent } from '../../cargas-descargas/administrar-notificaciones/administrar-notificaciones.component';
import { GestionarNotificacionesComponent } from '../../cargas-descargas/gestionar-notificaciones/gestionar-notificaciones.component';
import { AdministrarRolesComponent } from '../../cargas-descargas/administrar-roles/administrar-roles.component';
import { AdministrarUsuariosComponent } from '../../cargas-descargas/administrar-usuarios/administrar-usuarios.component';
import { AdministrarCaracteristicasComponent } from '../../cargas-descargas/administrar-caracteristicas/administrar-caracteristicas.component';
import { AdministrarCircuitosComponent } from '../../cargas-descargas/administrar-circuitos/administrar-circuitos.component';
import { AdministrarRestriccionesPorPuestoTrabajoComponent } from '../../cargas-descargas/administrar-restricciones-por-puesto-trabajo/administrar-restricciones-por-puesto-trabajo.component';
import { AdministrarChoferesComponent } from '../../cargas-descargas/administrar-choferes/administrar-choferes.component';
import { AdministrarImpresorasComponent } from '../../cargas-descargas/administrar-impresoras/administrar-impresoras.component';
import { AdministrarTarjetaComponent } from '../../cargas-descargas/administrar-tarjeta/administrar-tarjeta.component';
import { AdministrarDispositivosComponent } from '../../cargas-descargas/administrar-dispositivos/administrar-dispositivos.component';
import { AdministrarActividadesCircuitoComponent } from '../../cargas-descargas/administrar-actividades-circuito/administrar-actividades-circuito.component';
import { AdministrarAutorizacionesBalanzaComponent } from '../../cargas-descargas/administrar-autorizaciones-balanza/administrar-autorizaciones-balanza.component';
import { AdministrarPenalizacionChoferesComponent } from '../../cargas-descargas/administrar-penalizacion-choferes/administrar-penalizacion-choferes.component';
import { AdministrarLecturaHumedimetroComponent } from '../../cargas-descargas/administrar-lectura-humedimetro/administrar-lectura-humedimetro.component';
import { AdministrarPuestosDeTrabajoComponent } from '../../cargas-descargas/administrar-puestos-de-trabajo/administrar-puestos-de-trabajo.component';
import { AdministrarParametrosPorProductoComponent } from '../../cargas-descargas/administrar-parametros-por-producto/administrar-parametros-por-producto.component';
import { AdministrarParametrosPorRubroCalidadComponent } from '../../cargas-descargas/administrar-parametros-por-rubro-calidad/administrar-parametros-por-rubro-calidad.component';
import { AdministrarParametrosPorSociedadComponent } from '../../cargas-descargas/administrar-parametros-por-sociedad/administrar-parametros-por-sociedad.component';
import { AdministrarParametrosPorTerminalComponent } from '../../cargas-descargas/administrar-parametros-por-terminal/administrar-parametros-por-terminal.component';
import { AdministrarDestinosPostCaladoComponent } from '../../cargas-descargas/administrar-destinos-post-calado/administrar-destinos-post-calado.component';
import { AdministrarParametrosPorTipoAnalisisCamaraComponent } from '../../cargas-descargas/administrar-parametros-por-tipo-analisis-camara/administrar-parametros-por-tipo-analisis-camara.component';
import { AdministrarPlataformasComponent } from '../../cargas-descargas/administrar-plataformas/administrar-plataformas.component';
import { AdministrarRangosCodigoBarraCamaraComponent } from '../../cargas-descargas/administrar-rangos-codigo-barra-camara/administrar-rangos-codigo-barra-camara.component';
import { AdministrarEquivalenciaRubrosComponent } from '../../cargas-descargas/administrar-equivalencia-rubros/administrar-equivalencia-rubros.component';
import { AdministrarTipoDocumentoPorteTipoProductoComponent } from '../../cargas-descargas/administrar-tipo-documento-porte-tipo-producto/administrar-tipo-documento-porte-tipo-producto.component';
import { AdministrarGrupoProductoComponent } from '../../cargas-descargas/administrar-grupo-producto/administrar-grupo-producto.component';
import { AdministrarProductosHabilitadosPorTerminalComponent } from '../../cargas-descargas/administrar-productos-habilitados-por-terminal/administrar-productos-habilitados-por-terminal.component';
import { GestionarOrdenesCargaComponent } from '../../cargas-descargas/gestionar-ordenes-carga/gestionar-ordenes-carga.component';
import { ControlarCalidadCamionCargaComponent } from '../../cargas-descargas/controlar-calidad-camion-carga/controlar-calidad-camion-carga.component';
import { ControlarCargaCamionInsumoVarioComponent } from '../../cargas-descargas/controlar-carga-camion-varios/controlar-carga-camion-insumo-vario.component';
import { ControlarCargaCamionComponent } from '../../cargas-descargas/controlar-carga-camion/controlar-carga-camion.component';
import { ChecklistControlPatrimonialComponent } from '../../cargas-descargas/checklist-control-patrimonial/checklist-control-patrimonial.component';
import { MisImpresorasComponent } from '../../cargas-descargas/mis-impresoras/mis-impresoras.component';
import { AsignarTarjetaComponent } from '../../cargas-descargas/asignar-tarjeta/asignar-tarjeta.component';
import { ReimprimirDocumentoPorteComponent } from '../../cargas-descargas/reimprimir-documento-porte/reimprimir-documento-porte.component';
import { RegistrarControlPatrimonialComponent } from '../../cargas-descargas/registrar-control-patrimonial/registrar-control-patrimonial.component';
import { ControlarDescargaCamionInsumosComponent } from '../../cargas-descargas/controlar-descarga-camion-insumos/controlar-descarga-camion-insumos.component';
import { ModificarControlDescargaCamionInsumosComponent } from '../../cargas-descargas/modificaciones/modificar-control-descarga-camion-insumos/modificar-control-descarga-camion-insumos.component';
import { ConsultaMovimientoComponent } from '../../cargas-descargas/consulta-camion-descarga/consulta-movimiento.component';
import { AdministrarSuplenciasComponent } from '../../cargas-descargas/administrar-suplencias/administrar-suplencias.component';
import { ValidarCupoComponent } from '../../cargas-descargas/validar-cupo/validar-cupo.component';
import { ReimprimirTurnoPlayaComponent } from '../../cargas-descargas/reimprimir-turno-playa/reimprimir-turno-playa.component';
import { GestionarCuposComponent } from '../../cargas-descargas/gestionar-cupos/gestionar-cupos.component';
import { AdministrarTiposPuestosTrabajoComponent } from '../../cargas-descargas/administrar-tipos-puestos-trabajo/administrar-tipos-puestos-trabajo.component';
import { AdministrarSobresTransporteComponent } from '../../cargas-descargas/administrar-sobres-transporte/administrar-sobres-transporte.component';
import { TesteoTarjetaComponent } from '../../cargas-descargas/testeo-tarjeta/testeo-tarjeta.component';
import { ImportarSobresTransporteComponent } from '../../cargas-descargas/importar-sobres-transporte/importar-sobres-transporte.component';
import { AdministrarTarjetaAutorizacionComponent } from '../../cargas-descargas/administrar-tarjeta-autorizacion/administrar-tarjeta-autorizacion.component';
import { AdministrarTiempoLimiteEstadoComponent } from '../../cargas-descargas/administrar-tiempo-limite-estado/administrar-tiempo-limite-estado.component';
import { ConfigurarAmbienteComponent } from '../../cargas-descargas/configurar-ambiente/configurar-ambiente.component';
import { AdministrarPuntosCargaComponent } from '../../cargas-descargas/administrar-puntos-carga/administrar-puntos-carga.component';
import { ModificarDatosOrdenCargaCamionComponent } from '../../cargas-descargas/modificaciones/modificar-datos-orden-carga-camion/modificar-datos-orden-carga-camion.component';
import { ModificarDatosOrdenCargaCamionInsumoVariosComponent } from '../../cargas-descargas/modificaciones/modificar-datos-orden-carga-camion-insumo-vario/modificar-datos-orden-carga-camion-insumo-varios.component';
import { PagoTasaMunicipalComponent } from '../../cargas-descargas/pago-tasa-municipal/pago-tasa-municipal.component';
import { AdministrarTextoGmpComponent } from '../../cargas-descargas/administrar-texto-gmp/administrar-texto-gmp.component';
import { AdministrarFinalidadesEnvioPdfTicketBalanzaComponent } from '../../cargas-descargas/administrar-finalidades-envio-pdf-ticket-balanza/administrar-finalidades-envio-pdf-ticket-balanza.component';
import { GestionarTransportesCircuitoComponent } from '../../cargas-descargas/gestionar-transportes-circuito/gestionar-transportes-circuito.component';
import { ReimprimirObleaLaboratorioComponent } from '../../cargas-descargas/reimprimir-oblea-laboratorio/reimprimir-oblea-laboratorio.component';
import { DashboardBalanzasAutomatizadasComponent } from '../../cargas-descargas/dashboard-balanzas-automatizadas/dashboard-balanzas-automatizadas.component';
import { ResolverEventoComponent } from '../../cargas-descargas/resolver-evento/resolver-evento.component';
import { SeleccionarBalanzaSalidaComponent } from '../../cargas-descargas/seleccionar-balanza-salida/seleccionar-balanza-salida.component';
import { AdministrarEventosComponent } from '../../cargas-descargas/administrar-eventos/administrar-eventos.component';
import { ResolverPlataformaDescargaComponent } from '../../cargas-descargas/resolver-plataforma-descarga/resolver-plataforma-descarga.component';
import { ResolverEventoAutorizacionesComponent } from '../../cargas-descargas/resolver-evento-autorizaciones/resolver-evento-autorizaciones.component';
import { ResolverEventoPlataformaRequeridaComponent } from '../../cargas-descargas/resolver-evento-plataforma-requerida/resolver-evento-plataforma-requerida.component';
import { ResolverEventosPendientesComponent } from '../../cargas-descargas/resolver-eventos-pendientes/resolver-eventos-pendientes.component';
//#region
export const YardRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        data: {
            title: 'LDC - Login',
            identifier: MenuIdentifiers.Login,
            hide: true
        }
    },
    {
        path: '',
        component: HomeComponent,
        canActivate: [NgxPermissionsGuard, LoginGuard],
        data: {
            title: 'LDC - Yard',
            identifier: MenuIdentifiers.Home,
            permissions: {
                only: [
                    Permission.AdministrarActividadesCircuitos,
                    Permission.AdministrarAutorizacionesBalanza,
                    Permission.AdministrarCaracteristicas,
                    Permission.AdministrarChoferes,
                    Permission.AdministrarCircuitos,
                    Permission.AdministrarDestinosPostCalado,
                    Permission.AdministrarDispositivos,
                    Permission.AdministrarEquivalenciaRubros,
                    Permission.AdministrarEquivalenciasArchestraRubroCalidad,
                    Permission.AdministrarGrupoProductoModificacionFueraCircuito,
                    Permission.AdministrarImpresoras,
                    Permission.AdministrarLecturaHumedimetro,
                    Permission.AdministrarNotificaciones,
                    Permission.AdministrarParametrosPorProducto,
                    Permission.AdministrarParametrosPorSociedad,
                    Permission.AdministrarParametrosPorTerminal,
                    Permission.AdministrarParametrosPorTipoAnalisisCamara,
                    Permission.AdministrarPenalizacionChoferes,
                    Permission.AdministrarPlataformas,
                    Permission.AdministrarProductosHabilitadosPorTerminal,
                    Permission.AdministrarPuestosTrabajo,
                    Permission.AdministrarPuntosCarga,
                    Permission.AdministrarRangosCodigoBarraCamara,
                    Permission.AdministrarRestriccionesPorPuestoTrabajo,
                    Permission.AdministrarRoles,
                    Permission.AdministrarSobresTransporte,
                    Permission.AdministrarSuplencias,
                    Permission.AdministrarTarjetas,
                    Permission.AdministrarEventos,
                    Permission.AdministrarTarjetasAutorizacion,
                    Permission.AdministrarTiempoLimiteEstado,
                    Permission.AdministrarTipoDocumentoPorteTipoProducto,
                    Permission.AdministrarTiposPuestosTrabajo,
                    Permission.AdministrarUsuarios,
                    Permission.AsignarTarjeta,
                    Permission.CambiarTarjeta,
                    Permission.ChecklistControlPatrimonial,
                    Permission.ConfigurarAmbienteCentral,
                    Permission.ConfigurarAmbienteLocal,
                    Permission.ControlarCalidadCamionCarga,
                    Permission.ControlarCargaCamion,
                    Permission.ControlarCargaCamionVarios,
                    Permission.ControlarDescargaCamionCereales,
                    Permission.ControlarDescargaCamionInsumosVarios,
                    Permission.ControlarDescargaCamionSubproductos,
                    Permission.ControlarDescargaCamionVarios,
                    Permission.ControlarDescargaVagonCereales,
                    Permission.ControlarDescargaVagonNoGrano,
                    Permission.ControlarPesajeEnBalanza,
                    Permission.ControlarSalida,
                    Permission.GestionarCalidadCalado,
                    Permission.GestionarCalidadPorLaboratorio,
                    Permission.GestionarControl,
                    Permission.GestionarCupos,
                    Permission.GestionarDescargasPorEntregador,
                    Permission.GestionarInterfacesAFIP,
                    Permission.GestionarInterfacesSAN,
                    Permission.GestionarManipuleo,
                    Permission.GestionarMovimientos,
                    Permission.GestionarMuestras,
                    Permission.GestionarNotificaciones,
                    Permission.GestionarOrdenesCarga,
                    Permission.GestionarTrabajosGeneracionArchivosMuestras,
                    Permission.GestionarTransporteCircuito,
                    Permission.ImportarSobresTransporte,
                    Permission.IngresarCalidadCalado,
                    Permission.IngresarCalidadCaladoVagon,
                    Permission.MisImpresoras,
                    Permission.MisImpresorasAdmin,
                    Permission.PruebaLecturaTarjeta,
                    Permission.QuitarCircuito,
                    Permission.RegistrarControlPatrimonial,
                    Permission.RegistrarPeso,
                    Permission.RegistrarPesoVagon,
                    Permission.ReimprimirDocumentoPorte,
                    Permission.ReimprimirTicketDeCalidad,
                    Permission.ReimprimirTicketDePesaje,
                    Permission.ReimprimirTurnoPlaya,
                    Permission.ReversarSalida,
                    Permission.ValidarCupo,
                    Permission.PagoTasaMunicipal,
                    Permission.ReimprimirObleaLaboratorio,
                    // Permission.ResolverEventoAutorizaciones
                ],
                redirectTo: '/login'
            }
        },
        children: [
            {
                path: 'personalizar',
                canActivate: [NgxPermissionsGuard, LoginGuard],
                data: {
                    title: 'Personalización',
                    identifier: 'Personalización',
                    permissions: {
                        only: [
                            Permission.AdministrarRoles,
                            Permission.AdministrarUsuarios,
                            Permission.AdministrarCircuitos,
                            Permission.AdministrarActividadesCircuitos,
                            Permission.AdministrarCaracteristicas,
                            Permission.AdministrarAutorizacionesBalanza,
                            Permission.AdministrarLecturaHumedimetro
                        ],
                        redirectTo: '/login'
                    }
                },
                children: [
                    {
                        path: 'roles',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: AdministrarRolesComponent,
                        data: {
                            title: 'Roles',
                            identifier: 'PersonalizarRoles',
                            permissions: {
                                only: [Permission.AdministrarRoles],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'usuarios',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: AdministrarUsuariosComponent,
                        data: {
                            title: 'Usuarios',
                            identifier: 'PersonalizarUsuarios',
                            permissions: {
                                only: [Permission.AdministrarUsuarios],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'circuitos',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: AdministrarCircuitosComponent,
                        data: {
                            title: 'Circuitos',
                            identifier: 'PersonalizarCircuitos',
                            permissions: {
                                only: [Permission.AdministrarCircuitos],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'actividades-circuito',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: AdministrarActividadesCircuitoComponent,
                        data: {
                            title: 'Actividades',
                            identifier: 'PersonalizarActividadesCircuitos',
                            permissions: {
                                only: [Permission.AdministrarActividadesCircuitos],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'caracteristicas',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: AdministrarCaracteristicasComponent,
                        data: {
                            title: 'Características',
                            identifier: 'PersonalizarCaracteristicas',
                            permissions: {
                                only: [Permission.AdministrarCaracteristicas],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'autorizaciones-balanza',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: AdministrarAutorizacionesBalanzaComponent,
                        data: {
                            title: 'Autorizaciones de Balanza',
                            identifier: 'PersonalizarAutorizacionesBalanza',
                            permissions: {
                                only: [Permission.AdministrarAutorizacionesBalanza],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'lectura-humedimetros',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: AdministrarLecturaHumedimetroComponent,
                        data: {
                            title: 'Lectura Humedímetros',
                            identifier: 'PersonalizarLecturaHumedimetros',
                            permissions: {
                                only: [Permission.AdministrarLecturaHumedimetro],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'equivalencias-archestra-rubro-calidad',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: AdministrarParametrosPorRubroCalidadComponent,
                        data: {
                            title: 'Equivalencias Archestra para Rubros de Calidad',
                            identifier: 'AdministrarEquivalenciasArchestraRubroCalidad',
                            permissions: {
                                only: [Permission.AdministrarEquivalenciasArchestraRubroCalidad],
                                redirectTo: '/login'
                            },
                        }
                    },
                ]
            },
            {
                path: 'transporte',
                canActivate: [NgxPermissionsGuard, LoginGuard],
                data: {
                    title: 'Transporte',
                    identifier: 'Transporte',
                    permissions: {
                        only: [
                            Permission.AdministrarSobresTransporte,
                            Permission.ImportarSobresTransporte
                        ],
                        redirectTo: '/login'
                    }
                },
                children: [
                    {
                        path: 'administrar-sobres-transporte',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: AdministrarSobresTransporteComponent,
                        data: {
                            title: 'Administrar Sobres de Transporte',
                            identifier: 'AdministrarSobresTransporte',
                            permissions: {
                                only: [Permission.AdministrarSobresTransporte],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'importar-sobres-transporte',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: ImportarSobresTransporteComponent,
                        data: {
                            title: 'Importar Sobres de Transporte',
                            identifier: 'ImportarSobresTransporte',
                            permissions: {
                                only: [Permission.ImportarSobresTransporte],
                                redirectTo: '/login'
                            },
                        }
                    },
                ]
            },
            {
                path: 'administrar',
                canActivate: [NgxPermissionsGuard, LoginGuard],
                data: {
                    title: 'Administración',
                    identifier: 'Administración',
                    permissions: {
                        only: [
                            Permission.AdministrarRestriccionesPorPuestoTrabajo,
                            Permission.AdministrarImpresoras,
                            Permission.AdministrarTarjetas,
                            Permission.AdministrarChoferes,
                            Permission.AdministrarPenalizacionChoferes,
                            Permission.AdministrarNotificaciones,
                            Permission.AdministrarTarjetasAutorizacion,
                            Permission.AdministrarPuestosTrabajo,
                            Permission.AdministrarTiposPuestosTrabajo,
                            Permission.AdministrarParametrosPorSociedad,
                            Permission.AdministrarParametrosPorProducto,
                            Permission.AdministrarDestinosPostCalado,
                            Permission.AdministrarParametrosPorTipoAnalisisCamara,
                            Permission.AdministrarPlataformas,
                            Permission.AdministrarEventos,
                            Permission.AdministrarPuntosCarga,
                            Permission.AdministrarRangosCodigoBarraCamara,
                            Permission.AdministrarParametrosPorTerminal,
                            Permission.AdministrarEquivalenciaRubros,
                            Permission.AdministrarTipoDocumentoPorteTipoProducto,
                            Permission.AdministrarSuplencias,
                            Permission.AdministrarTiempoLimiteEstado,
                            Permission.AdministrarFinalidadesEnvioPdfTicketBalanza,
                            // Permission.AdministrarFinalidadesEnvioPdfTicketBalanza
                        ],
                        redirectTo: '/login'
                    }
                },
                children: [
                    {
                        path: 'puestos-trabajo',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: AdministrarPuestosDeTrabajoComponent,
                        data: {
                            title: 'Puestos de Trabajo',
                            identifier: 'AdministrarPuestosTrabajo',
                            permissions: {
                                only: [Permission.AdministrarPuestosTrabajo],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'tipos-puestos-trabajo',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: AdministrarTiposPuestosTrabajoComponent,
                        data: {
                            title: 'Tipos de Puestos de Trabajo',
                            identifier: 'AdministrarTiposPuestosTrabajo',
                            permissions: {
                                only: [Permission.AdministrarTiposPuestosTrabajo],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'restricciones-puestos-trabajo',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: AdministrarRestriccionesPorPuestoTrabajoComponent,
                        data: {
                            title: 'Restricciones Por Puesto De Trabajo',
                            identifier: 'AdministrarRestriccionesPorPuestoDeTrabajo',
                            permissions: {
                                only: [Permission.AdministrarRestriccionesPorPuestoTrabajo],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'choferes',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: AdministrarChoferesComponent,
                        data: {
                            title: 'Choferes',
                            identifier: 'AdministrarChoferes',
                            permissions: {
                                only: [Permission.AdministrarChoferes],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'suplencias',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: AdministrarSuplenciasComponent,
                        data: {
                            title: 'Suplencias',
                            identifier: 'AdministrarSuplencias',
                            permissions: {
                                only: [Permission.AdministrarSuplencias],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'rangos-codigo-barra-camara',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: AdministrarRangosCodigoBarraCamaraComponent,
                        data: {
                            title: 'Rangos de Código de Barra de Cámara',
                            identifier: 'AdministrarRangosDeCodigoDeBarraDeCamara',
                            permissions: {
                                only: [Permission.AdministrarRangosCodigoBarraCamara],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'impresoras',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: AdministrarImpresorasComponent,
                        data: {
                            title: 'Impresoras',
                            identifier: 'Impresoras',
                            permissions: {
                                only: [Permission.AdministrarImpresoras],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'destinos-post-calado',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: AdministrarDestinosPostCaladoComponent,
                        data: {
                            title: 'Destinos Post-Calado',
                            identifier: 'AdministrarDestinosPostCalado',
                            permissions: {
                                only: [Permission.AdministrarDestinosPostCalado],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'rubro-camara-producto',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: AdministrarEquivalenciaRubrosComponent,
                        data: {
                            title: 'Equivalencia de los Rubros a enviar a cámara',
                            identifier: 'AdministrarEquivalenciaRubros',
                            permissions: {
                                only: [Permission.AdministrarEquivalenciaRubros],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'tarjetas',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: AdministrarTarjetaComponent,
                        data: {
                            title: 'Tarjetas',
                            identifier: 'AdministrarTarjeta',
                            permissions: {
                                only: [Permission.AdministrarTarjetas],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'eventos',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: AdministrarEventosComponent,
                        data: {
                            title: 'Eventos',
                            identifier: 'AdministrarEventos',
                            permissions: {
                                only: [Permission.AdministrarEventos],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'tarjetas-autorizacion',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: AdministrarTarjetaAutorizacionComponent,
                        data: {
                            title: 'Tarjetas de Autorización',
                            identifier: 'AdministrarTarjetaAutorizacion',
                            permissions: {
                                only: [Permission.AdministrarTarjetasAutorizacion],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'penalizacion-choferes',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: AdministrarPenalizacionChoferesComponent,
                        data: {
                            title: 'Penalizacion choferes',
                            identifier: 'AdministrarPenalizacionChoferes',
                            permissions: {
                                only: [Permission.AdministrarPenalizacionChoferes],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'dispositivos',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: AdministrarDispositivosComponent,
                        data: {
                            title: 'Dispositivos',
                            identifier: 'Dispositivos',
                            permissions: {
                                only: [Permission.AdministrarDispositivos],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'notificaciones',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: AdministrarNotificacionesComponent,
                        data: {
                            title: 'Notificaciones',
                            identifier: 'AdministrarNotificaciones',
                            permissions: {
                                only: [Permission.AdministrarNotificaciones],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'parametros-por-sociedad',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: AdministrarParametrosPorSociedadComponent,
                        data: {
                            title: 'Parámetros por Sociedad',
                            identifier: 'AdministrarParametrosPorSociedad',
                            permissions: {
                                only: [Permission.AdministrarParametrosPorSociedad],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'parametros-por-producto',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: AdministrarParametrosPorProductoComponent,
                        data: {
                            title: 'Parámetros por Producto',
                            identifier: 'AdministrarParametrosPorProducto',
                            permissions: {
                                only: [Permission.AdministrarParametrosPorProducto],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'parametros-por-tipo-analisis-camara',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: AdministrarParametrosPorTipoAnalisisCamaraComponent,
                        data: {
                            title: 'Parámetros por Tipo Análisis Cámara',
                            identifier: 'AdministrarParametrosPorTipoAnalisisCamara',
                            permissions: {
                                only: [Permission.AdministrarParametrosPorTipoAnalisisCamara],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'parametros-terminal',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: AdministrarParametrosPorTerminalComponent,
                        data: {
                            title: 'Administrar Terminal',
                            identifier: 'AdministrarParametrosPorTerminal',
                            permissions: {
                                only: [Permission.AdministrarParametrosPorTerminal],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'productos-habilitados-terminal',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: AdministrarProductosHabilitadosPorTerminalComponent,
                        data: {
                            title: 'Productos habilitados por Terminal',
                            identifier: 'AdministrarProductosHabilitadosPorTerminal',
                            permissions: {
                                only: [Permission.AdministrarProductosHabilitadosPorTerminal],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'Plataformas',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: AdministrarPlataformasComponent,
                        data: {
                            title: 'Plataformas',
                            identifier: 'AdministrarPlataformas',
                            permissions: {
                                only: [Permission.AdministrarPlataformas],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'tipo-documento-porte-tipo-producto-terminal',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: AdministrarTipoDocumentoPorteTipoProductoComponent,
                        data: {
                            title: 'Tipos de Documentos de Porte por Terminal y Tipo Producto',
                            identifier: 'AdministrarTipoDocumentoPorteTipoProducto',
                            permissions: {
                                only: [Permission.AdministrarTipoDocumentoPorteTipoProducto],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'administrar-grupo-productos-modificacion-fuera-circuito',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: AdministrarGrupoProductoComponent,
                        data: {
                            title: 'Grupo de Productos Modificación Fuera de Circuito',
                            identifier: 'AdministrarGrupoProducto',
                            permissions: {
                                only: [Permission.AdministrarGrupoProductoModificacionFueraCircuito],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'configurar-ambiente',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: ConfigurarAmbienteComponent,
                        data: {
                            title: 'Configurar Ambiente',
                            identifier: 'ConfigurarAmbiente',
                            permissions: {
                                only: [Permission.ConfigurarAmbienteCentral, Permission.ConfigurarAmbienteLocal],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'administrar-tiempo-limite-estado',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: AdministrarTiempoLimiteEstadoComponent,
                        data: {
                            title: 'Tiempo Límite por Estado',
                            identifier: 'AdministrarTiempoLimiteEstado',
                            permissions: {
                                only: [Permission.AdministrarTiempoLimiteEstado],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'PuntosCarga',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: AdministrarPuntosCargaComponent,
                        data: {
                            title: 'Puntos de Carga',
                            identifier: 'AdministrarPuntosCarga',
                            permissions: {
                                only: [Permission.AdministrarPuntosCarga],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'leyenda-gmp',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: AdministrarTextoGmpComponent,
                        data: {
                            title: 'Texto GMP',
                            identifier: 'AdministrarLeyendaGmpPorSociedad',
                            permissions: {
                                only: [Permission.AdministrarLeyendaGmpPorSociedad],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'finalidades-envio-pdf-ticket-balanza',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: AdministrarFinalidadesEnvioPdfTicketBalanzaComponent,
                        data: {
                            title: 'Finalidades para Envío de PDF de Ticket Balanza',
                            identifier: 'FinalidadesEnvioPdfTicketBalanza',
                            permissions: {
                                only: [Permission.AdministrarFinalidadesEnvioPdfTicketBalanza],
                                redirectTo: '/login'
                            },
                        }
                    }
                ]
            },
            {
                path: 'cupo',
                canActivate: [NgxPermissionsGuard, LoginGuard],
                data: {
                    title: 'Cupo',
                    identifier: 'Cupo',
                    permissions: {
                        only: [
                            Permission.ValidarCupo,
                            Permission.GestionarCupos,
                            Permission.GestionarCuposModificar,
                            Permission.ReimprimirTurnoPlaya
                        ],
                        redirectTo: '/login'
                    }
                },
                children: [
                    {
                        path: 'validar-cupo',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: ValidarCupoComponent,
                        data: {
                            title: 'Validar Cupo',
                            identifier: 'ValidarCupo',
                            permissions: {
                                only: [Permission.ValidarCupo],
                                redirectTo: '/login'
                            }
                        }
                    },
                    {
                        path: 'modificar-validacion-cupo',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: ValidarCupoComponent,
                        data: {
                            title: 'Validar Cupo',
                            identifier: 'ModificarValidacionCupo',
                            permissions: {
                                only: [Permission.GestionarCuposModificar],
                                redirectTo: '/login'
                            },
                            hide: true
                        }
                    },
                    {
                        path: 'gestionar-cupos',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: GestionarCuposComponent,
                        data: {
                            title: 'Gestionar Cupos',
                            identifier: 'GestionarCupos',
                            permissions: {
                                only: [Permission.GestionarCupos],
                                redirectTo: '/login'
                            }
                        }
                    },
                    {
                        path: 'reimprimir-turno-playa',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: ReimprimirTurnoPlayaComponent,
                        data: {
                            title: 'Re-imprimir turno playa',
                            identifier: 'ReimprimirTurnoPlaya',
                            permissions: {
                                only: [Permission.ReimprimirTurnoPlaya],
                                redirectTo: '/login'
                            }
                        }
                    },
                ],
            },
            {
                path: 'control',
                canActivate: [NgxPermissionsGuard, LoginGuard],
                data: {
                    title: 'Control',
                    identifier: 'Control',
                    permissions: {
                        only: [
                            Permission.ControlarDescargaCamionCereales,
                            Permission.ControlarDescargaCamionInsumosVarios,
                            Permission.ControlarDescargaCamionSubproductos,
                            Permission.ControlarDescargaVagonCereales,
                            Permission.ControlarDescargaVagonNoGrano,
                            Permission.GestionarControl,
                            Permission.ControlarSalida,
                            Permission.ReimprimirTicketDePesaje,
                            Permission.CambiarTarjeta,
                            Permission.GestionarOrdenesCarga,
                            Permission.AsignarTarjeta
                        ],
                        redirectTo: '/login'
                    }
                },
                children: [
                    {
                        path: 'camion',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        data: {
                            title: 'Camión',
                            identifier: 'Camion',
                            permissions: {
                                only: [
                                    Permission.ControlarDescargaCamionCereales,
                                    Permission.ControlarDescargaCamionInsumosVarios,
                                    Permission.ControlarDescargaCamionSubproductos,
                                ],
                                redirectTo: '/login'
                            }
                        },
                        children: [
                            {
                                path: 'cereales',
                                canActivate: [NgxPermissionsGuard, LoginGuard],
                                component: ControlarDescargaCamionCerealesComponent,
                                data: {
                                    title: 'Controlar Descarga Camión Cereales',
                                    identifier: 'ControlarDescargaCamionCereales',
                                    permissions: {
                                        only: [Permission.ControlarDescargaCamionCereales],
                                        redirectTo: '/login'
                                    }
                                }
                            },
                            {
                                path: 'insumos-varios',
                                canActivate: [NgxPermissionsGuard, LoginGuard],
                                component: ControlarDescargaCamionInsumosComponent,
                                data: {
                                    title: 'Controlar Descarga Camión Insumos / Varios',
                                    identifier: 'ControlarDescargaCamionInsumosVarios',
                                    permissions: {
                                        only: [Permission.ControlarDescargaCamionInsumosVarios],
                                        redirectTo: '/login'
                                    }
                                }
                            },
                            {
                                path: 'subproductos',
                                canActivate: [NgxPermissionsGuard, LoginGuard],
                                component: ControlarDescargaCamionSubproductosComponent,
                                data: {
                                    title: 'Controlar Descarga Camión Subproductos / No Grano',
                                    identifier: 'ControlarDescargaCamionSubproductos',
                                    permissions: {
                                        only: [Permission.ControlarDescargaCamionSubproductos],
                                        redirectTo: '/login'
                                    }
                                }
                            }
                        ]
                    },
                    {
                        path: 'tren',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        data: {
                            title: 'Tren',
                            identifier: 'Tren',
                            permissions: {
                                only: [
                                    Permission.ControlarDescargaVagonCereales,
                                    Permission.ControlarDescargaVagonNoGrano,
                                ],
                                redirectTo: '/login'
                            }
                        },
                        children: [
                            {
                                path: 'cereales',
                                canActivate: [NgxPermissionsGuard, LoginGuard],
                                component: ControlarDescargaVagonCerealesComponent,
                                data: {
                                    title: 'Controlar Descarga Vagón Cereales',
                                    identifier: 'ControlarDescargaVagonCereales',
                                    permissions: {
                                        only: [Permission.ControlarDescargaVagonCereales],
                                        redirectTo: '/login'
                                    }
                                }
                            },
                            {
                                path: 'no-granos',
                                canActivate: [NgxPermissionsGuard, LoginGuard],
                                component: ControlarDescargaVagonNoGranosComponent,
                                data: {
                                    title: 'Controlar Descarga Vagón No Granos',
                                    identifier: 'ControlarDescargaVagonNoGranos',
                                    permissions: {
                                        only: [Permission.ControlarDescargaVagonNoGrano],
                                        redirectTo: '/login'
                                    }
                                }
                            },
                        ]
                    },
                    {
                        path: 'gestionar-control',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: GestionarControlComponent,
                        data: {
                            title: 'Gestionar Control',
                            identifier: 'GestionarControl',
                            permissions: {
                                only: [Permission.GestionarControl],
                                redirectTo: '/login'
                            }
                        }
                    },
                    {
                        path: 'controlar-salida',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: ControlarSalidaComponent,
                        data: {
                            title: 'Controlar Salida',
                            identifier: 'ControlarSalida',
                            permissions: {
                                only: [Permission.ControlarSalida],
                                redirectTo: '/login'
                            }
                        }
                    },
                    {
                        path: 'reimprimir-ticket-pesaje',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: ReimprimirTicketPesajeComponent,
                        data: {
                            title: 'Re-imprimir Ticket de Pesaje',
                            identifier: 'ReimprimirTicketPesaje',
                            permissions: {
                                only: [Permission.ReimprimirTicketDePesaje],
                                redirectTo: '/login'
                            }
                        }
                    },
                    {
                        path: 'reimprimir-documento-porte',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: ReimprimirDocumentoPorteComponent,
                        data: {
                            title: 'Re-imprimir Documento Porte',
                            identifier: 'ReimprimirDocumentoPorte',
                            permissions: {
                                only: [Permission.ReimprimirDocumentoPorte],
                                redirectTo: '/login'
                            }
                        }
                    },
                    {
                        path: 'asignar-tarjeta',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: AsignarTarjetaComponent,
                        data: {
                            title: 'Asignar Tarjeta',
                            identifier: 'AsignarTarjeta',
                            permissions: {
                                only: [Permission.AsignarTarjeta],
                                redirectTo: '/login'
                            }
                        }
                    },
                    {
                        path: 'cambiar-tarjeta',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: CambiarTarjetaComponent,
                        data: {
                            title: 'Cambiar Tarjeta',
                            identifier: 'CambiarTarjeta',
                            permissions: {
                                only: [Permission.CambiarTarjeta],
                                redirectTo: '/login'
                            }
                        }
                    },
                    {
                        path: 'gestionar-ordenes-carga',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: GestionarOrdenesCargaComponent,
                        data: {
                            title: 'Gestionar Ordenes de Carga',
                            identifier: 'GestionarOrdenesCarga',
                            permissions: {
                                only: [Permission.GestionarOrdenesCarga],
                                redirectTo: '/login'
                            }
                        }
                    }
                ]
            },
            {
                path: 'calidad',
                canActivate: [NgxPermissionsGuard, LoginGuard],
                data: {
                    title: 'Calidad',
                    identifier: 'Calidad',
                    permissions: {
                        only: [
                            Permission.IngresarCalidadCalado,
                            Permission.IngresarCalidadCaladoVagon,
                            Permission.GestionarCalidadCalado,
                            Permission.GestionarMuestras,
                            Permission.ReimprimirTicketDeCalidad,
                            Permission.GestionarTrabajosGeneracionArchivosMuestras,
                            Permission.ControlarCalidadCamionCarga,
                            Permission.ChecklistControlPatrimonial,
                            Permission.RegistrarControlPatrimonial,
                            Permission.ReimprimirObleaLaboratorio
                        ],
                        redirectTo: '/login'
                    }
                },
                children: [
                    {
                        path: 'ingresar-calidad-calado-camion',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: IngresarCalidadCaladoComponent,
                        data: {
                            title: 'Ingresar Calidad Calado Camión',
                            identifier: 'IngresarCalidadCalado',
                            permissions: {
                                only: [Permission.IngresarCalidadCalado],
                                redirectTo: '/login'
                            }
                        }
                    },
                    {
                        path: 'consultar-modificar-calidad-calado-camion',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: IngresarCalidadCaladoComponent,
                        data: {
                            title: 'Ingresar Calidad Calado Camión',
                            identifier: 'ConsultarModificarCalidadCalado',
                            permissions: {
                                only: [Permission.GestionarCalidadCaladoConsultar,
                                       Permission.GestionarCalidadCaladoModificar,
                                       Permission.GestionarCalidadCaladoContinuarCircuitoPostLab],
                                redirectTo: '/login'
                            },
                            hide: true
                        },
                    },
                    {
                        path: 'ingresar-calidad-calado-vagon',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: IngresarCalidadCaladoComponent,
                        data: {
                            title: 'Ingresar Calidad Calado Vagón',
                            identifier: 'IngresarCalidadCaladoVagon',
                            permissions: {
                                only: [Permission.IngresarCalidadCaladoVagon],
                                redirectTo: '/login'
                            }
                        }
                    },
                    {
                        path: 'consultar-modificar-calidad-calado-vagon',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: IngresarCalidadCaladoComponent,
                        data: {
                            title: 'Ingresar Calidad Calado Vagón',
                            identifier: 'ConsultarModificarCalidadCaladoVagon',
                            permissions: {
                                only: [Permission.GestionarCalidadCaladoConsultar,
                                       Permission.GestionarCalidadCaladoModificar,
                                       Permission.GestionarCalidadCaladoContinuarCircuitoPostLab],
                                redirectTo: '/login'
                            },
                            hide: true
                        }
                    },
                    {
                        path: 'gestionar-calidad-calado',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: GestionarCalidadCaladoComponent,
                        data: {
                            title: 'Gestionar Calidad Calado',
                            identifier: 'GestionarCalidadCalado',
                            permissions: {
                                only: [Permission.GestionarCalidadCalado],
                                redirectTo: '/login'
                            }
                        }
                    },
                    {
                        path: 'gestionar-muestras',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: GestionarMuestrasComponent,
                        data: {
                            title: 'Gestionar Muestras',
                            identifier: 'GestionarMuestras',
                            permissions: {
                                only: [Permission.GestionarMuestras],
                                redirectTo: '/login'
                            }
                        }
                    },
                    {
                        path: 'reimprimir-ticket-calidad',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: ReimprimirTicketCalidadComponent,
                        data: {
                            title: 'Re-imprimir Ticket de Calidad',
                            identifier: 'ReimprimirTicketCalidad',
                            permissions: {
                                only: [Permission.ReimprimirTicketDeCalidad],
                                redirectTo: '/login'
                            }
                        }
                    },
                    {
                        path: 'reimprimir-oblea-laboratorio',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: ReimprimirObleaLaboratorioComponent,
                        data: {
                            title: 'Re-imprimir Oblea Laboratorio',
                            identifier: 'ReimprimirObleaLaboratorio',
                            permissions: {
                                only: [Permission.ReimprimirObleaLaboratorio],
                                redirectTo: '/login'
                            }
                        }
                    },
                    {
                        path: 'gestionar-trabajos-generacion-archivos-muestra',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: GestionarTrabajosArchivosMuestraComponent,
                        data: {
                            title: 'Gestionar Trabajos Generación Archivos Muestras',
                            identifier: 'GestionarTrabajosGeneracionArchivosMuestra',
                            permissions: {
                                only: [Permission.GestionarTrabajosGeneracionArchivosMuestras],
                                redirectTo: '/login'
                            }
                        }
                    },
                    {
                        path: 'control-calidad-camion-carga',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: ControlarCalidadCamionCargaComponent,
                        data: {
                            title: 'Controlar Calidad Camión Carga',
                            identifier: 'ControlarCalidadCamionCarga',
                            permissions: {
                                only: [Permission.ControlarCalidadCamionCarga],
                                redirectTo: '/login'
                            }
                        }
                    },
                    {
                        path: 'actualizar-checklist-control-patrimonial',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: ChecklistControlPatrimonialComponent,
                        data: {
                            title: 'Actualizar checklist de control patrimonial',
                            identifier: 'ChecklistControlPatrimonial',
                            permissions: {
                                only: [Permission.ChecklistControlPatrimonial],
                                redirectTo: '/login'
                            }
                        }
                    },
                    {
                        path: 'registrar-control-patrimonial',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: RegistrarControlPatrimonialComponent,
                        data: {
                            title: 'Registrar control patrimonial',
                            identifier: 'RegistrarControlPatrimonial',
                            permissions: {
                                only: [Permission.RegistrarControlPatrimonial],
                                redirectTo: '/login'
                            }
                        }
                    }
                ]
            },
            {
                path: 'balanza',
                canActivate: [NgxPermissionsGuard, LoginGuard],
                data: {
                    title: 'Balanza',
                    identifier: 'Balanza',
                    permissions: {
                        only: [
                            Permission.RegistrarPeso,
                            Permission.RegistrarPesoVagon,
                            Permission.GestionarManipuleo,
                            Permission.ControlarPesajeEnBalanza,
                            // Permission.ResolverEventoAutorizaciones,
                        ],
                        redirectTo: '/login'
                    }
                },
                children: [
                    {
                        path: 'registrar-peso-camion',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: RegistrarPesoComponent,
                        data: {
                            title: 'Registrar Peso Camión',
                            identifier: 'RegistrarPeso',
                            permissions: {
                                only: [Permission.RegistrarPeso],
                                redirectTo: '/login'
                            }
                        }
                    },
                    {
                        path: 'registrar-peso-vagon',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: RegistrarPesoVagonesComponent,
                        data: {
                            title: 'Registrar Peso Vagón',
                            identifier: 'RegistrarPesoVagon',
                            permissions: {
                                only: [Permission.RegistrarPesoVagon],
                            }
                        }
                    },
                    {
                        path: 'gestionar-manipuleo',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: GestionarManipuleoComponent,
                        data: {
                            title: 'Gestionar Manipuleo',
                            identifier: 'GestionarManipuleo',
                            permissions: {
                                only: [Permission.GestionarManipuleo],
                                redirectTo: '/login'
                            }
                        }
                    },
                    {
                        path: 'controlar-pesaje-en-balanza',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: ControlarPesajeEnBalanzaComponent,
                        data: {
                            title: 'Controlar Pesaje en Balanza',
                            identifier: 'ControlarPesajeEnBalanza',
                            permissions: {
                                only: [Permission.ControlarPesajeEnBalanza],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'dashboard-balanzas-automatizadas',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: DashboardBalanzasAutomatizadasComponent,
                        data: {
                            title: 'Dashboard Balanzas Automatizadas',
                            identifier: 'DashboardBalanzasAutomatizadas',
                            permissions: {
                                only: [Permission.DashboardBalanzasAutomatizadas],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'seleccionar-balanza-salida',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: SeleccionarBalanzaSalidaComponent,
                        data: {
                            title: 'Seleccionar Balanza Salida',
                            identifier: 'SeleccionarBalanzaSalida',
                            permissions: {
                                only: [Permission.DashboardBalanzasAutomatizadas],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'resolver-evento',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: ResolverEventoComponent,
                        data: {
                            title: 'Resolver Evento Tarjeta y Matrícula No Coinciden',
                            identifier: 'ResolverEvento',
                            permissions: {
                                only: [Permission.DashboardBalanzasAutomatizadas],
                                redirectTo: '/login'
                            },
                            hide: true
                        }
                    },
                    {
                        path: 'resolver-eventos-pendientes',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: ResolverEventosPendientesComponent,
                        data: {
                            title: 'Resolver Evento Balanza',
                            identifier: 'ResolverEventosPendientes',
                            permissions: {
                                only: [Permission.DashboardBalanzasAutomatizadas],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                      path: 'resolver-evento-tarjeta-matricula',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: ResolverEventoComponent,
                        data: {
                            title: 'Resolver Evento Tarjeta Matrícula',
                            identifier: 'ResolverEventoTarjetaMatricula',
                            permissions: {
                                only: [Permission.DashboardBalanzasAutomatizadas],
                                redirectTo: '/login'
                            },
                            hide: true
                        }
                    },
                    {
                        path: 'resolver-evento-autorizaciones',
                          canActivate: [NgxPermissionsGuard, LoginGuard],
                          component: ResolverEventoAutorizacionesComponent,
                          data: {
                              title: 'Autorizaciones',
                              identifier: 'ResolverEventoAutorizaciones',
                              permissions: {
                                  only: [Permission.DashboardBalanzasAutomatizadas],
                                  redirectTo: '/login'
                              },
                              hide: true
                          }
                    },
                    {
                      path: 'resolver-evento-plataforma-descarga',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: ResolverPlataformaDescargaComponent,
                        data: {
                            title: 'Resolver Evento Plataforma Descarga',
                            identifier: 'ResolverEventoPlataformaDescarga',
                            permissions: {
                                only: [Permission.DashboardBalanzasAutomatizadas],
                                redirectTo: '/login'
                            },
                            hide: true
                        }
                    },
                    {
                      path: 'resolver-evento-plataforma-requerida',
                      canActivate: [NgxPermissionsGuard, LoginGuard],
                      component: ResolverEventoPlataformaRequeridaComponent,
                      data: {
                          title: 'Resolver Evento Plataforma Requerida',
                          identifier: 'ResolverEventoPlataformaRequerida',
                          permissions: {
                              only: [Permission.DashboardBalanzasAutomatizadas],
                              redirectTo: '/login'
                          },
                          hide: true
                      }
                    }
                ]
            },
            {
                path: 'entregador',
                canActivate: [NgxPermissionsGuard, LoginGuard],
                data: {
                    title: 'Entregador',
                    identifier: 'Entregador',
                    permissions: {
                        only: [
                            Permission.GestionarDescargasPorEntregador
                        ],
                        redirectTo: '/login'
                    }
                },
                children: [
                    {
                        path: 'gestionar-descargas-entregador',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: GestionarDescargasPorEntregadorComponent,
                        data: {
                            title: 'Gestionar Descargas por Entregador',
                            identifier: 'GestionarDescargasPorEntregador',
                            permissions: {
                                only: [Permission.GestionarDescargasPorEntregador],
                                redirectTo: '/login'
                            }
                        }
                    },
                ]
            },
            {
                path: 'laboratorio',
                canActivate: [NgxPermissionsGuard, LoginGuard],
                data: {
                    title: 'Laboratorio',
                    identifier: 'Laboratorio',
                    permissions: {
                        only: [
                            Permission.GestionarCalidadPorLaboratorio
                        ],
                        redirectTo: '/login'
                    }
                },
                children: [
                    {
                        path: 'gestionar-calidad-por-laboratorio',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: GestionarCalidadPorLaboratorioComponent,
                        data: {
                            title: 'Gestionar Calidad por Laboratorio',
                            identifier: 'GestionarCalidadPorLaboratorio',
                            permissions: {
                                only: [Permission.GestionarCalidadPorLaboratorio],
                                redirectTo: '/login'
                            }
                        }
                    },
                ]
            },
            {
                path: 'gestion-administrativa',
                canActivate: [NgxPermissionsGuard, LoginGuard],
                data: {
                    title: 'Gestión Administrativa',
                    identifier: 'GestionAdministrativa',
                    permissions: {
                        only: [
                            Permission.GestionarMovimientos,
                            Permission.QuitarCircuito,
                            Permission.ReversarSalida,
                            Permission.GestionarInterfacesAFIP,
                            Permission.GestionarInterfacesSAN,
                            Permission.GestionarNotificaciones,
                            Permission.GestionarTransporteCircuito,
                            Permission.PagoTasaMunicipal
                        ],
                        redirectTo: '/login'
                    }
                },
                children: [
                    {
                        path: 'gestionar-movimientos',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: GestionarMovimientosComponent,
                        data: {
                            title: 'Gestionar Movimientos',
                            identifier: 'GestionarMovimientos',
                            permissions: {
                                only: [Permission.GestionarMovimientos],
                                redirectTo: '/login'
                            }
                        }
                    },
                    {
                        path: 'quitar-de-circuito',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: QuitarDeCircuitoComponent,
                        data: {
                            title: 'Quitar de Circuito',
                            identifier: 'QuitarDeCircuito',
                            permissions: {
                                only: [Permission.QuitarCircuito],
                                redirectTo: '/login'
                            }
                        }
                    },
                    {
                        path: 'reversar-salida',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: ReversarSalidaComponent,
                        data: {
                            title: 'Reversar salida',
                            identifier: 'ReversarSalida',
                            permissions: {
                                only: [Permission.ReversarSalida],
                                redirectTo: '/login'
                            }
                        }
                    },
                    {
                        path: 'gestionar-interfaces-afip',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: GestionarInterfacesAfipComponent,
                        data: {
                            title: 'Gestionar Interfaces AFIP',
                            identifier: 'GestionarInterfacesAfip',
                            permissions: {
                                only: [Permission.GestionarInterfacesAFIP],
                                redirectTo: '/login'
                            }
                        }
                    },
                    {
                        path: 'gestionar-interfaces-san',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: GestionarInterfacesSanComponent,
                        data: {
                            title: 'Gestionar Interfaces SAN',
                            identifier: 'GestionarInterfacesSan',
                            permissions: {
                                only: [Permission.GestionarInterfacesSAN],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'gestionar-notificaciones',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: GestionarNotificacionesComponent,
                        data: {
                            title: 'Gestionar Notificaciones',
                            identifier: 'GestionarNotificaciones',
                            permissions: {
                                only: [Permission.GestionarNotificaciones],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'gestionar-transportes-en-circuito',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: GestionarTransportesCircuitoComponent,
                        data: {
                            title: 'Gestión de Transportes En Circuito',
                            identifier: 'GestionarTransportesCircuito',
                            permissions: {
                                only: [Permission.GestionarTransporteCircuito],
                                redirectTo: '/login'
                            },
                        }
                    },
                    {
                        path: 'pago-tasa-municipal',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: PagoTasaMunicipalComponent,
                        data: {
                            title: 'Pago de Tasa Municipal',
                            identifier: 'PagoTasaMunicipal',
                            permissions: {
                                only: [Permission.PagoTasaMunicipal],
                                redirectTo: '/login'
                            },
                        }
                    }
                ]
            },
            {
                path: 'pruebas',
                canActivate: [NgxPermissionsGuard, LoginGuard],
                data: {
                    title: 'Pruebas',
                    identifier: 'Pruebas',
                    permissions: {
                        only: [
                            Permission.PruebaLecturaTarjeta
                        ],
                        redirectTo: '/login'
                    }
                },
                children: [
                    {
                        path: 'lectura-tarjeta',
                        canActivate: [NgxPermissionsGuard, LoginGuard],
                        component: TesteoTarjetaComponent,
                        data: {
                            title: 'Prueba Lectura de Tarjeta',
                            identifier: 'PruebaLecturaTarjeta',
                            permissions: {
                                only: [Permission.PruebaLecturaTarjeta],
                                redirectTo: '/login'
                            }
                        }
                    }
                ]
            },
            {
                path: 'mis-impresoras',
                canActivate: [NgxPermissionsGuard, LoginGuard],
                component: MisImpresorasComponent,
                data: {
                    title: 'Mis Impresoras',
                    identifier: 'misImpresoras',
                    permissions: {
                        only: [
                            Permission.MisImpresoras,
                        ],
                        redirectTo: '/login'
                    }
                }
            },
            {
                path: 'mis-impresoras-admin',
                canActivate: [NgxPermissionsGuard, LoginGuard],
                component: MisImpresorasComponent,
                data: {
                    title: 'Mis Impresoras (Admin)',
                    identifier: 'misImpresorasAdmin',
                    permissions: {
                        only: [
                            Permission.MisImpresorasAdmin,
                        ],
                        redirectTo: '/login'
                    }
                }
            },
            {
                path: 'modificar-control-descarga-camion-cereales',
                canActivate: [NgxPermissionsGuard, LoginGuard],
                component: ModificarControlDescargaCamionCerealesComponent,
                data: {
                    title: 'Modificar Control Descarga Camión Cereales',
                    identifier: 'ModificarControlDescargaCamionCereales',
                    permissions: {
                        only: [
                            Permission.GestionarMovimientosModificarCupoYControl,
                            Permission.GestionarControlModificar
                        ],
                        redirectTo: '/login'
                    },
                    hide: true
                }
            },
            {
                path: 'modificar-producto-fuera-circuito',
                canActivate: [NgxPermissionsGuard, LoginGuard],
                component: ModificarProductoFueraCircuitoComponent,
                data: {
                    title: 'Modificar Producto Fuera de Circuito',
                    identifier: 'ModificarProductoFueraCircuito',
                    permissions: {
                        only: [Permission.GestionarMovimientosModificarProducto],
                        redirectTo: '/login'
                    },
                    hide: true
                }
            },
            {
                path: 'modificar-control-descarga-camion-insumos',
                canActivate: [NgxPermissionsGuard, LoginGuard],
                component: ModificarControlDescargaCamionInsumosComponent,
                data: {
                    title: 'Modificar Control Descarga Camión Insumos',
                    identifier: 'ModificarControlDescargaCamionInsumosVarios',
                    permissions: {
                        only: [
                            Permission.GestionarMovimientosModificarCupoYControl,
                            Permission.GestionarControlModificar
                        ],
                        redirectTo: '/login'
                    },
                    hide: true
                }
            },
            {
                path: 'modificar-control-descarga-camion-subproductos-nogranos',
                canActivate: [NgxPermissionsGuard, LoginGuard],
                component: ModificarControlDescargaCamionSubproductosNogranosComponent,
                data: {
                    title: 'Modificar Control Descarga Camión Subproducto NoGrano',
                    identifier: 'ModificarControlDescargaCamionSubProductosNoGranos',
                    permissions: {
                        only: [
                            Permission.GestionarMovimientosModificarCupoYControl,
                            Permission.GestionarControlModificar
                        ],
                        redirectTo: '/login'
                    },
                    hide: true
                }
            },
            {
                path: 'consulta-movimiento',
                canActivate: [NgxPermissionsGuard, LoginGuard],
                component: ConsultaMovimientoComponent,
                data: {
                    title: 'Consultar Movimiento',
                    identifier: 'ConsultaMovimiento',
                    permissions: {
                        only: [
                            Permission.GestionarMovimientosConsultar,
                            Permission.GestionarDescargasPorEntregadorConsultar
                        ],
                        redirectTo: '/login'
                    },
                    hide: true
                }
            },
            {
                path: 'modificar-pesos-fuera-de-circuito',
                canActivate: [NgxPermissionsGuard, LoginGuard],
                component: ModificarPesosFueraDeCircuitoComponent,
                data: {
                    title: 'Modificar Pesos Fuera de Circuito',
                    identifier: 'ModificarPesosFueraDeCircuito',
                    permissions: {
                        only: [Permission.GestionarMovimientosModificarBalanza],
                        redirectTo: '/login'
                    },
                    hide: true
                }
            },
            {
                path: 'modificar-calidad-calado',
                canActivate: [NgxPermissionsGuard, LoginGuard],
                component: ModificarCalidadCaladoComponent,
                data: {
                    title: 'Modificar Calidad Calado',
                    identifier: 'ModificarCalidadCalado',
                    permissions: {
                        only: [
                            Permission.GestionarMovimientosModificarCalidad,
                            Permission.GestionarCalidadCaladoModificar],
                        redirectTo: '/login'
                    },
                    hide: true
                }
            },
            {
                path: 'modificar-control-descarga-vagon-nogranos',
                canActivate: [NgxPermissionsGuard, LoginGuard],
                component: ModificarControlDescargaVagonNogranosComponent,
                data: {
                    title: 'Modificar Control Descarga Vagón No Granos',
                    identifier: 'ModificarControlDescargaVagonNoGranos',
                    permissions: {
                        only: [
                            Permission.GestionarMovimientosModificarCupoYControl,
                            Permission.GestionarControlModificar],
                        redirectTo: '/login'
                    },
                    hide: true,
                }
            },
            {
                path: 'modificar-control-descarga-vagon-cereales',
                canActivate: [NgxPermissionsGuard, LoginGuard],
                component: ModificarControlDescargaVagonCerealesComponent,
                data: {
                    title: 'Modificar Control Descarga Vagón Cereales',
                    identifier: 'ModificarControlDescargaVagonCereales',
                    permissions: {
                        only: [
                            Permission.GestionarMovimientosModificarCupoYControl,
                            Permission.GestionarControlModificar
                        ],
                        redirectTo: '/login'
                    },
                    hide: true
                }
            },
            {
                path: 'registrar-decision-entregador-camion',
                canActivate: [NgxPermissionsGuard, LoginGuard],
                component: IngresarCalidadCaladoComponent,
                data: {
                    title: 'Ingresar Calidad Calado Camión',
                    identifier: 'RegistrarDecisionEntregadorCamion',
                    permissions: {
                        only: [Permission.GestionarDescargasPorEntregadorRegistrarDecision],
                        redirectTo: '/login'
                    },
                    hide: true
                }
            },
            {
                path: 'registrar-decision-entregador-vagon',
                canActivate: [NgxPermissionsGuard, LoginGuard],
                component: IngresarCalidadCaladoComponent,
                data: {
                    title: 'Ingresar Calidad Calado Vagón',
                    identifier: 'RegistrarDecisionEntregadorVagon',
                    permissions: {
                        only: [Permission.GestionarDescargasPorEntregadorRegistrarDecision],
                        redirectTo: '/login'
                    },
                    hide: true
                }
            },
            {
                path: 'consultar-modificar-descarga-camion-cereales',
                canActivate: [NgxPermissionsGuard, LoginGuard],
                component: ControlarDescargaCamionCerealesComponent,
                data: {
                    title: 'Controlar Descarga Camión Cereales',
                    identifier: 'ConsultarModificarControlarDescargaCamionCereales',
                    permissions: {
                        only: [
                            Permission.GestionarControlConsultar,
                            Permission.GestionarControlModificar
                        ],
                        redirectTo: '/login'
                    },
                    hide: true
                }
            },
            {
                path: 'consultar-modificar-descarga-camion-subproductos',
                canActivate: [NgxPermissionsGuard, LoginGuard],
                component: ControlarDescargaCamionSubproductosComponent,
                data: {
                    title: 'Controlar Descarga Camión Subproductos / No Grano',
                    identifier: 'ConsultarModificarControlarDescargaCamionSubproductos',
                    permissions: {
                        only: [
                            Permission.GestionarControlConsultar,
                            Permission.GestionarControlModificar
                        ],
                        redirectTo: '/login'
                    },
                    hide: true
                }
            },
            {
                path: 'consultar-modificar-descarga-camion-insumos',
                canActivate: [NgxPermissionsGuard, LoginGuard],
                component: ControlarDescargaCamionInsumosComponent,
                data: {
                    title: 'Controlar Descarga Camión Insumos',
                    identifier: 'ConsultarModificarControlarDescargaCamionInsumosVarios',
                    permissions: {
                        only: [
                            Permission.GestionarControlConsultar,
                            Permission.GestionarControlModificar
                        ],
                        redirectTo: '/login'
                    },
                    hide: true
                }
            },
            {
                path: 'consultar-modificar-descarga-vagon-cereales',
                canActivate: [NgxPermissionsGuard, LoginGuard],
                component: ControlarDescargaVagonCerealesComponent,
                data: {
                    title: 'Controlar Descarga Vagón Cereales',
                    identifier: 'ConsultarModificarControlarDescargaVagonCereales',
                    permissions: {
                        only: [
                            Permission.GestionarControlConsultar,
                            Permission.GestionarControlModificar,
                            Permission.GestionarControlModificarDocPorteVagones,
                        ],
                        redirectTo: '/login'
                    },
                    hide: true
                }
            },
            {
                path: 'consultar-modificar-descarga-vagon-no-granos',
                canActivate: [NgxPermissionsGuard, LoginGuard],
                component: ControlarDescargaVagonNoGranosComponent,
                data: {
                    title: 'Controlar Descarga Vagón No Granos',
                    identifier: 'ConsultarModificarControlarDescargaVagonNoGranos',
                    permissions: {
                        only: [
                            Permission.GestionarControlConsultar,
                            Permission.GestionarControlModificar,
                            Permission.GestionarControlModificarDocPorteVagones,
                        ],
                        redirectTo: '/login'
                    },
                    hide: true
                }
            },
            {
                path: 'controlar-carga-camion',
                canActivate: [NgxPermissionsGuard, LoginGuard],
                pathMatch: 'prefix',
                component: ControlarCargaCamionComponent,
                data: {
                    title: 'Controlar Carga Camión',
                    identifier: 'ControlarCargaCamion',
                    permissions: {
                        only: [Permission.ControlarCargaCamion,
                               Permission.GestionarControlConsultar,
                               Permission.GestionarControlModificar,
                               Permission.GestionarMovimientos],
                        redirectTo: '/login'
                    },
                    hide: true
                }
            },
            {
                path: 'controlar-carga-camion-insumo-vario',
                canActivate: [NgxPermissionsGuard, LoginGuard],
                pathMatch: 'prefix',
                component: ControlarCargaCamionInsumoVarioComponent,
                data: {
                    title: 'Controlar Carga Camión',
                    identifier: 'ControlarCargaCamionVarios',
                    permissions: {
                        only: [Permission.ControlarCargaCamionVarios],
                        redirectTo: '/login'
                    },
                    hide: true
                }
            },
            {
                path: 'modificar-datos-orden-carga',
                canActivate: [NgxPermissionsGuard, LoginGuard],
                pathMatch: 'prefix',
                component: ModificarDatosOrdenCargaCamionComponent,
                data: {
                    title: 'Controlar Carga',
                    identifier: 'ModificarDatosOrdenCargaCamion',
                    permissions: {
                        only: [Permission.GestionarMovimientosModificarDatosOrdenCarga],
                        redirectTo: '/login'
                    },
                    hide: true
                }
            },
            {
                path: 'modificar-datos-orden-carga-insumo-varios',
                canActivate: [NgxPermissionsGuard, LoginGuard],
                pathMatch: 'prefix',
                component: ModificarDatosOrdenCargaCamionInsumoVariosComponent,
                data: {
                    title: 'Controlar Carga',
                    identifier: 'ModificarDatosOrdenCargaCamionVarios',
                    permissions: {
                        only: [Permission.GestionarMovimientosModificarDatosOrdenCarga],
                        redirectTo: '/login'
                    },
                    hide: true
                }
            },
        ]
    }
];
