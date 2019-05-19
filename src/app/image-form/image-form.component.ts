import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.css']
})
export class ImageFormComponent implements OnInit {
  imageUrl = '';
  @Output() imageUrlEntered = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  frame(): void {
    this.imageUrlEntered.emit(this.imageUrl);
  }
}
