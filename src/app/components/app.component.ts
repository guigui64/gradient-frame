import { Component, OnInit } from '@angular/core';
import { Color, inverseColor, meanColor } from '../utilities/colors';

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
    this.containerStyles.color = inverseColor(meanColor(this.color1, this.color2)).toRGBAString();
  }

  containerStyles = {
    background: "",
    color: "",
    // textShadow: "-1px 0 1px rgba(0, 0, 0, 0.3), 0 1px 1px rgba(0, 0, 0, 0.3), 1px 0 1px rgba(0, 0, 0, 0.3), 0 -1px 1px rgba(0, 0, 0, 0.3)",
  }

  inverseAll() {
    this.color1 = inverseColor(this.color1);
    this.color2 = inverseColor(this.color2);
    this.updateStyles();
  }
}
