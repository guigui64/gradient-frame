import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { Color, parseHexa, DEFAULT_COLOR_1, DEFAULT_COLOR_2 } from './utilities/colors';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl: string;
  imageUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
    this.imageUrl = this.apiUrl + '/imageurl';
  }

  getColors(imgUrl: string): Observable<Color[]> {
    return this.http.post<string[]>(this.imageUrl, { "url": imgUrl }, httpOptions)
      .pipe(
        map(strs => strs.map(s => parseHexa(s))),
        catchError(this.handleError<Color[]>('getColors', [DEFAULT_COLOR_1, DEFAULT_COLOR_2])));
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(operation, 'failed:', error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
