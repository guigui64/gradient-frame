import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ColorsService } from '../colors.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  imageUrl = 'https://picsum.photos/500';

  constructor(
    private apiService: ApiService,
    private colorsService: ColorsService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.imageUrlEntered(this.imageUrl);
  }

  imageUrlEntered(url: string) {
    if (!url) {
      return;
    }
    this.imageUrl = url; // needed to display the image
    this.spinner.show();
    this.apiService.getColors(url).subscribe(colors => {
      this.colorsService.updateColors(colors);
      this.spinner.hide();
    });
  }
}
