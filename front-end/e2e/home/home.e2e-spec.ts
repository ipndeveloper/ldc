import { AppPage } from './home.po';
import { browser } from 'protractor';

describe('Module: Home', () => {

    let page: AppPage;
    let menuButton: any;

    beforeEach(() => {
        page = new AppPage();
        menuButton = page.getMenuButton();
    });

    it('should display a menu inside the toolbar ', () => {
        // Arrange
        // Act
        // Navigate to the Page to Test
        page.navigateTo();
        // Assert
        expect(menuButton.isEnabled()).toBeTruthy();
        expect(menuButton.isDisplayed()).toBeTruthy();
    });

    it('should display a menu - Ingresar descarga de camión- inside the menu ', () => {
        // Arrange
        // Act
        // Navigate to the Page to Test
        page.navigateTo();
        browser.waitForAngular();
        browser.actions().mouseMove(menuButton);
        browser.waitForAngular();
        // Assert
        expect(page.getMenuItemButton('Ingresar descarga de camión').isEnabled()).toBeTruthy();
    });

    it('should display a menu - Controlar descarga de camión de Cereales - inside the menu ', () => {
        // Arrange
        // Act
        // Navigate to the Page to Test
        page.navigateTo();
        browser.waitForAngular();
        browser.actions().mouseMove(menuButton);
        browser.waitForAngular();
        // Assert
        expect(page.getMenuItemButton('Controlar Descarga Camión Cereales').isEnabled()).toBeTruthy();
    });

    it('should display a menu -Controlar Descarga Camión Transportes Varios- inside the menu ', () => {
        // Arrange
        // Act
        // Navigate to the Page to Test
        page.navigateTo();
        browser.waitForAngular();
        browser.actions().mouseMove(menuButton);
        browser.waitForAngular();
        // Assert
        expect(page.getMenuItemButton('Controlar Descarga Camión Transportes Varios').isEnabled()).toBeTruthy();
    });

    it('should display a menu - Gestionar Calidad Calado - inside the menu ', () => {
        // Arrange
        // Act
        // Navigate to the Page to Test
        page.navigateTo();
        browser.waitForAngular();
        browser.actions().mouseMove(menuButton);
        browser.waitForAngular();
        // Assert
        expect(page.getMenuItemButton('Gestionar Calidad Calado').isEnabled()).toBeTruthy();
    });
});
