import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { HotkeysService } from 'angular2-hotkeys';
import { ModalFocusDirective } from './modal-focus.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [ModalComponent, ModalFocusDirective],
  declarations: [ModalComponent, ModalFocusDirective],
  providers: [HotkeysService],
})
export class ModalModule { }
