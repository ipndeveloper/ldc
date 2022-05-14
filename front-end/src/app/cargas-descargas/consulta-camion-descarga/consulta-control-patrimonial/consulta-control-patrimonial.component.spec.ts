import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultaControlPatrimonialComponent } from './consulta-control-patrimonial.component';
import { ChecklistControlPatrimonialService } from '../../checklist-control-patrimonial/checklist-control-patrimonial.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestModule } from '../../../core/mocks/test.module';
import { Movimiento } from '../../../shared/data-models/movimiento';
import { RegistrarControlPatrimonialService } from '../../registrar-control-patrimonial/registrar-control-patrimonial.service';
import { FileService, FileType } from '../../../core/services/file/file.service';
import { DecisionControlPatrimonial, ArchivoDecisionControlPatrimonial } from '../../../shared/data-models/decision-control-patrimonial';
import { of } from 'rxjs';
import { PopupService } from '../../../core/services/popupService/popup.service';

describe('ConsultaControlPatrimonialComponent', () => {
  let component: ConsultaControlPatrimonialComponent;
  let fixture: ComponentFixture<ConsultaControlPatrimonialComponent>;
  let fileService: FileService;
  let popupService: PopupService;
  let decisionService: RegistrarControlPatrimonialService;
  let checklistService: ChecklistControlPatrimonialService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaControlPatrimonialComponent ],
      imports: [ TestModule ],
      providers: [
        RegistrarControlPatrimonialService,
        ChecklistControlPatrimonialService,
        FileService
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaControlPatrimonialComponent);
    component = fixture.componentInstance;
    decisionService = TestBed.get(RegistrarControlPatrimonialService);
    checklistService = TestBed.get(ChecklistControlPatrimonialService);
    fileService = TestBed.get(FileService);
    popupService = TestBed.get(PopupService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El metodo ngOnChanges', () => {
    let idMovimiento: number;

    beforeEach(() => {
      component.movimiento = { id: 1 } as Movimiento;
      idMovimiento = component.movimiento.id;
      spyOn(decisionService, 'getDecisiones').and.returnValue(of({}));
      spyOn(checklistService, 'getMovimiento').and.returnValue(of({}));
    });

    it('Invoca al metodo getMovimiento del servicio movimientoChecklist cuando el movimiento no es null', () => {
      // Arrange

      // Act
      component.ngOnChanges();

      // Assert
      expect(checklistService.getMovimiento).toHaveBeenCalledTimes(1);
      expect(checklistService.getMovimiento).toHaveBeenCalledWith(null, idMovimiento);
    });

    it('Invoca al método getDecisiones del servicio decisiones cuando el movimiento no es null', () => {
      // Arrange

      // Act
      component.ngOnChanges();

      // Assert
      expect(decisionService.getDecisiones).toHaveBeenCalledTimes(1);
      expect(decisionService.getDecisiones).toHaveBeenCalledWith(idMovimiento);
    });
  });

  describe('El método onClickDescargar', () => {
    beforeEach(() => {
      component.selectedRows = [{
        id: 1,
        decision: 'Aceptado',
        observaciones: '',
        fechaHora: '19/06/2019 08:37',
        usuario: 'Juan Andrés Gómez',
        archivos: [{
          id: 1,
          nombreArchivo: 'ArchivoDePrueba1',
          extensionArchivo: 'txt'
        } as ArchivoDecisionControlPatrimonial],
        cantidadArchivos: 1
      } as DecisionControlPatrimonial];
    });

    it('Invoca al método get del fileService', () => {
      // Arrange
      const idArchivo = component.selectedRows[0].archivos[0].id;
      spyOn(fileService, 'get').and.returnValue(of({}));
      spyOn(fileService, 'download');
      spyOn(popupService, 'success');

      // Act
      component.onClickDescargar();

      // Assert
      expect(fileService.get).toHaveBeenCalledTimes(1);
      expect(fileService.get).toHaveBeenCalledWith(idArchivo);
    });

    it('Invoca al método download del fileService', () => {
      // Arrange
      const nombreArchivo = component.selectedRows[0].archivos[0].nombreArchivo;
      const contenidoArchivo = [];
      const extensionArchivo = `.${component.selectedRows[0].archivos[0].extensionArchivo}`;
      let fileType = `Content-Type: application/octet-stream; Content-Disposition: inline;` as FileType;
      fileType = `${fileType} filename="${nombreArchivo}${extensionArchivo}"` as FileType;
      spyOn(fileService, 'get').and.returnValue(of(contenidoArchivo));
      spyOn(fileService, 'download');
      spyOn(popupService, 'success');

      // Act
      component.onClickDescargar();

      // Assert
      expect(fileService.download).toHaveBeenCalledTimes(1);
      expect(fileService.download).toHaveBeenCalledWith(contenidoArchivo, nombreArchivo, fileType, extensionArchivo);
    });
  });
});
