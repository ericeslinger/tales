import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  private titleSubject = new BehaviorSubject<string>('');
  public title = this.titleSubject.asObservable();
  constructor() {}
  setTitle(t: string) {
    this.titleSubject.next(t);
  }
}
