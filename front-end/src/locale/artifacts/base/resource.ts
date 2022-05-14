import { I18nProvider } from '../../../app/core/providers/i18n-providers';

export abstract class Resource {
    private readonly i18nProvider: I18nProvider;

    constructor() {
        this.i18nProvider = new I18nProvider();
    }

    protected get Provider(): I18nProvider {
        return this.i18nProvider;
    }
}
