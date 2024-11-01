import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  event: any;
  zones: any;
  selectedzones: any;
  selectedevent: any;
  booths: any;
  selectedBooth: any;
  users:any;
  apiEndpoint = 'http://localhost/webapi'

  constructor() { }
}
