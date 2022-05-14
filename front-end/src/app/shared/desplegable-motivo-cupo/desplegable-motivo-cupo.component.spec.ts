import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableMotivoCupoComponent } from './desplegable-motivo-cupo.component';
import { TestModule } from '../../core/mocks/test.module';
import { ApiService } from '../../core/services/restClient/api.service';

describe('DesplegableMotivoCupoComponent', () => {
  let component: DesplegableMotivoCupoComponent;
  let fixture: ComponentFixture<DesplegableMotivoCupoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesplegableMotivoCupoComponent ],
      imports: [TestModule],
      providers: [ApiService]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableMotivoCupoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
