import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  zone: any;
  apiEndpoint = 'http://localhost/webapi'
  constructor() { }
}
