import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  BLACK,
  WHITE,
  Color,
  luminanceFrom,
  meanColor
} from '../utilities/colors';
import { ColorsService } from '../colors.service';
import { Unsubscribable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  selected: string = 'main'; // TODO: set according to route

  navStyles = {};

  private _subscription: Unsubscribable;

  constructor(private colorsService: ColorsService) {}

  ngOnInit() {
    this._subscription = this.colorsService.colors$.subscribe(
      (colors: Color[]) => {
        this.updateStyles(luminanceFrom(meanColor(colors)) < 0.5);
      },
      error => console.error('Impossible to subscribe to colors service', error)
    );
    this.updateStyles(
      luminanceFrom(meanColor(this.colorsService.getColors())) < 0.5
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  updateStyles(isDark: boolean): void {
    this.navStyles['background-color'] = `${(isDark
      ? BLACK
      : WHITE
    ).toRGBAString(0.5)}`;
  }
}
