import { ControlarSalidaPage } from './controlar-salida.po';

describe('Module: Controlar Salida', () => {

    let page: ControlarSalidaPage;

    beforeEach(() => {
        page = new ControlarSalidaPage();
    });

    it('debe mostrar el título Controlar Salida', () => {
        // Arrange

        // Act
        // Navigate to the Page to Test
        page.navigateTo();

        // Assert
        expect(page.getTitle()).toEqual('Controlar Salida');
    });

    it('debe habilitar el filtro de búsqueda al cargar la pantalla', () => {
        // Arrange

        // Act
        // Navigate to the Page to Test
        page.navigateTo();

        // Assert
        expect(page.getPatenteFiltro().isEnabled()).toBe(true);
        expect(page.getTarjeta().isEnabled()).toBe(true);
        expect(page.getSinTarjetaCheck().isEnabled()).toBe(true);
        expect(page.getBuscarButton().isEnabled()).toBe(true);
        expect(page.getLimpiarButton().isEnabled()).toBe(true);
    });

    it('debe deshabilitar los botones aceptar, cancelar y rechazar al cargar la pantalla', () => {
        // Arrange

        // Act
        // Navigate to the Page to Test
        page.navigateTo();

        // Assert
        expect(page.getAceptarButton().isEnabled()).toBe(false);
        expect(page.getCancelarButton().isEnabled()).toBe(false);
        expect(page.getRechazarButton().isEnabled()).toBe(false);
        expect(page.getRechazarConCTGButton().isEnabled()).toBe(false);
    });

    it('debe deshabilitar el filtro de búsqueda luego de buscar', () => {
        // Arrange

        // Act
        // Navigate to the Page to Test
        page.navigateTo();

        page.getPatenteFiltro().sendKeys('AAA111');
        page.getSinTarjetaCheck().click();
        page.getBuscarButton().click();

        // Assert
        expect(page.getPatenteFiltro().isEnabled()).toBe(false);
        expect(page.getTarjeta().isEnabled()).toBe(false);
        expect(page.getSinTarjetaCheck().isEnabled()).toBe(false);
        expect(page.getBuscarButton().isEnabled()).toBe(false);
        expect(page.getLimpiarButton().isEnabled()).toBe(false);
    });

    it('debe habilitar los botones aceptar, cancelar y rechazar luego de buscar', () => {
        // Arrange

        // Act
        // Navigate to the Page to Test
        page.navigateTo();

        page.getPatenteFiltro().sendKeys('AAA111');
        page.getSinTarjetaCheck().click();
        page.getBuscarButton().click();

        // Assert
        expect(page.getAceptarButton().isEnabled()).toBe(true);
        expect(page.getCancelarButton().isEnabled()).toBe(true);
        expect(page.getRechazarButton().isEnabled()).toBe(true);
    });

    it('debe completar los datos del movimiento luego de buscar', () => {
        // Arrange

        // Act
        // Navigate to the Page to Test
        page.navigateTo();

        page.getPatenteFiltro().sendKeys('AAA111');
        page.getSinTarjetaCheck().click();
        page.getBuscarButton().click();

        // Assert
        expect(page.getTipoDocumentoPorte().getAttribute('value')).toBeTruthy();
        expect(page.getNroDocumentoPorte().getAttribute('value')).toBeTruthy();
        expect(page.getProducto().getAttribute('value')).toBeTruthy();
        expect(page.getEstado().getAttribute('value')).toBeTruthy();
        expect(page.getPatenteMovimiento().getAttribute('value')).toBeTruthy();
    });

    it('No debe completar los datos del movimiento si no recupera un movimiento', () => {
        // Arrange

        // Act
        // Navigate to the Page to Test
        page.navigateTo();

        page.getPatenteFiltro().sendKeys('xyz439');
        page.getSinTarjetaCheck().click();
        page.getBuscarButton().click();

        // Assert
        expect(page.getTipoDocumentoPorte().getAttribute('value')).toBeFalsy();
        expect(page.getNroDocumentoPorte().getAttribute('value')).toBeFalsy();
        expect(page.getProducto().getAttribute('value')).toBeFalsy();
        expect(page.getEstado().getAttribute('value')).toBeFalsy();
        expect(page.getPatenteMovimiento().getAttribute('value')).toBeFalsy();
    });
});
