import { Component, Input,  OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { DropdownComponent } from '../../../../core/shared/super/dropdown.component';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { MovimientoPesaje } from '../../movimiento-pesaje';
import { Observable, of, Subscription } from 'rxjs';
import { CondicionManipuleo } from '../../../../shared/data-models/condicion-manipuleo';
import { CondicionManipuleoService } from '../condicion-manipuleo.service';
import { CommandService, Command } from '../../../../shared/command-service/command.service';
import { MovimientoCarga } from '../../../../shared/data-models/movimiento-carga';
import { tiposMovimientos } from '../../../../shared/data-models/tipo-movimiento';
import { Resources } from '../../../../../locale/artifacts/resources';
import { ConsultarStockService } from '../../consultar-stock.service';
import { ConsultarStockDataView } from '../../../../shared/data-models/consulta-stock-data-view';
import { PopupService } from '../../../../core/services/popupService/popup.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as HttpStatus from 'http-status-codes';
import { ConsultarCantidadEstimadaDataView } from '../../../../shared/data-models/consultar-cantidad-estimada-data-view';

@Component({
  selector: 'yrd-desplegable-condicion-manipuleo',
  templateUrl: './desplegable-condicion-manipuleo.component.html',
  styleUrls: ['./desplegable-condicion-manipuleo.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableCondicionManipuleoComponent }
  ]
})
export class DesplegableCondicionManipuleoComponent
  extends DropdownComponent<CondicionManipuleo>
  implements OnChanges {
  @Input() control: FormControl;
  @Input() movimientoPesaje: MovimientoPesaje;
  @Input() movimientoCarga: MovimientoCarga;
  @Input() ordenPlataforma: number;
  @Input() deshabilitarActualizarManipuelo = false;
  @Input() esConsulta = false;
  @Input() esSalida = false;
  @Input() esCarga = false;
  @Input() idViaje: number;
  @Input() pesoNeto: number;
  @Output() disponibilidadCondicionManipuleo: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() stockDisponible: EventEmitter<ConsultarStockDataView> = new EventEmitter<ConsultarStockDataView>();
  @Output() actualizarCantidadEstimada: EventEmitter<number> = new EventEmitter<number>();

  condicionManipuleoService: CondicionManipuleoService;
  subscription: Subscription;
  stockFisico = '';
  stockTitular = '';

  get lugarDescargaCarga(): string {
    if (this.movimientoPesaje) {
      return this.movimientoPesaje.lugarDescargaCarga;
    }
    if (this.movimientoCarga) {
      return this.movimientoCarga.lugarCarga;
    }
    return '';
  }

  get descripcionTipoMovimiento() {
    let descripcionTipoMovimiento: string | undefined = Resources.Labels.DescargaCarga;

    if (this.movimientoCarga && this.movimientoCarga !== undefined && this.movimientoCarga.circuito) {
      const tipoMovimiento = tiposMovimientos.find(tm => tm.id === this.movimientoCarga.circuito.idTipoMovimiento);
      descripcionTipoMovimiento = tipoMovimiento ? tipoMovimiento.descripcion : Resources.Labels.DescargaCarga;
    }
    if (this.movimientoPesaje && this.movimientoPesaje !== undefined) {
      const tipoMovimiento = tiposMovimientos.find(tm => tm.id === this.movimientoPesaje.idTipoMovimiento);
      descripcionTipoMovimiento = tipoMovimiento ? tipoMovimiento.descripcion : Resources.Labels.DescargaCarga;
    }

    if (descripcionTipoMovimiento) {
      return descripcionTipoMovimiento.toLocaleLowerCase();
    }
  }

  get esPesaje(): boolean {
    return this.movimientoPesaje !== undefined;
  }

  get mostrarActualizar(): boolean {
    return this.esCarga ? true : !this.esSalida;
  }

  constructor(condicionManipuleoService: CondicionManipuleoService,
              private readonly commandService: CommandService,
              private readonly consultarStockService: ConsultarStockService,
              private readonly popupService: PopupService) {
    super(condicionManipuleoService);

    this.condicionManipuleoService = condicionManipuleoService;
    this.commandService.commands.subscribe((c) => { this.handleCommand(c); });
  }

  handleCommand(command: Command) {
    if (command.name === 'Actualizar') {
      this.actualizar();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes['movimientoPesaje']
        && (!changes.movimientoPesaje.previousValue
          || changes.movimientoPesaje.previousValue.idCondicionManipuleo !== changes.movimientoPesaje.currentValue.idCondicionManipuleo)
      || (changes['movimientoCarga']
        && (!changes.movimientoCarga.previousValue
          || changes.movimientoCarga.previousValue.condicionManipuleo.id !== changes.movimientoCarga.currentValue.condicionManipuleo.id))
      || (changes['pesoNeto'])
        && (!changes.pesoNeto.previousValue
          || changes.pesoNeto.previousValue !== changes.pesoNeto.currentValue)) {
      this.actualizar();
    }
  }

  protected getData(): Observable<CondicionManipuleo[]> {
    if (this.movimientoPesaje) {
      return this.getCondicionManipuleoPesaje();
    }
    if (this.movimientoCarga) {
      return this.getCondicionManipuleoCarga();
    }
    return of([]);
  }

  protected getCondicionManipuleoPesaje(): Observable<CondicionManipuleo[]> {
    if (this.movimientoPesaje) {
      return this.condicionManipuleoService.getCondicionManipuleoPorParametros(this.movimientoPesaje.producto.id,
                                                                               this.movimientoPesaje.humedad,
                                                                               this.movimientoPesaje.proteina,
                                                                               this.movimientoPesaje.grado,
                                                                               this.movimientoPesaje.idTipoTransporte,
                                                                               this.movimientoPesaje.idTipoMovimiento);
    } else {
      return of([]);
    }
  }

  protected getCondicionManipuleoCarga(): Observable<CondicionManipuleo[]> {
    if (this.movimientoCarga && this.movimientoCarga.circuito) {
      return this.condicionManipuleoService.getCondicionManipuleoCargaPorParametros(this.movimientoCarga.producto.id,
                                                                                    this.movimientoCarga.circuito.idTipoTransporte,
                                                                                    this.movimientoCarga.circuito.idTipoMovimiento);
    } else {
      return of([]);
    }
  }

  actualizar() {
    this.getData().subscribe(entities => {
      if (entities && entities[ 0 ]) {
        const newEntities = this.map(entities);
        if (!this.entities ||
            this.entities.length === 0 ||
            newEntities.length === 0 ||
            !this.objectsAreSame(this.entities, newEntities)) {
          this.entities = newEntities;
        }
        if (this.esCarga) {
          const selectedEntity = this.entities.find(entity => entity.id === this.writtenSelectedEntityId);
          this.SelectedEntity = selectedEntity !== undefined ? selectedEntity : this.entities[0];
          this.obtenerStock(this.selectedEntity.id);
        } else {
          if (this.ordenPlataforma && entities.length >= this.ordenPlataforma) {
            this.SelectedEntity = entities[ this.ordenPlataforma - 1 ];
          } else {
            this.SelectedEntity = entities[ 0 ];
          }
        }
        this.disponibilidadCondicionManipuleo.emit(true);
      } else {
        this.entities = entities;
        this.control.setValue(undefined, {onlySelf: true, emitEvent: false});
        this.limpiarControlesCondicionManipuleo();
        this.disponibilidadCondicionManipuleo.emit(false);
        this.stockDisponible.emit();
        this.obtenerCantidadEstimada();
      }
    });
  }

  limpiarControlesCondicionManipuleo() {
    if (this.selectedEntity) {
      this.selectedEntity.grado = null;
      this.selectedEntity.humedadMin = null;
      this.selectedEntity.humedadMax = null;
      this.selectedEntity.proteinaMin = null;
      this.selectedEntity.proteinaMax = null;
    }
    this.stockFisico = '';
    this.stockTitular = '';
  }

  onChange(value: string): void {
    super.onChange(value);
    if (this.esCarga && +value > 0) {
      this.obtenerStock(+value);
    }
  }

  private obtenerCantidadEstimada(): void {
    if (this.esCarga && this.movimientoPesaje) {
      const idMovimiento = this.movimientoPesaje.id;
      this.consultarStockService.getCantidadEstimada(idMovimiento)
        .subscribe((cantidad: ConsultarCantidadEstimadaDataView) => {
        if (cantidad && cantidad.cantidadEstimada) {
          this.actualizarCantidadEstimada.emit(cantidad.cantidadEstimada);
        }
      });
    }
  }

  private obtenerStock(idManipuleo?: number): void {
    const idMovimiento = this.movimientoCarga ? this.movimientoCarga.id
                                              : this.movimientoPesaje.id;
    const busquedaConsulta = this.esConsulta || this.esSalida;
    this.consultarStockService.getStockDisponible(idMovimiento, busquedaConsulta, idManipuleo, this.idViaje, this.pesoNeto)
      .subscribe((stock: ConsultarStockDataView) => {
        this.stockFisico = stock.stockFisico;
        this.stockTitular = stock.stockTitular;
        if (stock.stockFisicoInsuficiente && !busquedaConsulta) {
          this.popupService.error(Resources.Messages.ElStockFisicoEsInsuficiente);
        }
        if (stock.stockTitularInsuficiente && !busquedaConsulta) {
          this.popupService.error(Resources.Messages.ElStockTitularEsInsuficiente);
        }
        this.stockDisponible.emit(stock);
      }, (error: HttpErrorResponse) => {
        if (error.status === HttpStatus.BAD_GATEWAY) {
          if (this.esPesaje) {
            this.popupService.warning(Resources.Messages.noSePuedeObtenerStockFisicoTitular, Resources.Messages.errorConexionSAN);
          } else {
            this.popupService.error(Resources.Messages.noSePuedeObtenerStockFisicoTitular, Resources.Messages.errorConexionSAN);
          }
        }
      }
    );
  }
}
