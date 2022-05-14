import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PageStateService {

  constructor() {
  }

  saveState(state: any, name: string): void {
    sessionStorage.setItem(environment.pageStateKey, JSON.stringify({ name, state }));
  }

  getState(name: string): any {
    const item = sessionStorage.getItem(environment.pageStateKey);
    if (item) {
      const currentState = JSON.parse(item);
      if (currentState) {
        this.deleteState();
        if (currentState.name === name) {
          return currentState.state;
        }
      }
    }
    return null;
  }

  deleteState(): void {
    sessionStorage.removeItem(environment.pageStateKey);
  }
}
