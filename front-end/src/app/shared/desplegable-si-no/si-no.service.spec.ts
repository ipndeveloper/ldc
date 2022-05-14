import { TestBed } from '@angular/core/testing';

import { SiNoService } from './si-no.service';
import { TestModule } from '../../core/mocks/test.module';

describe('SiNoService', () => {
  let service: SiNoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SiNoService],
      imports: [TestModule]
    });

    service = TestBed.get(SiNoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('El metodo getAll', () => {
    it('devuelve un observable con las opciones', () => {
      // Arrange

      // Act
      const resultado = service.getAll();

      // Assert
      expect(resultado).toBeDefined();
    });
  });
});
