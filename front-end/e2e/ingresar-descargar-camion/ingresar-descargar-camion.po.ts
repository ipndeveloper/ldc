import { browser, by, element } from 'protractor';

export class AppPage {
    navigateTo() {
        return browser.get('/ingresar-descargar-camion');
    }

    getRootElement() {
        return element(by.css('yrd-root')).getTagName();
    }

    getTitle() {
        return browser.getTitle();
    }

    getDejarPendienteButton() {
        return element(by.buttonText('Dejar Pendiente'));
    }

    getActualizarCampoEPAButton() {
        return element(by.buttonText('Actualizar Campo EPA'));
    }

    getConsultarDatosAFIPButton() {
        return element(by.id('btnConsultarDatosAFIP'));
    }

    getAceptarYContinuarButton() {
        return element(by.buttonText('Aceptar y Continuar'));
    }

    getAceptarButton() {
        return element(by.buttonText('Aceptar'));
    }

    getRechazarButton() {
        return element(by.buttonText('Rechazar'));
    }

    getCancelarButton() {
        return element(by.buttonText('Cancelar'));
    }

    getNumeroDocumentoPorte() {
        return element(by.id('inputNumeroDocumentoPorte'));
    }

    getInputRazonSocialChoferBuscador() {
        return element(by.id('inputRazonSocialChofer'));
    }

    getNumeroDocumentoPorteValidation() {
        return element(by.css('.invalid-feedback'));
    }

    getInputCodigoCupo() {
        return element(by.id('inputCodigoCupo'));
    }

    getBusquedaChoferModal() {
        return element(by.css('.modal-content'));
    }

    getCancelarBusquedaButton() {
        return element(by.id('btnCancelModal'));
    }

    getAceptarBusquedaButton() {
        return element(by.id('btnAcceptModal'));
    }

    getMenuButton() {
        return element(by.id('dropdownMenu'));
    }

    getMenuItemButton(buttonText) {
        return element(by.buttonText(buttonText));
    }

    getPrimerChoferEncontrado() {
        const modalRoot = element(by.tagName('yrd-buscador-chofer-avanzado'));
        const tableData = modalRoot.all(by.css('.table'));
        const rowsData = tableData.all(by.tagName('tr')).get(1);
        return rowsData.all(by.tagName('td')).get(1).getText();
    }

    getChoferBajadoDeLaBusqueda() {
        return element(by.id('inputCodigoChofer'));
    }
}
