import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { TestModule } from '../../core/mocks/test.module';
import { DesplegableGradoComponent } from './desplegable-grado.component';
import { GradoService } from './desplegable-grado.service';
import { configureTestSuite } from '../../core/mocks/testing';

describe('DesplegableGradoComponent', () => {
  let component: DesplegableGradoComponent;
  let fixture: ComponentFixture<DesplegableGradoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DesplegableGradoComponent],
      imports: [TestModule],
      providers: [
        GradoService]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableGradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
