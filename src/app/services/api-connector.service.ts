import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiConnectorService {
  constructor(private readonly http: HttpClient) {}

  getData<T>(url: string): Observable<T> {
    return this.http.get<T>(url).pipe(catchError(this.handleError));
  }

  // ToDo: Incorporate headers
  postData<T>(url: string, content: any) {
    return (
      this.http
        // .post<T>(url, content, httpOptions)
        .post<T>(url, content)
        .pipe(catchError(this.handleError))
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
