import { Component, ContentChild, TemplateRef, AfterViewInit, Output, EventEmitter, ContentChildren, Input } from '@angular/core';
import { OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { IAdvancedSearchComponent } from '../../shared/super/advanced-search.component';

@Component({
  selector: 'yrd-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements AfterViewInit, OnDestroy {

  static readonly tabKey = 'Tab';
  static readonly escKey = 'esc';
  public visible = false;
  public hasFooter = false;

  @ContentChild('modalHeader') header: TemplateRef<any>;
  @ContentChild('modalBody') body: TemplateRef<any>;
  @ContentChild('modalFooter') footer: TemplateRef<any>;
  @ContentChildren('child') child;

  @ViewChild('closeModal') closeModal: ElementRef;
  @ViewChild('cancelModal') cancelModal: ElementRef;

  @Input() acceptedAsync = false;
  @Input() closeOnAccept = true;
  @Input() disableAcceptButton = false;
  @Input() hasCloseButton = true;
  @Input() showHeader = true;
  @Input() showBody = true;
  @Input() showFooter = true;
  @Input() isLoadingModal = false;

  @Output() accepted = new EventEmitter();
  @Output() closing = new EventEmitter();

  constructor() {
  }

  open(): void {
    document.body.style.overflow = 'hidden';

    this.visible = true;
  }

  accept(): void {
    if (!this.hasFooter) {

      const busquedaAvanzada = this.child.last as IAdvancedSearchComponent;

      if (this.acceptedAsync) {
        if (busquedaAvanzada) {
          this.accepted.emit({ completed: () => this.close(), selectedEntity: busquedaAvanzada.selectedEntity });
        } else {
          this.accepted.emit(() => this.close());
        }
      } else {
        if (busquedaAvanzada) {
          this.accepted.emit(busquedaAvanzada.selectedEntity);
        } else {
          this.accepted.emit();
        }

        if (this.closeOnAccept) {
          this.close();
        }
      }
    }
  }

  close(): void {
    this.closing.emit();

    document.body.style.overflow = 'auto';

    this.visible = false;
  }

  onContainerClicked(): void {
  }

  ngOnDestroy() {
    this.close();
  }

  ngAfterViewInit(): void {
    this.hasFooter = this.footer != null;
  }

  cancelTabPressed(e: KeyboardEvent): void {
    if (!e.shiftKey && e.key === ModalComponent.tabKey) {
      this.closeModal.nativeElement.focus();
    }
  }

  closeTabPressed(e: KeyboardEvent): void {
    if (e.shiftKey && e.key === ModalComponent.tabKey && this.cancelModal) {
      this.cancelModal.nativeElement.focus();
    }
  }

}
