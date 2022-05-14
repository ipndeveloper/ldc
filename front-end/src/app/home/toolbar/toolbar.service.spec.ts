import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule, Routes, Router, NavigationEnd, Route } from '@angular/router';
import { ToolbarComponent } from './toolbar.component';
import { ToolbarService } from './toolbar.service';
import { HomeComponent } from '../home.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NavigationService } from '../../../app/core/services/navigationService/navigation.service';
import { MenuIdentifiers } from '../../shared/enums/enums';
import { of } from 'rxjs';
import { MenuItem } from '../../core/models/menuItem';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ApiService } from '../../core/services/restClient/api.service';
import { RestHandlerService } from '../../core/services/restClient/restHandler.service';
import { RequestOptionsService } from '../../core/services/restClient/requestOptions.service';
import { AuthService } from '../../core/services/session/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PopupModule } from '../../core/services/popupService/popup.module';

export const MockRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        data: {
            title: 'Home',
            identifier: MenuIdentifiers.Home
        },
        children: [
            {
                path: 'ruta1',
                component: HomeComponent,
                data: {
                    title: 'Ruta1',
                    identifier: 'ruta1',
                    icon: 'icon'
                },
                children: [
                    {
                        path: 'ruta1-1',
                        component: HomeComponent,
                        data: {
                            title: 'Ruta1-1',
                            identifier: 'ruta1-1',
                            permissions: 'permiso1'
                        },
                    },
                    {
                        path: 'ruta1-2',
                        component: HomeComponent,
                        data: {
                            title: 'Ruta1-2',
                            identifier: 'ruta1-2',
                            permissions: ['permiso1', 'permiso2']
                        },
                    },
                    {
                        path: 'ruta1-3',
                        component: HomeComponent,
                        data: {
                            title: 'Ruta1-3',
                            identifier: 'ruta1-2',
                            permissions: {
                                only: ['permiso1']
                            }
                        },
                    }
                ]
            },
            {
                path: 'ruta2',
                component: HomeComponent,
                data: {
                    title: 'Ruta2',
                    identifier: 'ruta2'
                },
            }
        ]
    },
];

describe('ToolbarService', () => {
    let service: ToolbarService;
    let navigationService: NavigationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                HomeComponent,
                ToolbarComponent
            ],
            imports: [
                RouterTestingModule.withRoutes(MockRoutes),
                RouterModule,
                NgxPermissionsModule.forRoot(),
                FontAwesomeModule,
                HttpClientTestingModule,
                PopupModule
            ],
            providers: [
                ToolbarService,
                NavigationService,
                ApiService,
                RestHandlerService,
                RequestOptionsService,
                AuthService
            ]
        });

        service = TestBed.get(ToolbarService);
        navigationService = TestBed.get(NavigationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('El metodo getMenuItems', () => {
        beforeEach(() => {
            spyOn(navigationService, 'getPathByIdentifier').and.returnValue('path');
        });

        it('devuelve un array MenuItem', () => {
            // Arrange

            // Act
            const menuItems = service.getMenuItems();

            // Assert
            expect(menuItems).toBeDefined();
        });

        it('devuelve un array MenuItem cuyo path es el retornado por getPathByIdentifier del notificationService', () => {
            // Arrange

            // Act
            const menuItems = service.getMenuItems();

            // Assert
            expect((menuItems[0] as any).path).toEqual('path');
        });

        it('devuelve un array MenuItem cuyo title es el definido en data', () => {
            // Arrange

            // Act
            const menuItems = service.getMenuItems();

            // Assert
            expect((menuItems[0] as any).title).toEqual('Ruta1');
        });

        it('devuelve un array MenuItem cuyo icon es el definido en data', () => {
            // Arrange

            // Act
            const menuItems = service.getMenuItems();

            // Assert
            expect((menuItems[0] as any).icon).toEqual('icon');
        });

        it('devuelve un array MenuItem con sus children en caso de tenerlos', () => {
            // Arrange

            // Act
            const menuItems = service.getMenuItems();

            // Assert
            expect((menuItems[0] as any).children).toBeDefined();
        });

        it('devuelve un array MenuItem con sus children en null en caso de no tenerlos', () => {
            // Arrange

            // Act
            const menuItems = service.getMenuItems();

            // Assert
            expect((menuItems[1] as any).children).toBeNull();
        });

        it('devuelve un array MenuItem cuyo permisos son un array que fueron configurados como string', () => {
            // Arrange

            // Act
            const menuItems = service.getMenuItems();

            // Assert
            expect((menuItems[0] as any).children[0].permissions).toEqual(['permiso1']);
        });

        it('devuelve un array MenuItem cuyo permisos son un array que fueron configurados como array', () => {
            // Arrange

            // Act
            const menuItems = service.getMenuItems();

            // Assert
            expect((menuItems[0] as any).children[1].permissions).toEqual(['permiso1', 'permiso2']);
        });

        it('devuelve un array MenuItem cuyo permisos son un array que fueron configurados como only', () => {
            // Arrange

            // Act
            const menuItems = service.getMenuItems();

            // Assert
            expect((menuItems[0] as any).children[2].permissions).toEqual(['permiso1']);
        });
    });

    describe('El metodo initialize', () => {
        let rutaActiva: string;

        beforeEach(() => {
            rutaActiva = '/ruta1/ruta1-1';
            const router = TestBed.get(Router);
            const ev = of(new NavigationEnd(0, rutaActiva, rutaActiva));
            (router as any).events = ev;
            spyOnProperty(router, 'url', 'get').and.returnValue(rutaActiva);
        });

        it('invoca al metodo resolveMenuItem', () => {
            // Arrange
            spyOn(service, 'resolveMenuItem');

            // Act
            service['initialize']();

            // Assert
            expect(service.resolveMenuItem).toHaveBeenCalledTimes(1);
        });

        it('emite el evento routeChanged con el menuItem encontrado', () => {
            // Arrange
            const esperado = MenuItem.fromTitle('Title');
            spyOn(service, 'resolveMenuItem').and.returnValue(esperado);
            spyOn(service.routeChanged, 'emit');

            // Act
            service['initialize']();

            // Assert
            expect(service.routeChanged.emit).toHaveBeenCalledWith(esperado);
        });
    });

    describe('El metodo resolveMenuItem', () => {
        let url: string;
        let homeRoute: Route;

        beforeEach(() => {
            url = '/ruta1/ruta1-1';

            const router = TestBed.get(Router);
            spyOnProperty(router, 'url', 'get').and.returnValue(url);

            homeRoute = router.config.find((r: Route) => r.data !== undefined && r.data.identifier === MenuIdentifiers.Home);
        });

        it('invoca al metodo getDataByPath del navigationService con la url del router y con los hijos del nodo home', () => {
            // Arrange
            spyOn(navigationService, 'getDataByPath');

            // Act
            service.resolveMenuItem();

            // Assert
            expect(navigationService.getDataByPath).toHaveBeenCalledWith(homeRoute.children, url);
        });

        it('devuelve un menuItem con el titulo del data de la ruta actual', () => {
            // Arrange
            spyOn(navigationService, 'getDataByPath').and.returnValue({title: 'Title'});

            // Act
            const result = service.resolveMenuItem();

            // Assert
            expect(result.title).toEqual('Title');
        });

        it('devuelve un menuItem vacio cuando no se encuentra el data de la ruta actual', () => {
            // Arrange
            spyOn(navigationService, 'getDataByPath').and.returnValue({});

            // Act
            const result = service.resolveMenuItem();

            // Assert
            expect(result.title).toEqual('');
        });
    });
});
