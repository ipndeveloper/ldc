import { Directive, Output, HostListener, OnInit, OnDestroy, ElementRef, Input, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/restClient/api.service';
import { Subject, Observable, Subscription, timer } from 'rxjs';
import { takeUntil, take, map } from 'rxjs/operators';

@Directive({
  selector: '[yrdButton]'
})
export class ButtonDirective implements OnInit, OnDestroy {

  // README.

  // =============> QUE HACE       <=============
  // La idea de esta directiva es prevenir el doble click y multiples requests POST.

  // =============> COMO SE USA    <=============
  // Hay que poner yrdButton en el boton que queremos controlar y nada mas.

  // =============> COMO LO MANEJA <=============
  // Cuando se hace click en el boton, se deshabilita, seteando disableButton=true.
  // De ahi, emite el evento (click) para que se ejecute la logica definida en el boton donde se usa la directiva.
  // Luego comienza un timer en por defecto 5 segundos. Una vez expirado el timer, se vuelve a habilitar el boton.
  // Esto ultimo se hace porque si se ejecuta logica que no realiza ningun POST, tenemos que deshabilitar el boton.
  // Si comienza un POST mediante el apiService, el boton se bloquea hasta que finalice el POST.

  @Input() maxSeconds = 5;
  @Output() click = new EventEmitter();

  private readonly onDestroy = new Subject();
  disableButton = false;
  postOnGoing = false;
  timer$: Observable<number>;
  timerSuscription$: Subscription;
  contador: number;

  constructor(private readonly elementRef: ElementRef,
              private readonly apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.postBegin
      .pipe(takeUntil(this.onDestroy))
      .subscribe(_ => {
        this.disableButton = true;
        this.postOnGoing = true;
        if (this.timerSuscription$) {
          this.timerSuscription$.unsubscribe();
        }
        this.setEnableDisableButton();
      });

    this.apiService.postEnd
      .pipe(takeUntil(this.onDestroy))
      .subscribe(_ => {
        this.disableButton = false;
        this.postOnGoing = false;
        this.setEnableDisableButton();
      });
  }

  @HostListener('click', ['$event'])
  clickEvent(event: any) {

    if (event) {
      if ('preventDefault' in event) {
        event.preventDefault();
      }
      if ('stopPropagation' in event) {
        event.stopPropagation();
      }
    }

    if (!this.disableButton) {
      this.disableButton = true;
      this.setEnableDisableButton();

      this.contador = this.maxSeconds;
      this.timer$ = timer(0, 1000).pipe(
        take(this.contador),
        map(() => --this.contador)
      );

      this.timerSuscription$ = this.timer$.subscribe((val: number) => {
        if (val === 0 && !this.postOnGoing) {
          this.disableButton = false;
          this.setEnableDisableButton();
        } else if (val < 0) {
          this.timerSuscription$.unsubscribe();
        }
      });
    }
  }

  private setEnableDisableButton() {
    this.elementRef.nativeElement.disabled = this.disableButton;
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }

}
