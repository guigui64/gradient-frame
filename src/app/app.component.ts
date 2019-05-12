import { Component, OnInit } from '@angular/core';
import { Color, inverseColor, meanColor, luminanceFrom, WHITE, BLACK, DEFAULT_COLOR_1, DEFAULT_COLOR_2 } from './utilities/colors';
import { ColorsService } from './colors.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private colorsService: ColorsService) {
  }
  title = 'gradient-frame';

  color1 = DEFAULT_COLOR_1;
  color2 = DEFAULT_COLOR_2;

  containerStyles = { // TODO use css variables
    background: '',
    color: '',
  };
  ngOnInit(): void {
    this.colorsService.colors$.subscribe((colors: Color[]) => {
      [this.color1, this.color2] = colors;
      this.updateStyles();
    });
    this.updateStyles();
  }

  updateStyles(): void {
    this.containerStyles.background = `linear-gradient(to right, ${this.color1.toRGBAString()}, ${this.color2.toRGBAString()})`;
    this.containerStyles.color = luminanceFrom(meanColor(this.color1, this.color2)) > .5 ? 'black' : 'white';
  }

  inverseAll() {
    this.color1 = inverseColor(this.color1);
    this.color2 = inverseColor(this.color2);
    this.updateStyles();
  }

  fullWhite() {
    this.color1 = WHITE;
    this.color2 = WHITE;
    this.updateStyles();
  }

  fullBlack() {
    this.color1 = BLACK;
    this.color2 = BLACK;
    this.updateStyles();
  }

  blackAndWhite() {
    this.color1 = BLACK;
    this.color2 = WHITE;
    this.updateStyles();
  }
}
