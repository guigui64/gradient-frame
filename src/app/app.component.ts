import { Component, OnInit, OnDestroy } from '@angular/core';
import { Color, inverseColor, meanColor, luminanceFrom, WHITE, BLACK, DEFAULT_COLOR_1, DEFAULT_COLOR_2 } from './utilities/colors';
import { ColorsService } from './colors.service';
import { Unsubscribable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  private _subscription: Unsubscribable;

  constructor(private colorsService: ColorsService) {
  }
  title = 'gradient-frame';

  containerStyles = {
    background: '',
    color: '',
  };

  ngOnInit(): void {
    this._subscription = this.colorsService.colors$.subscribe(
      (colors: Color[]) => this.updateStyles(colors),
      (error) => console.error('Impossible to subscribe to colors service', error));
    this.updateStyles([DEFAULT_COLOR_1, DEFAULT_COLOR_2]);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  updateStyles(colors: Color[]): void {
    this.containerStyles.background = `linear-gradient(to right, ${colors[0].toRGBAString()}, ${colors[1].toRGBAString()})`;
    this.containerStyles.color = luminanceFrom(meanColor(colors)) > .5 ? 'black' : 'white';
  }
}
