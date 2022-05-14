import { Component, OnInit } from '@angular/core';
import { ParametrosService } from '../shared/parametros-service/parametros.service';

@Component({
  selector: 'yrd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ubicacionFisica = '';
  ambiente = '';
  version = '';

  constructor(private readonly parametrosService: ParametrosService) {
  }

  ngOnInit() {
    this.version = this.parametrosService.version;
    this.parametrosService.obtenerAmbiente().subscribe((ambiente: string) => this.ambiente = ambiente);
    this.parametrosService.obtenerUbicacionFisica().subscribe((ubicacionFisica: string) => this.ubicacionFisica = ubicacionFisica);
  }
}
