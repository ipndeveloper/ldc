import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PopupService } from '../popupService/popup.service';
import { Resources } from '../../../../locale/artifacts/resources';

@Injectable({
  providedIn: 'root'
})
export class VersionCheckService {

    // this will be replaced by actual hash post-build.js
    private currentHash = '{{POST_BUILD_ENTERS_HASH_HERE}}';

    constructor(private readonly http: HttpClient,
                private readonly popupService: PopupService) {}

    public initVersionCheck(url: string, frequency: number = 1000 * 60 * 30) {
        setInterval(() => {
            this.checkVersion(url);
        }, frequency);
    }

    private checkVersion(url: string) {
        // timestamp these requests to invalidate caches
        this.http.get(url + '?t=' + new Date().getTime())
            .subscribe((response: any) => {
                if (this.currentHash !== response.hash) {
                    this.popupService.blockUI(Resources.Messages.ExisteUnaNuevaVersionDelSistema,
                                              Resources.Messages.NuevaVersionDelSistema);
                }
            }
        );
    }
}
