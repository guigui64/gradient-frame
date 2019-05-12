import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  imageUrl = '';

  constructor() { }

  ngOnInit() {
  }

  imageUrlEntered(url: string) {
    this.imageUrl = url;
    // TODO clarifai colors + service
  }

}
