import { Component, OnInit } from '@angular/core';
import { Color, inverseColor, meanColor, luminanceFrom, WHITE, BLACK } from '../utilities/colors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'gradient-frame';

  color1: Color = new Color(0, 184, 255);
  color2: Color = new Color(0, 90, 255);

  constructor() {
  }

  ngOnInit(): void {
    this.updateStyles();
  }

  updateStyles(): void {
    this.containerStyles.background = `linear-gradient(to right, ${this.color1.toRGBAString()}, ${this.color2.toRGBAString()})`;
    this.containerStyles.color = luminanceFrom(meanColor(this.color1, this.color2)) > .5 ? 'black' : 'white';
  }

  containerStyles = { // TODO use css variables
    background: "",
    color: "",
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
