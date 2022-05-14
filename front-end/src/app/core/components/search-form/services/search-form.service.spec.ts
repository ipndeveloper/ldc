import { TestBed, inject } from '@angular/core/testing';

import { SearchFormService } from './search-form.service';
import { Dictionary } from '../../../models/dictionary';

describe('SearchFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchFormService]
    });
  });

  it('should be created', inject([SearchFormService], (service: SearchFormService<any>) => {
    expect(service).toBeTruthy();
  }));

  it('should be created', inject([SearchFormService], (service: SearchFormService<any>) => {
    const filters = new Dictionary<string>();
    filters.add('id', '1');
    expect(function () {
      service.getData(filters);
    }).toThrow();
  }));

  describe('El metodo getQuerystringParameter', () => {

    let filters: Dictionary<any>;

    it('devuelve una querystring con la keyUrl y el valor del diccionario',
      inject([SearchFormService], (service: SearchFormService<any>) => {
        // Arrange
        filters = new Dictionary<any>();
        filters.add('tarjeta', '123456789');

        // Act
        const resultado = service.getQuerystringParameter(filters, 'tarjeta', 'nroTarjeta');

        // Assert
        expect(resultado).toEqual('&nroTarjeta=123456789');
      }));

    it('devuelve una querystring con el valor del diccionario con keyUrl nulo',
      inject([SearchFormService], (service: SearchFormService<any>) => {
        // Arrange
        filters = new Dictionary<any>();
        filters.add('tarjeta', '123456789');

        // Act
        const resultado = service.getQuerystringParameter(filters, 'tarjeta');

        // Assert
        expect(resultado).toEqual('&tarjeta=123456789');
      }));

    it('devuelve una querystring con el id de la entidad que tiene diccionario en la dictionaryKey',
      inject([SearchFormService], (service: SearchFormService<any>) => {
        // Arrange
        filters = new Dictionary<any>();
        filters.add('objeto', { id: 1, descripcion: 'unObjeto' });

        // Act
        const resultado = service.getQuerystringParameter(filters, 'objeto');

        // Assert
        expect(resultado).toEqual('&objeto=1');
      }));

    it('devuelve un string empty cuando no existe el objeto en el filters',
      inject([SearchFormService], (service: SearchFormService<any>) => {
        // Arrange
        filters = new Dictionary<any>();
        filters.add('objeto', null);

        // Act
        const resultado = service.getQuerystringParameter(filters, 'objeto');

        // Assert
        expect(resultado).toEqual('');
      }));
  });
});
