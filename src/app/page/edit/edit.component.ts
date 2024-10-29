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
  selectedzones: Zone;
  response:any;
  constructor(private data:DataService,private http:HttpClient,
    private dialogRef:MatDialogRef<EditComponent>){
    this.zones = data.zones;
    console.log(this.zones);
    this.selectedzones = data.selectedzones;
}
close(){
  this.dialogRef.close();
}

save(zoneName: string , zoneDetail: string, eventID: number, zonePicture: string){
  let jsonObj = {
    zoneName: zoneName,
    zoneDetail: zoneDetail,
    eventID: eventID,
    zonePicture: zonePicture
  };
  let jsonString = JSON.stringify(jsonObj);
  this.http.put(this.data.apiEndpoint + "/zone", jsonString, {
    headers: { 'Content-Type': 'application/json' },
    observe: 'response'
  }).subscribe((response) => {
    console.log(response.status);
    console.log(response.body);
    this.dialogRef.close();
  });
}

}
