
export class ImportarExcelTarjetaCommand {
  archivos: ArchivoExcelCommand[];
}

export class ArchivoExcelCommand {
  contenido: number[];
  nombre: string;
  extension: string;
}
