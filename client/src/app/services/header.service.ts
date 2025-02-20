import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private headerSubject = new BehaviorSubject<string>('Welcome'); // Default header
  header$ = this.headerSubject.asObservable(); // Observable to subscribe to header changes

  setHeader(header: string): void {
    this.headerSubject.next(header);
  }
}