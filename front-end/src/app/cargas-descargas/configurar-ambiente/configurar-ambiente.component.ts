import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { TreeComponent, ITreeOptions, TreeModel } from 'angular-tree-component';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { AmbienteService } from './ambiente.service';
import { AmbienteDataView } from '../../shared/data-models/ambiente-data-view';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { TerminalService } from '../../shared/desplegable-terminal-login/terminal.service';
import { Terminal } from '../../shared/data-models/terminal';
import { EntityWithCode } from '../../core/models/entity-with-code';
import { AmbienteCommand } from '../../shared/data-models/commands/cargas-descargas/ambiente-command';
import { Collection } from '../../core/models/collection';
import { distinctUntilChanged, takeUntil, catchError } from 'rxjs/operators';
import { Resources } from '../../../locale/artifacts/resources';
import { Observable, ReplaySubject } from 'rxjs';
import { PopupService } from '../../core/services/popupService/popup.service';

@Component({
  selector: 'yrd-configurar-ambiente',
  templateUrl: './configurar-ambiente.component.html',
  styleUrls: ['./configurar-ambiente.component.css']
})
export class ConfigurarAmbienteComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('terminalesOperacionTree') terminalesOperacionTree: TreeComponent;

  public form: FormGroup;
  protected onDestroy: ReplaySubject<boolean> = new ReplaySubject(1);

  isLoading = false;

  listaTerminalesOperacion: EntityWithDescription[] = [];
  protected ambienteInicial: AmbienteDataView;

  private propietarioIdLDC = 1;

  readonly options: ITreeOptions  = {
    useCheckbox: true,
    displayField: 'descripcion',
    scrollContainer: document.body.parentElement as HTMLElement
  };

  readonly validationMessagesTipoAmbiente = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.TipoAmbiente)
  };

  readonly validationMessagesUbicacionFisica = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.UbicacionFisica)
  };

  readonly validationMessagesConexionSobresTransporte = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.ConexionSobresTransporte)
  };

  readonly validationMessagesconexionSAN = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.ConexionSAN)
  };

  constructor(private ambienteService: AmbienteService,
    private terminalService: TerminalService,
    protected readonly fcService: FormComponentService,
    private readonly fb: FormBuilder,
    private popupService: PopupService) { }

  ngOnInit() {
    this.inicializar();
  }

  ngAfterViewInit() {
    this.subscribirCambioDeTerminal();
  }

  ngOnDestroy(): void {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }

  private inicializar = () => {
    this.isLoading = true;
    this.createForm();
    this.terminalService.getAllByPropietario(this.propietarioIdLDC)
      .pipe(takeUntil(this.onDestroy)).subscribe((terminales: Terminal[]) => {
        this.listaTerminalesOperacion = terminales;
        this.ambienteService.getData().pipe(takeUntil(this.onDestroy)).subscribe((ambiente: AmbienteDataView) => {
          this.ambienteInicial = ambiente;
          this.fillControlsWithData(ambiente);
          this.subscribeCambioDetalle();
          this.isLoading = false;
        });
      });
  }

  private subscribirCambioDeTerminal () {
    this.subscribeToTreeModel(this.terminalesOperacionTree.treeModel, this.form.controls.terminales);
  }

  createForm() {
    this.form = this.fb.group({
        tipoAmbiente: [{ value: '', disabled: true }, Validators.required],
        ubicacionFisica: [{ value: '', disabled: true }, Validators.required],
        terminales: [{ value: null, disabled: true }, Validators.required],
        esAmbienteRemoto: [{ value: false, disabled: true }, Validators.required],
        esAmbienteDeConfiguracion: [{ value: false, disabled: true }, Validators.required],
        conexionSobresTransporte: [{ value: '', disabled: true }, Validators.required],
        conexionSAN: [{ value: '', disabled: true }, Validators.required],
      });
    this.fcService.initialize(this.form);
  }

  fillControlsWithData(data: AmbienteDataView): void {
    const dataView = this.toDataView(data);
    const esAmbienteDeConfiguracion = this.getBool(dataView.parametros['EsAmbienteDeConfiguracion']);

    this.fcService.setValue('tipoAmbiente', this.getString(dataView.parametros['Ambiente']), { onlySelf: true }, false);
    this.fcService.setValue('ubicacionFisica', this.getString(dataView.parametros['UbicacionFisica']), { onlySelf: true }, false);
    this.fcService.setValue('esAmbienteRemoto', this.getBool(dataView.parametros['EsAmbienteLocal']), { onlySelf: true }, true);
    this.fcService.setValue('esAmbienteDeConfiguracion',
      this.getBool(dataView.parametros['EsAmbienteDeConfiguracion']), { onlySelf: true }, false);
    this.fcService.setValue('conexionSobresTransporte',
      esAmbienteDeConfiguracion ? '' : this.getString(dataView.parametros['LinkedServerTransporte']),
      { onlySelf: true }, esAmbienteDeConfiguracion);
    this.fcService.setValue('conexionSAN', this.getString(dataView.parametros['EndpointSan']), { onlySelf: true }, false);
    this.fcService.setValue('terminales', dataView.terminales.map(t => Number(t.descripcion)), { onlySelf: true }, false);

    this.setTerminales(dataView.terminales.map(t => Number(t.descripcion)));
  }

  private subscribeToTreeModel(treeModel: TreeModel, control: AbstractControl) {
    treeModel.subscribeToState(() => {
      const values: number[] = [];
      const leafs = treeModel.selectedLeafNodeIds;
      for (const key of Object.keys(leafs)) {
        if (leafs.hasOwnProperty(key) && leafs[key]) {
          values.push(+key);
        }
      }
      control.setValue(values);
    });
  }

  private toDataView = (data: AmbienteDataView) => {
    const parametros = {};
    data.parametros.forEach((parametro: EntityWithCode) => {
        parametros[parametro.codigo] = parametro;
    });
    return {parametros: parametros, terminales: data.terminales};
  }

  private getString = (valor: any) => {
    return valor && valor.descripcion ? valor.descripcion : '';
  }

  private getBool = (valor: any) => {
    return valor && valor.descripcion ? valor.descripcion === '1' : false;
  }

  mapControlsToCommand(): AmbienteCommand {
    const command = new AmbienteCommand();
    const ambienteDataView = this.toDataView(this.ambienteInicial);

    command.parametros.push({
      ...ambienteDataView.parametros['Ambiente'],
      descripcion: this.fcService.getValue('tipoAmbiente') || ''
    });

    command.parametros.push({
      ...ambienteDataView.parametros['UbicacionFisica'],
      descripcion: this.fcService.getValue('ubicacionFisica') || ''
    });

    command.parametros.push({
      ...ambienteDataView.parametros['EsAmbienteDeConfiguracion'],
      descripcion: this.fcService.getValue('esAmbienteDeConfiguracion') ? '1' : '0'
    });

    command.parametros.push({
      ...ambienteDataView.parametros['LinkedServerTransporte'],
      descripcion: this.fcService.getValue('conexionSobresTransporte') || ''
    });

    command.parametros.push({
      ...ambienteDataView.parametros['EndpointSan'],
      descripcion: this.fcService.getValue('conexionSAN') || ''
    });

    const idTerminalesSeleccionadas = this.fcService.getValue('terminales');

    command.terminales = idTerminalesSeleccionadas.map(terminalId => {
      const terminal = ambienteDataView.terminales[0];
      return {
        ...terminal,
        codigo: terminalId,
      };
    });

    return command;
  }

  onClickAceptar() {
    const errors = new Collection<string>();
    this.fcService.validateForm(this.form.controls, errors, '');
    this.fcService.showValidationError(errors);

    if (this.fcService.isValidForm()) {
        const command = this.mapControlsToCommand();
        this.saveEditItem(command);
    }
  }

  onClickCancelar() {
    this.cancelar();
  }

  private cancelar() {
    this.form.reset();
    this.clearFormatosPatenteLists();
    this.inicializar();
    this.subscribirCambioDeTerminal();
  }

  protected saveEditItem(command: AmbienteCommand) {
    this.runAction(this.ambienteService.update(command),
                   this.getUpdateSuccessMessage(),
                   Resources.Labels.Modificar);
  }

  protected runAction(action: Observable<any>, messageSuccess: string, titleSuccess: string): void {
    this.isLoading = true;
    action.pipe(
        takeUntil(this.onDestroy),
        catchError((caught: Observable<any>) => {
          this.isLoading = false;
          return caught;
        })
      ).subscribe(() => {
        this.isLoading = false;
        this.cancelar();
        this.popupService.success(messageSuccess, titleSuccess);
      });
  }

  protected getUpdateSuccessMessage(): string {
    return Resources.Messages.LaEdicionDelXFueGuardadaConExito.format(Resources.Labels.Ambiente);
  }

  setTerminales(terminalesSeleccionadas: number[]) {
    this.selectNodes(terminalesSeleccionadas, this.terminalesOperacionTree.treeModel);
  }

  clearFormatosPatenteLists() {
    this.clearNodes(this.listaTerminalesOperacion, this.terminalesOperacionTree.treeModel);
  }

  private clearNodes(nodes: any[], treeModel: TreeModel) {
    nodes.forEach((node: any) => {
      const treeNode = treeModel.getNodeById(node.id);
      treeNode.setIsSelected(false);
    });
  }

  private selectNodes(nodesToSelect: number[], treeModel: TreeModel) {
    nodesToSelect.forEach((nodeToSelect: number) => {
      const node = treeModel.getNodeById(nodeToSelect);
      if (node) {
        node.setIsSelected(true);
      }
    });
  }

  private subscribeCambioDetalle() {
    this.subscribeCambioHabilitado();
  }

  private subscribeCambioHabilitado() {
    const esAmbienteDeConfiguracionControl = this.form.get('esAmbienteDeConfiguracion');
    const conexionSobresTransporteControl = this.form.get('conexionSobresTransporte');
    if (esAmbienteDeConfiguracionControl && conexionSobresTransporteControl) {
      esAmbienteDeConfiguracionControl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .pipe(distinctUntilChanged())
      .subscribe((value: boolean) => {
        if (value) {
          conexionSobresTransporteControl.disable();
          conexionSobresTransporteControl.setValue('');
        } else {
          conexionSobresTransporteControl.enable();
        }
      });
    }
  }
}
