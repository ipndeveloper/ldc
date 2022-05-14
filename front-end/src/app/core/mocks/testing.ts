import {} from 'jasmine';
import { Type } from '@angular/core';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';

/**
 * --> Repositorio: https://github.com/topnotch48/ng-bullet-workspace <--
 *
 * Reconfigura el conjunto de pruebas actual para evitar que los componentes angulares se vuelvan a compilar
 *  después de cada ejecución de prueba..
 * Fuerza al TestBed de angular a recrear la zona y todos los servicios inyectables directamente
 * establecer _instantiated instanciada en falso después de cada ejecución de prueba.
 * Limpia todos los cambios y revierte la configuración del TestBed una vez finalizado el conjunto de pruebas.
 *
 * @param configureAction un delegado opcional que se puede utilizar para configurar el TestBed para el conjunto de pruebas actual
 * directamente en la llamada configureTestSuite (no necesita BeforeAll adicional en este caso)
 */
export const configureTestSuite = (configureAction?: () => void) => {
    const testBedApi: any = getTestBed();
    const originReset = TestBed.resetTestingModule;

    beforeAll(() => {
        TestBed.resetTestingModule();
        TestBed.resetTestingModule = () => TestBed;
    });

    if (configureAction) {
        beforeAll((done: DoneFn) => (async () => {
            configureAction();
            await TestBed.compileComponents();
        })().then(done).catch(done.fail));
    }

    afterEach(() => {
        testBedApi._activeFixtures.forEach((fixture: ComponentFixture<any>) => fixture.destroy());
        // reset ViewEngine TestBed
        testBedApi._instantiated = false;
        // reset Ivy TestBed
        testBedApi._testModuleRef = null;
    });

    afterAll(() => {
        TestBed.resetTestingModule = originReset;
        TestBed.resetTestingModule();
    });
};

/**
 * Una clase contenedora alrededor de ComponentFixture, que proporciona accesos útiles:
 * component: para acceder a la instancia del componente del dispositivo actual
 * element - para acceder al elemento nativo subyacente del componente actual
 * detectChanges - para ejecutar detecciones de cambio usando el dispositivo actual
 * resolve - para resolver un tipo usando el inyector del dispositivo actual
 */
export class TestCtx<T> {
    constructor(public fixture: ComponentFixture<T>) { }

    public get component() { return this.fixture.componentInstance; }

    public get element(): HTMLElement { return this.fixture.debugElement.nativeElement; }

    public detectChanges() { this.fixture.detectChanges(); }

    public resolve(component: Type<any>) { return this.fixture.debugElement.injector.get(component); }
}

/**
 * Crea una instancia de TestCtx para el componente angular que aún no está inicializado (no se llama a ngOnInit)
 * Caso de uso: puede anular los proveedores de componentes antes de que se llamen a los hooks.
 *
 * @param component - tipo de componente para crear instancia de
 * **/
export const createTestContext = <T>(component: Type<T>) => {
    const fixture = TestBed.createComponent<T>(component);
    const testCtx = new TestCtx<T>(fixture);
    return testCtx;
};

/** Igual que @function createTestContext, pero espera hasta que el accesorio se estabilice */
export const createStableTestContext = async <T>(component: Type<T>) => {
    const testCtx = createTestContext(component);
    testCtx.detectChanges();
    await testCtx.fixture.whenStable();
    testCtx.detectChanges();
    return testCtx;
};
