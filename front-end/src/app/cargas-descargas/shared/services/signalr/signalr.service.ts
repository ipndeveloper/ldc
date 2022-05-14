import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
// import { UrlService } from '../../../../core/services/restClient/url.service';
import { BalanzaAutomatizadaLog } from '../../../../shared/data-models/balanza-automatizada-log';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private hubConnection: HubConnection;
  // private signalRApiUrl = '';
  @Output() logBalanza: EventEmitter<BalanzaAutomatizadaLog> = new EventEmitter();

  constructor(/*private readonly urlService: UrlService*/) {
     // this.signalRApiUrl = this.urlService.getSignalRApiUrl();
  }

  public startConnection = (tokenYard: string) => {
    this.hubConnection = new HubConnectionBuilder()
                            .configureLogging(LogLevel.Trace)
                            .withUrl('http://arrosvmweb58:8050/Ldc.SignalR.Web.Api/scalehub', {
                              accessTokenFactory: () => Promise.resolve(tokenYard),
                              transport: HttpTransportType.LongPolling
                            }).build();
    this.hubConnection.start()
                      .then(() => console.log('Se inicio la conexión'))
                      .catch( error => console.log('Ocurrio el siguiente error ' + error));
  }

  public stopConnection = () => {
    this.hubConnection.stop();
  }

  public addBalanzaAutomatizadaMessageListener = () => {
    this.hubConnection.on('BalanzaAutomatizadaMessage', (message: BalanzaAutomatizadaLog) => {
      this.logBalanza.emit(message);
    });
  }
}
