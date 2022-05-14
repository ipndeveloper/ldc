import { browser, by, element } from 'protractor';

export class AppPage {
    navigateTo() {
        return browser.get('/');
    }

    getMenuButton() {
        return element.all(by.buttonText('Menu')).first();
    }

    getMenuItemButton(buttonText) {
        return element.all(by.buttonText(buttonText)).first();
    }
}
