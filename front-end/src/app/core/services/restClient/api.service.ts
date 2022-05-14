import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RequestOptionsService } from './requestOptions.service';
import { RestHandlerService } from './restHandler.service';
import { Dictionary } from '../../models/dictionary';
import { UrlService } from './url.service';

@Injectable()
export class ApiService {

  postBegin = new EventEmitter();
  postEnd = new EventEmitter();
  apiURL = '';

  constructor(private readonly http: HttpClient,
              private readonly restHandlerService: RestHandlerService,
              private readonly requestOptionsService: RequestOptionsService,
              private readonly urlService: UrlService) {
    this.apiURL = this.urlService.getApiUrl();
  }

  getBlob<T>(prefix: string): Observable<T> {
    return this.http
      .get<T>(`${this.apiURL}/${prefix}`, this.requestOptionsService.applyForBlob())
      .pipe(catchError(err => this.handleError(err)));
  }

  get<T>(prefix: string): Observable<T> {
    return this.http
      .get<T>(`${this.apiURL}/${prefix}`, this.requestOptionsService.apply())
      .pipe(catchError(err => this.handleError(err)));
  }

  getWithCustomHandlingError<T>(prefix: string): Observable<T> {
    return this.http.get<T>(`${this.apiURL}/${prefix}`, this.requestOptionsService.apply());
  }

  post<T>(prefix: string, objectToPost: any): Observable<T> {
    return this.excecutePost<T>(`${this.apiURL}/${prefix}`, objectToPost);
  }

  postWithCustomUrl<T>(url: string, objectToPost: any): Observable<T> {
    return this.excecutePost<T>(url, objectToPost);
  }

  private excecutePost<T>(url: string, objectToPost: any): Observable<T> {
    this.postBegin.emit();
    return this.http
      .post<T>(`${url}`, JSON.stringify(objectToPost), this.requestOptionsService.apply())
      .pipe(
        catchError(err => {
          this.postEnd.emit();
          return this.handleError(err);
        }),
        map(obs => {
          this.postEnd.emit();
          return obs;
        })
      );
  }

  put<T>(prefix: string, objectToPut: any): Observable<T> {
    return this.http
      .put<T>(`${this.apiURL}/${prefix}`, JSON.stringify(objectToPut), this.requestOptionsService.apply())
      .pipe(catchError(err => this.handleError(err)));
  }

  patch<T>(prefix: string, objectToPatch: any): Observable<T> {
    return this.http
      .patch<T>(`${this.apiURL}/${prefix}`, JSON.stringify(objectToPatch), this.requestOptionsService.apply())
      .pipe(catchError(err => this.handleError(err)));
  }

  delete(prefix: string, id: number): Observable<Object> {
    return this.http
      .delete(`${this.apiURL}/${prefix}/${id}`, this.requestOptionsService.apply())
      .pipe(catchError(err => this.handleError(err)));
  }

  deleteComplexId<T>(prefix: string, dict: Dictionary<string>): Observable<Object> {
    return this.http
      .delete<T>(`${this.apiURL}/${prefix}?${dict.queryfy()}`, this.requestOptionsService.apply())
      .pipe(catchError(err => this.handleError(err)));
  }

  private handleError(error: HttpErrorResponse) {
    return this.restHandlerService.handleError(error);
  }
}
