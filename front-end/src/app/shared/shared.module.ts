import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HotkeyModule } from 'angular2-hotkeys';
import { ModalModule } from '../core/components/modal/modal.module';
import { CoreSharedModule } from '../core/core-shared.module';
import { BuscadorProductoComponent } from './buscador-producto/buscador-producto.component';
import { ProductoService } from './buscador-producto/producto.service';
import { BuscadorSedeComponent } from './buscador-sede/buscador-sede.component';
import { DesplegableFinalidadComponent } from './desplegable-finalidad/desplegable-finalidad.component';
import { FinalidadService } from './desplegable-finalidad/finalidad.service';
import { DesplegableCampoEpaSustentableComponent } from './desplegable-campo-epa-sustentable/desplegable-campo-epa-sustentable.component';
import { CampoEpaSustentableService } from './desplegable-campo-epa-sustentable/campo-epa-sustentable.service';
import { BuscadorChoferComponent } from './buscador-chofer/buscador-chofer.component';
import { ChoferService } from './buscador-chofer/chofer.service';
import { BuscadorChoferAvanzadoComponent } from './buscador-chofer/buscador-chofer-avanzado/buscador-chofer-avanzado.component';
import { PatentesComponent } from './patentes/patentes.component';
import { DesplegableTipoGranoComponent } from './desplegable-tipo-grano/desplegable-tipo-grano.component';
import { TipoGranoService } from './desplegable-tipo-grano/tipo-grano.service';
import { EstablecimientoComponent } from './establecimiento/establecimiento.component';
import { DesplegableCosechaComponent } from './desplegable-cosecha/desplegable-cosecha.component';
import { CosechaService } from './desplegable-cosecha/cosecha.service';
import { BuscadorLocalidadComponent } from './buscador-localidad/buscador-localidad.component';
import { LocalidadService } from './buscador-localidad/localidad.service';
import { DesplegableTipoPesadaComponent } from './desplegable-tipo-pesada/desplegable-tipo-pesada.component';
import { TipoPesadaService } from './desplegable-tipo-pesada/tipo-pesada.service';
import { BuscadorDestinatarioComponent } from './buscador-destinatario/buscador-destinatario.component';
import { BuscadorEntregadorComponent } from './buscador-entregador/buscador-entregador.component';
import { BuscadorIntermediarioComponent } from './buscador-intermediario/buscador-intermediario.component';
import { BuscadorRemitenteComercialComponent } from './buscador-remitente-comercial/buscador-remitente-comercial.component';
import { BuscadorTitularComponent } from './buscador-titular/buscador-titular.component';
import { BuscadorVendedorComponent } from './buscador-vendedor/buscador-vendedor.component';
import { DestinatarioService } from './buscador-destinatario/destinatario.service';
import { EntregadorService } from './buscador-entregador/entregador.service';
import { IntermediarioService } from './buscador-intermediario/intermediario.service';
import { TitularService } from './buscador-titular/titular.service';
import { RemitenteComercialService } from './buscador-remitente-comercial/remitente-comercial.service';
import { VendedorService } from './buscador-vendedor/vendedor.service';
import { TipoProductoService } from './desplegable-tipo-producto/tipo-producto.service';
import { DespegableTipoProductoComponent } from './desplegable-tipo-producto/desplegable-tipo-producto.component';
import { BuscadorTransportistaComponent } from './buscador-transportista/buscador-transportista.component';
import { TransportistaService } from './buscador-transportista/transportista.service';
import { MotivoEstadoMovimientoService } from './desplegable-motivo-estado-movimiento/motivo-estado-movimiento.service';
import { DesplegableMotivoEstadoMovimientoComponent } from './desplegable-motivo-estado-movimiento/desplegable-motivo-estado-movimiento.component';
import { DesplegableReferenciaDestinoComponent } from './desplegable-referencia-destino/desplegable-referencia-destino.component';
import { ReferenciaDestinoService } from './desplegable-referencia-destino/referencia-destino.service';
import { BuscadorCorredorComponent } from './buscador-corredor/buscador-corredor.component';
import { CorredorService } from './buscador-corredor/corredor.service';
import { IntermediarioFleteService } from './buscador-intermediario-flete/intermediario-flete.service';
import { BuscadorIntermediarioFleteComponent } from './buscador-intermediario-flete/buscador-intermediario-flete.component';
import { BuscadorMercadoTerminoComponent } from './buscador-mercado-termino/buscador-mercado-termino.component';
import { MercadoTerminoService } from './buscador-mercado-termino/mercado-termino.service';
import { TipoCartaPorteService } from './desplegable-tipo-carta-porte/desplegable-tipo-carta-porte.service';
import { DespegableTipoCartaPorteComponent } from './desplegable-tipo-carta-porte/desplegable-tipo-carta-porte.component';
import { AutocompletePatenteComponent } from './autocomplete-patente/autocomplete-patente.component';
import { DesplegableEstadoMovimientoComponent } from './desplegable-estado-movimiento/desplegable-estado-movimiento.component';
import { EstadoMovimientoService } from './desplegable-estado-movimiento/estado-movimiento.service';
import { DesplegablePlataformaDescargaComponent } from './desplegable-plataforma-descarga/desplegable-plataforma-descarga.component';
import { PlataformaDescargaService } from './desplegable-plataforma-descarga/plataforma-descarga.service';
import { DesplegableTipoTransporteComponent } from './desplegable-tipo-transporte/desplegable-tipo-transporte.component';
import { TipoTransporteService } from './desplegable-tipo-transporte/desplegable-tipo-transporte.service';
import { SiloService } from './desplegable-silo/desplegable-silo.service';
import { DesplegableSiloComponent } from './desplegable-silo/desplegable-silo.component';
import { DesplegableGradoComponent } from './desplegable-grado/desplegable-grado.component';
import { GradoService } from './desplegable-grado/desplegable-grado.service';
import { DesplegableGrupoRubroAnalisisComponent } from './desplegable-grupo-rubro-analisis/desplegable-grupo-rubro-analisis.component';
import { GrupoRubroAnalisisService } from './desplegable-grupo-rubro-analisis/grupo-rubro-analisis.service';
import { DesplegableEstadoMuestraComponent } from './desplegable-estado-muestra/desplegable-estado-muestra.component';
import { EstadoMuestraService } from './desplegable-estado-muestra/estado-muestra.service';
import { DesplegableTrabajoGeneracionArchivoMuestrasComponent } from './desplegable-trabajo-generacion-archivo-muestras/desplegable-trabajo-generacion-archivo-muestras.component';
import { EstadoTrabajoGeneracionArchivoMuestrasService } from './desplegable-trabajo-generacion-archivo-muestras/estado-trabajo-generacion-archivo-muestras.service';
import { DesplegableTipoMovimientoComponent } from './desplegable-tipo-movimiento/desplegable-tipo-movimiento.component';
import { TipoMovimientoService } from './desplegable-tipo-movimiento/tipo-movimiento.service';
import { DesplegableProductoPorGrupoComponent } from './desplegable-producto-por-grupo/desplegable-producto-por-grupo.component';
import { DesplegableValorBooleanoComponent } from './desplegable-valor-booleano/desplegable-valor-booleano.component';
import { AutocompleteVagonComponent } from './autocomplete-vagon/autocomplete-vagon.component';
import { BuscadorFerrocarrilComponent } from './buscador-ferrocarril/buscador-ferrocarril.component';
import { DesplegableEstadoInterfazSanComponent } from './desplegable-estado-interfaz-san/desplegable-estado-interfaz-san.component';
import { DesplegableServicioSanComponent } from './desplegable-servicio-san/desplegable-servicio-san.component';
import { TextMaskModule } from 'angular2-text-mask';
import { DesplegableTerminalLoginComponent } from './desplegable-terminal-login/desplegable-terminal-login.component';
import { DesplegableTerminalComponent } from './desplegable-terminal/desplegable-terminal.component';
import { DesplegableTipoNotificacionComponent } from './desplegable-tipo-notificacion/desplegable-tipo-notificacion.component';
import { MultiselectVariableTemplateComponent } from './multiselect-variable-template/multiselect-variable-template.component';
import { DesplegableRolComponent } from './desplegable-rol/desplegable-rol.component';
import { DesplegableUsuarioComponent } from './desplegable-usuario/desplegable-usuario.component';
import { DesplegableSiNoComponent } from './desplegable-si-no/desplegable-si-no.component';
import { DesplegableActividadComponent } from './desplegable-actividad/desplegable-actividad.component';
import { DesplegableCaracteristicaComponent } from './desplegable-caracteristica/desplegable-caracteristica.component';
import { DesplegableCircuitoComponent } from './desplegable-circuito/desplegable-circuito.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DesplegablePermisoComponent } from './desplegable-permiso/desplegable-permiso.component';
import { DesplegablePuestoTrabajoComponent } from './desplegable-puesto-trabajo/desplegable-puesto-trabajo.component';
import { DesplegableTipoDispositivoComponent } from './desplegable-tipo-dispositivo/desplegable-tipo-dispositivo.component';
import { BuscadorUsuarioComponent } from './buscador-usuario/buscador-usuario.component';
import { DesplegableMotivoErrorBalanzaCircuitoComponent } from './desplegable-motivo-error-balanza-circuito/desplegable-motivo-error-balanza-circuito.component';
import { DesplegableMotivoErrorBalanzaComponent } from './desplegable-motivo-error-balanza/desplegable-motivo-error-balanza.component';
import { DesplegableTipoPuestoTrabajoComponent } from './desplegable-tipo-puesto-trabajo/desplegable-tipo-puesto-trabajo.component';
import { DesplegableAccionComponent } from './desplegable-accion/desplegable-accion.component';
import { DesplegableDispositivoComponent } from './desplegable-dispositivo/desplegable-dispositivo.component';
import { DesplegableHumedimetroComponent } from './desplegable-humedimetro/desplegable-humedimetro.component';
import { DesplegableProductoComponent } from './desplegable-producto/desplegable-producto.component';
import { DesplegableRubroCalidadComponent } from './desplegable-rubro-calidad/desplegable-rubro-calidad.component';
import { BuscadorSociedadComponent } from './buscador-sociedad/buscador-sociedad.component';
import { DesplegableTipoTarjetaComponent } from './desplegable-tipo-tarjeta/desplegable-tipo-tarjeta.component';
import { DesplegableCamaraComponent } from './desplegable-camara/desplegable-camara.component';
import { DesplegableSentidoBalanzaComponent } from './desplegable-sentido-balanza/desplegable-sentido-balanza.component';
import { TreeModule } from 'angular-tree-component';
import { DesplegableTipoRubroAnalisisComponent } from './desplegable-tipo-rubro-analisis/desplegable-tipo-rubro-analisis.component';
import { DesplegableEstadoOrdenCargaComponent } from './desplegable-estado-orden-carga/desplegable-estado-orden-carga.component';
import { DesplegableEstadoViajeComponent } from './desplegable-estado-viaje/desplegable-estado-viaje.component';
import { AutocompleteLocalidadComponent } from './autocomplete-localidad/autocomplete-localidad.component';
import { DesplegableImpresoraComponent } from './desplegable-impresora/desplegable-impresora.component';
import { DesplegableImpresorasPorUsuarioComponent } from './desplegable-impresoras-por-usuario/desplegable-impresoras-por-usuario.component';
import { DesplegableDecisionCalidadComponent } from './desplegable-decision-calidad/desplegable-decision-calidad.component';
import { DesplegableEstadoCupoComponent } from './desplegable-estado-cupo/desplegable-estado-cupo.component';
import { DesplegableMotivoCupoComponent } from './desplegable-motivo-cupo/desplegable-motivo-cupo.component';
import { BuscadorSedeService } from './buscador-sede/buscador-sede.service';
import { DesplegableTipoSobreTransporteComponent } from './desplegable-tipo-sobre-transporte/desplegable-tipo-sobre-transporte.component';
import { DesplegableEstadoSobreTransporteComponent } from './desplegable-estado-sobre-transporte/desplegable-estado-sobre-transporte.component';
import { DesplegableTiempoLimiteEstadoComponent } from './desplegable-tiempo-limite-estado/desplegable-tiempo-limite-estado.component';
import { AutocompleteFerrocarrilComponent } from './autocomplete-ferrocarril/autocomplete-ferrocarril.component';
import { FerrocarrilService } from './buscador-ferrocarril/ferrocarril.service';
import { AutocompleteRemitenteComercialComponent } from './autocomplete-remitente-comercial/autocomplete-remitente-comercial.component';
import { AutocompleteProductoComponent } from './autocomplete-producto/autocomplete-producto.component';
import { AutocompleteRemitenteComercialService } from './autocomplete-remitente-comercial/autocomplete-remitente-comercial.service';
import { AutocompleteIntermediarioFleteComponent } from './autocomplete-intermediario-flete/autocomplete-intermediario-flete.component';
import { AutocompleteIntermediarioFleteService } from './autocomplete-intermediario-flete/autocomplete-intermediario-flete.service';
import { AutocompleteIntermediarioComponent } from './autocomplete-intermediario/autocomplete-intermediario.component';
import { AutocompleteIntermediarioService } from './autocomplete-intermediario/autocomplete-intermediario.service';
import { AutocompleteEntregadorComponent } from './autocomplete-entregador/autocomplete-entregador.component';
import { AutocompleteEntregadorService } from './autocomplete-entregador/autocomplete-entregador.service';
import { AutocompleteChoferComponent } from './autocomplete-chofer/autocomplete-chofer.component';
import { AutocompleteChoferService } from './autocomplete-chofer/autocomplete-chofer.service';
import { AutocompleteDestinatarioComponent } from './autocomplete-destinatario/autocomplete-destinatario.component';
import { AutocompleteDestinatarioService } from './autocomplete-destinatario/autocomplete-destinatario.service';
import { AutocompleteCorredorComponent } from './autocomplete-corredor/autocomplete-corredor.component';
import { AutocompleteCorredorService } from './autocomplete-corredor/autocomplete-corredor.service';
import { AutocompleteFerrocarrilService } from './autocomplete-ferrocarril/autocomplete-ferrocarril.service';
import { AutocompleteMercadoTerminoComponent } from './autocomplete-mercado-termino/autocomplete-mercado-termino.component';
import { DesplegablePuntoCargaComponent } from './desplegable-punto-carga/desplegable-punto-carga.component';
import { DesplegableMedioDePagoComponent } from './desplegable-medio-de-pago/desplegable-medio-de-pago.component';
import { DesplegableMonedaComponent } from './desplegable-moneda/desplegable-moneda.component';
import { AutocompleteVendedorComponent } from './autocomplete-vendedor/autocomplete-vendedor.component';
import { AutocompleteVendedorService } from './autocomplete-vendedor/autocomplete-vendedor.service';
import { AutocompletePlantaComponent } from './autocomplete-planta/autocomplete-planta.component';
import { AutocompletePlantaService } from './autocomplete-planta/autocomplete-planta.service';
import { DesplegableEventoComponent } from './desplegable-evento/desplegable-evento.component';

