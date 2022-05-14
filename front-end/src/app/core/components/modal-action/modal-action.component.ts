import { Component, ContentChild, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'yrd-modal-action',
  templateUrl: './modal-action.component.html',
  styleUrls: ['./modal-action.component.css']
})
export class ModalActionComponent implements OnInit {
  closeResult = '';
  modalReference: any;

  @ViewChild('content') content: ElementRef;
  @ContentChild('modalHeader') header: TemplateRef<any>;
  @ContentChild('modalBody') body: TemplateRef<any>;
  @ContentChild('modalFooter') footer: TemplateRef<any>;

  constructor(private readonly modalService: NgbModal) { }

  ngOnInit() {
  }

  open() {
    this.modalReference = this.modalService.open(this.content, {size: 'lg', windowClass: 'modal-xl'});
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  close() {
    this.modalReference.close();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
