import {  ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RegistrarPesoVagonesComponent } from './registrar-peso-vagones.component';
import { DispositivoService } from '../shared/services/dispositivo.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrarPesoVagonComponent } from '../registrar-peso-vagon/registrar-peso-vagon.component';
import { Mock } from '../../core/mocks/mock';
import { TestModule } from '../../core/mocks/test.module';
import { TiposDispositivo } from '../../shared/enums/enums';
import { of } from 'rxjs';
import { DispositivoDataView } from '../../shared/data-models/dispositivo-data-view';
import { configureTestSuite } from '../../core/mocks/testing';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegistrarPesoVagonesComponent', () => {
  let component: RegistrarPesoVagonesComponent;
  let fixture: ComponentFixture<RegistrarPesoVagonesComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegistrarPesoVagonesComponent,
        Mock.Of('yrd-registrar-peso-vagon', RegistrarPesoVagonComponent)
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        TestModule,
        RouterTestingModule
      ],
      providers: [
        DispositivoService,
        NavigationService
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarPesoVagonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El Método determinarBalanzasHabilitadas', function () {
    beforeEach(() => {
      component.balanzasComponents = {
        first: {
          setFocus: jasmine.createSpy('setFocus')
        }
      } as any;
    });

    it('Llama a dispositivoService.consultarTiposDispositivos con los tipos de dispositivos de balanzas vagón',
    inject([DispositivoService],
      (dispositivoService: DispositivoService) => {
        spyOn(dispositivoService, 'consultarTiposDispositivos').and.returnValue(of([new DispositivoDataView()]));

        component['determinarBalanzasHabilitadas']();

        expect(dispositivoService.consultarTiposDispositivos).toHaveBeenCalledWith([TiposDispositivo.BalanzaVagon1,
                                                                                    TiposDispositivo.BalanzaVagon2]);
      }));
  });
});

