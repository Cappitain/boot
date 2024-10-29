import { Component } from '@angular/core';
import { Zone } from '../../model/zone.model';
import { DataService } from '../../service/data.service';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [CommonModule,MatDialogModule],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss'
})
export class NewComponent {
  zones:Array<Zone>;
  selectedzones: any;
  constructor(private data:DataService,private http:HttpClient,
    private dialogRef:MatDialogRef<NewComponent>){
    this.zones = data.zones;
    this.selectedzones = data.selectedzones;
    console.log(this.zones);
  }
  edit(){
    
  }

  addNew(zoneName: string , zoneDetail: string, eventID: number, zonePicture: string){
    let jsonObj = {
      zoneName: zoneName,
      zoneDetail: zoneDetail,
      eventID: eventID,
      zonePicture: zonePicture
    };

    this.http.post(this.data.apiEndpoint + "/zone", jsonObj, {
      headers: { 'Content-Type': 'application/json' },
      observe: 'response'
    }).subscribe((response) => {
      console.log(response.status);
      console.log(response.body);
      this.dialogRef.close();
    });
  }
  save(zoneName: string , zoneDetail: string, eventID: number, zonePicture: string){
    let jsonObj = {
      zoneName: zoneName,
      zoneDetail: zoneDetail,
      eventID: eventID,
      zonePicture: zonePicture
    };

    this.http.post(this.data.apiEndpoint + "/zone", jsonObj, {
      headers: { 'Content-Type': 'application/json' },
      observe: 'response'
    }).subscribe((response) => {
      console.log(response.status);
      console.log(response.body);
      this.dialogRef.close();
    });
  }
  close(){
    this.dialogRef.close();
  }
  
}
