import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DesplegablePuntoCargaComponent } from './desplegable-punto-carga.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { DesplegablePuntoCargaService } from './desplegable-punto-carga.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RestHandlerService } from '../../core/services/restClient/restHandler.service';
import { RequestOptionsService } from '../../core/services/restClient/requestOptions.service';
import { PopupModule } from '../../core/services/popupService/popup.module';
import { AuthService } from '../../core/services/session/auth.service';

describe('DesplegablePuntoCargaComponent', () => {
  let component: DesplegablePuntoCargaComponent;
  let fixture: ComponentFixture<DesplegablePuntoCargaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DesplegablePuntoCargaComponent],
      imports: [
        HttpClientTestingModule,
        PopupModule
      ],
      providers: [
        DesplegablePuntoCargaService,
        ApiService,
        RestHandlerService,
        RequestOptionsService,
        AuthService
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegablePuntoCargaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
