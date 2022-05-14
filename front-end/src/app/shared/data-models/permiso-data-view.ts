export class PermisoDataView {
    public id: number;
    public nombre: string;
    public hijos?: PermisoDataView[];
}

export class PermisoPadreHijoDataView {
    public id: number;
    public descripcion: string;
}
