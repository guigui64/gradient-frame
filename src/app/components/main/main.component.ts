import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  imageUrl = "";
  // imageUrl = "https://clarifai.com/cms-assets/20180320213202/color-001.jpg";

  constructor() { }

  ngOnInit() {
  }

}
