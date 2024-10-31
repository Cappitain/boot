import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../../service/data.service';
import { Zone } from 'zone.js/lib/zone-impl';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  zones:Array<Zone>;
  selectedzones: any;
  constructor(private data:DataService,private http:HttpClient,
    private dialogRef:MatDialogRef<EditComponent>){
    this.zones = data.zones;
    this.selectedzones = data.selectedzones;
    console.log(this.zones);
  }
  save(zoneName: string , zoneDetail: string, eventID: number, zonePicture: string,zoneID : number){
    let jsonObj = {
      zoneName: zoneName,
      zoneDetail: zoneDetail,
      eventID: eventID,
      zonePicture: zonePicture
    };

  let jsonString = JSON.stringify(jsonObj);
  this.http.put(this.data.apiEndpoint + "/admin/zoneUpdate/"+ zoneID , jsonString, {
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
