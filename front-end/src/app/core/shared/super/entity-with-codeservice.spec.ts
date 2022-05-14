import { TestBed, inject } from '@angular/core/testing';
import { EntityWithCodeService } from './entity-with-codeservice';
import { EntityWithCode } from '../../models/entity-with-code';
import { ApiService } from '../../services/restClient/api.service';
import { TestModule } from '../../mocks/test.module';

export class MockEntityWithCodeService extends EntityWithCodeService<EntityWithCode> {
    constructor(apiService: ApiService) {
        super(apiService);

        this.apiRoute = 'UnitTest';
    }
}

describe('EntityWithCodeService', () => {

    let target: MockEntityWithCodeService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        });
    });

    beforeEach(inject([ApiService], (api) => {
        target = new MockEntityWithCodeService(api);
    }));

    it('should be created', () => {
        expect(target).toBeTruthy();
    });

    describe('El método get (Código)', () => {

        it('Delega la búsqueda de la entidad con código al ApiService', inject([ApiService],
            (apiService: ApiService) => {

                spyOn(apiService, 'get');

                target.get('90');

                expect(apiService.get).toHaveBeenCalledTimes(1);
            }));

        it('Delega la búsqueda de la entidad con código al ApiService, utilizando el Api Route más el código', inject([ApiService],
            (apiService: ApiService) => {

                spyOn(apiService, 'get');

                target.get('90');

                expect(apiService.get).toHaveBeenCalledWith('UnitTest/90');
            }));
    });

    describe('El método getAll', () => {

        it('Delega la búsqueda de la entidad', inject([ApiService],
            (apiService: ApiService) => {

                spyOn(apiService, 'get');

                target.getAll();

                expect(apiService.get).toHaveBeenCalledTimes(1);
            }));

        it('Delega la búsqueda de la entidad con código al ApiService, utilizando el Api Route', inject([ApiService],
            (apiService: ApiService) => {

                spyOn(apiService, 'get');

                target.getAll();

                expect(apiService.get).toHaveBeenCalledWith('UnitTest');
            }));
    });
});