@NgModule({
  declarations: [
    BuscadorChoferComponent,
    BuscadorProductoComponent,
    BuscadorSedeComponent,
    DesplegableCampoEpaSustentableComponent,
    DespegableTipoProductoComponent,
    DesplegableFinalidadComponent,
    BuscadorChoferAvanzadoComponent,
    PatentesComponent,
    DesplegableTipoGranoComponent,
    EstablecimientoComponent,
    DesplegableCampoEpaSustentableComponent,
    DesplegableCosechaComponent,
    BuscadorLocalidadComponent,
    DesplegableTipoPesadaComponent,
    BuscadorCorredorComponent,
    BuscadorDestinatarioComponent,
    BuscadorEntregadorComponent,
    BuscadorIntermediarioComponent,
    BuscadorIntermediarioFleteComponent,
    BuscadorRemitenteComercialComponent,
    BuscadorTitularComponent,
    BuscadorVendedorComponent,
    BuscadorTransportistaComponent,
    DesplegableMotivoEstadoMovimientoComponent,
    DesplegableReferenciaDestinoComponent,
    DespegableTipoCartaPorteComponent,
    BuscadorMercadoTerminoComponent,
    DespegableTipoCartaPorteComponent,
    AutocompletePatenteComponent,
    AutocompleteVagonComponent,
    DesplegableEstadoMovimientoComponent,
    DesplegablePlataformaDescargaComponent,
    DesplegableTipoTransporteComponent,
    DesplegableSiloComponent,
    DesplegableGradoComponent,
    DesplegableGrupoRubroAnalisisComponent,
    DesplegableEstadoMuestraComponent,
    DesplegableTrabajoGeneracionArchivoMuestrasComponent,
    DesplegableTipoMovimientoComponent,
    DesplegableProductoPorGrupoComponent,
    DesplegableValorBooleanoComponent,
    DesplegableEstadoInterfazSanComponent,
    DesplegableServicioSanComponent,
    BuscadorFerrocarrilComponent,
    DesplegableTerminalLoginComponent,
    DesplegableTerminalComponent,
    DesplegableTipoNotificacionComponent,
    MultiselectVariableTemplateComponent,
    DesplegableRolComponent,
    DesplegableUsuarioComponent,
    DesplegableSiNoComponent,
    DesplegableActividadComponent,
    DesplegableCaracteristicaComponent,
    DesplegableCircuitoComponent,
    DesplegablePermisoComponent,
    DesplegablePuestoTrabajoComponent,
    DesplegablePuestoTrabajoComponent,
    BuscadorUsuarioComponent,
    DesplegableTipoDispositivoComponent,
    DesplegablePuestoTrabajoComponent,
    BuscadorUsuarioComponent,
    DesplegableTipoDispositivoComponent,
    DesplegableMotivoErrorBalanzaCircuitoComponent,
    DesplegableMotivoErrorBalanzaComponent,
    DesplegableTipoPuestoTrabajoComponent,
    DesplegableAccionComponent,
    DesplegableDispositivoComponent,
    DesplegableHumedimetroComponent,
    DesplegableProductoComponent,
    DesplegableRubroCalidadComponent,
    BuscadorSociedadComponent,
    DesplegableRubroCalidadComponent,
    DesplegableProductoComponent,
    DesplegableHumedimetroComponent,
    DesplegableDispositivoComponent,
    DesplegableTipoTarjetaComponent,
    DesplegableCamaraComponent,
    DesplegableSentidoBalanzaComponent,
    DesplegableCamaraComponent,
    DesplegableTipoRubroAnalisisComponent,
    DesplegableImpresoraComponent,
    AutocompleteLocalidadComponent,
    DesplegableEstadoOrdenCargaComponent,
    DesplegableEstadoViajeComponent,
    DesplegableImpresorasPorUsuarioComponent,
    DesplegableDecisionCalidadComponent,
    DesplegableEstadoCupoComponent,
    DesplegableMotivoCupoComponent,
    DesplegableTipoSobreTransporteComponent,
    DesplegableEstadoSobreTransporteComponent,
    DesplegableTiempoLimiteEstadoComponent,
    AutocompleteFerrocarrilComponent,
    AutocompleteRemitenteComercialComponent,
    AutocompleteProductoComponent,
    AutocompleteIntermediarioFleteComponent,
    AutocompleteIntermediarioComponent,
    AutocompleteEntregadorComponent,
    AutocompleteChoferComponent,
    AutocompleteDestinatarioComponent,
    AutocompleteCorredorComponent,
    AutocompleteMercadoTerminoComponent,
    DesplegablePuntoCargaComponent,
    DesplegableMedioDePagoComponent,
    DesplegableMonedaComponent,
    AutocompleteVendedorComponent,
    DesplegableEventoComponent,
    AutocompletePlantaComponent
  ],
  exports: [
    BuscadorChoferComponent,
    BuscadorProductoComponent,
    BuscadorSedeComponent,
    DesplegableCampoEpaSustentableComponent,
    DesplegableTipoGranoComponent,
    DespegableTipoProductoComponent,
    DesplegableFinalidadComponent,
    PatentesComponent,
    EstablecimientoComponent,
    DesplegableCampoEpaSustentableComponent,
    DesplegableCosechaComponent,
    BuscadorLocalidadComponent,
    DespegableTipoCartaPorteComponent,
    DesplegableTipoPesadaComponent,
    BuscadorCorredorComponent,
    BuscadorDestinatarioComponent,
    BuscadorEntregadorComponent,
    BuscadorIntermediarioComponent,
    BuscadorIntermediarioFleteComponent,
    BuscadorRemitenteComercialComponent,
    BuscadorTitularComponent,
    BuscadorVendedorComponent,
    BuscadorTransportistaComponent,
    DesplegableMotivoEstadoMovimientoComponent,
    DesplegableReferenciaDestinoComponent,
    BuscadorMercadoTerminoComponent,
    AutocompletePatenteComponent,
    AutocompleteVagonComponent,
    DesplegableEstadoMovimientoComponent,
    DesplegablePlataformaDescargaComponent,
    DesplegableTipoTransporteComponent,
    DesplegableSiloComponent,
    DesplegableGradoComponent,
    DesplegableGrupoRubroAnalisisComponent,
    DesplegableEstadoMuestraComponent,
    DesplegableTrabajoGeneracionArchivoMuestrasComponent,
    DesplegableTipoMovimientoComponent,
    DesplegableProductoPorGrupoComponent,
    DesplegableValorBooleanoComponent,
    BuscadorFerrocarrilComponent,
    DesplegableEstadoInterfazSanComponent,
    DesplegableServicioSanComponent,
    DesplegableTerminalLoginComponent,
    DesplegableTerminalComponent,
    DesplegableEventoComponent,
    DesplegableTipoNotificacionComponent,
    MultiselectVariableTemplateComponent,
    DesplegableRolComponent,
    DesplegableUsuarioComponent,
    DesplegableSiNoComponent,
    DesplegableActividadComponent,
    DesplegableCaracteristicaComponent,
    DesplegableCircuitoComponent,
    DesplegablePermisoComponent,
    DesplegablePuestoTrabajoComponent,
    DesplegableTipoDispositivoComponent,
    BuscadorUsuarioComponent,
    DesplegableTipoDispositivoComponent,
    DesplegableMotivoErrorBalanzaCircuitoComponent,
    DesplegableMotivoErrorBalanzaComponent,
    DesplegableTipoPuestoTrabajoComponent,
    DesplegableAccionComponent,
    DesplegableDispositivoComponent,
    DesplegableHumedimetroComponent,
    DesplegableProductoComponent,
    DesplegableRubroCalidadComponent,
    BuscadorSociedadComponent,
    DesplegableRubroCalidadComponent,
    DesplegableTipoTarjetaComponent,
    DesplegableCamaraComponent,
    DesplegableSentidoBalanzaComponent,
    DesplegableCamaraComponent,
    DesplegableTipoRubroAnalisisComponent,
    DesplegableImpresoraComponent,
    AutocompleteLocalidadComponent,
    DesplegableEstadoOrdenCargaComponent,
    DesplegableEstadoViajeComponent,
    DesplegableImpresorasPorUsuarioComponent,
    DesplegableDecisionCalidadComponent,
    DesplegableEstadoCupoComponent,
    DesplegableMotivoCupoComponent,
    DesplegableEstadoSobreTransporteComponent,
    DesplegableTipoSobreTransporteComponent,
    DesplegableTiempoLimiteEstadoComponent,
    AutocompleteFerrocarrilComponent,
    AutocompleteRemitenteComercialComponent,
    AutocompleteProductoComponent,
    AutocompleteIntermediarioFleteComponent,
    AutocompleteIntermediarioComponent,
    AutocompleteEntregadorComponent,
    AutocompleteChoferComponent,
    AutocompleteDestinatarioComponent,
    AutocompleteCorredorComponent,
    AutocompleteVendedorComponent,
    DesplegablePuntoCargaComponent,
    DesplegableMedioDePagoComponent,
    DesplegableMonedaComponent,
    AutocompletePlantaComponent
  ],
  imports: [
    CommonModule,
    HotkeyModule,
    NgbModule,
    ReactiveFormsModule,
    ModalModule,
    CoreSharedModule,
    TextMaskModule,
    FontAwesomeModule,
    TreeModule.forRoot()
  ],
  providers: [
    CampoEpaSustentableService,
    ChoferService,
    TipoGranoService,
    TipoProductoService,
    FinalidadService,
    ProductoService,
    BuscadorSedeService,
    CosechaService,
    LocalidadService,
    TipoPesadaService,
    CorredorService,
    DestinatarioService,
    EntregadorService,
    IntermediarioService,
    IntermediarioFleteService,
    RemitenteComercialService,
    TitularService,
    VendedorService,
    TransportistaService,
    MotivoEstadoMovimientoService,
    ReferenciaDestinoService,
    TipoCartaPorteService,
    MercadoTerminoService,
    TipoCartaPorteService,
    EstadoMovimientoService,
    PlataformaDescargaService,
    TipoTransporteService,
    SiloService,
    GradoService,
    GrupoRubroAnalisisService,
    EstadoMuestraService,
    EstadoTrabajoGeneracionArchivoMuestrasService,
    TipoMovimientoService,
    FerrocarrilService,
    AutocompleteRemitenteComercialService,
    AutocompleteIntermediarioFleteService,
    AutocompleteIntermediarioService,
    AutocompleteEntregadorService,
    AutocompleteChoferService,
    AutocompleteDestinatarioService,
    AutocompleteCorredorService,
    AutocompleteFerrocarrilService,
    AutocompleteVendedorService,
    AutocompletePlantaService
  ]
})
export class SharedModule { }
