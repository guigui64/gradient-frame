import { Component, OnInit, Input } from '@angular/core';
import { Unsubscribable } from 'rxjs';
import { ColorsService } from '../colors.service';
import { DEFAULT_COLOR_1, DEFAULT_COLOR_2, Color, luminanceFrom, meanColor, BLACK, inverseColor } from '../utilities/colors';
import { faFill, faArrowUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  template: `<button (mouseenter)="hover=true" (mouseleave)="hover=false" [ngStyle]="hover ? hoverStyles : styles">
              <ng-container [ngSwitch]="faIcon">
              <fa-icon *ngSwitchCase="'faFill'" [icon]="faFill" size="lg"></fa-icon>
              <fa-icon *ngSwitchCase="'faArrowUp'" [icon]="faArrowUp" size="lg"></fa-icon>
              </ng-container>
              {{text}}
            </button>
            `,
  styles: [
    `button {
      padding: 10px;
      border: 0;
      cursor: pointer;
    }`,
    `button:hover,
    button:focus {
      background-color: ${BLACK.toRGBAString(.5)};
    }`,
    `button:active {
      transform: scale(0.9);
    }`
  ]
})
export class ButtonComponent implements OnInit {

  @Input() text: string;
  @Input() faIcon: string;

  faFill = faFill;
  faArrowUp = faArrowUp;

  private _subscription: Unsubscribable;

  constructor(private colorsService: ColorsService) {
  }

  hover = false;

  styles = {
    background: '',
    color: '',
  };

  hoverStyles = {
    ...this.styles,
  }

  ngOnInit(): void {
    this._subscription = this.colorsService.colors$.subscribe(
      (colors: Color[]) => {
        this.updateStyles(colors);
      },
      (error) => console.error('Impossible to subscribe to colors service', error));
    this.updateStyles([DEFAULT_COLOR_1, DEFAULT_COLOR_2]);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  updateStyles(colors: Color[]): void {
    this.styles.background = `linear-gradient(to right, ${colors[0].toRGBAString()}, ${colors[1].toRGBAString()})`;
    const isLight = luminanceFrom(meanColor(colors)) > .5;
    this.styles.color = isLight ? 'black' : 'white';
    const offset = isLight ? +100 : -100;
    const hoverColor1 = new Color(
      colors[0].red + offset,
      colors[0].green + offset,
      colors[0].blue + offset,
    );
    const hoverColor2 = new Color(
      colors[1].red + offset,
      colors[1].green + offset,
      colors[1].blue + offset,
    );
    this.hoverStyles.background = `linear-gradient(to right, ${hoverColor1.toRGBAString()}, ${hoverColor2.toRGBAString()})`;
    this.hoverStyles.color = this.styles.color;
  }

}
