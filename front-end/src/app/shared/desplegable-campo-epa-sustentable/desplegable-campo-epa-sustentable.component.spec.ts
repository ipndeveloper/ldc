import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { DesplegableCampoEpaSustentableComponent } from './desplegable-campo-epa-sustentable.component';
import { CampoEpaSustentableService } from './campo-epa-sustentable.service';
import { TestModule } from '../../core/mocks/test.module';
import { configureTestSuite } from '../../core/mocks/testing';

describe('DesplegableCampoEpaSustentableComponent', () => {
  let component: DesplegableCampoEpaSustentableComponent;
  let fixture: ComponentFixture<DesplegableCampoEpaSustentableComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [DesplegableCampoEpaSustentableComponent],
      providers: [
        CampoEpaSustentableService]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableCampoEpaSustentableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
