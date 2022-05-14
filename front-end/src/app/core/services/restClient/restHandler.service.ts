import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import * as HttpStatus from 'http-status-codes';
import { PopupService } from '../popupService/popup.service';

@Injectable()
export class RestHandlerService {

  constructor(private readonly popupService: PopupService) {
  }

  handleError(errorResponse: HttpErrorResponse) {

    console.error('An error has occurred', errorResponse);

    if (errorResponse.error instanceof ErrorEvent) {
      const errorEvent = errorResponse.error as ErrorEvent; // asd

      console.error('Client detail', errorEvent);

      this.popupService.error(errorEvent.message, 'Error de conexión');

    } else {
      const error = errorResponse.error;

      console.error('Server detail', error);

      switch (errorResponse.status) {
        case HttpStatus.INTERNAL_SERVER_ERROR:
          this.popupService.info(error.message, 'Error inesperado');
          break;
        case HttpStatus.UNPROCESSABLE_ENTITY:
          this.popupService.error(error.message, 'Error de validación');
          break;
        case HttpStatus.CONFLICT:
          this.popupService.error(error.message, 'Conflicto');
          break;
        case HttpStatus.UNAUTHORIZED:
          this.popupService.error('Credenciales incorrectas');
          break;
        case HttpStatus.BAD_GATEWAY:
          this.popupService.info(error.message, 'Error servicio');
          break;
      }
    }

    return throwError(errorResponse);
  }
}
