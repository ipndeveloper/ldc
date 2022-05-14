import { TestBed, inject } from '@angular/core/testing';
import { AdministrarTiposPuestosTrabajoService } from './administrar-tipos-puestos-trabajo.service';
import { TestModule } from '../../core/mocks/test.module';
import { Dictionary } from '../../core/models/dictionary';

describe('AdministrarTiposPuestoTrabajoService', () => {
  // let service: AdministrarTiposPuestosTrabajoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdministrarTiposPuestosTrabajoService],
      imports: [TestModule],
    });
  });


  it('should be created', inject([AdministrarTiposPuestosTrabajoService], (serviceTest: AdministrarTiposPuestosTrabajoService) => {
    expect(serviceTest).toBeTruthy();
  }));

  describe('Test metodo validateSearchClick ', () => {

    it('Debe vevolver true ', inject([AdministrarTiposPuestosTrabajoService],
      (service: AdministrarTiposPuestosTrabajoService) => {

        // act
        const value = service.validateSearchClick(new Dictionary<string>());

        // assert
        expect(value).toBeTruthy();

      }));

    it('Debe vevolver false ', inject([AdministrarTiposPuestosTrabajoService],
      (service: AdministrarTiposPuestosTrabajoService) => {

        // act
        const value = service.validateSearchClick();

        // assert
        expect(value).toBeFalsy();

      }));

  });


  describe('Test metodo getdata ', () => {

    it('valida que la query sea correcta ',
      inject([AdministrarTiposPuestosTrabajoService], (service: AdministrarTiposPuestosTrabajoService) => {
        // arrange
        let querySpy;
        spyOn<any>(service['apiService'], 'get').and.callFake((query) => { querySpy = query; });

        // act
        service.getData(new Dictionary);

        // assert
        expect(querySpy).toEqual('tipos-puestos-trabajo/filtros?');

      }));

    it('valida que la query sea correcta ',
      inject([AdministrarTiposPuestosTrabajoService], (service: AdministrarTiposPuestosTrabajoService) => {
        // arrange

        spyOn<any>(service['apiService'], 'get');
        const spy = spyOn<any>(service, 'getQuerystringParameter');
        // act
        service.getData(new Dictionary);

        // assert
        expect(spy).toHaveBeenCalledTimes(1);

      }));

  });

});
