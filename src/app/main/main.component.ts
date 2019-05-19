import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ColorsService } from '../colors.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  imageUrl = 'assets/logo.png';

  constructor(private apiService: ApiService, private colorsService: ColorsService) { }

  ngOnInit() {
  }

  imageUrlEntered(url: string) {
    if (!url) { return; }
    this.imageUrl = url; // needed to display the image
    this.apiService.getColors(url).subscribe(colors => this.colorsService.updateColors(colors));
  }

}
