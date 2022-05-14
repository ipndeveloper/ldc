import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroCambiarTarjetaComponent } from './filtro-cambiar-tarjeta.component';

xdescribe('FiltroCambiarTarjetaComponent', () => {
  let component: FiltroCambiarTarjetaComponent;
  let fixture: ComponentFixture<FiltroCambiarTarjetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroCambiarTarjetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroCambiarTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
