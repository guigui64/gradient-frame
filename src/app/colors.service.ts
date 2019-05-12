import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Color, DEFAULT_COLOR_1, DEFAULT_COLOR_2 } from './utilities/colors';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {
  colors$: Observable<Color[]>;
  private colorsSubject: Subject<Color[]>;
  private colors: Color[];

  constructor() {
    this.colors = [DEFAULT_COLOR_1, DEFAULT_COLOR_2];
    this.colorsSubject = new Subject<Color[]>();
    this.colorsSubject.next(this.colors);
    this.colors$ = this.colorsSubject.asObservable();
  }

  updateColors(colors: Color[]) {
    this.colors = colors;
    this.colorsSubject.next(this.colors);
  }
}
