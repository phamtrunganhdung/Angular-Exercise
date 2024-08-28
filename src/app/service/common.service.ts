import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  generateNewId() {
    return Date.now().toString();
  }
}
