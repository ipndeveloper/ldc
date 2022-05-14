import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { ToolbarService } from './toolbar.service';
import { Routes, RouterModule, Router, NavigationEnd } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from '../home.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { configureTestSuite } from '../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { MenuItem } from '../../core/models/menuItem';
import { of } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../core/services/session/auth.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { TestModule } from '../../core/mocks/test.module';
import { ParametrosService } from '../../shared/parametros-service/parametros.service';

export const MockRoutes: Routes = [
    {
        path: 'ruta1',
        component: HomeComponent,
        data: {
            title: 'Home',
            identifier: 'ruta1'
        },
        children: [
            {
                path: 'ruta2',
                component: HomeComponent,
                data: {
                    title: 'Home2',
                    identifier: 'ruta2'
                },
            },
            {
                path: 'ruta3',
                component: HomeComponent,
                data: {
                    title: 'Home3',
                    identifier: 'ruta3'
                },
            }
        ]
    },
];

describe('ToolbarComponent', () => {
    let component: ToolbarComponent;
    let fixture: ComponentFixture<ToolbarComponent>;
    let toolbarService: ToolbarService;
    let titleService: Title;
    let parametrosService: ParametrosService;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            declarations: [
                HomeComponent,
                ToolbarComponent
            ],
            imports: [
                RouterTestingModule.withRoutes(MockRoutes),
                RouterModule,
                NgxPermissionsModule.forRoot(),
                TestModule
            ],
            providers: [
                ToolbarService,
                NavigationService,
                AuthService,
                ApiService
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ToolbarComponent);
        component = fixture.componentInstance;

        toolbarService = fixture.debugElement.injector.get(ToolbarService);
        titleService = fixture.debugElement.injector.get(Title);
        parametrosService = fixture.debugElement.injector.get(ParametrosService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('El metodo ngOnInit', () => {

        beforeEach(() => {
            spyOn<any>(component, 'setTitle');
            spyOn(toolbarService, 'getMenuItems').and.returnValue([{}]);
            spyOn(parametrosService, 'obtenerAmbiente').and.returnValue(of(''));
        });

        it('invoca al metodo getMenuItems del service', () => {
            // Arrange

            // Act
            component.ngOnInit();

            // Assert
            expect(toolbarService.getMenuItems).toHaveBeenCalledTimes(1);
        });

        it('setea los menuItems del componente con lo que retorna getMenuItems del service', () => {
            // Arrange
            const esperado = [new MenuItem('', '', '')];
            (toolbarService.getMenuItems as jasmine.Spy).and.returnValue(esperado);

            // Act
            component.ngOnInit();

            // Assert
            expect(component.menuItems).toEqual(esperado);
        });

        it('invoca al setTitle del mismo al iniciar el componente', () => {
            // Arrange

            // Act
            component.ngOnInit();

            // Assert
            expect(component['setTitle']).toHaveBeenCalled();
        });

        it('invoca al setTitle cuando ocurre un navigationEnd del router', () => {
            // Arrange
            const rutaActiva = 'ruta1/ruta2';
            const router = fixture.debugElement.injector.get(Router);
            const ev = of(new NavigationEnd(0, rutaActiva, rutaActiva));
            (router as any).events = ev;
            spyOnProperty(router, 'url', 'get').and.returnValue(rutaActiva);

            // Act
            component.ngOnInit();

            // Assert
            expect(component['setTitle']).toHaveBeenCalled();
        });
    });

    describe('El metodo setTitle', () => {

        it('no invoca al setTitle del titleService cuando no se encuentra una configuracion de ruta', () => {
            // Arrange
            spyOn(toolbarService, 'resolveMenuItem').and.returnValue(null);
            spyOn(titleService, 'setTitle');

            // Act
            component['setTitle']();

            // Assert
            expect(titleService.setTitle).not.toHaveBeenCalled();
        });

        it('no setea el titulo del componente cuando no se encuentra una configuracion de ruta', () => {
            // Arrange
            spyOn(toolbarService, 'resolveMenuItem').and.returnValue({});

            // Act
            component['setTitle']();

            // Assert
            expect(component.title).toBeUndefined();
        });

        it('invoca al setTitle del titleService cuando encuentra una configuracion de ruta', () => {
            // Arrange
            spyOn(toolbarService, 'resolveMenuItem').and.returnValue({title: 'Home2'});
            spyOn(titleService, 'setTitle');

            // Act
            component['setTitle']();

            // Assert
            expect(titleService.setTitle).toHaveBeenCalledWith('Home2');
        });

        it('setea el titulo del componente cuando encuentra una configuracion de ruta', () => {
            // Arrange
            spyOn(toolbarService, 'resolveMenuItem').and.returnValue({title: 'Home2'});

            // Act
            component['setTitle']();

            // Assert
            expect(component.title).toEqual('Home2');
        });
    });
});
