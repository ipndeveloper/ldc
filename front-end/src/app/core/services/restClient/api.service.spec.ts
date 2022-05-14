import { TestBed, inject } from '@angular/core/testing';
import { ApiService } from '../../services/restClient/api.service';
import { TestModule } from '../../mocks/test.module';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { RequestOptionsService } from './requestOptions.service';

describe('ApiService', () => {

    let target: ApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        });
    });

    beforeEach(inject([ApiService], (api) => {
        target = api;
    }));

    it('should be created', () => {
        expect(target).toBeTruthy();
    });

    describe('El método get', () => {

        it('Delega la búsqueda de la entidad al HttpClient', inject([HttpClient],
            (httpClient: HttpClient) => {

                spyOn(httpClient, 'get').and.callFake(() => of([]));

                target.get('90');

                expect(httpClient.get).toHaveBeenCalledTimes(1);
            }));

        it('Delega la búsqueda de la entidad HttpClient, utilizando el Api_Url más el prefix', inject([HttpClient, RequestOptionsService],
            (httpClient: HttpClient, requestOptionsService: RequestOptionsService) => {

                spyOn(httpClient, 'get').and.callFake(() => of([]));
                target.apiURL = 'URL';

                target.get('Prefix');

                expect(httpClient.get).toHaveBeenCalledWith('URL' + '/' + 'Prefix', requestOptionsService.apply());
            }));
    });

    describe('El método post', () => {

        it('Delega el post de la entidad al HttpClient', inject([HttpClient],
            (httpClient: HttpClient) => {

                const entity = { data: 'Entity ' };

                spyOn(httpClient, 'post').and.callFake(() => of([]));

                target.post('Prefix', entity);

                expect(httpClient.post).toHaveBeenCalledTimes(1);
            }));

        it('Delega el post de la entidad HttpClient, utilizando el Api_Url más el prefix', inject([HttpClient, RequestOptionsService],
            (httpClient: HttpClient, requestOptionsService: RequestOptionsService) => {

                const entity = { data: 'Entity ' };

                spyOn(httpClient, 'post').and.callFake(() => of([]));

                target.apiURL = 'URL';

                target.post('Prefix', entity);

                expect(httpClient.post)
                    .toHaveBeenCalledWith('URL' + '/' + 'Prefix', JSON.stringify(entity), requestOptionsService.apply());
            }));
    });

    describe('El método put', () => {

        it('Delega el put de la entidad al HttpClient', inject([HttpClient],
            (httpClient: HttpClient) => {

                const entity = { data: 'Entity ' };

                spyOn(httpClient, 'put').and.callFake(() => of([]));

                target.put('Prefix', entity);

                expect(httpClient.put).toHaveBeenCalledTimes(1);
            }));

        it('Delega el pit de la entidad HttpClient, utilizando el Api_Url más el prefix', inject([HttpClient, RequestOptionsService],
            (httpClient: HttpClient, requestOptionsService: RequestOptionsService) => {

                const entity = { data: 'Entity ' };

                spyOn(httpClient, 'put').and.callFake(() => of([]));

                target.apiURL = 'URL';

                target.put('Prefix', entity);

                expect(httpClient.put)
                    .toHaveBeenCalledWith('URL' + '/' + 'Prefix', JSON.stringify(entity), requestOptionsService.apply());
            }));
    });

    describe('El método delete', () => {

        it('Delega el delete de la entidad al HttpClient', inject([HttpClient],
            (httpClient: HttpClient) => {

                const id = 20;

                spyOn(httpClient, 'delete').and.callFake(() => of([]));

                target.delete('Prefix', id);

                expect(httpClient.delete).toHaveBeenCalledTimes(1);
            }));

        it('Delega el delete de la entidad HttpClient, utilizando el Api_Url más el prefix', inject([HttpClient, RequestOptionsService],
            (httpClient: HttpClient, requestOptionsService: RequestOptionsService) => {

                const id = 20;

                spyOn(httpClient, 'delete').and.callFake(() => of([]));

                target.apiURL = 'URL';

                target.delete('Prefix', id);

                expect(httpClient.delete)
                    .toHaveBeenCalledWith('URL' + '/' + 'Prefix' + '/' + id, requestOptionsService.apply());
            }));
    });
});
