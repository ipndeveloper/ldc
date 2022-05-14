import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { CargasDescargasModule } from '../cargas-descargas/cargas-descargas.module';
import { YardRoutes } from '../shared/data-models/routes';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestModule } from '../core/mocks/test.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GestionAfipModule } from '../gestion-afip/gestion-afip.module';
import { TextMaskModule } from 'angular2-text-mask';
import { LoginComponent } from '../login/login.component';
import { configureTestSuite } from '../core/mocks/testing';
import { ParametrosService } from '../shared/parametros-service/parametros.service';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            declarations: [
                HomeComponent,
                LoginComponent
            ],
            imports: [
                ReactiveFormsModule,
                RouterTestingModule.withRoutes(YardRoutes),
                NgbModule,
                TestModule,
                CargasDescargasModule,
                GestionAfipModule,
                TextMaskModule
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            providers: [
                ParametrosService
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
