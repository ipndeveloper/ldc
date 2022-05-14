import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from '../core/components/modal/modal.module';
import { CounterInputComponent } from './controls/counter-input/counter-input.component';
import { RestHandlerService } from './services/restClient/restHandler.service';
import { RequestOptionsService } from './services/restClient/requestOptions.service';
import { LoginService } from './services/session/login.service';
import { AuthService } from './services/session/auth.service';
import { ApiService } from './services/restClient/api.service';
import { TextoConEtiquetaComponent } from './controls/texto-con-etiqueta/texto-con-etiqueta.component';
import { NumeroConEtiquetaComponent } from './controls/numero-con-etiqueta/numero-con-etiqueta.component';
import { FechaConEtiquetaComponent } from './controls/fecha-con-etiqueta/fecha-con-etiqueta.component';
import { ModalComponent } from './components/modal/modal.component';
import { PopupService } from './services/popupService/popup.service';
import { DataGridComponent } from './controls/data-grid/data-grid.component';
import { MaxLengthDirective } from './directives/max-length/max-length.directive';
import { TextAreaConEtiquetaComponent } from './controls/text-area-con-etiqueta/text-area-con-etiqueta.component';
import { ExcelService } from './services/excelService/excel.service';
import { FocusDirective } from './directives/focus/focus.directive';
import { DropdownNotificationService } from './shared/super/dropdown-notification.service';
import { NavigationService } from './services/navigationService/navigation.service';
import { ModalDetalleComponent } from './controls/modal-detalle/modal-detalle.component';
import { SearchFormTemplateComponent } from './components/search-form-template/search-form-template.component';
import { FileService } from './services/file/file.service';
import { TextMaskModule } from 'angular2-text-mask';
import './extensions/string-extensions';
import { DecimalSeparatorPipe } from './pipes/decimal-separator.pipe';
import { PasswordConEtiquetaComponent } from './controls/password-con-etiqueta/password-con-etiqueta.component';
import { SecurityService } from './services/session/security.service';
import { PositiveDecimalSeparatorPipe } from './pipes/positive-decimal-separator.pipe';
import { LoginGuard } from './guards/loginGuard';
import { TextoComponent } from './controls/texto/texto.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { TextoMascaraConEtiquetaComponent } from './controls/texto-mascara-con-etiqueta/texto-mascara-con-etiqueta.component';
import { AdvancedSearchFormComponent } from './components/advanced-search-form/advanced-search-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CheckboxConEtiquetaComponent } from './controls/checkbox-con-etiqueta/checkbox-con-etiqueta.component';
import { TreeModule } from 'angular-tree-component';
import { BlockUIComponent } from './components/block-ui/block-ui.component';
import { ButtonDirective } from './directives/button/button.directive';
import { ArchivoConEtiquetaComponent } from './controls/archivo-con-etiqueta/archivo-con-etiqueta.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { BooleanToStringPipe } from './pipes/boolean-to-string.pipe';
import { EtiquetaConValorComponent } from './controls/etiqueta-con-valor/etiqueta-con-valor.component';
import { ModalActionComponent } from './components/modal-action/modal-action.component';

@NgModule({
  declarations: [
    CounterInputComponent,
    TextoConEtiquetaComponent,
    NumeroConEtiquetaComponent,
    FechaConEtiquetaComponent,
    DataGridComponent,
    TextAreaConEtiquetaComponent,
    MaxLengthDirective,
    FocusDirective,
    ModalDetalleComponent,
    SearchFormTemplateComponent,
    DecimalSeparatorPipe,
    PositiveDecimalSeparatorPipe,
    PasswordConEtiquetaComponent,
    TextoComponent,
    TextoMascaraConEtiquetaComponent,
    AdvancedSearchFormComponent,
    CheckboxConEtiquetaComponent,
    BlockUIComponent,
    ButtonDirective,
    ArchivoConEtiquetaComponent,
    AutocompleteComponent,
    BooleanToStringPipe,
    EtiquetaConValorComponent,
    ModalActionComponent
  ],
  exports: [
    TextoConEtiquetaComponent,
    FechaConEtiquetaComponent,
    NumeroConEtiquetaComponent,
    TextAreaConEtiquetaComponent,
    TextoMascaraConEtiquetaComponent,
    ModalComponent,
    DataGridComponent,
    MaxLengthDirective,
    FocusDirective,
    ModalDetalleComponent,
    SearchFormTemplateComponent,
    DecimalSeparatorPipe,
    PositiveDecimalSeparatorPipe,
    PasswordConEtiquetaComponent,
    TextoComponent,
    AdvancedSearchFormComponent,
    CheckboxConEtiquetaComponent,
    BlockUIComponent,
    ButtonDirective,
    ArchivoConEtiquetaComponent,
    AutocompleteComponent,
    BooleanToStringPipe,
    EtiquetaConValorComponent,
    ModalActionComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    ModalModule,
    HttpClientModule,
    NgxDatatableModule,
    TextMaskModule,
    NgxPermissionsModule,
    FontAwesomeModule,
    TreeModule.forRoot(),
  ],
  providers: [
    ApiService,
    PopupService,
    LoginService,
    SecurityService,
    RestHandlerService,
    RequestOptionsService,
    AuthService,
    ExcelService,
    FileService,
    DropdownNotificationService,
    NavigationService,
    DecimalSeparatorPipe,
    PositiveDecimalSeparatorPipe,
    BooleanToStringPipe,
    LoginGuard
  ]
})
export class CoreSharedModule { }
