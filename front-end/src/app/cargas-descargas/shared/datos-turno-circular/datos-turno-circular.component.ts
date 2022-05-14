import { Component, Input, OnInit } from '@angular/core';
import { TurnoCircularDataView } from '../../../shared/data-models/turno-circular-data-view';

@Component({
  selector: 'yrd-datos-turno-circular',
  templateUrl: './datos-turno-circular.component.html',
  styleUrls: ['./datos-turno-circular.component.css']
})
export class DatosTurnoCircularComponent implements OnInit {

  @Input() turno: TurnoCircularDataView;
  constructor() { }

  ngOnInit() {
  }
}
