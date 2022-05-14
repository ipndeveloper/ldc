import { Component, OnInit, Input, Output, EventEmitter, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'yrd-base-component',
  templateUrl: './base-component.component.html',
  styleUrls: ['./base-component.component.css']
})

export class BaseComponentComponent implements OnInit {

  constructor() {
    this.previousText = 'Atrás';
    this.nextText = 'Adelante';
  }

  @ContentChild('controlHeader') header: TemplateRef<any>;

  @Input()
  title: string;

  @Input()
  previousText = 'Atrás';

  @Input()
  nextText = 'Adelante';

  @Input()
  pageCount: number;

  @Input()
  page: number;

  @Output()
  pageChanged = new EventEmitter<number>();

  nextPage() {
    this.page ++;
    this.pageChanged.emit(this.page);
  }

  previousPage() {
    this.page --;
    this.pageChanged.emit(this.page);
  }

  hasPrevious(): boolean { return +this.page > 1; }

  hasNext(): boolean { return +this.page < +this.pageCount; }

  ngOnInit() {
  }

}
