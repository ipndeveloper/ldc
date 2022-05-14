import { browser, by, element } from 'protractor';

export class ControlarSalidaPage {

    navigateTo() {
        return browser.get('/controlar-salida');
    }

    getTitle() {
        return browser.getTitle();
    }

    getPatenteFiltro() {
        return element(by.id('patenteCamion'));
    }

    getTarjeta() {
        return element(by.id('tarjeta'));
    }

    getSinTarjetaCheck() {
        return element(by.id('sinTarjeta'));
    }

    getTipoDocumentoPorte() {
        return element(by.id('tipoDocumentoPorte'));
    }

    getNroDocumentoPorte() {
        return element(by.id('nroDocumentoPorte'));
    }

    getProducto() {
        return element(by.id('producto'));
    }

    getEstado() {
        return element(by.id('estado'));
    }

    getPatenteMovimiento() {
        return element(by.id('patente'));
    }

    getBuscarButton() {
        return element(by.id('btnBuscar'));
    }

    getLimpiarButton() {
        return element(by.id('btnLimpiar'));
    }

    getAceptarButton() {
        return element(by.id('btnAceptar'));
    }

    getCancelarButton() {
        return element(by.id('btnCancelar'));
    }

    getRechazarButton() {
        return element(by.id('btnRechazar'));
    }

    getRechazarConCTGButton() {
        return element(by.id('btnRechazarConCTG'));
    }
}
