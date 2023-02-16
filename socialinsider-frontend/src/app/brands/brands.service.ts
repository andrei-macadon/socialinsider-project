import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { BACKEND_URL, PAYLOAD_BRANDS } from '../utils';
import { BrandPayload, IBrand } from './brand';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private brandUrl: string = `${BACKEND_URL}/brands`;

  constructor(private http: HttpClient) {}

  getBrands(): Observable<IBrand[]> {
    return this.http.post<BrandPayload>(this.brandUrl, PAYLOAD_BRANDS).pipe(
      map((data) => data.result),
      tap((data) =>
        console.log(
          'Brands info retrieved from the backend: ' + JSON.stringify(data)
        )
      ),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client side error occured
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues to what went wrong
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
