import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionarInterfacesAfipComponent } from './gestionar-interfaces-afip/gestionar-interfaces-afip.component';
import { GestionarInterfacesAfipService } from './gestionar-interfaces-afip/services/gestionar-interfaces-afip.service';
import { FiltroBusquedaInterfacesAfipComponent } from './gestionar-interfaces-afip/filtro/filtro-busqueda-interfaces-afip/filtro-busqueda-interfaces-afip.component';
import { HotkeyModule } from 'angular2-hotkeys';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CoreSharedModule } from '../core/core-shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DesplegableServicioAfipComponent } from './gestionar-interfaces-afip/filtro/desplegable-servicio-afip/desplegable-servicio-afip.component';
import { ServicioAfipService } from './gestionar-interfaces-afip/filtro/servicio-afip.service';
import { ModalConfirmacionManualComponent } from './gestionar-interfaces-afip/modal-confirmacion-manual/modal-confirmacion-manual.component';
import { ConsultarDatosAfipComponent } from './consultar-datos-afip/consultar-datos-afip.component';
import { ConsultarDatosAfipService } from './consultar-datos-afip/consultar-datos-afip-service';
import '../core/extensions/string-extensions';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  declarations: [
    GestionarInterfacesAfipComponent,
    FiltroBusquedaInterfacesAfipComponent,
    DesplegableServicioAfipComponent,
    ModalConfirmacionManualComponent,
    ConsultarDatosAfipComponent
  ],
  imports: [
    CommonModule,
    HotkeyModule,
    ReactiveFormsModule,
    SharedModule,
    CoreSharedModule,
    NgbModule,
    NgxPermissionsModule
  ],
  exports: [
    GestionarInterfacesAfipComponent,
    FiltroBusquedaInterfacesAfipComponent,
    DesplegableServicioAfipComponent,
    ModalConfirmacionManualComponent,
    ConsultarDatosAfipComponent
  ],
  providers: [
    ConsultarDatosAfipService,
    GestionarInterfacesAfipService,
    ServicioAfipService
  ]
})
export class GestionAfipModule { }
