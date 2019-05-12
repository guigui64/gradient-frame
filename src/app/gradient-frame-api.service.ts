import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Color, parseHexa } from './utilities/colors';

@Injectable({
  providedIn: 'root'
})
export class GradientFrameApiService {

  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.gradientFrameApiUrl;
  }

  getColors(imgUrl: string): Color[] {
    return [
      '#2d75ac',
      '#d87561'
    ].map(s => parseHexa(s)); // TODO service/observable etc.
  }

}
