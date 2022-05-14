import { AppPage } from './ingresar-descargar-camion.po';
import { browser, element, by } from 'protractor';
import { protractor } from 'protractor/built/ptor';

describe('Module: Ingresar Descarga Camión', () => {

    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display root element inside the body', () => {
        // Arrange
        // Act
        // Navigate to the Page to Test
        page.navigateTo();

        // Assert
        expect(page.getRootElement()).toEqual('yrd-root');
    });

    it('Should display Yard title', () => {
        // Arrange

        // Act
        // Navigate to the Page to Test
        page.navigateTo();

        // Assert
        expect(page.getTitle()).toEqual('Ingresar descarga de camión');
    });

    it('Should be enable the Dejar Pendiente Button', () => {
        // Arrange

        // Act
        // Navigate to the Page to Test
        page.navigateTo();

        // Assert
        expect(page.getDejarPendienteButton().isEnabled()).toBeTruthy();
    });

    it('Should be clickable the Dejar Pendiente Button', () => {
        // Arrange

        // Act
        // Navigate to the Page to Test
        page.navigateTo();

        // Assert
        expect(page.getDejarPendienteButton().isDisplayed()).toBe(true);
    });

    it('Should be enable the  Actualizar Campo EPA Button', () => {
        // Arrange

        // Act
        // Navigate to the Page to Test
        page.navigateTo();

        // Assert
        expect(page.getActualizarCampoEPAButton().isEnabled()).toBeTruthy();
    });

    it('Should be clickable the Actualizar Campo EPA Button', () => {
        // Arrange

        // Act
        // Navigate to the Page to Test
        page.navigateTo();

        // Assert
        expect(page.getActualizarCampoEPAButton().isDisplayed()).toBe(true);
    });

    it('Should be enable the  Consultar Datos AFIP Button', () => {
        // Arrange

        // Act
        // Navigate to the Page to Test
        page.navigateTo();

        // Assert
        expect(page.getConsultarDatosAFIPButton().isEnabled()).toBeTruthy();
    });

    it('Should be clickable the Consultar Datos AFIP Button', () => {
        // Arrange

        // Act
        // Navigate to the Page to Test
        page.navigateTo();

        // Assert
        expect(page.getConsultarDatosAFIPButton().isDisplayed()).toBeTruthy();
    });

    it('Should be enable the  Aceptar Y Continuar Button', () => {
        // Arrange

        // Act
        // Navigate to the Page to Test
        page.navigateTo();

        // Assert
        expect(page.getAceptarYContinuarButton().isEnabled()).toBeTruthy();
    });

    it('Should be clickable the Aceptar Y Continuar Button', () => {
        // Arrange

        // Act
        // Navigate to the Page to Test
        page.navigateTo();

        // Assert
        expect(page.getAceptarYContinuarButton().isDisplayed()).toBe(true);
    });

    it('Should be enable the  Aceptar Button', () => {
        // Arrange

        // Act
        // Navigate to the Page to Test
        page.navigateTo();

        // Assert
        expect(page.getAceptarButton().isEnabled()).toBeTruthy();
    });

    it('Should be clickable the Aceptar Button', () => {
        // Arrange

        // Act
        // Navigate to the Page to Test
        page.navigateTo();

        // Assert
        expect(page.getAceptarButton().isDisplayed()).toBe(true);
    });

    it('Should be enable the  Rechazar Button', () => {
        // Arrange

        // Act
        // Navigate to the Page to Test
        page.navigateTo();

        // Assert
        expect(page.getRechazarButton().isEnabled()).toBeTruthy();
    });

    it('Should be clickable the Rechazar Button', () => {
        // Arrange

        // Act
        // Navigate to the Page to Test
        page.navigateTo();

        // Assert
        expect(page.getRechazarButton().isDisplayed()).toBe(true);
    });

    it('Should be enable the  Cancelar Button', () => {
        // Arrange

        // Act
        // Navigate to the Page to Test
        page.navigateTo();

        // Assert
        expect(page.getCancelarButton().isEnabled()).toBeTruthy();
    });

    it('Should be clickable the Cancelar Button', () => {
        // Arrange

        // Act
        // Navigate to the Page to Test
        page.navigateTo();

        // Assert
        expect(page.getCancelarButton().isDisplayed()).toBe(true);
    });

    it('Should be displayed the Numero de documento Porte', () => {
        // Arrange

        // Act
        // Navigate to the Page to Test
        page.navigateTo();

        // Assert
        expect(page.getNumeroDocumentoPorte().isDisplayed()).toBe(true);
    });

    it('Should be empty the Numero de documento Porte', () => {
        // Arrange

        // Act
        // Navigate to the Page to Test
        page.navigateTo();

        // Assert
        expect(page.getNumeroDocumentoPorte().getAttribute('value')).toBe('');
    });

    it('Should not be an error when the user tries to press the Aceptar with the Nro Doc Porte as  valid value', () => {
        // Arrange

        // Act
        // Navigate to the Page to Test
        page.navigateTo();

        // Assert
        expect(page.getNumeroDocumentoPorteValidation().isDisplayed()).toBe(false); // Checks if span error is displayed
        expect(page.getAceptarButton().isEnabled()).toBeTruthy();
        expect(page.getNumeroDocumentoPorte().isDisplayed()).toBe(true);
        expect(page.getNumeroDocumentoPorte().getAttribute('value')).toBe('');
        page.getNumeroDocumentoPorte().sendKeys('12345678');
        expect(page.getAceptarButton().click());
        expect(page.getNumeroDocumentoPorteValidation().isDisplayed()).toBe(false); // Checks if span error is displayed
    });

    it('Should not be an error when the user tries to press the Aceptar y Continuar with the Nro Doc Porte as valid value', () => {
        // Arrange

        // Act// Navigate to the Page to Test
        page.navigateTo();

        // Assert
        expect(page.getNumeroDocumentoPorteValidation().isDisplayed()).toBe(false); // Checks if span error is displayed
        expect(page.getAceptarYContinuarButton().isEnabled()).toBeTruthy();
        expect(page.getNumeroDocumentoPorte().isDisplayed()).toBe(true);
        expect(page.getNumeroDocumentoPorte().getAttribute('value')).toBe('');
        page.getNumeroDocumentoPorte().sendKeys('12345678');
        expect(page.getAceptarYContinuarButton().click());
        expect(page.getNumeroDocumentoPorteValidation().isDisplayed()).toBe(false); // Checks if span error is displayed
    });

    it('Should focus on Numero de documento Porte', () => {
        // Arrange

        // Act
        // Navigate to the Page to Test
        page.navigateTo();
        browser.driver.sleep(600);

        // Assert
        expect(page.getNumeroDocumentoPorte().getAttribute('id')).toEqual(browser.driver.switchTo().activeElement().getAttribute('id'));
    });

    it('Should focus on codigo after two tab key pressed', () => {
        // Arrange
        const numeroDocumentoPorte = page.getNumeroDocumentoPorte();

        // Act
        // Navigate to the Page to Test
        page.navigateTo();
        browser.driver.sleep(600);
        numeroDocumentoPorte.sendKeys(protractor.Key.TAB);
        browser.sleep(600);
        let times = 1;
        while (times <= 8) {
            // Position on corrent displayed control and press tab key
            browser.driver.switchTo().activeElement().sendKeys(protractor.Key.TAB);
            browser.sleep(600);
            times++;
        }

        // Assert
        expect(page.getDejarPendienteButton().getAttribute('id')).toEqual(browser.driver.switchTo().activeElement().getAttribute('id'));
    });

    it('Should appear the modal dialog when the user press F2', () => {
        // Arrange

        // Act
        // Navigate to the Page to Test
        page.navigateTo();
        browser.driver.sleep(600);
        browser.driver.switchTo().activeElement().sendKeys(protractor.Key.F2);
        browser.sleep(600);
        // Assert
        const modal = page.getBusquedaChoferModal();
        expect(modal.isDisplayed()).toBe(true);
    });

    it('Should hide the modal dialog when the user press cancel', () => {
        // Arrange
        // Act
        // Navigate to the Page to Test
        page.navigateTo();
        browser.driver.sleep(600);
        browser.driver.switchTo().activeElement().sendKeys(protractor.Key.F2);
        browser.waitForAngular();
        // Assert
        const cancelButton = page.getCancelarBusquedaButton();
        cancelButton.click().then(function () { // Click on cancel button
            expect(browser.isElementPresent(element(by.css('.modal-content')))).toBe(false);
            expect(element(by.css('.modal-content')).isPresent()).toBe(false);
        });
    });
});
