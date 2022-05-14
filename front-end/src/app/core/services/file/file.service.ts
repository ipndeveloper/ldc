import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { ApiService } from '../restClient/api.service';
import { Observable } from 'rxjs';

export enum FileType {
  ZIP = 'application/zip, application/octet-stream',
  TXT = 'text/plain;charset=utf-8'
}

export enum FileExtension {
  ZIP = '.zip',
  TXT = '.txt'
}

export enum FileName {
  ARCHIVOMUESTRA = 'ArchivoMuestra',
  INTACTARR2 = 'IntactaRR2'
}

@Injectable()
export class FileService {

  private readonly apiRoute: string;

  constructor(private readonly apiService: ApiService) {
    this.apiRoute = 'archivos';
  }

  public get(idArchivo: number): Observable<any> {
    const query = this.apiRoute + '/' + idArchivo;
    return this.apiService.getBlob<any>(query);
  }

  public download(content: any, name: string, type: FileType, extension: FileExtension ): void {
    const dataBlob: Blob = new Blob([content], {
      type: type
    });
    FileSaver.saveAs(dataBlob, name + extension);
  }
}
