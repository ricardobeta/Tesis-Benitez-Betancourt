import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NegocioService {

  public idNegocio = new BehaviorSubject<string>(null);

  constructor() { }
}
