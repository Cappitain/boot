import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from '../../service/data.service';
import { HttpClient } from '@angular/common/http';
import { Convert as zoneCvt, Zone } from '../../model/zone.model';  
import { Convert as boothCvt, Booth } from '../../model/booth.model';
import { Convert as userCvt, MemberInfo} from '../../model/user.model';
import { MatListModule, MatListOption } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatDialogModule, MatDialog} from '@angular/material/dialog';
import { NewComponent } from '../new/new.component';
import { from } from 'rxjs';

@Component({
  selector: 'app-zone',
  standalone: true,
  imports: [RouterOutlet,MatListModule,CommonModule,MatDialogModule],
  templateUrl: './zone2.component.html',
  styleUrl: './zone2.component.scss'
})
export class zone2Component {   
  zones = Array<Zone>(); 
  users = Array<MemberInfo>();
  booths = Array<Booth>();
  events = Array<Event>();
  selectedZone: Zone | undefined;
  filteredBooths: Booth[] = []; 

  constructor(private route: ActivatedRoute,private router: Router,private dataService:DataService, private http:HttpClient, private dialog : MatDialog){
    http.get(dataService.apiEndpoint + "/zone").subscribe((data:any)=>{
      this.zones = zoneCvt.toZone(JSON.stringify(data));
      console.log(this.zones);
    });

    http.get(dataService.apiEndpoint + "/booth").subscribe((data:any)=>{
      this.booths = boothCvt.toBooth(JSON.stringify(data));
      console.log(this.booths);
    });



  }
  
  countBoothsInZone(zone: Zone): number {
    return this.booths.filter(booth => booth.zoneID === zone.zoneID).length;
  }

  show(option: MatListOption) {
    this.selectedZone = option.value;
    // กรองบูธที่อยู่ในโซนที่เลือก
    this.filteredBooths = this.booths.filter(booth => booth.zoneID === this.selectedZone?.zoneID);
    console.log(this.selectedZone, this.filteredBooths);
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
  goTomain2() {
    this.router.navigate(['main2']);
  }
  addnew() {
    this.dataService.zone =this.zones;
    this.dialog.open(NewComponent,{
      minWidth:'300px',
    });
  }
}
