import { Component, OnInit } from '@angular/core';
import { ColorsService } from '../colors.service';

import { faFill } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {

  faFill = faFill;

  constructor(private colorsService: ColorsService) { }

  ngOnInit() {
  }

  inverse(): void {
    this.colorsService.inverseColors();
  }

}
