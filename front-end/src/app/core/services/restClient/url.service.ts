import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  urlPattern = /(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?\w+([\-\.]{1}[a-z0-9]+)*(\.[a-z])*(:\d+)?/;

  constructor() { }

  getApiUrl(): string {
    return this.getUrl('http://localhost:63109/api', 'Ldc.Yard.Web.Api/api');
  }

  getFrontEndUrl(): string {
    return this.getUrl('http://localhost:4200/', 'ldc-yard');
  }

  getSignalRApiUrl(): string {
    return this.getUrl('http://localhost/Ldc.SignalR.Web.Api', 'Ldc.SignalR.Web.Api');
  }
  private getUrl(developmentUrl: string, endpoint: string): string {
    let url = developmentUrl;
    if (environment.production) {
      const currentUrl = window.location.href;
      const match = currentUrl.match(this.urlPattern);
      if (match && match[0]) {
        url = `${match[0]}/${endpoint}`;
      }
    }
    return url;
  }

}
