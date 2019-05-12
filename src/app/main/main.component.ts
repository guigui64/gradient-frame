import { Component, OnInit } from '@angular/core';
import { GradientFrameApiService } from '../gradient-frame-api.service';
import { ColorsService } from '../colors.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  imageUrl = '';

  constructor(private apiService: GradientFrameApiService, private colorsService: ColorsService) { }

  ngOnInit() {
  }

  imageUrlEntered(url: string) {
    if (!url) { return; }
    this.imageUrl = url; // needed to display the image
    this.colorsService.updateColors(this.apiService.getColors(url));
  }

}
