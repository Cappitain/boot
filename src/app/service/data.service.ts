import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  zones: any;
  selectedzones: any;
  booths: any;
  selectedBooth: any;
  apiEndpoint = 'http://localhost/webapi'

  constructor() { }
}
