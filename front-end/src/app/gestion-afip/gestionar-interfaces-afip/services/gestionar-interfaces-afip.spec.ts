import { TestBed, inject } from '@angular/core/testing';

import { GestionarInterfacesAfipService } from './gestionar-interfaces-afip.service';
import { TestModule } from '../../../core/mocks/test.module';

describe('GestionarInterfacesAfipService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [GestionarInterfacesAfipService]
    });
  });

  it('should be created', inject([GestionarInterfacesAfipService], (service: GestionarInterfacesAfipService) => {
    expect(service).toBeTruthy();
  }));
});
