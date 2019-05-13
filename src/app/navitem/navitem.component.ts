import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BLACK, WHITE, Color, luminanceFrom, meanColor } from '../utilities/colors';
import { ColorsService } from '../colors.service';
import { Unsubscribable } from 'rxjs';

@Component({
  selector: 'app-navitem',
  template: `<a (mouseenter)="hover=true" (mouseleave)="hover=false" [ngStyle]="hover ? hoverStyle : style">{{text}} <span *ngIf="selected" class="sr-only">(current)</span></a>`,
  styles: [`a {
              float: left;
              text-align: center;
              padding: 14px 16px;
              text-decoration: none;
              cursor: pointer;
            }`]
})
export class NavitemComponent implements OnInit, OnDestroy {
  @Input() selected: boolean;
  @Input() text: string;

  hover = false;

  style = {
    color: BLACK.toRGBAString(),
  };

  hoverStyle = {
    "background-color": WHITE.toRGBAString(.5),
    ...this.style
  };

  private _subscription: Unsubscribable;

  constructor(private colorsService: ColorsService) { }

  ngOnInit() {
    this._subscription = this.colorsService.colors$.subscribe(
      (colors: Color[]) => {
        this.updateStyles(luminanceFrom(meanColor(colors)) < .5);
      },
      (error) => console.error('Impossible to subscribe to colors service', error));
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  updateStyles(isDark: boolean): void {
    this.style.color = `${(isDark ? WHITE : BLACK).toRGBAString()}`;
  }

}
