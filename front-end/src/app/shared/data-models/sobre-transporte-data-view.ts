export class SobreTransporteDataView {
    id: number;
    nombre: string;
    usuarios: number[];
    detalle: DetalleSobreTransporteDataView;
}

export class DetalleSobreTransporteDataView {
    roles: RegistroDetalleSobreTransporteDataView[];
    usuarios: RegistroDetalleSobreTransporteDataView[];
    circuitos: RegistroDetalleSobreTransporteDataView[];
    rubrosCalidad: RegistroDetalleSobreTransporteDataView[];
    autorizacionesBalanza: RegistroDetalleSobreTransporteDataView[];
    tipoDispositivoPorProducto: RegistroDetalleSobreTransporteDataView[];
}

export class RegistroDetalleSobreTransporteDataView {
    idTablaTransporte: number;
    clavePrimaria: number;
    nombre: string;
    hijos: RegistroDetalleSobreTransporteDataView[];
}
