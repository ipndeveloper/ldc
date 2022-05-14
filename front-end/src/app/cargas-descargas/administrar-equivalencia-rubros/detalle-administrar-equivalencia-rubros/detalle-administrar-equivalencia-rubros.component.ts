import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Resources } from '../../../../locale/artifacts/resources';
import { DesplegableCamaraComponent } from '../../../shared/desplegable-camara/desplegable-camara.component';
import { distinctUntilChanged } from 'rxjs/operators';
import { Producto } from '../../../shared/data-models/producto';
import { DesplegableRubroCalidadComponent } from '../../../shared/desplegable-rubro-calidad/desplegable-rubro-calidad.component';
import { EntityWithDescription } from '../../../core/models/entity-with-description';

@Component({
  selector: 'yrd-detalle-administrar-equivalencia-rubros',
  templateUrl: './detalle-administrar-equivalencia-rubros.component.html',
  styleUrls: ['./detalle-administrar-equivalencia-rubros.component.css']
})

export class DetalleAdministrarEquivalenciaRubrosComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() esConsulta = false;
  @Input() esModificacion = false;
  @Input() isLoading = false;
  @ViewChild('camara') camara: DesplegableCamaraComponent;
  @ViewChild('rubro') rubro: DesplegableRubroCalidadComponent;

  get detalleDeshabilitado() {
    return this.form.status === 'DISABLED';
  }

  get formProducto(): EntityWithDescription {
    return this.form.controls.producto.value;
  }

  validationMessagesCamara = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Camara)
  };

  validationMessagesProducto = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Producto)
  };

  validationMessagesRubro = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Rubro)
  };

  validationMessagesCodigo = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Codigo)
  };

  validationMessagesCodigoTipo = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.CodigoTipo)
  };

  constructor() { }

  ngOnInit() {
  }

  setFocus(): void {
    setTimeout(() => this.camara.setFocus(), 0);
  }

  subscribeProductoChanges(): void {
    const productoControl = this.form.get('producto');
    if (productoControl) {
      productoControl.valueChanges.pipe(distinctUntilChanged())
                                  .subscribe((value: Producto) => {
        this.rubro.producto = value;
      });
    }
  }

}
