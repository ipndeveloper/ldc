import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { PopupService } from '../../services/popupService/popup.service';
import { ModalComponent } from '../modal/modal.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Resources } from '../../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-block-ui',
  templateUrl: './block-ui.component.html',
  styleUrls: ['./block-ui.component.css']
})
export class BlockUIComponent implements OnInit, OnDestroy {

  @ViewChild('modalComponent') modal: ModalComponent;

  titulo: string;
  mensaje?: string;
  private readonly onDestroy = new Subject();

  get showMessage(): boolean {
    return this.mensaje ? true : false;
  }

  constructor(private readonly popupService: PopupService) { }

  ngOnInit() {
    this.popupService.onBlockUI
      .pipe(takeUntil(this.onDestroy))
      .subscribe((opts: {message?: string, title?: string}) => {
        this.mensaje = opts.message;
        this.titulo = opts.title ? opts.title : Resources.Labels.EsperePorFavor;
        this.modal.open();
      });
    this.popupService.onUnblockUI
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.modal.close();
      });
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }

}
