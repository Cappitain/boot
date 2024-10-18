import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from '../../service/data.service';
import { HttpClient } from '@angular/common/http';
import { Convert as zoneCvt, Zone } from '../../model/zone.model';  
import { Convert as boothCvt, Booth } from '../../model/booth.model';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-zone',
  standalone: true,
  imports: [RouterOutlet,MatListModule,CommonModule],
  templateUrl: './zone.component.html',
  styleUrl: './zone.component.scss'
})
export class zoneComponent {   
  zones = Array<Zone>(); 
  booths = Array<Booth>();
  constructor(private router: Router,private dataService:DataService, private http:HttpClient){
    http.get(dataService.apiEndpoint + "/zone").subscribe((data:any)=>{
      this.zones = zoneCvt.toZone(JSON.stringify(data));
      console.log(this.zones);
    });
    http.get(dataService.apiEndpoint + "/booth").subscribe((data:any)=>{
      this.booths = boothCvt.toBooth(JSON.stringify(data));
      console.log(this.booths);
    });
  }


  goToLogin() {
    this.router.navigate(['/login']);
  }
  goToRegister() {
    this.router.navigate(['/regis']);
  }
  goToZone() {
    this.router.navigate(['/zone']);
  }
  goTomain() {
    this.router.navigate(['']);
  }
}
