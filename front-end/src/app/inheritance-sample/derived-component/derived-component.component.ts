import { Component, OnInit, Input } from '@angular/core';
import { BaseComponentComponent } from '../base-component/base-component.component';

@Component({
  selector: 'yrd-derived-component',
  templateUrl: './derived-component.component.html',
  styleUrls: ['./derived-component.component.css']
})
export class DerivedComponentComponent extends BaseComponentComponent implements OnInit {

  constructor() {
    super();
  }

  @Input()
  title: string;

  @Input()
  previousText = '<';

  @Input()
  nextText = '>';

  ngOnInit() {
  }

}
