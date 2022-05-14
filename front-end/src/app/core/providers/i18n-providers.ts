import { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID, Injectable, StaticProvider } from '@angular/core';
import { environment } from '../../../environments/environment';
declare const require;
const localeIdKey = environment.localeIdKey;

@Injectable()
export class I18nProvider {

  static initialize(): Promise<StaticProvider[]> {

    const locale = localStorage.getItem(localeIdKey);

    const noProviders: StaticProvider[] = [];

    if (!locale) {
      console.log(`${localeIdKey} is empty`);

      return Promise.resolve(noProviders);
    }

    console.log('reading locale:' + locale);

    try {

      const translationFile = require(`raw-loader!../../../locale/html/template.${locale}.xlf`);

      return Promise.resolve(translationFile).then((translations: string) => [
        { provide: TRANSLATIONS, useValue: translations },
        { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
        { provide: LOCALE_ID, useValue: locale }
      ]).catch(() => noProviders);
    } catch (e) {
      console.log(`${localeIdKey} not match with translations files`);

      return Promise.resolve(noProviders);
    }
  }

  apply(localeId: string): void {
    localStorage.setItem(localeIdKey, localeId);

    location.reload(true);
  }

  translate(resource: string, key: string): string {
    const locale = localStorage.getItem(localeIdKey);

    if (locale) {
      return this.getMessageByLocaleId(locale, resource, key);
    }

    return this.getMessageByDefault(resource, key);
  }

  private getMessageByLocaleId(locale: string, resource: string, key: string): string {
    const fileName = `${resource}.${locale}.xml`;

    try {
      const translationFile = this.getFileContent(fileName);

      return this.getMessage(translationFile, key);

    } catch (e) {

      return this.getMessageByDefault(resource, key);

    }
  }

  private getMessageByDefault(resource: string, key: string): string {

    const translationFile = this.getFileContent(`${resource}.xml`);

    return this.getMessage(translationFile, key);
  }

  private getMessage(source: string, key: string): string {
    const domparser = new DOMParser();
    const domdoc = domparser.parseFromString(source, 'text/xml');
    const tag = domdoc.querySelector('[id=' + key + ']');

    if (tag) {
      try {
        const value = tag.getElementsByTagName('value');

        let valueText = value[0].textContent;

        if (!valueText) {
          valueText = value[0].innerHTML;
        }

        return valueText;

      } catch (e) {
        console.log(e);

        console.log('file format error.');
      }
    }

    throw new DOMException();
  }

  private getFileContent(fileName: string): string {
    return require(`raw-loader!../../../locale/component/${fileName}`);
  }
}
