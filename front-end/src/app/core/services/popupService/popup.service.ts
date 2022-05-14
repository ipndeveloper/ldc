import { Injectable, TemplateRef, EventEmitter } from '@angular/core';
import { ConfirmationService } from '@jaspero/ng-confirmations';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { Resources } from '../../../../locale/artifacts/resources';

@Injectable()
export class PopupService {

    onBlockUI = new EventEmitter();
    onUnblockUI = new EventEmitter();

    constructor(private readonly confirmationService: ConfirmationService,
                private readonly toastr: ToastrService) { }

    confirm(message: string | TemplateRef<any>, title?: string): Promise<boolean> {
        const options = {
            confirmText: Resources.Labels.Si,
            declineText: Resources.Labels.No,
            overlay: true,
            overlayClickToClose: false,
            showCloseButton: true
        };

        if (!title) {
            title = Resources.Messages.DeseaContinuar;
        }

        return new Promise(resolve => {
            this.confirmationService.create(title, message, options)
                .subscribe(res => {
                    return resolve(res.resolved);
                });
        });
    }

    blockUI(message?: string, title?: string): void {
        this.onBlockUI.emit({message, title});
    }

    unblockUI(): void {
        this.onUnblockUI.emit();
    }

    confirmOk(callback: Function,
              message: string | TemplateRef<any> = Resources.Messages.DeseaConfirmarEstaAccion,
              title?: string): Promise<void> {
        return this.confirm(message, title).then(confirmo => {
            if (confirmo) {
                callback();
            }
        });
    }

    error(message: string, title?: string, override?: any) {
        this.toastr.error(message, title, override);
    }

    info(message: string, title?: string) {
        this.toastr.info(message, title);
    }

    success(message: string, title?: string, override?: Partial<IndividualConfig>) {
        this.toastr.success(message, title, override);
    }

    warning(message: string, title?: string) {
        this.toastr.warning(message, title);
    }
}
