import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoPorteComponent } from './documento-porte.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { HotkeyModule } from 'angular2-hotkeys';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DesplegableTipoDocumentoPorteComponent } from '../desplegable-tipo-documento-porte/desplegable-tipo-documento-porte.component';
import { TipoDocumentoPorteService } from '../desplegable-tipo-documento-porte/tipo-documento-porte.service';
import { HttpClientModule } from '@angular/common/http';
import { TestModule } from '../../../core/mocks/test.module';
import { TextoConEtiquetaComponent } from '../../../core/controls/texto-con-etiqueta/texto-con-etiqueta.component';
import { FocusDirective } from '../../../core/directives/focus/focus.directive';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { Resources } from '../../../../locale/artifacts/resources';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TextoMascaraConEtiquetaComponent } from '../../../core/controls/texto-mascara-con-etiqueta/texto-mascara-con-etiqueta.component';

describe('DocumentoPorteComponent', () => {
  let component: DocumentoPorteComponent;
  let fixture: ComponentFixture<DocumentoPorteComponent>;
  let tipoDocumentoPorteService: TipoDocumentoPorteService;
  let popupService: PopupService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        DocumentoPorteComponent,
        DesplegableTipoDocumentoPorteComponent,
        TextoConEtiquetaComponent,
        TextoMascaraConEtiquetaComponent,
        FocusDirective
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        HotkeyModule.forRoot(),
        TestModule,
        NgbModule
      ],
      providers : [
        TipoDocumentoPorteService],
        schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoPorteComponent);
    component = fixture.componentInstance;
    tipoDocumentoPorteService = TestBed.get(TipoDocumentoPorteService);
    popupService = TestBed.get(PopupService);
    component.documentoPorteForm = new FormGroup({});
  });

  it('should create', () => {
     expect(component).toBeTruthy();
  });

  it('El servicio TipoDocumentoPorteService tiene una instancia valida', () => {
    expect(tipoDocumentoPorteService).toBeTruthy();
  });

  it('El metodo GetAll devuelve información ', () => {
    expect(tipoDocumentoPorteService.getAll()).toBeTruthy();
  });

  it('should display an empty initial value', () => {
    const debugEl = fixture.debugElement;
    const input = debugEl.nativeElement.querySelector('text');
    expect(input).toBeDefined();
  });

  describe('El metodo recuperarDocPorte', () => {
    it('Llama al popupService cuando no se ingresa un nroDocumentoPorte', () => {
      // Arrange
      spyOn(component.documentoPorteForm, 'get').and.returnValue(of());
      spyOn(popupService, 'error');
      // Act
      component.recuperarDocPorte();
      // Assert
      expect(popupService.error).toHaveBeenCalledTimes(1);
      expect(popupService.error).toHaveBeenCalledWith(Resources.Messages.DebeIngresarNroDocPorteARecuperar);
    });

    it('Llama al metodo emit cuando se ingresa un nroDocumentoPorte', () => {
      // Arrange
      spyOn(component.recuperarDocPorteClicked, 'emit');
      spyOn(component.documentoPorteForm, 'get').and.returnValue(of('12345678'));
      // Act
      component.recuperarDocPorte();
      // Assert
      expect(component.recuperarDocPorteClicked.emit).toHaveBeenCalledTimes(1);
    });
  });

  describe('El metodo setFocus', () => {
    it('Llama al metodo inputNumeroDocumentoPorte.setFocus', () => {
      // Arrange
      component.inputNumeroDocumentoPorte = jasmine.createSpyObj('TextoConEtiquetaComponent', ['setFocus']);
      // Act
      component.setFocus();
      // Assert
      expect(component.inputNumeroDocumentoPorte.setFocus).toHaveBeenCalledTimes(1);
    });
  });
});
