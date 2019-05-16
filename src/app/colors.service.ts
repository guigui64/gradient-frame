import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Color, DEFAULT_COLOR_1, DEFAULT_COLOR_2, inverseColor } from './utilities/colors';

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
    this.updateSubject();
    this.colors$ = this.colorsSubject.asObservable();
  }

  private updateSubject(): void {
    this.colorsSubject.next(this.colors);
  }

  updateColors(colors: Color[]) {
    this.colors = colors;
    this.updateSubject();
  }

  inverseColors() {
    this.colors = this.colors.map(color => inverseColor(color));
    this.updateSubject();
  }

  getColors(): Color[] {
    return this.colors;
  }
}
