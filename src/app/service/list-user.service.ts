import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, Observable, throwError } from 'rxjs';

import { UserPage } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class ListUserService {
  private API_URL: string = 'https://reqres.in';
  constructor(private http: HttpClient) {}

  getListUserByPage(page: number): Observable<UserPage> {
    return this.http
      .get<UserPage>(`${this.API_URL}/api/users?page=${page}`)
      .pipe(
        catchError((error) => {
          console.error('Error occurred:', error);
          return throwError(() => new Error('Failed to fetch user data'));
        })
      );
  }
}
