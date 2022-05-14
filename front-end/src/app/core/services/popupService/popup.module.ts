import { ToastrModule } from 'ngx-toastr';
import { JasperoConfirmationsModule } from '@jaspero/ng-confirmations';
import { NgModule } from '@angular/core';
import { PopupService } from './popup.service';

@NgModule({
    imports: [
        ToastrModule.forRoot({
            closeButton: true,
            newestOnTop: false,
            timeOut: 8000
        }),
        JasperoConfirmationsModule.forRoot()
    ],
    providers: [
        PopupService
    ]
})
export class PopupModule {
    static forRoot() {
        ToastrModule.forRoot();
        JasperoConfirmationsModule.forRoot();
    }
}
