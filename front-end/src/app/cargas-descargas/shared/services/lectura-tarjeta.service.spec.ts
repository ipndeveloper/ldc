import { TestBed, inject } from '@angular/core/testing';
import { LecturaTarjetaService } from './lectura-tarjeta.service';
import { TestModule } from '../../../core/mocks/test.module';

describe('LecturaTarjetaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LecturaTarjetaService],
      imports: [TestModule]
    });
  });

  it('should be created', inject([LecturaTarjetaService], (service: LecturaTarjetaService) => {
    expect(service).toBeTruthy();
  }));
});
