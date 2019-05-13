import { Component, OnInit } from '@angular/core';
import { BLACK, WHITE, Color, luminanceFrom, meanColor } from '../utilities/colors';
import { Unsubscribable } from 'rxjs';
import { ColorsService } from '../colors.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  footerStyles = {
    "box-shadow": `0 3px 5px ${BLACK.toRGBAString(.3)}`,
    "background-color": `${WHITE.toRGBAString(.5)}`,
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
    this.footerStyles["background-color"] = `${(isDark ? BLACK : WHITE).toRGBAString(.5)}`;
  }

}
